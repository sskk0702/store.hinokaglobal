// firebase-sync.js — Firestore クロスデバイス同期 (シンプル版)
(function () {
  var FB_CONFIG = {
    apiKey:            'AIzaSyCCbyBIRyglhmvyfbppp8jxO8Pzytr49TA',
    authDomain:        'hinoka-0304.firebaseapp.com',
    projectId:         'hinoka-0304',
    storageBucket:     'hinoka-0304.firebasestorage.app',
    messagingSenderId: '275098198657',
    appId:             '1:275098198657:web:d9b11ff1086c972ac6e380'
  };

  var app  = firebase.apps.length ? firebase.app() : firebase.initializeApp(FB_CONFIG);
  var auth = firebase.auth(app);
  var db   = firebase.firestore(app);

  var _uid    = null;
  var _timers = {};
  var _unsubs = [];

  // ── マージ ────────────────────────────────────────────────────
  function mergeCart(local, remote) {
    var out = local.slice();
    (remote || []).forEach(function (ri) {
      var found = out.find(function (li) {
        return li.id === ri.id && (li.size||'') === (ri.size||'') && (li.color||'') === (ri.color||'');
      });
      if (found) { found.qty = Math.max(found.qty||1, ri.qty||1); }
      else { out.push(ri); }
    });
    return out;
  }

  function mergeArr(local, remote) {
    var out = local.slice();
    (remote || []).forEach(function (ri) {
      var key = typeof ri === 'string' ? ri : ri.id;
      var exists = out.some(function (li) {
        return typeof li === 'string' ? li === key : li.id === key;
      });
      if (!exists) out.push(ri);
    });
    return out;
  }

  function mergeOrders(local, remote) {
    var out = local.slice();
    (remote || []).forEach(function (ri) {
      var key = ri.ref || ri.id;
      if (!out.some(function (li) { return (li.ref||li.id) === key; })) out.push(ri);
    });
    return out;
  }

  function mergeObj(local, remote) {
    return Object.assign({}, local || {}, remote || {});
  }

  // ── 対象リスト ────────────────────────────────────────────────
  var TARGETS = [
    { key: 'cartItems',               doc: 'cart',      field: 'items', event: 'cartUpdated',     merge: mergeCart,   type: 'array'  },
    { key: 'hinoka_wishlist',         doc: 'wishlist',  field: 'ids',   event: 'wishlistUpdated', merge: mergeArr,    type: 'array'  },
    { key: 'hinoka_orders',           doc: 'orders',    field: 'items', event: 'orderUpdated',    merge: mergeOrders, type: 'array'  },
    { key: 'hinoka_addresses',        doc: 'addresses', field: 'items', event: 'addressUpdated',  merge: mergeArr,    type: 'array'  },
    { key: 'hinoka_browsing_history', doc: 'history',   field: 'items', event: 'historyUpdated',  merge: mergeArr,    type: 'array'  },
    { key: 'hinoka_reviews',          doc: 'reviews',   field: 'items', event: 'reviewUpdated',   merge: mergeArr,    type: 'array'  },
    { key: 'hinoka_messages',         doc: 'messages',  field: 'items', event: 'messageUpdated',  merge: mergeArr,    type: 'array'  },
    { key: 'hinoka_coupons',          doc: 'coupons',   field: 'items', event: 'couponUpdated',   merge: mergeArr,    type: 'array'  },
    { key: 'hinoka_points_log',       doc: 'points',    field: 'data',  event: 'pointsUpdated',   merge: mergeObj,    type: 'object' },
    { key: 'hinoka_balance',          doc: 'balance',   field: 'data',  event: 'balanceUpdated',  merge: mergeObj,    type: 'object' },
    { key: 'hinoka_profile',          doc: 'profile',   field: 'data',  event: 'profileUpdated',  merge: mergeObj,    type: 'object' }
  ];

  // ── ローカル読み書き ──────────────────────────────────────────
  function readLocal(t) {
    try {
      var v = JSON.parse(localStorage.getItem(t.key) || 'null');
      if (v === null) return t.type === 'object' ? {} : [];
      if (t.type === 'object' && Array.isArray(v)) return {};
      return v;
    } catch (e) { return t.type === 'object' ? {} : []; }
  }

  function writeLocal(t, data) {
    try { localStorage.setItem(t.key, JSON.stringify(data)); } catch (e) {}
  }

  // ── Firestore 保存（デバウンス）──────────────────────────────
  function save(t) {
    if (!_uid) return;
    var obj = { ts: firebase.firestore.FieldValue.serverTimestamp() };
    obj[t.field] = readLocal(t);
    db.collection('users').doc(_uid).collection('sync').doc(t.doc)
      .set(obj).catch(function (e) { console.warn('[hinoka-sync] upload failed:', t.doc, e && e.code, e && e.message); });
  }

  function debounceSave(t) {
    if (!_uid) return;
    clearTimeout(_timers[t.doc]);
    _timers[t.doc] = setTimeout(function () { save(t); }, 600);
  }

  // ── リモートデータ適用 ────────────────────────────────────────
  function apply(t, remote) {
    if (remote === undefined || remote === null) return;
    var local  = readLocal(t);
    var merged = t.merge(local, remote);
    if (JSON.stringify(merged) !== JSON.stringify(local)) {
      writeLocal(t, merged);
      window.dispatchEvent(new Event(t.event));
    }
  }

  // ── ログイン時: Firestoreから全データをダウンロード ───────────
  function downloadAll() {
    TARGETS.forEach(function (t) {
      db.collection('users').doc(_uid).collection('sync').doc(t.doc)
        .get({ source: 'server' })   // キャッシュを無視してサーバから取得
        .then(function (snap) {
          if (snap.exists) apply(t, snap.data()[t.field]);
        })
        .catch(function (e) { console.warn('[hinoka-sync] download failed:', t.doc, e && e.code, e && e.message); });
    });
  }

  // ── リアルタイム監視 ─────────────────────────────────────────
  function startListening() {
    TARGETS.forEach(function (t) {
      var unsub = db.collection('users').doc(_uid).collection('sync').doc(t.doc)
        .onSnapshot({ includeMetadataChanges: false }, function (snap) {
          if (!snap.exists) return;
          apply(t, snap.data()[t.field]);
        }, function () {});
      _unsubs.push(unsub);
    });
  }

  function stopListening() {
    _unsubs.forEach(function (fn) { try { fn(); } catch (e) {} });
    _unsubs = [];
  }

  // ── ページ非表示時に即時保存 ─────────────────────────────────
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden' && _uid) {
      TARGETS.forEach(function (t) { clearTimeout(_timers[t.doc]); save(t); });
    }
  });

  // ── ローカルイベント → Firestore保存 ─────────────────────────
  TARGETS.forEach(function (t) {
    window.addEventListener(t.event, function () { debounceSave(t); });
  });

  // 他タブのlocalStorage変更も検知
  window.addEventListener('storage', function (e) {
    var t = TARGETS.find(function (x) { return x.key === e.key; });
    if (t && _uid) debounceSave(t);
  });

  // ── 認証 ─────────────────────────────────────────────────────
  auth.onAuthStateChanged(function (user) {
    if (user) {
      _uid = user.uid;
      downloadAll();          // ① サーバから最新データを取得
      startListening();       // ② リアルタイム監視開始
    } else {
      stopListening();
      _uid = null;
    }
  });

  // ── 外部API ──────────────────────────────────────────────────
  window.hinokaSyncSave = function () { TARGETS.forEach(save); };
  window.hinokaSyncForceDownload = downloadAll;
})();
