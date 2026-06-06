// firebase-sync.js — Firestore 同期（カート・ウィッシュリスト・注文・住所・閲覧履歴・レビュー・メッセージ）
(function(){
  var CONFIG = {
    apiKey:            'AIzaSyCCbyBIRyglhmvyfbppp8jxO8Pzytr49TA',
    authDomain:        'hinoka-0304.firebaseapp.com',
    projectId:         'hinoka-0304',
    storageBucket:     'hinoka-0304.firebasestorage.app',
    messagingSenderId: '275098198657',
    appId:             '1:275098198657:web:d9b11ff1086c972ac6e380'
  };

  var app  = (firebase.apps.length > 0) ? firebase.app() : firebase.initializeApp(CONFIG);
  var auth = firebase.auth(app);
  var db   = firebase.firestore(app);

  var _uid      = null;
  var _timers   = {};
  var _listening = false;

  // マージ戦略
  function mergeCart(local, remote) {
    var merged = local.slice();
    remote.forEach(function(ri) {
      var found = merged.find(function(li) {
        return li.id === ri.id && (li.size||'') === (ri.size||'') && (li.color||'') === (ri.color||'');
      });
      if (found) { found.qty = Math.max(found.qty||1, ri.qty||1); }
      else { merged.push(ri); }
    });
    return merged;
  }

  function mergeUnique(local, remote) {
    var merged = local.slice();
    remote.forEach(function(id) { if (merged.indexOf(id) === -1) merged.push(id); });
    return merged;
  }

  function mergeOrders(local, remote) {
    var merged = local.slice();
    remote.forEach(function(ri) {
      var key = ri.ref || ri.id;
      var exists = merged.some(function(li) { return (li.ref || li.id) === key; });
      if (!exists) merged.push(ri);
    });
    return merged;
  }

  function mergeById(local, remote) {
    var merged = local.slice();
    remote.forEach(function(ri) {
      var exists = merged.some(function(li) { return li.id === ri.id; });
      if (!exists) merged.push(ri);
    });
    return merged;
  }

  function preferLocal(local) { return local; }

  var SYNC_TARGETS = [
    { key: 'cartItems',              doc: 'cart',      field: 'items', event: 'cartUpdated',     merge: mergeCart },
    { key: 'hinoka_wishlist',        doc: 'wishlist',  field: 'ids',   event: 'wishlistUpdated', merge: mergeUnique },
    { key: 'hinoka_orders',          doc: 'orders',    field: 'items', event: 'orderUpdated',    merge: mergeOrders },
    { key: 'hinoka_addresses',       doc: 'addresses', field: 'items', event: 'addressUpdated',  merge: mergeById },
    { key: 'hinoka_browsing_history',doc: 'history',   field: 'items', event: 'historyUpdated',  merge: preferLocal },
    { key: 'hinoka_reviews',         doc: 'reviews',   field: 'items', event: 'reviewUpdated',   merge: mergeById },
    { key: 'hinoka_messages',        doc: 'messages',  field: 'items', event: 'messageUpdated',  merge: mergeById }
  ];

  function readLocal(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch(e) { return []; }
  }

  function scheduleSync(target) {
    if (!_uid) return;
    clearTimeout(_timers[target.doc]);
    _timers[target.doc] = setTimeout(function() { saveTarget(target); }, 800);
  }

  function saveTarget(target) {
    if (!_uid) return;
    var data = readLocal(target.key);
    var obj = { ts: firebase.firestore.FieldValue.serverTimestamp() };
    obj[target.field] = data;
    db.collection('users').doc(_uid).collection('sync').doc(target.doc).set(obj).catch(function(){});
  }

  function saveAll() {
    SYNC_TARGETS.forEach(function(t) { saveTarget(t); });
  }

  function loadTarget(target) {
    db.collection('users').doc(_uid).collection('sync').doc(target.doc).get().then(function(snap) {
      if (!snap.exists) return;
      var remote = snap.data()[target.field] || [];
      var local  = readLocal(target.key);
      var merged = target.merge(local, remote);
      if (JSON.stringify(merged) !== JSON.stringify(local)) {
        localStorage.setItem(target.key, JSON.stringify(merged));
        window.dispatchEvent(new Event(target.event));
      }
    }).catch(function(){});
  }

  auth.onAuthStateChanged(function(user) {
    if (user) {
      _uid = user.uid;
      SYNC_TARGETS.forEach(loadTarget);
      if (!_listening) {
        _listening = true;
        SYNC_TARGETS.forEach(function(target) {
          window.addEventListener(target.event, function() { scheduleSync(target); });
        });
      }
    } else {
      _uid = null;
    }
  });

  window.hinokaSyncSave = saveAll;
})();
