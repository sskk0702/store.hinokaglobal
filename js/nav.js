/**
 * nav.js - HINOKA ナビゲーション
 * 右側ドロワーと検索、カートバッジを日本語表示に統一。
 */
(function () {
  var NAV_HTML = `
  <nav id="main-nav">
    <div class="nav-left">
      <div class="nav-left-wrap">
        <button class="hamburger-btn" id="hamburgerBtn" aria-label="商品メニューを開く"><span></span><span></span><span></span></button>
        <span class="nav-menu-label">Menu</span>
      </div>
    </div>
    <div class="nav-center"><a href="store.html" class="nav-logo">HINOKA</a><span id="navModeBadge" class="nav-mode-badge"></span></div>
    <div class="nav-right">
      <div class="nav-right-wrap">
        <span class="nav-menu-label">Menu</span>
        <button class="nav-more-btn" id="moreBtn" aria-label="アカウントメニューを開く"><span></span><span></span><span></span></button>
      </div>
    </div>
  </nav>

  <div class="menu-overlay" id="menuOverlay"></div>

  <aside class="side-menu" id="sideMenu">
    <div class="side-menu-header">
      <div>
        <a href="store.html" class="side-menu-brand">HINOKA</a>
        <div class="side-menu-tagline">洞察から、行動へ</div>
      </div>
      <button class="close-menu-btn" id="closeMenuBtn" aria-label="閉じる">&times;</button>
    </div>
    <div class="side-menu-body">
      <div class="menu-section-label">商品カテゴリ</div>

      <div class="menu-category">
        <div class="menu-category-header"><span>ビジネス向け<em>法人・オフィス向け商品</em></span><span class="menu-plus">+</span></div>
        <div class="menu-subcategory">
          <a href="product-list.html?category=office-supplies">オフィス用品</a>
          <a href="product-list.html?category=packaging">梱包資材</a>
          <a href="product-list.html?category=industrial">工業用品</a>
          <a href="product-list.html?category=safety-workwear">作業用品</a>
        </div>
      </div>

      <div class="menu-category">
        <div class="menu-category-header"><span>日用品<em>暮らしを豊かにする商品</em></span><span class="menu-plus">+</span></div>
        <div class="menu-subcategory">
          <a href="product-list.html?category=home-living">生活雑貨</a>
          <a href="product-list.html?category=kitchen">キッチン用品</a>
          <a href="product-list.html?category=travel-outdoor">トラベル用品</a>
        </div>
      </div>

      <div class="menu-category">
        <div class="menu-category-header"><span>ペット用品<em>愛するペットのために</em></span><span class="menu-plus">+</span></div>
        <div class="menu-subcategory">
          <a href="product-list.html?category=dog">犬用品</a>
          <a href="product-list.html?category=cat">猫用品</a>
          <a href="product-list.html?category=pet-care">ケア用品</a>
          <a href="product-list.html?category=pet-toys">おもちゃ</a>
        </div>
      </div>

      <div class="menu-category">
        <div class="menu-category-header"><span>特集コレクション<em>編集部おすすめ</em></span><span class="menu-plus">+</span></div>
        <div class="menu-subcategory">
          <a href="product-list.html?category=new-arrival">新着商品</a>
          <a href="product-list.html?category=best-sellers">人気商品</a>
          <a href="product-list.html?category=seasonal">季節特集</a>
          <a href="product-list.html?category=recommended">おすすめ</a>
        </div>
      </div>

      <div class="menu-footer-deco"><div class="menu-footer-deco-line"></div><p>COPYRIGHT &copy; HINOKA Co., Ltd.</p></div>
    </div>
  </aside>

  <aside class="right-drawer" id="rightDrawer">
    <div class="side-menu-header" style="position:relative;">
      <div>
        <a href="store.html" class="side-menu-brand">HINOKA</a>
        <div class="side-menu-tagline">洞察から、行動へ</div>
      </div>
      <button class="close-menu-btn" id="closeDrawerBtn" aria-label="閉じる">&times;</button>
    </div>
    <div class="right-drawer-body">
      <button class="right-drawer-item" id="drawerSearchBtn">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>
        検索
      </button>
      <a class="right-drawer-item" href="product-list.html?category=new-arrival">
        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        新着商品
      </a>
      <a class="right-drawer-item" href="account.html" id="navAccountLink">
        <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span id="navAccountLabel">マイアカウント</span>
      </a>
      <a class="right-drawer-item" href="b2b-dashboard.html" id="navB2BLink" style="display:none;">
        <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        法人ポータル
      </a>
      <a class="right-drawer-item" href="cart.html">
        <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        ショッピングバッグ
        <span class="drawer-badge" id="drawerCartBadge">0</span>
      </a>
    </div>
    <div class="menu-footer-deco"><div class="menu-footer-deco-line"></div><p>COPYRIGHT &copy; HINOKA Co., Ltd.</p></div>
  </aside>

  <div class="search-modal" id="searchModal">
    <button class="search-modal-close" id="closeSearchBtn" aria-label="閉じる">&times;</button>
    <div class="search-modal-inner">
      <p class="search-modal-label">商品を検索</p>
      <input type="text" id="searchInput" placeholder="キーワードを入力">
    </div>
  </div>

  <div class="cart-toast" id="cartToast"></div>`;

  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);

  var nav = document.getElementById('main-nav');
  var lastY = 0;
  var scrollTimer = null;

  function updateNav() {
    var y = window.scrollY;
    // Adaptive transparent: frosted glass after 40px
    if (y > 40) nav.classList.add('nav-scrolled');
    else nav.classList.remove('nav-scrolled');
  }
  updateNav(); // run on load in case page is pre-scrolled

  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    clearTimeout(scrollTimer);
    if (y > lastY && y > 80) nav.classList.add('hidden');
    else nav.classList.remove('hidden');
    scrollTimer = setTimeout(function () { nav.classList.remove('hidden'); }, 1000);
    lastY = y;
    updateNav();
  }, { passive: true });

  var overlay = document.getElementById('menuOverlay');
  function closeAll() {
    document.getElementById('sideMenu').classList.remove('open');
    document.getElementById('rightDrawer').classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  function openPanel(id) {
    document.getElementById(id).classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  overlay.addEventListener('click', closeAll);
  document.getElementById('hamburgerBtn').addEventListener('click', function () { openPanel('sideMenu'); });
  document.getElementById('moreBtn').addEventListener('click', function () { openPanel('rightDrawer'); });
  document.getElementById('closeMenuBtn').addEventListener('click', closeAll);
  document.getElementById('closeDrawerBtn').addEventListener('click', closeAll);

  document.querySelectorAll('.menu-category-header').forEach(function (h) {
    h.addEventListener('click', function () {
      var cat = h.parentElement;
      var open = cat.classList.contains('open');
      document.querySelectorAll('.menu-category').forEach(function (c) { c.classList.remove('open'); });
      if (!open) cat.classList.add('open');
    });
  });

  var searchModal = document.getElementById('searchModal');
  var searchInput = document.getElementById('searchInput');
  function openSearch() {
    searchModal.classList.add('open');
    setTimeout(function () { searchInput.focus(); }, 100);
  }
  function closeSearch() { searchModal.classList.remove('open'); }
  document.getElementById('drawerSearchBtn').addEventListener('click', function () { closeAll(); setTimeout(openSearch, 200); });
  document.getElementById('closeSearchBtn').addEventListener('click', closeSearch);
  searchModal.addEventListener('click', function (e) { if (e.target === searchModal) closeSearch(); });
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && searchInput.value.trim()) location.href = 'product-list.html?q=' + encodeURIComponent(searchInput.value.trim());
    if (e.key === 'Escape') closeSearch();
  });

  function readJson(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); }
    catch (e) { return []; }
  }
  function currentCartKey() {
    return (typeof HinokaMode !== 'undefined' && HinokaMode.isB2B()) ? 'b2bCartItems' : 'cartItems';
  }
  function updateBadges() {
    var cart = readJson(currentCartKey()).reduce(function (s, i) { return s + (i.qty || 1); }, 0);
    var cartBadge = document.getElementById('drawerCartBadge');
    if (cartBadge) { cartBadge.textContent = cart; cartBadge.classList.toggle('visible', cart > 0); }
  }
  function updateModeUI() {
    var isB2B = sessionStorage.getItem('hinoka_mode') === 'b2b';
    var accountLink = document.getElementById('navAccountLink');
    var accountLabel = document.getElementById('navAccountLabel');
    var b2bLink = document.getElementById('navB2BLink');
    var modeBadge = document.getElementById('navModeBadge');
    if (isB2B) {
      if (accountLink) { accountLink.href = 'b2b-dashboard.html'; }
      if (accountLabel) { accountLabel.textContent = '法人アカウント'; }
      if (b2bLink) { b2bLink.style.display = 'none'; }
      if (modeBadge) { modeBadge.textContent = 'B2B'; modeBadge.style.cssText = 'display:inline-block;font-size:8px;letter-spacing:0.1em;background:#c9a96e;color:#1a1710;padding:1px 6px;margin-left:6px;vertical-align:middle;font-weight:600;font-family:"Noto Sans JP",sans-serif;'; }
    } else {
      if (accountLink) { accountLink.href = 'account.html'; }
      if (accountLabel) { accountLabel.textContent = 'マイアカウント'; }
      if (modeBadge) { modeBadge.textContent = ''; modeBadge.style.display = 'none'; }
    }
    updateBadges();
  }
  updateModeUI();
  window.addEventListener('cartUpdated', updateBadges);
  window.addEventListener('b2bCartUpdated', updateBadges);
  window.addEventListener('hinokaModeChanged', updateModeUI);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') { updateModeUI(); } });
  window.addEventListener('pageshow', updateModeUI);

  window.showCartToast = function () {
    var t = document.getElementById('cartToast');
    t.innerHTML = 'ショッピングバッグに追加しました。 <a href="cart.html">バッグを見る</a> または <a href="checkout.html">お会計へ</a>';
    t.classList.add('show');
    setTimeout(function () { t.classList.remove('show'); }, 5000);
    updateBadges();
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeAll(); closeSearch(); }
  });

  // B2B法人会員で個人モードの場合のみ法人ポータルリンクを表示
  function checkB2BNav() {
    try {
      if (typeof firebase === 'undefined' || !firebase.auth) return;
      firebase.auth().onAuthStateChanged(function(user) {
        if (!user) return;
        firebase.firestore().collection('users').doc(user.uid).get().then(function(doc) {
          var data = doc.exists ? doc.data() : {};
          var link = document.getElementById('navB2BLink');
          var isB2BMode = sessionStorage.getItem('hinoka_mode') === 'b2b';
          if (data.accountType === 'b2b' && link && !isB2BMode) link.style.display = '';
          updateModeUI();
        }).catch(function(){});
      });
    } catch(e) {}
  }
  if (document.readyState === 'complete') checkB2BNav();
  else window.addEventListener('load', checkB2BNav);
})();
