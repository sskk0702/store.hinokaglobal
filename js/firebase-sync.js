// firebase-sync.js — Firestore クロスデバイス同期
(function () {
  var app  = (firebase.apps.length > 0) ? firebase.app() : firebase.initializeApp({
    apiKey:            'AIzaSyCCbyBIRyglhmvyfbppp8jxO8Pzytr49TA',
    authDomain:        'hinoka-0304.firebaseapp.com',
    projectId:         'hinoka-0304',
    storageBucket:     'hinoka-0304.firebasestorage.app',
    messagingSenderId: '275098198657',
    appId:             '1:275098198657:web:d9b11ff1086c972ac6e380'
  });
  var auth = firebase.auth(app);
  var db   = firebase.firestore(app);

  var _uid      = null;
  var _timers   = {};
  var _unsubs   = [];   // onSnapshot unsubscribe handles

  // ── マージ戦略 ────────────────────────────────────────────────
  function mergeCart(local, remote) {
    var merged = local.slice();
    remote.forEach(function (ri) {
      var found = merged.find(function (li) {
        return li.id === ri.id &&
               (li.size  || '') === (ri.size  || '') &&
               (li.color || '') === (ri.color || '');
      });
      if (found) { found.qty = Math.max(found.qty || 1, ri.qty || 1); }
      else { merged.push(ri); }
    });
    return merged;
  }

  function mergeArray(local, remote) {
    // works for both string[] and object[] with .id
    var merged = local.slice();
    remote.forEach(function (ri) {
      var key = (typeof ri === 'string') ? ri : ri.id;
      var exists = merged.some(function (li) {
        return (typeof li === 'string') ? li === key : li.id === key;
      });
      if (!exists) merged.push(ri);
    });
    return merged;
  }

  function mergeOrders(local, remote) {
    var merged = local.slice();
    remote.forEach(function (ri) {
      var key = ri.ref || ri.id;
      var exists = merged.some(function (li) { return (li.ref || li.id) === key; });
      if (!exists) merged.push(ri);
    });
    return merged;
  }

  // オブジェクト型（ポイント・残高・プロフィール）はリモートを優先
  function mergeObject(local, remote) {
    return Object.assign({}, local || {}, remote || {});
  }

  // ── 同期対象 ────────────────────────────────────────────────
  // type: 'array' | 'object'
  var SYNC_TARGETS = [
    { key: 'cartItems',               doc: 'cart',      field: 'items', event: 'cartUpdated',     merge: mergeCart,    type: 'array'  },
    { key: 'hinoka_wishlist',         doc: 'wishlist',  field: 'ids',   event: 'wishlistUpdated', merge: mergeArray,   type: 'array'  },
    { key: 'hinoka_orders',           doc: 'orders',    field: 'items', event: 'orderUpdated',    merge: mergeOrders,  type: 'array'  },
    { key: 'hinoka_addresses',        doc: 'addresses', field: 'items', event: 'addressUpdated',  merge: mergeArray,   type: 'array'  },
    { key: 'hinoka_browsing_history', doc: 'history',   field: 'items', event: 'historyUpdated',  merge: mergeArray,   type: 'array'  },
    { key: 'hinoka_reviews',          doc: 'reviews',   field: 'items', event: 'reviewUpdated',   merge: mergeArray,   type: 'array'  },
    { key: 'hinoka_messages',         doc: 'messages',  field: 'items', event: 'messageUpdated',  merge: mergeArray,   type: 'array'  },
    { key: 'hinoka_coupons',          doc: 'coupons',   field: 'items', event: 'couponUpdated',   merge: mergeArray,   type: 'array'  },
    { key: 'hinoka_points_log',       doc: 'points',    field: 'data',  event: 'pointsUpdated',   merge: mergeObject,  type: 'object' },
    { key: 'hinoka_balance',          doc: 'balance',   field: 'data',  event: 'balanceUpdated',  merge: mergeObject,  type: 'object' },
    { key: 'hinoka_profile',          doc: 'profile',   field: 'data',  event: 'profileUpdated',  merge: mergeObject,  type: 'object' }
  ];

  // ── localStorage ヘルパー ────────────────────────────────────
  function readLocal(t) {
    try {
      var raw = localStorage.getItem(t.key);
      if (!raw) return t.type === 'object' ? {} : [];
      var parsed = JSON.parse(raw);
      // hinoka_points_log は {total,available,expire} or null
      if (t.type === 'object' && Array.isArray(parsed)) return {};
      return parsed;
    } catch (e) {
      return t.type === 'object' ? {} : [];
    }
  }

  function writeLocal(t, data) {
    try { localStorage.setItem(t.key, JSON.stringify(data)); } catch (e) {}
  }

  // ── Firestore 書き込み（デバウンス800ms）────────────────────
  function scheduleUpload(target) {
    if (!_uid) return;
    clearTimeout(_timers[target.doc]);
    _timers[target.doc] = setTimeout(function () { upload(target); }, 800);
  }

  function upload(target) {
    if (!_uid) return;
    var data  = readLocal(target);
    var obj   = { ts: firebase.firestore.FieldValue.serverTimestamp() };
    obj[target.field] = data;
    db.collection('users').doc(_uid)
      .collection('sync').doc(target.doc)
      .set(obj)
      .catch(function () {});
  }

  // ── Firestore 読み込み（初回）────────────────────────────────
  function download(target, callback) {
    db.collection('users').doc(_uid)
      .collection('sync').doc(target.doc)
      .get()
      .then(function (snap) {
        if (!snap.exists) { if (callback) callback(); return; }
        applyRemote(target, snap.data()[target.field]);
        if (callback) callback();
      })
      .catch(function () { if (callback) callback(); });
  }

  function applyRemote(target, remote) {
    if (remote === undefined || remote === null) return;
    var local  = readLocal(target);
    var merged = target.merge(local, remote);
    var mStr   = JSON.stringify(merged);
    if (mStr !== JSON.stringify(local)) {
      writeLocal(target, merged);
      window.dispatchEvent(new Event(target.event));
    }
  }

  // ── リアルタイム監視（onSnapshot）────────────────────────────
  function startListening() {
    SYNC_TARGETS.forEach(function (target) {
      var unsub = db.collection('users').doc(_uid)
        .collection('sync').doc(target.doc)
        .onSnapshot(function (snap) {
          if (!snap.exists || snap.metadata.hasPendingWrites) return;
          applyRemote(target, snap.data()[target.field]);
        }, function () {});
      _unsubs.push(unsub);
    });
  }

  function stopListening() {
    _unsubs.forEach(function (fn) { try { fn(); } catch (e) {} });
    _unsubs = [];
  }

  // ── localStorage 変更イベント（他タブ含む）────────────────────
  function bindLocalEvents() {
    SYNC_TARGETS.forEach(function (target) {
      window.addEventListener(target.event, function () {
        scheduleUpload(target);
      });
    });

    // 別タブからの localStorage 変更も検知
    window.addEventListener('storage', function (e) {
      var target = SYNC_TARGETS.find(function (t) { return t.key === e.key; });
      if (target && _uid) scheduleUpload(target);
    });
  }

  // ── ページ非表示前に即時保存 ────────────────────────────────
  window.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden' && _uid) {
      SYNC_TARGETS.forEach(function (t) {
        clearTimeout(_timers[t.doc]);
        upload(t);
      });
    }
  });

  // ── 認証状態変化 ────────────────────────────────────────────
  auth.onAuthStateChanged(function (user) {
    if (user) {
      _uid = user.uid;
      // 全データをダウンロードしてからリアルタイム監視開始
      var done = 0;
      SYNC_TARGETS.forEach(function (target) {
        download(target, function () {
          done++;
          if (done === SYNC_TARGETS.length) {
            startListening();
          }
        });
      });
    } else {
      stopListening();
      _uid = null;
    }
  });

  // 外部から強制アップロード可能
  window.hinokaSyncSave = function () {
    SYNC_TARGETS.forEach(function (t) { upload(t); });
  };
  window.hinokaSyncForceDownload = function () {
    if (!_uid) return;
    SYNC_TARGETS.forEach(function (t) { download(t); });
  };

  bindLocalEvents();
})();
