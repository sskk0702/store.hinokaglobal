// firebase-sync.js — カート・ウィッシュリスト Firestore 同期
// ログイン中のユーザーのデータを複数端末で同期する
// Firebase compat CDN の後に読み込む

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

  var CART_KEY  = 'cartItems';
  var WISH_KEY  = 'hinoka_wishlist';
  var _uid      = null;
  var _timer    = null;
  var _listening = false;

  // Firestoreへ保存（デバウンス800ms）
  function scheduleSync(){
    if(!_uid) return;
    clearTimeout(_timer);
    _timer = setTimeout(saveToFirestore, 800);
  }

  function saveToFirestore(){
    if(!_uid) return;
    var ref  = db.collection('users').doc(_uid).collection('sync');
    var cart = JSON.parse(localStorage.getItem(CART_KEY)||'[]');
    var wish = JSON.parse(localStorage.getItem(WISH_KEY)||'[]');
    ref.doc('cart').set({ items: cart, ts: firebase.firestore.FieldValue.serverTimestamp() }).catch(function(){});
    ref.doc('wishlist').set({ ids: wish, ts: firebase.firestore.FieldValue.serverTimestamp() }).catch(function(){});
  }

  // Firestoreから読み込み → ローカルとマージ
  function loadFromFirestore(){
    var ref = db.collection('users').doc(_uid).collection('sync');

    ref.doc('cart').get().then(function(snap){
      if(!snap.exists) return;
      var remote = snap.data().items || [];
      var local  = JSON.parse(localStorage.getItem(CART_KEY)||'[]');
      var merged = local.slice();
      remote.forEach(function(ri){
        var found = merged.find(function(li){
          return li.id===ri.id && (li.size||'')===(ri.size||'') && (li.color||'')===(ri.color||'');
        });
        if(found){ found.qty = Math.max(found.qty||1, ri.qty||1); }
        else { merged.push(ri); }
      });
      if(JSON.stringify(merged) !== JSON.stringify(local)){
        localStorage.setItem(CART_KEY, JSON.stringify(merged));
        window.dispatchEvent(new Event('cartUpdated'));
      }
    }).catch(function(){});

    ref.doc('wishlist').get().then(function(snap){
      if(!snap.exists) return;
      var remote = snap.data().ids || [];
      var local  = JSON.parse(localStorage.getItem(WISH_KEY)||'[]');
      var merged = local.slice();
      remote.forEach(function(id){ if(merged.indexOf(id)===-1) merged.push(id); });
      if(JSON.stringify(merged) !== JSON.stringify(local)){
        localStorage.setItem(WISH_KEY, JSON.stringify(merged));
        window.dispatchEvent(new Event('wishlistUpdated'));
      }
    }).catch(function(){});
  }

  auth.onAuthStateChanged(function(user){
    if(user){
      _uid = user.uid;
      loadFromFirestore();
      if(!_listening){
        _listening = true;
        window.addEventListener('cartUpdated',    scheduleSync);
        window.addEventListener('wishlistUpdated', scheduleSync);
      }
    } else {
      _uid = null;
    }
  });

  // 外部から手動保存を呼べるようにする
  window.hinokaSyncSave = saveToFirestore;
})();
