/**
 * nav.js — HINOKA ナビゲーション完全版
 * 左：ハンバーガー → サイドメニュー（高級ダーク）
 * 右：ハンバーガー → 右ドロワー（スマホのみ）
 * PC：右アイコン個別表示 + hover label
 */
(function () {

  const NAV_HTML = `
  <nav id="main-nav">

    <!-- 左：ハンバーガー + MENU label -->
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

    <!-- 右：PC用アイコン + スマホ用ハンバーガー -->
    <div class="nav-right">

      <!-- PC用：個別アイコン -->
      <button class="nav-icon-btn nav-search" id="searchBtn" aria-label="検索">
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7"/>
          <line x1="16.5" y1="16.5" x2="22" y2="22"/>
        </svg>
        <span class="icon-label">Search</span>
      </button>

      <a class="nav-icon-btn nav-wish" href="wishlist.html" aria-label="ウィッシュリスト">
        <svg viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span class="icon-label">Wishlist</span>
      </a>

      <a class="nav-icon-btn nav-account" href="account.html" aria-label="マイアカウント">
        <svg viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span class="icon-label">Account</span>
      </a>

      <a class="nav-icon-btn" href="cart.html" aria-label="カート" id="cartNavBtn">
        <svg viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <span class="icon-label">Cart</span>
        <span class="cart-badge" id="cartBadge">0</span>
      </a>

      <!-- スマホ用：右ハンバーガー -->
      <button class="nav-more-btn" id="moreBtn" aria-label="メニューを開く">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- オーバーレイ（左右共通） -->
  <div class="menu-overlay" id="menuOverlay"></div>

  <!-- 左：サイドメニュー -->
  <aside class="side-menu" id="sideMenu">
    <div class="side-menu-header">
      <div>
        <div class="side-menu-brand">HINOKA</div>
        <div class="side-menu-tagline">Crafted for a calm<br>and beautiful life.</div>
      </div>
      <button class="close-menu-btn" id="closeMenuBtn">×</button>
    </div>

    <div class="side-menu-body">

      <!-- カテゴリー -->
      <div class="menu-category">
        <div class="menu-category-header">
          <span>ペット用品</span><span class="menu-plus">+</span>
        </div>
        <div class="menu-subcategory">
          <a href="product-list.html?category=dog-food">ドッグフード</a>
          <a href="product-list.html?category=cat-food">キャットフード</a>
          <a href="product-list.html?category=pet-toys">おもちゃ</a>
          <a href="product-list.html?category=pet-bed">ベッド・ハウス</a>
          <a href="product-list.html?category=pet-collar">首輪・リード</a>
        </div>
      </div>

      <div class="menu-category">
        <div class="menu-category-header">
          <span>ファッション</span><span class="menu-plus">+</span>
        </div>
        <div class="menu-subcategory">
          <a href="product-list.html?category=tops">トップス</a>
          <a href="product-list.html?category=bottoms">ボトムス</a>
          <a href="product-list.html?category=outer">アウター</a>
          <a href="product-list.html?category=accessories">アクセサリー</a>
          <a href="product-list.html?category=shoes">シューズ</a>
        </div>
      </div>

      <div class="menu-category">
        <div class="menu-category-header">
          <span>生活雑貨</span><span class="menu-plus">+</span>
        </div>
        <div class="menu-subcategory">
          <a href="product-list.html?category=kitchen">キッチン用品</a>
          <a href="product-list.html?category=interior">インテリア</a>
          <a href="product-list.html?category=bath">バス・トイレ</a>
          <a href="product-list.html?category=storage">収納・整理</a>
          <a href="product-list.html?category=aroma">アロマ・キャンドル</a>
        </div>
      </div>

      <!-- サブリンク -->
      <div class="menu-footer-links">
        <a href="store.html">New Arrivals</a>
        <a href="wishlist.html">Wishlist</a>
        <a href="account.html">My Account</a>
        <a href="cart.html">Shopping Bag</a>
      </div>

      <!-- 最下部装飾 -->
      <div class="menu-footer-deco">
        <div class="menu-footer-deco-line"></div>
        <p>© 2026 株式会社HINOKA<br>sun_hua@hinokaglobal.com</p>
      </div>

    </div>
  </aside>

  <!-- 右：ドロワー（スマホ用） -->
  <aside class="right-drawer" id="rightDrawer">
    <div class="right-drawer-header">
      <span class="right-drawer-logo">HINOKA</span>
      <button class="right-drawer-close" id="closeDrawerBtn">×</button>
    </div>
    <div class="right-drawer-body">
      <button class="right-drawer-item" id="drawerSearchBtn">
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7"/>
          <line x1="16.5" y1="16.5" x2="22" y2="22"/>
        </svg>
        Search
      </button>
      <a class="right-drawer-item" href="wishlist.html">
        <svg viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        Wishlist
      </a>
      <a class="right-drawer-item" href="account.html">
        <svg viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        Account
      </a>
      <a class="right-drawer-item" href="cart.html">
        <svg viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        Shopping Bag
        <span class="drawer-badge" id="drawerCartBadge">0</span>
      </a>
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

  <!-- カートトースト -->
  <div class="cart-toast" id="cartToast"></div>
  `;

  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);

  // ══ スクロール連動 ══════════════════════════════════════
  const nav = document.getElementById('main-nav');
  let lastY = 0, scrollTimer = null;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    clearTimeout(scrollTimer);
    if (y > lastY && y > 80) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    scrollTimer = setTimeout(() => nav.classList.remove('hidden'), 1000);
    lastY = y;
  }, { passive: true });

  // ══ オーバーレイ ════════════════════════════════════════
  const overlay = document.getElementById('menuOverlay');

  function closeAll() {
    closeSideMenu();
    closeRightDrawer();
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  overlay.addEventListener('click', closeAll);

  // ══ 左：サイドメニュー ══════════════════════════════════
  const sideMenu = document.getElementById('sideMenu');

  function openSideMenu() {
    sideMenu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeSideMenu() {
    sideMenu.classList.remove('open');
  }

  document.getElementById('hamburgerBtn').addEventListener('click', openSideMenu);
  document.getElementById('closeMenuBtn').addEventListener('click', closeAll);

  // アコーディオン
  document.querySelectorAll('.menu-category-header').forEach(h => {
    h.addEventListener('click', () => {
      const cat    = h.parentElement;
      const isOpen = cat.classList.contains('open');
      document.querySelectorAll('.menu-category').forEach(c => c.classList.remove('open'));
      if (!isOpen) cat.classList.add('open');
    });
  });

  // ══ 右：ドロワー（スマホ） ══════════════════════════════
  const rightDrawer = document.getElementById('rightDrawer');

  function openRightDrawer() {
    rightDrawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeRightDrawer() {
    rightDrawer.classList.remove('open');
  }

  document.getElementById('moreBtn').addEventListener('click', openRightDrawer);
  document.getElementById('closeDrawerBtn').addEventListener('click', closeAll);

  // ドロワー内検索
  document.getElementById('drawerSearchBtn').addEventListener('click', () => {
    closeAll();
    setTimeout(openSearch, 200);
  });

  // ══ 検索モーダル ════════════════════════════════════════
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');

  function openSearch() {
    searchModal.classList.add('open');
    setTimeout(() => searchInput.focus(), 100);
  }
  function closeSearch() { searchModal.classList.remove('open'); }

  document.getElementById('searchBtn')?.addEventListener('click', openSearch);
  document.getElementById('closeSearchBtn').addEventListener('click', closeSearch);
  searchModal.addEventListener('click', e => {
    if (e.target === searchModal) closeSearch();
  });
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && searchInput.value.trim()) {
      location.href = `product-list.html?q=${encodeURIComponent(searchInput.value.trim())}`;
    }
    if (e.key === 'Escape') closeSearch();
  });

  // ══ カートバッジ ════════════════════════════════════════
  function updateCartBadge() {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const total = items.reduce((s, i) => s + (i.qty || 1), 0);

    const badge = document.getElementById('cartBadge');
    if (badge) {
      badge.textContent = total;
      badge.classList.toggle('visible', total > 0);
    }

    const drawerBadge = document.getElementById('drawerCartBadge');
    if (drawerBadge) {
      drawerBadge.textContent = total;
      drawerBadge.classList.toggle('visible', total > 0);
    }
  }
  updateCartBadge();
  window.addEventListener('cartUpdated', updateCartBadge);

  // ══ カートトースト ══════════════════════════════════════
  window.showCartToast = function () {
    const t = document.getElementById('cartToast');
    t.innerHTML = `ショッピングバッグに追加しました。
      <a href="cart.html">バッグを表示</a> または
      <a href="checkout.html">お会計へ</a>`;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 5000);
    updateCartBadge();
  };

  // ══ ESC ════════════════════════════════════════════════
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeAll(); closeSearch(); }
  });

})();
