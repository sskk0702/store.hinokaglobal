/**
 * nav.js — HINOKA 共通ナビゲーション v2
 */
(function () {

  const NAV_HTML = `
  <nav id="main-nav" role="navigation" aria-label="メインナビゲーション">
    <div class="nav-left">
      <button class="hamburger-btn" id="hamburgerBtn" aria-label="メニューを開く">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-center">
      <a href="store.html" class="nav-logo">HINOKA</a>
    </div>
    <div class="nav-right">
      <button class="nav-icon-btn" id="searchBtn" aria-label="検索">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>
      </button>
      <a class="nav-icon-btn" href="wishlist.html" aria-label="ウィッシュリスト">
        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </a>
      <a class="nav-icon-btn" href="account.html" aria-label="マイアカウント">
        <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </a>
      <a class="nav-icon-btn" href="cart.html" aria-label="カート" id="cartNavBtn" style="position:relative;">
        <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span class="cart-badge" id="cartBadge">0</span>
      </a>
    </div>
  </nav>

  <div class="menu-overlay" id="menuOverlay"></div>

  <aside class="side-menu" id="sideMenu">
    <div class="side-menu-header">
      <span class="side-menu-logo">HINOKA</span>
      <button class="close-menu-btn" id="closeMenuBtn">×</button>
    </div>

    <div class="side-menu-body">
      <!-- カテゴリー -->
      <div class="menu-category" data-cat="pet">
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
      <div class="menu-category" data-cat="fashion">
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
      <div class="menu-category" data-cat="daily">
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

      <!-- メニュー下部コンテンツ -->
      <div class="menu-footer-links">
        <a href="store.html">✦ 新着商品</a>
        <a href="product-list.html?category=sale">✦ セール</a>
        <a href="wishlist.html">✦ ウィッシュリスト</a>
        <a href="account.html">✦ マイアカウント</a>
      </div>

<div class="menu-footer-info dior-footer">
  <span class="dior-footer-title">HINOKA</span>
  <span class="dior-footer-sub">Crafted for a calm and beautiful life.</span>
</div>
  </aside>

  <!-- 検索モーダル -->
  <div class="search-modal" id="searchModal">
    <button class="search-modal-close" id="closeSearchBtn">×</button>
    <div class="search-modal-inner">
      <p style="font-family:'Cormorant Garamond',serif;font-size:13px;letter-spacing:0.2em;margin-bottom:20px;opacity:0.5;">SEARCH</p>
      <input type="text" id="searchInput" placeholder="キーワードを入力してください">
    </div>
  </div>

  <div class="cart-toast" id="cartToast"></div>
  `;

  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);

  // ── スクロール連動 ──────────────────────────
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

  // ── メニュー開閉 ───────────────────────────
  const sideMenu    = document.getElementById('sideMenu');
  const overlay     = document.getElementById('menuOverlay');
  const openBtn     = document.getElementById('hamburgerBtn');
  const closeBtn    = document.getElementById('closeMenuBtn');

  function openMenu()  { sideMenu.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { sideMenu.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  // アコーディオン
  document.querySelectorAll('.menu-category-header').forEach(h => {
    h.addEventListener('click', () => {
      const cat = h.parentElement;
      const isOpen = cat.classList.contains('open');
      document.querySelectorAll('.menu-category').forEach(c => c.classList.remove('open'));
      if (!isOpen) cat.classList.add('open');
    });
  });

  // ── 検索モーダル ──────────────────────────
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');

  document.getElementById('searchBtn').addEventListener('click', () => {
    searchModal.classList.add('open');
    setTimeout(() => searchInput.focus(), 100);
  });
  document.getElementById('closeSearchBtn').addEventListener('click', () => searchModal.classList.remove('open'));
  searchModal.addEventListener('click', e => { if (e.target === searchModal) searchModal.classList.remove('open'); });
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && searchInput.value.trim()) {
      location.href = `product-list.html?q=${encodeURIComponent(searchInput.value.trim())}`;
    }
    if (e.key === 'Escape') searchModal.classList.remove('open');
  });

  // ── カートバッジ ──────────────────────────
  function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const total = items.reduce((s, i) => s + (i.qty || 1), 0);
    badge.textContent = total;
    badge.classList.toggle('visible', total > 0);
  }
  updateCartBadge();
  window.addEventListener('cartUpdated', updateCartBadge);

  // ── カートトースト ─────────────────────────
  window.showCartToast = function () {
    const t = document.getElementById('cartToast');
    t.innerHTML = `このクリエイションをショッピングバッグに追加しました。
      <a href="cart.html">ショッピングバッグを表示</a>、または
      <a href="checkout.html">お会計</a>に移動`;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 5000);
    updateCartBadge();
  };

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeMenu(); searchModal.classList.remove('open'); }
  });

})();
