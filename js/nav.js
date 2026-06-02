/**
 * nav.js — HINOKA ナビゲーション
 * 左：PRODUCTS 4大カテゴリー（For Business / For Life / Pet Supplies / Featured）
 * 右ドロワー：アイコンメニュー
 */
(function () {

  const NAV_HTML = `
  <nav id="main-nav">

    <!-- 左：ハンバーガー + MENU（hover時のみ） -->
    <div class="nav-left">
      <div class="nav-left-wrap">
        <button class="hamburger-btn" id="hamburgerBtn" aria-label="メニューを開く">
          <span></span><span></span><span></span>
        </button>
        <span class="nav-menu-label">Menu</span>
      </div>
    </div>

    <!-- 中央：ロゴ -->
    <div class="nav-center">
      <a href="store.html" class="nav-logo">HINOKA</a>
    </div>

    <!-- 右：ハンバーガー + MENU（hover時のみ） -->
    <div class="nav-right">
      <div class="nav-right-wrap">
        <span class="nav-menu-label">Menu</span>
        <button class="nav-more-btn" id="moreBtn" aria-label="メニューを開く">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>

  <!-- オーバーレイ -->
  <div class="menu-overlay" id="menuOverlay"></div>

  <!-- 左：サイドメニュー（カテゴリー） -->
  <aside class="side-menu" id="sideMenu">
    <div class="side-menu-header">
      <div>
        <a href="store.html" class="side-menu-brand">HINOKA</a>
        <div class="side-menu-tagline">Bridging Insight and Action.</div>
      </div>
      <button class="close-menu-btn" id="closeMenuBtn">&times;</button>
    </div>
    <div class="side-menu-body">

      <div class="menu-section-label">PRODUCTS</div>

      <!-- For Business -->
      <div class="menu-category">
        <div class="menu-category-header">
          <span>For Business<em>ビジネスソリューション</em></span>
          <span class="menu-plus">+</span>
        </div>
        <div class="menu-subcategory">
          <a href="product-list.html?category=office-supplies">Office Supplies　オフィス用品</a>
          <a href="product-list.html?category=packaging">Packaging Materials　梱包資材</a>
          <a href="product-list.html?category=industrial">Industrial Products　工業用品</a>
          <a href="product-list.html?category=safety-workwear">Safety &amp; Workwear　作業用品</a>
        </div>
      </div>

      <!-- For Life -->
      <div class="menu-category">
        <div class="menu-category-header">
          <span>For Life<em>暮らしを豊かにする商品</em></span>
          <span class="menu-plus">+</span>
        </div>
        <div class="menu-subcategory">
          <a href="product-list.html?category=home-living">Home &amp; Living　生活雑貨</a>
          <a href="product-list.html?category=kitchen">Kitchen　キッチン用品</a>
          <a href="product-list.html?category=travel-outdoor">Travel &amp; Outdoor　トラベル</a>
        </div>
      </div>

      <!-- Pet Supplies -->
      <div class="menu-category">
        <div class="menu-category-header">
          <span>Pet Supplies<em>ペット用品</em></span>
          <span class="menu-plus">+</span>
        </div>
        <div class="menu-subcategory">
          <a href="product-list.html?category=dog">Dog　犬用品</a>
          <a href="product-list.html?category=cat">Cat　猫用品</a>
          <a href="product-list.html?category=pet-care">Care　ケア用品</a>
          <a href="product-list.html?category=pet-toys">Toys　おもちゃ</a>
        </div>
      </div>

      <!-- Featured Collection -->
      <div class="menu-category">
        <div class="menu-category-header">
          <span>Featured Collection<em>特集商品</em></span>
          <span class="menu-plus">+</span>
        </div>
        <div class="menu-subcategory">
          <a href="product-list.html?category=new-arrival">New Arrival　新商品</a>
          <a href="product-list.html?category=best-sellers">Best Sellers　人気商品</a>
          <a href="product-list.html?category=seasonal">Seasonal Picks　季節特集</a>
          <a href="product-list.html?category=recommended">Recommended by Us　スタッフ厳選</a>
        </div>
      </div>

      <div class="menu-footer-links">
        <a href="store.html">Home</a>
        <a href="wishlist.html">Wishlist</a>
        <a href="account.html">My Account</a>
        <a href="cart.html">Shopping Bag</a>
      </div>
      <div class="menu-footer-deco">
        <div class="menu-footer-deco-line"></div>
        <p>COPYRIGHT &copy; HINOKA Co., Ltd.<br>sun_hua@hinokaglobal.com</p>
      </div>
    </div>
  </aside>

  <!-- 右：ドロワー（アイコンメニュー） -->
  <aside class="right-drawer" id="rightDrawer">
    <div class="side-menu-header" style="position:relative;">
      <div>
        <a href="store.html" class="side-menu-brand">HINOKA</a>
        <div class="side-menu-tagline">Bridging Insight and Action.</div>
      </div>
      <button class="close-menu-btn" id="closeDrawerBtn">&times;</button>
    </div>
    <div class="right-drawer-body">
      <button class="right-drawer-item" id="drawerSearchBtn">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>
        Search
      </button>
      <a class="right-drawer-item" href="wishlist.html">
        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        Wishlist
      </a>
      <a class="right-drawer-item" href="account.html">
        <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        Account
      </a>
      <a class="right-drawer-item" href="cart.html">
        <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        Shopping Bag
        <span class="drawer-badge" id="drawerCartBadge">0</span>
      </a>
    </div>
    <div class="menu-footer-deco">
      <div class="menu-footer-deco-line"></div>
      <p>COPYRIGHT &copy; HINOKA Co., Ltd.<br>sun_hua@hinokaglobal.com</p>
    </div>
  </aside>

  <!-- 検索モーダル -->
  <div class="search-modal" id="searchModal">
    <button class="search-modal-close" id="closeSearchBtn">×</button>
    <div class="search-modal-inner">
      <p class="search-modal-label">Search</p>
      <input type="text" id="searchInput" placeholder="キーワードを入力">
    </div>
  </div>

  <div class="cart-toast" id="cartToast"></div>
  `;

  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);

  // ── スクロール連動 ──────────────────────────────────────
  const nav = document.getElementById('main-nav');
  let lastY = 0, scrollTimer = null;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    clearTimeout(scrollTimer);
    if (y > lastY && y > 80) nav.classList.add('hidden');
    else nav.classList.remove('hidden');
    scrollTimer = setTimeout(() => nav.classList.remove('hidden'), 1000);
    lastY = y;
  }, { passive: true });

  // ── オーバーレイ ────────────────────────────────────────
  const overlay = document.getElementById('menuOverlay');
  function closeAll() {
    document.getElementById('sideMenu').classList.remove('open');
    document.getElementById('rightDrawer').classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  overlay.addEventListener('click', closeAll);

  // ── 左：サイドメニュー ──────────────────────────────────
  document.getElementById('hamburgerBtn').addEventListener('click', () => {
    document.getElementById('sideMenu').classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  document.getElementById('closeMenuBtn').addEventListener('click', closeAll);

  document.querySelectorAll('.menu-category-header').forEach(h => {
    h.addEventListener('click', () => {
      const cat    = h.parentElement;
      const isOpen = cat.classList.contains('open');
      document.querySelectorAll('.menu-category').forEach(c => c.classList.remove('open'));
      if (!isOpen) cat.classList.add('open');
    });
  });

  // ── 右：ドロワー ────────────────────────────────────────
  document.getElementById('moreBtn').addEventListener('click', () => {
    document.getElementById('rightDrawer').classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  document.getElementById('closeDrawerBtn').addEventListener('click', closeAll);

  document.getElementById('drawerSearchBtn').addEventListener('click', () => {
    closeAll();
    setTimeout(openSearch, 200);
  });

  // ── 検索 ────────────────────────────────────────────────
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');
  function openSearch() {
    searchModal.classList.add('open');
    setTimeout(() => searchInput.focus(), 100);
  }
  function closeSearch() { searchModal.classList.remove('open'); }
  document.getElementById('closeSearchBtn').addEventListener('click', closeSearch);
  searchModal.addEventListener('click', e => { if (e.target === searchModal) closeSearch(); });
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && searchInput.value.trim())
      location.href = `product-list.html?q=${encodeURIComponent(searchInput.value.trim())}`;
    if (e.key === 'Escape') closeSearch();
  });

  // ── カートバッジ（右ドロワー内のみ） ──────────────────
  function updateCartBadge() {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const total = items.reduce((s, i) => s + (i.qty || 1), 0);
    const b2 = document.getElementById('drawerCartBadge');
    if (b2) { b2.textContent = total; b2.classList.toggle('visible', total > 0); }
  }
  updateCartBadge();
  window.addEventListener('cartUpdated', updateCartBadge);

  // ── カートトースト ──────────────────────────────────────
  window.showCartToast = function () {
    const t = document.getElementById('cartToast');
    t.innerHTML = `ショッピングバッグに追加しました。
      <a href="cart.html">バッグを表示</a> または
      <a href="checkout.html">お会計へ</a>`;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 5000);
    updateCartBadge();
  };

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeAll(); closeSearch(); }
  });

})();
