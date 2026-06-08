// firebase-sync.js — Last-Write-Wins 同期
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

  // ── 同期対象 ─────────────────────────────────────────────────
  // strategy:
  //   'lww'    — Last-Write-Wins: 新しいタイムスタンプ側をそのまま採用
  //   'merge'  — 初回ログイン時のみ両方をマージ（未使用、将来用）
  var TARGETS = [
    { key: 'cartItems',               doc: 'cart',      field: 'items', event: 'cartUpdated'     },
    { key: 'hinoka_wishlist',         doc: 'wishlist',  field: 'ids',   event: 'wishlistUpdated' },
    { key: 'hinoka_orders',           doc: 'orders',    field: 'items', event: 'orderUpdated'    },
    { key: 'hinoka_addresses',        doc: 'addresses', field: 'items', event: 'addressUpdated'  },
    { key: 'hinoka_browsing_history', doc: 'history',   field: 'items', event: 'historyUpdated'  },
    { key: 'hinoka_reviews',          doc: 'reviews',   field: 'items', event: 'reviewUpdated'   },
    { key: 'hinoka_messages',         doc: 'messages',  field: 'items', event: 'messageUpdated'  },
    { key: 'hinoka_coupons',          doc: 'coupons',   field: 'items', event: 'couponUpdated'   },
    { key: 'hinoka_points_log',       doc: 'points',    field: 'data',  event: 'pointsUpdated'   },
    { key: 'hinoka_balance',          doc: 'balance',   field: 'data',  event: 'balanceUpdated'  },
    { key: 'hinoka_profile',          doc: 'profile',   field: 'data',  event: 'profileUpdated'  }
  ];

  // ── ローカルタイムスタンプ管理 ───────────────────────────────
  var TS_KEY = '_hinoka_sync_ts';
  function getLocalTs(doc) {
    try { return JSON.parse(localStorage.getItem(TS_KEY) || '{}')[doc] || 0; } catch (e) { return 0; }
  }
  function setLocalTs(doc, ts) {
    try {
      var all = JSON.parse(localStorage.getItem(TS_KEY) || '{}');
      all[doc] = ts;
      localStorage.setItem(TS_KEY, JSON.stringify(all));
    } catch (e) {}
  }

  // ── localStorage 読み書き ────────────────────────────────────
  function readLocal(t) {
    try {
      var v = JSON.parse(localStorage.getItem(t.key) || 'null');
      if (v === null) return (t.field === 'data') ? {} : [];
      if (t.field === 'data' && Array.isArray(v)) return {};
      return v;
    } catch (e) { return (t.field === 'data') ? {} : []; }
  }
  function writeLocal(t, data) {
    try { localStorage.setItem(t.key, JSON.stringify(data)); } catch (e) {}
  }

  // ── Firestore 保存（デバウンス600ms）────────────────────────
  function save(t) {
    if (!_uid) return;
    var now = Date.now();
    var obj = {
      ts:     now,
      server: firebase.firestore.FieldValue.serverTimestamp()
    };
    obj[t.field] = readLocal(t);
    setLocalTs(t.doc, now);
    db.collection('users').doc(_uid).collection('sync').doc(t.doc)
      .set(obj)
      .catch(function (e) {
        console.warn('[hinoka-sync] upload failed:', t.doc, e && e.code);
      });
  }

  function debounceSave(t) {
    if (!_uid) return;
    clearTimeout(_timers[t.doc]);
    _timers[t.doc] = setTimeout(function () { save(t); }, 600);
  }

  // ── リモートデータ適用（LWW: 新しい方を採用）────────────────
  function applyIfNewer(t, remoteData, remoteTs) {
    var localTs = getLocalTs(t.doc);
    // リモートのタイムスタンプがローカルより新しければ上書き
    if (remoteTs > localTs) {
      var current = readLocal(t);
      if (JSON.stringify(remoteData) !== JSON.stringify(current)) {
        writeLocal(t, remoteData);
        setLocalTs(t.doc, remoteTs);
        window.dispatchEvent(new Event(t.event));
      }
    }
  }

  // ── Firestore から全データを取得（ページ読み込み時）────────
  function downloadAll() {
    if (!_uid) return;
    TARGETS.forEach(function (t) {
      db.collection('users').doc(_uid).collection('sync').doc(t.doc)
        .get({ source: 'server' })
        .then(function (snap) {
          if (!snap.exists) return;
          var d = snap.data();
          var remoteTs = typeof d.ts === 'number' ? d.ts : 0;
          var remoteData = d[t.field];
          if (remoteData !== undefined) applyIfNewer(t, remoteData, remoteTs);
        })
        .catch(function (e) {
          console.warn('[hinoka-sync] download failed:', t.doc, e && e.code);
        });
    });
  }

  // ── リアルタイム監視 ─────────────────────────────────────────
  function startListening() {
    if (!_uid) return;
    TARGETS.forEach(function (t) {
      var unsub = db.collection('users').doc(_uid).collection('sync').doc(t.doc)
        .onSnapshot({ includeMetadataChanges: false }, function (snap) {
          if (!snap.exists) return;
          var d = snap.data();
          var remoteTs = typeof d.ts === 'number' ? d.ts : 0;
          var remoteData = d[t.field];
          if (remoteData !== undefined) applyIfNewer(t, remoteData, remoteTs);
        }, function (e) {
          console.warn('[hinoka-sync] snapshot error:', t.doc, e && e.code);
        });
      _unsubs.push(unsub);
    });
  }

  function stopListening() {
    _unsubs.forEach(function (fn) { try { fn(); } catch (e) {} });
    _unsubs = [];
  }

  // ── ページ非表示時に即時保存・表示時に再取得 ─────────────────
  var _hiddenAt = 0;
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      _hiddenAt = Date.now();
      if (_uid) TARGETS.forEach(function (t) { clearTimeout(_timers[t.doc]); save(t); });
    } else if (document.visibilityState === 'visible' && _uid) {
      // 30秒以上バックグラウンドだった場合は Firestore から再取得
      if (Date.now() - _hiddenAt > 30000) downloadAll();
    }
  });

  // ── ローカルイベント → Firestore保存 ─────────────────────────
  TARGETS.forEach(function (t) {
    window.addEventListener(t.event, function () { debounceSave(t); });
  });

  // 他タブのlocalStorage変更も検知
  window.addEventListener('storage', function (e) {
    if (e.key === TS_KEY) return; // タイムスタンプ更新は無視
    var t = TARGETS.find(function (x) { return x.key === e.key; });
    if (t && _uid) debounceSave(t);
  });

  // ── 認証 ─────────────────────────────────────────────────────
  auth.onAuthStateChanged(function (user) {
    if (user) {
      _uid = user.uid;
      downloadAll();
      startListening();
      // ログイン後、ローカルに未同期データがあればアップロード（3秒後）
      setTimeout(function () {
        if (!_uid) return;
        TARGETS.forEach(function (t) {
          var local = readLocal(t);
          var hasData = Array.isArray(local) ? local.length > 0 : Object.keys(local).length > 0;
          if (hasData && getLocalTs(t.doc) === 0) save(t);
        });
      }, 3000);
    } else {
      stopListening();
      _uid = null;
    }
  });

  // ── 外部API ──────────────────────────────────────────────────
  window.hinokaSyncSave = function () { if (_uid) TARGETS.forEach(save); };
  window.hinokaSyncForceDownload = downloadAll;
})();
