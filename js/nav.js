/**
 * nav.js — HINOKA ナビゲーション
 * 左右ともハンバーガー → MEMUはhover時のみ表示
 * 右ドロワー：左と同じデザイン（HINOKA + tagline + フッター）
 * カートは右ドロワー内のみ
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
      <!-- ★ カート数字バッジ完全削除 -->
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
        <div class="side-menu-tagline">Crafted for a calm<br>and beautiful life.</div>
      </div>
      <button class="close-menu-btn" id="closeMenuBtn">&times;</button>
    </div>
    <div class="side-menu-body">
      <div class="menu-category">
        <div class="menu-category-header"><span>&#12506;&#12483;&#12488;&#29992;&#21697;</span><span class="menu-plus">+</span></div>
        <div class="menu-subcategory">
          <a href="product-list.html?category=dog-food">&#12489;&#12483;&#12464;&#12501;&#12540;&#12489;</a>
          <a href="product-list.html?category=cat-food">&#12461;&#12515;&#12483;&#12488;&#12501;&#12540;&#12489;</a>
          <a href="product-list.html?category=pet-toys">&#12362;&#12418;&#12385;&#12419;</a>
          <a href="product-list.html?category=pet-bed">&#12505;&#12483;&#12489;&#12539;&#12495;&#12454;&#12473;</a>
          <a href="product-list.html?category=pet-collar">&#39318;&#36�;&#12539;&#12522;&#12540;&#12489;</a>
        </div>
      </div>
      <div class="menu-category">
        <div class="menu-category-header"><span>&#12501;&#12449;&#12483;&#12471;&#12519;&#12531;</span><span class="menu-plus">+</span></div>
        <div class="menu-subcategory">
          <a href="product-list.html?category=tops">&#12488;&#12483;&#12503;&#12473;</a>
          <a href="product-list.html?category=bottoms">&#12508;&#12488;&#12512;&#12473;</a>
          <a href="product-list.html?category=outer">&#12450;&#12454;&#12479;&#12540;</a>
          <a href="product-list.html?category=accessories">&#12450;&#12463;&#12475;&#12469;&#12522;&#12540;</a>
          <a href="product-list.html?category=shoes">&#12471;&#12517;&#12540;&#12474;</a>
        </div>
      </div>
      <div class="menu-category">
        <div class="menu-category-header"><span>&#29983;&#27963;&#38613;&#36027;</span><span class="menu-plus">+</span></div>
        <div class="menu-subcategory">
          <a href="product-list.html?category=kitchen">&#12461;&#12483;&#12481;&#12531;&#29992;&#21697;</a>
          <a href="product-list.html?category=interior">&#12452;&#12531;&#12486;&#12522;&#12450;</a>
          <a href="product-list.html?category=bath">&#12496;&#12473;&#12539;&#12488;&#12452;&#12524;</a>
          <a href="product-list.html?category=storage">&#25536;&#32013;&#12539;&#25972;&#29702;</a>
          <a href="product-list.html?category=aroma">&#12450;&#12525;&#12510;&#12539;&#12461;&#12515;&#12531;&#12489;&#12523;</a>
        </div>
      </div>
      <div class="menu-footer-links">
        <a href="store.html">New Arrivals</a>
        <a href="wishlist.html">Wishlist</a>
        <a href="account.html">My Account</a>
        <a href="cart.html">Shopping Bag</a>
      </div>
      <div class="menu-footer-deco">
        <div class="menu-footer-deco-line"></div>
        <p>&#169; 2026 &#26666;&#24335;&#20250;&#31038;HINOKA<br>sun_hua@hinokaglobal.com</p>
      </div>
    </div>
  </aside>

  <!-- 右：ドロワー（アイコンメニュー） -->
  <aside class="right-drawer" id="rightDrawer">
    <div class="side-menu-header" style="position:relative;">
      <div>
        <a href="store.html" class="side-menu-brand">HINOKA</a>
        <div class="side-menu-tagline">Crafted for a calm<br>and beautiful life.</div>
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
      <p>&copy; 2026 HINOKA Co., Ltd.<br>sun_hua@hinokaglobal.com</p>
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
