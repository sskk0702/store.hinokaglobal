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
    <div class="nav-center"><a href="store.html" class="nav-logo">HINOKA</a></div>
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
        <div class="side-menu-tagline">洞察から、行動へ。</div>
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
        <div class="side-menu-tagline">洞察から、行動へ。</div>
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
      <a class="right-drawer-item" href="account.html">
        <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        マイアカウント
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
      <input type="text" id="searchInput" placeholder="商品名・キーワードで検索">
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
  function updateBadges() {
    var cart = readJson('cartItems').reduce(function (s, i) { return s + (i.qty || 1); }, 0);
    var cartBadge = document.getElementById('drawerCartBadge');
    if (cartBadge) { cartBadge.textContent = cart; cartBadge.classList.toggle('visible', cart > 0); }
  }
  updateBadges();
  window.addEventListener('cartUpdated', updateBadges);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') updateBadges(); });
  window.addEventListener('pageshow', updateBadges);

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
})();
