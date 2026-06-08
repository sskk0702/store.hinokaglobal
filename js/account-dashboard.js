(function () {
  var auth = firebase.auth();
  var db = firebase.firestore();

  // inject styles
  (function () {
    var s = document.createElement('style');
    s.textContent = [
      /* ── タイトル書式 ── */
      '.view-title{font-size:15px!important;letter-spacing:.12em;display:flex;align-items:baseline;gap:6px;flex-wrap:wrap;font-family:"Cormorant Garamond",serif;font-weight:600;color:#111;}',
      '.title-ja-prefix{font-size:15px;letter-spacing:.12em;color:var(--muted);font-family:"Cormorant Garamond",serif;font-weight:600;}',
      /* ── ナビ二言語 ── */
      '.nav-en{display:block;font-size:8px;letter-spacing:.12em;color:var(--muted);font-weight:300;margin-top:1px;line-height:1;}',
      '.nav-btn.active .nav-en{color:rgba(255,255,255,.5);}',
      /* ── ヘッダーアクションボタン ── */
      '.view-action-btn,.view-action-link{font-size:11px;letter-spacing:.08em;color:#8b6f47;background:none;border:none;border-bottom:1px solid rgba(139,111,71,.35);padding:2px 0;cursor:pointer;text-decoration:none;transition:color .2s,border-color .2s;white-space:nowrap;}',
      '.view-action-btn:hover,.view-action-link:hover{color:#111;border-color:#111;}',
      '.add-action-btn{font-size:11px;letter-spacing:.1em;color:#fff;background:linear-gradient(135deg,#8b6f47,#c9a96e);border:none;padding:9px 18px;border-radius:6px;cursor:pointer;box-shadow:0 4px 12px rgba(139,111,71,.25);transition:transform .2s,box-shadow .2s;}',
      '.add-action-btn:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(139,111,71,.35);}',
      /* ── 会員特典カード 3D ── */
      '.member-benefit-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;}',
      '.mbc{background:linear-gradient(145deg,#fdf8f3,#f0e6d6);border-radius:14px;padding:18px 12px;text-align:center;color:#3d2c1e;box-shadow:0 4px 16px rgba(139,111,71,.1),inset 0 1px 0 rgba(255,255,255,.9);border:1px solid rgba(201,169,110,.18);transition:transform .2s,box-shadow .2s;}',
      '.mbc:hover{transform:translateY(-4px);box-shadow:0 10px 28px rgba(139,111,71,.18);}',
      '.mbc-icon{font-size:20px;margin-bottom:8px;color:#8b6f47;}',
      '.mbc-label{font-size:9px;letter-spacing:.14em;color:#a08060;margin-bottom:6px;}',
      '.mbc-val{font-family:"Cormorant Garamond",serif;font-size:28px;color:#6b4f2e;line-height:1;}',
      '.mbc-sub{font-size:9px;color:#b09070;margin-top:5px;}',
      /* ── ランク表 premium ── */
      '.rank-table-wrap{border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.08);}',
      '.rank-table-wrap table{width:100%;border-collapse:collapse;font-size:11px;}',
      '.rank-table-wrap thead tr{background:linear-gradient(90deg,#1e293b,#0f2040);}',
      '.rank-table-wrap th{padding:12px 10px;color:#c9a96e;font-weight:500;letter-spacing:.1em;font-size:10px;}',
      '.rank-table-wrap td{padding:10px;border-bottom:1px solid var(--line);}',
      '.rank-table-wrap tr.current-rank{background:linear-gradient(90deg,rgba(139,111,71,.07),rgba(201,169,110,.04));}',
      /* ── サービスCTAボタン ── */
      '.service-cta-link{display:inline-block;padding:11px 22px;margin-top:10px;background:linear-gradient(135deg,#8b6f47,#c9a96e);color:#fff!important;font-size:11px;letter-spacing:.1em;text-decoration:none;border-radius:6px;box-shadow:0 4px 12px rgba(139,111,71,.3);transition:transform .2s,box-shadow .2s;}',
      '.service-cta-link:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(139,111,71,.4);}',
      '.service-card-v2{background:#fff;border:1px solid var(--line);border-radius:14px;padding:22px;display:flex;flex-direction:column;gap:6px;transition:transform .2s,box-shadow .2s;box-shadow:0 2px 8px rgba(0,0,0,.04);}',
      '.service-card-v2:hover{transform:translateY(-4px);box-shadow:0 12px 28px rgba(0,0,0,.09);}',
      '.service-icon-lg{font-size:30px;margin-bottom:2px;}',
      '.service-card-v2 h3{font-family:"Cormorant Garamond",serif;font-size:17px;font-weight:400;letter-spacing:.06em;margin:0;}',
      '.service-card-v2 p{font-size:11px;color:var(--muted);line-height:1.8;flex:1;}',
      /* ── ヒーローカード ── */
      '.overview-hero{background:linear-gradient(135deg,#111827 0%,#1e293b 45%,#0f2040 100%);border-radius:20px;padding:28px 32px;position:relative;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,.45),0 8px 24px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.08);margin-bottom:24px;color:#fff;}',
      '.overview-hero::before{content:"";position:absolute;top:-60px;right:-60px;width:240px;height:240px;border-radius:50%;background:rgba(255,255,255,.03);pointer-events:none;}',
      '.overview-hero::after{content:"";position:absolute;bottom:-80px;left:-30px;width:280px;height:280px;border-radius:50%;background:rgba(139,111,71,.07);pointer-events:none;}',
      '.hero-profile{display:flex;align-items:center;gap:20px;margin-bottom:24px;}',
      '.hero-avatar-ring{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:"Cormorant Garamond",serif;font-size:26px;font-weight:700;color:#fff;box-shadow:0 4px 16px rgba(139,111,71,.45);flex-shrink:0;}',
      '.hero-info{flex:1;}',
      '.hero-info-sub{font-size:10px;letter-spacing:.2em;color:rgba(255,255,255,.45);margin-bottom:4px;}',
      '.hero-info-name{font-family:"Cormorant Garamond",serif;font-size:22px;color:#fff;line-height:1.2;}',
      '.hero-info-rank{font-size:10px;letter-spacing:.15em;color:#c9a96e;margin-top:4px;}',
      '.hero-logo-area{text-align:right;}',
      '.hero-logo-area span:first-child{display:block;font-size:8px;letter-spacing:.25em;color:rgba(255,255,255,.35);}',
      '.hero-logo-area span:last-child{font-family:"Cormorant Garamond",serif;font-size:13px;color:rgba(255,255,255,.55);}',
      '.hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}',
      '.hero-stat{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:16px;text-align:center;backdrop-filter:blur(8px);cursor:pointer;transition:background .2s,border-color .2s;}',
      '.hero-stat:hover{background:rgba(255,255,255,.13);border-color:rgba(201,169,110,.4);}',
      '.hero-stat-num{font-family:"Cormorant Garamond",serif;font-size:26px;color:#c9a96e;line-height:1;}',
      '.hero-stat-label{font-size:9px;letter-spacing:.15em;color:rgba(255,255,255,.45);margin-top:6px;}',
      '.quick-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:20px;}',
      '.quick-card{background:linear-gradient(145deg,#fdf8f3,#f0e6d6);border:1px solid rgba(201,169,110,.18);border-radius:14px;padding:16px 8px;text-align:center;cursor:pointer;transition:all .2s;box-shadow:0 4px 16px rgba(139,111,71,.1),inset 0 1px 0 rgba(255,255,255,.9);}',
      '.quick-card:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(139,111,71,.18),inset 0 1px 0 rgba(255,255,255,.9);border-color:#c9a96e;}',
      '.quick-icon{font-size:22px;margin-bottom:6px;}',
      '.quick-label{font-size:9px;color:var(--muted);letter-spacing:.05em;margin-bottom:4px;}',
      '.quick-count{font-family:"Cormorant Garamond",serif;font-size:22px;color:#111;font-weight:600;}',
      /* ── データカード数値 小さく ── */
      '.data-value{font-family:"Cormorant Garamond",serif;font-size:22px!important;line-height:1;}',
      '.data-label{color:var(--muted);font-size:10px;letter-spacing:.1em;margin-top:5px;}'
    ].join('');
    document.head.appendChild(s);
  })();

  // ── 認証セキュリティ定数 ─────────────────────────────────────
  var SESSION_TIMEOUT_MS = 2 * 60 * 60 * 1000;
  var MAX_LOGIN_AGE_MS   = 30 * 24 * 60 * 60 * 1000;
  var TS_LOGIN_KEY       = '_hinoka_login_ts';
  var TS_ACTIVE_KEY      = '_hinoka_last_active';
  var DEVICE_ID_KEY      = '_hinoka_device_id';

  function getDeviceId() {
    var id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) { id = 'dev-' + Math.random().toString(36).substr(2,9) + '-' + Date.now(); localStorage.setItem(DEVICE_ID_KEY, id); }
    return id;
  }
  function getKnownDevices(uid) { return getLS('_hinoka_known_' + uid, []); }
  function isKnownDevice(uid)   { return getKnownDevices(uid).indexOf(getDeviceId()) !== -1; }
  function registerDevice(uid)  { var list = getKnownDevices(uid); var dev = getDeviceId(); if (list.indexOf(dev) === -1) { list.push(dev); setLS('_hinoka_known_' + uid, list); } }

  var _lastActivityWrite = 0;
  function touchActivity() {
    var now = Date.now();
    if (now - _lastActivityWrite > 30000) { _lastActivityWrite = now; try { localStorage.setItem(TS_ACTIVE_KEY, now.toString()); } catch(e) {} }
  }
  ['mousemove','keydown','touchstart','scroll'].forEach(function(evt) {
    window.addEventListener(evt, touchActivity, { passive: true });
  });

  function checkExpiry() {
    var loginTs = parseInt(localStorage.getItem(TS_LOGIN_KEY) || '0', 10);
    if (loginTs && Date.now() - loginTs > MAX_LOGIN_AGE_MS) { auth.signOut(); return true; }
    var active = parseInt(localStorage.getItem(TS_ACTIVE_KEY) || '0', 10);
    if (active && Date.now() - active > SESSION_TIMEOUT_MS) {
      auth.signOut(); showToast('セッションが期限切れになりました。再度ログインしてください。'); return true;
    }
    return false;
  }
  setInterval(function() { if (auth.currentUser) checkExpiry(); }, 5 * 60 * 1000);

  // ── クーポン有効期限ユーティリティ ──────────────────────────────
  function parseCouponExpiry(c) {
    if (c.expiryTs) return c.expiryTs;
    var m = (c.date || '').match(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3], 23, 59, 59).getTime();
    return 0;
  }
  function isCouponExpired(c) { var ts = parseCouponExpiry(c); return ts > 0 && Date.now() > ts; }
  function couponDaysLeft(c) {
    var ts = parseCouponExpiry(c);
    if (!ts) return null;
    return Math.ceil((ts - Date.now()) / 86400000);
  }

  // ── クーポン付与（重複防止付き）────────────────────────────────
  function grantCoupon(coupon) {
    var stored = getLS('hinoka_coupons', []);
    if (stored.some(function(x){ return x.id === coupon.id; })) return;
    stored.push(coupon);
    setLS('hinoka_coupons', stored);
    window.dispatchEvent(new Event('couponUpdated'));
  }

  // ── 初回購入特典クーポン ────────────────────────────────────────
  function grantFirstPurchaseCoupon() {
    var orders = getLS('hinoka_orders', []);
    var done = orders.filter(function(o){ return ['done','review'].indexOf(o.status) !== -1; });
    if (done.length !== 1) return; // 初回のみ
    var exp = new Date(); exp.setDate(exp.getDate() + 30);
    var expStr = exp.getFullYear() + '/' + (exp.getMonth()+1) + '/' + exp.getDate();
    grantCoupon({ id:'FP-FIRST', amount:'¥500', title:'🎁 初回購入ありがとうクーポン ¥500OFF',
      rule:'3,000円以上のご注文で利用可能', date:'有効期限：'+expStr,
      expiryTs:exp.getTime(), used:false, claimed:true, monthKey:null });
    setTimeout(function(){ showToast('🎁 初回購入クーポン ¥500OFFを獲得しました！'); }, 500);
  }

  // ── レビュー投稿特典クーポン ────────────────────────────────────
  function grantReviewCoupon() {
    var exp = new Date(); exp.setDate(exp.getDate() + 14);
    var expStr = exp.getFullYear() + '/' + (exp.getMonth()+1) + '/' + exp.getDate();
    var id = 'RV-' + Date.now();
    grantCoupon({ id:id, amount:'¥100', title:'⭐ レビュー投稿特典 ¥100OFF',
      rule:'1,000円以上のご注文で利用可能', date:'有効期限：'+expStr,
      expiryTs:exp.getTime(), used:false, claimed:true, monthKey:null });
  }

  // ── ランクアップ記念クーポン ────────────────────────────────────
  function checkRankUpgradeCoupon() {
    var spend = calcTotalSpend();
    var rank  = getMemberRank(spend);
    var prevRank = localStorage.getItem('_hinoka_last_rank') || 'BRONZE';
    if (rank.name === prevRank) return;
    localStorage.setItem('_hinoka_last_rank', rank.name);
    var idx = { BRONZE:0, SILVER:1, GOLD:2, DIAMOND:3 };
    if ((idx[rank.name]||0) <= (idx[prevRank]||0)) return;
    var disc = { SILVER:'10%', GOLD:'15%', DIAMOND:'20%' }[rank.name];
    if (!disc) return;
    var exp = new Date(); exp.setDate(exp.getDate() + 7);
    var expStr = exp.getFullYear() + '/' + (exp.getMonth()+1) + '/' + exp.getDate();
    grantCoupon({ id:'RU-'+rank.name+'-'+Date.now(), amount:disc,
      title:'🏆 ランクアップ記念クーポン '+disc+'OFF',
      rule:'全商品対象・'+rank.label+'ランク昇格記念', date:'有効期限：'+expStr,
      expiryTs:exp.getTime(), used:false, claimed:true, monthKey:null });
    setTimeout(function(){ showToast('🏆 '+rank.label+'ランクに昇格！記念クーポンを獲得しました！'); }, 800);
  }

  function showNewDeviceModal(user) {
    if (user.sendEmailVerification) user.sendEmailVerification().catch(function(){});
    var div = document.createElement('div');
    div.className = 'modal-mask show';
    div.innerHTML =
      '<div class="modal" style="text-align:center;max-width:420px;padding:40px 32px;">' +
        '<div style="font-size:48px;margin-bottom:16px;">🔐</div>' +
        '<h3 style="font-family:\'Cormorant Garamond\',serif;font-size:22px;font-weight:500;margin-bottom:12px;color:#1a1208;">新しいデバイスを検出しました</h3>' +
        '<p style="font-size:12px;color:#666;line-height:2;margin-bottom:8px;"><strong>' + esc(user.email) + '</strong> に確認メールを送信しました。<br>メール内のリンクをクリックして本人確認を完了し、<br>再度ログインしてください。</p>' +
        '<p style="font-size:11px;color:#999;margin-bottom:24px;">メールが届かない場合は迷惑メールフォルダをご確認ください。</p>' +
        '<button id="newDevResendBtn" style="background:linear-gradient(135deg,#8b6f47,#c9a96e);border:none;color:#fff;padding:12px 32px;border-radius:8px;font-size:12px;letter-spacing:.1em;cursor:pointer;font-family:inherit;margin-bottom:12px;width:100%;">確認メールを再送信する</button><br>' +
        '<button id="newDevCloseBtn" style="background:none;border:none;color:#999;font-size:11px;cursor:pointer;font-family:inherit;">閉じる（再ログインへ）</button>' +
      '</div>';
    document.body.appendChild(div);
    document.getElementById('newDevResendBtn').addEventListener('click', function() {
      auth.currentUser && auth.currentUser.sendEmailVerification().then(function(){ showToast('確認メールを再送信しました'); }).catch(function(){ showToast('送信に失敗しました'); });
    });
    var closeModal = function() { div.remove(); auth.signOut(); };
    document.getElementById('newDevCloseBtn').addEventListener('click', closeModal);
    div.addEventListener('click', function(e) { if (e.target === div) closeModal(); });
  }

  var state = {
    user: null,
    activeView: location.hash ? location.hash.replace('#', '') : 'overview',
    orderFilter: 'all',
    assetFilter: 'coupons',
    reviewFilter: 'pending',
    messageFilter: 'all',
    editingAddressId: null
  };

  var NAV_ICONS = {
    overview:  '<svg viewBox="0 0 20 20"><rect x="2" y="2" width="7" height="7"/><rect x="11" y="2" width="7" height="7"/><rect x="2" y="11" width="7" height="7"/><rect x="11" y="11" width="7" height="7"/></svg>',
    orders:    '<svg viewBox="0 0 20 20"><path d="M3 4h14l-1.5 9H4.5z"/><circle cx="7.5" cy="16" r="1.2"/><circle cx="13.5" cy="16" r="1.2"/><path d="M1 2h2l.5 2"/></svg>',
    assets:    '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/><path d="M10 6v2m0 4v2M7 10h1.5a1.5 1.5 0 000-3H10m0 3h1.5a1.5 1.5 0 010 3H10"/></svg>',
    wishlist:  '<svg viewBox="0 0 20 20"><path d="M10 16.5S2 12 2 6.5A4 4 0 0110 5a4 4 0 018 1.5C18 12 10 16.5 10 16.5z"/></svg>',
    history:   '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/><path d="M10 5v5l3 3"/></svg>',
    cart:      '<svg viewBox="0 0 20 20"><path d="M3 5h14l-2 8H5z"/><circle cx="7" cy="17" r="1.3"/><circle cx="14" cy="17" r="1.3"/></svg>',
    addresses: '<svg viewBox="0 0 20 20"><path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z"/><circle cx="10" cy="8" r="2"/></svg>',
    reviews:   '<svg viewBox="0 0 20 20"><path d="M10 2l2.4 5 5.6.8-4 3.9.9 5.5L10 14.7l-4.9 2.5.9-5.5L2 7.8l5.6-.8z"/></svg>',
    messages:  '<svg viewBox="0 0 20 20"><path d="M2 4h16v10H2z"/><path d="M2 4l8 6 8-6"/></svg>',
    member:    '<svg viewBox="0 0 20 20"><path d="M10 2a4 4 0 100 8 4 4 0 000-8zM3 17c0-3.3 3.1-6 7-6s7 2.7 7 6"/></svg>',
    service:   '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/><path d="M10 9a1.5 1.5 0 011.5 1.5V14M10 7V6"/></svg>',
    settings:  '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="3"/><path d="M10 2v2m0 12v2M2 10h2m12 0h2m-2.9-5.1-1.4 1.4M7.3 12.7l-1.4 1.4m0-8.2 1.4 1.4m5.4 5.4 1.4 1.4"/></svg>'
  };

  var navItems = [
    { id: 'overview',   label: 'ホーム',               en: 'HOME' },
    { id: 'orders',     label: 'ご注文履歴',            en: 'ORDERS',    countKey: 'ordersTodo' },
    { id: 'assets',     label: 'クーポン・ポイント',    en: 'ASSETS' },
    { id: 'wishlist',   label: 'お気に入り',            en: 'WISHLIST',  countKey: 'wishlist' },
    { id: 'history',    label: '閲覧履歴',              en: 'HISTORY' },
    { id: 'cart',       label: 'ショッピングバッグ',    en: 'CART',      countKey: 'cart' },
    { id: 'addresses',  label: 'お届け先住所',          en: 'ADDRESS' },
    { id: 'reviews',    label: 'レビュー管理',          en: 'REVIEWS',   countKey: 'reviews' },
    { id: 'messages',   label: 'メッセージ',            en: 'MESSAGES',  countKey: 'messages' },
    { id: 'member',     label: '会員ランク',            en: 'MEMBER' },
    { id: 'service',    label: 'カスタマーサポート',    en: 'SUPPORT' },
    { id: 'settings',   label: 'アカウント設定',        en: 'SETTINGS' }
  ];

  var orderTabs = [
    ['all',    'すべて'],
    ['pay',    'お支払い待ち'],
    ['ship',   '発送待ち'],
    ['receive','受け取り待ち'],
    ['review', 'レビュー待ち'],
    ['done',   '完了'],
    ['cancel', 'キャンセル'],
    ['refund', '返品・返金']
  ];

  var assetTabs = [
    ['coupons', 'クーポン'],
    ['points',  'ポイント'],
    ['balance', '残高']
  ];

  var messageTabs = [
    ['all',       'すべて'],
    ['order',     '注文'],
    ['logistics', '配送'],
    ['promo',     'キャンペーン'],
    ['system',    'お知らせ']
  ];

  // ══════════════════════════════════
  //  ユーティリティ
  // ══════════════════════════════════
  function yen(n) { return '¥' + Number(n || 0).toLocaleString('ja-JP'); }
  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c];
    });
  }
  function getLS(key, fallback) {
    try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
    catch (e) { return fallback; }
  }
  function setLS(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  function normalizeStatus(order) {
    if (order.status) return order.status;
    if (order.paymentMethod && order.paymentMethod.indexOf('銀行振込') !== -1) return 'pay';
    return 'done';
  }

  function statusText(status) {
    return ({
      pay:     'お支払い待ち',
      ship:    '発送待ち',
      receive: '受け取り待ち',
      review:  'レビュー待ち',
      done:    '完了',
      cancel:  'キャンセル',
      refund:  '返品・返金'
    })[status] || '受付済み';
  }

  // ══════════════════════════════════
  //  データ取得（実データのみ）
  // ══════════════════════════════════
  function getOrders() {
    var local = getLS('hinoka_orders', []);
    if (!local.length) return [];
    return local.map(function (o, i) {
      var status = normalizeStatus(o);
      return {
        id: o.ref || o.id || ('HKLOCAL' + i),
        date: o.date || '',
        status: status,
        statusText: o.statusText || statusText(status),
        paymentMethod: o.paymentMethod || '',
        total: o.total || 0,
        trackingNumber: o.trackingNumber || '',
        carrier: o.carrier || '',
        items: (o.items || []).map(function (item) {
          return {
            id: item.id,
            name: item.name,
            spec: [item.color, item.size].filter(Boolean).join(' / '),
            price: item.price,
            qty: item.qty || 1,
            img: item.img || 'assets/images/placeholder.jpg'
          };
        })
      };
    }).reverse();
  }

  function getWishlistProducts() {
    var ids = getLS('hinoka_wishlist', []);
    var products = window.HINOKA_PRODUCTS || [];
    if (ids.length && products.length) {
      return ids.map(function (id) { return products.find(function (p) { return p.id === id; }); }).filter(Boolean).map(function (p) {
        return { id: p.id, name: p.name, price: p.price, oldPrice: p.oldPrice || null, img: (p.images && p.images[0]) || p.mainImg || 'assets/images/placeholder.jpg', stock: '在庫あり' };
      });
    }
    return [];
  }

  function getCartItems() { return getLS('cartItems', []); }
  function getAddresses() { return getLS('hinoka_addresses', []); }
  function getMessages()  { return getLS('hinoka_messages', []); }

  function getReviews() {
    var stored = getLS('hinoka_reviews', []);
    var orders = getLS('hinoka_orders', []);
    var reviewIds = stored.map(function (r) { return r.id; });
    orders.forEach(function (o) {
      if (o.status !== 'review') return;
      (o.items || []).forEach(function (item, i) {
        var rid = 'rev-' + (o.ref || o.id) + '-' + i;
        if (reviewIds.indexOf(rid) !== -1) return;
        stored.push({ id: rid, orderId: o.ref || o.id, status: 'pending', product: item.name || item.id, rating: 0, body: '', hasPhoto: false });
        reviewIds.push(rid);
      });
    });
    return stored;
  }

  function getHistory() { return getLS('hinoka_browsing_history', []); }

  // ══════════════════════════════════
  //  ログイン記録
  // ══════════════════════════════════
  function recordLogin() {
    var logs = getLS('hinoka_login_log', []);
    logs.unshift({ time: new Date().toLocaleString('ja-JP'), ua: navigator.userAgent.substring(0, 80) });
    if (logs.length > 1) logs = logs.slice(0, 1);
    setLS('hinoka_login_log', logs);
  }

  // ══════════════════════════════════
  //  UI ヘルパー
  // ══════════════════════════════════
  function showToast(text) {
    var el = document.getElementById('toast');
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(function () { el.classList.remove('show'); }, 2200);
  }
  function showError(id, text) { var el = document.getElementById(id); if (!el) return; el.textContent = text; el.style.display = 'block'; }
  function showSuccess(id, text) { var el = document.getElementById(id); if (!el) return; el.textContent = text; el.style.display = 'block'; }
  function hideMsg(id) { var el = document.getElementById(id); if (!el) return; el.style.display = 'none'; el.textContent = ''; }
  function setLoading(btnId, loading) {
    var btn = document.getElementById(btnId);
    if (!btn) return;
    if (loading) { btn.dataset.originalText = btn.textContent; btn.textContent = '処理中...'; btn.disabled = true; }
    else { btn.textContent = btn.dataset.originalText || btn.textContent; btn.disabled = false; }
  }
  function authError(code) {
    return ({
      'auth/user-not-found':             'アカウントが見つかりません。',
      'auth/wrong-password':             'パスワードが正しくありません。',
      'auth/invalid-login-credentials':  'メールアドレスまたはパスワードが正しくありません。',
      'auth/email-already-in-use':       'このメールアドレスはすでに登録されています。',
      'auth/weak-password':              'パスワードは8文字以上で設定してください。',
      'auth/invalid-email':              'メールアドレスの形式が正しくありません。',
      'auth/too-many-requests':          'しばらく時間をおいてから再度お試しください。'
    })[code] || 'エラーが発生しました。もう一度お試しください。';
  }

  function counts() {
    var orders = getOrders();
    return {
      ordersTodo: orders.filter(function (o) { return ['pay','ship','receive','review','refund'].indexOf(o.status) !== -1; }).length,
      wishlist:   getWishlistProducts().length,
      cart:       getCartItems().reduce(function (s, i) { return s + Number(i.qty || 1); }, 0),
      reviews:    getReviews().filter(function (r) { return r.status === 'pending'; }).length,
      messages:   getMessages().filter(function (m) { return m.unread; }).length
    };
  }

  function buildNavigation() {
    var c = counts();
    var html = navItems.map(function (item) {
      var badge = item.countKey && c[item.countKey] ? '<span class="nav-count">' + c[item.countKey] + '</span>' : '';
      var icon  = NAV_ICONS[item.id] ? '<span class="nav-icon">' + NAV_ICONS[item.id] + '</span>' : '';
      var enSpan = item.en ? '<span class="nav-en">' + item.en + '</span>' : '';
      return '<button class="nav-btn" type="button" data-view="' + item.id + '">' + icon + '<span class="nav-label">' + item.label + enSpan + '</span>' + badge + '</button>';
    }).join('');
    document.getElementById('sideNav').innerHTML   = html;
    document.getElementById('mobileNav').innerHTML = html;
    document.querySelectorAll('.nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { switchView(btn.dataset.view); });
    });
  }

  function switchView(viewId) {
    state.activeView = viewId;
    try { history.replaceState(null, '', '#' + viewId); } catch(e) {}
    document.querySelectorAll('.view-panel').forEach(function (p) { p.classList.toggle('active', p.id === 'view-' + viewId); });
    document.querySelectorAll('.nav-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.view === viewId); });
    renderCurrentView();
    window.scrollTo(0, 0);
  }

  function renderUser(user) {
    var name    = user.displayName || (user.email ? user.email.split('@')[0] : 'HINOKA MEMBER');
    var photo   = user.photoURL || '';
    var initial = (name || 'H').charAt(0).toUpperCase();
    document.getElementById('sideAvatar').innerHTML = photo ? '<img src="' + esc(photo) + '" alt="">' : esc(initial);
    document.getElementById('sideName').textContent  = name;
    document.getElementById('sideEmail').textContent = user.email || '';

    // Update rank chip if it exists
    var chip = document.getElementById('sideRankChip');
    if (chip) {
      var rank = getMemberRank(calcTotalSpend());
      var rankColors = { BRONZE: '#cd7f32', SILVER: '#9e9e9e', GOLD: '#8b6f47', DIAMOND: '#6b8cae' };
      chip.textContent = rank.label.toUpperCase() + ' MEMBER';
      chip.style.color = rankColors[rank.name] || '#8b6f47';
      chip.style.borderColor = rankColors[rank.name] || '#8b6f47';
    }
  }

  function biHead(en, ja) {
    return '<span class="title-ja-prefix">（' + ja + '）</span>' + en;
  }

  function head(title, desc, action) {
    return '<div class="view-head">' + (action ? '<div class="view-head-action">' + action + '</div>' : '') + (desc ? '<p class="view-desc" style="margin:0;">' + desc + '</p>' : '') + '</div>';
  }

  // ══════════════════════════════════
  //  ポイント・会員ランク ヘルパー
  // ══════════════════════════════════
  var RANK_TABLE = [
    { name: 'BRONZE',  label: 'ブロンズ', min: 0,       max: 9999,    rate: 1.0, discount: 0,  freeShip: 0 },
    { name: 'SILVER',  label: 'シルバー', min: 10000,   max: 49999,   rate: 1.2, discount: 3,  freeShip: 2 },
    { name: 'GOLD',    label: 'ゴールド', min: 50000,   max: 149999,  rate: 1.5, discount: 5,  freeShip: 5 },
    { name: 'DIAMOND', label: 'ダイヤ',   min: 150000,  max: Infinity, rate: 2.0, discount: 10, freeShip: 999 }
  ];

  function calcTotalSpend() {
    return getLS('hinoka_orders', []).reduce(function (s, o) {
      return (['done','review','ship','receive'].indexOf(o.status) !== -1) ? s + Number(o.total || 0) : s;
    }, 0);
  }

  function getMemberRank(spend) {
    for (var i = RANK_TABLE.length - 1; i >= 0; i--) {
      if (spend >= RANK_TABLE[i].min) return RANK_TABLE[i];
    }
    return RANK_TABLE[0];
  }

  function calcPoints() {
    var stored = getLS('hinoka_points_log', null);
    if (stored) return stored;
    var pts = getLS('hinoka_orders', []).reduce(function (s, o) {
      return (['done','review'].indexOf(o.status) !== -1) ? s + Math.floor(Number(o.total || 0) * 0.01) : s;
    }, 0);
    return { total: pts, available: pts, expire: Math.floor(pts * 0.1) };
  }

  function addPoints(amount) {
    var rank   = getMemberRank(calcTotalSpend());
    var earned = Math.floor(amount * 0.01 * rank.rate);
    var pts    = calcPoints();
    pts.total    += earned;
    pts.available += earned;
    setLS('hinoka_points_log', pts);
    return earned;
  }

  function checkBirthdayCoupon() {
    var profile  = getLS('hinoka_profile', {});
    var birthday = profile.birthday || '';
    if (!birthday) return;

    var now     = new Date();
    var mm      = String(now.getMonth() + 1).padStart(2, '0');
    var birthMM = String(birthday.split('-')[0]).padStart(2, '0');
    if (mm !== birthMM) return;

    var bdKey = 'BD-' + now.getFullYear() + '-' + mm;
    var stored = getLS('hinoka_coupons', []);
    if (stored.some(function (c) { return c.id === bdKey; })) return;

    var rank    = getMemberRank(calcTotalSpend());
    var discount = rank.name === 'DIAMOND' ? '20%' : rank.name === 'GOLD' ? '15%' : rank.name === 'SILVER' ? '10%' : '5%';
    var lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    var expiry  = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + lastDay.getDate();
    stored.push({
      id: bdKey,
      monthKey: now.getFullYear() + '-' + (now.getMonth() + 1),
      amount: discount,
      title: '🎂 お誕生日特典クーポン ' + discount + 'OFF',
      rule: '全商品対象・お誕生日月のみ有効',
      date: '有効期限：' + expiry,
      expiryTs: lastDay.getTime(),
      used: false,
      claimed: false,
      isBirthday: true
    });
    setLS('hinoka_coupons', stored);
    window.dispatchEvent(new Event('couponUpdated'));
    try { showToast('🎂 お誕生日おめでとうございます！クーポンを発行しました'); } catch (e) {}
  }

  function getMonthCoupons() {
    checkBirthdayCoupon();
    var now  = new Date();
    var ym   = now.getFullYear() + '-' + (now.getMonth() + 1);
    var stored = getLS('hinoka_coupons', []);

    // 旧クーポン（claimedフィールドなし）に claimed:false を補完（マイグレーション）
    var migrated = false;
    stored.forEach(function (c) {
      if (!('claimed' in c)) { c.claimed = false; migrated = true; }
    });
    if (migrated) setLS('hinoka_coupons', stored);

    // 使用済み＋期限切れから7日超経過したものを削除（クリーンアップ）
    var cleaned = stored.filter(function(c) {
      var ts = parseCouponExpiry(c);
      return !(c.used && ts > 0 && Date.now() - ts > 7 * 86400000);
    });
    if (cleaned.length !== stored.length) { stored = cleaned; setLS('hinoka_coupons', stored); }

    var hasThisMonth = stored.some(function (c) { return c.monthKey === ym; });
    if (!hasThisMonth) {
      var lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      var expiryTs = lastDay.getTime();
      var expiry   = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + lastDay.getDate();
      stored = stored.concat([
        { id: 'MC-' + ym + '-1', monthKey: ym, amount: '¥30',  title: '月間メンバークーポン 30円OFF', rule: '200円以上のご注文で利用可能', date: '有効期限：' + expiry, expiryTs: expiryTs, used: false, claimed: false },
        { id: 'MC-' + ym + '-2', monthKey: ym, amount: '5%',   title: '今月限定 5%OFFクーポン',      rule: '3,000円以上のご注文で利用可能', date: '有効期限：' + expiry, expiryTs: expiryTs, used: false, claimed: false }
      ]);
      setLS('hinoka_coupons', stored);
    }
    return stored.filter(function (c) { return !c.used; });
  }

  // ══════════════════════════════════
  //  メッセージ自動生成
  // ══════════════════════════════════
  function autoGenerateMessages() {
    var orders = getLS('hinoka_orders', []);
    var msgs   = getLS('hinoka_messages', []);
    var existingIds = msgs.map(function (m) { return m.id; });
    var added  = false;
    orders.forEach(function (o) {
      var key = 'order-status-' + (o.ref || o.id) + '-' + o.status;
      if (existingIds.indexOf(key) !== -1) return;
      var templates = {
        pay:     { type: 'order',     title: '【注文確認】お支払いをお待ちしています',     body: '注文番号 ' + (o.ref || o.id) + ' のご注文が確定しました。3営業日以内にお振込をお願いします。\n合計金額：¥' + Number(o.total||0).toLocaleString() },
        ship:    { type: 'logistics', title: '【発送完了】ご注文の商品が発送されました',   body: '注文番号 ' + (o.ref || o.id) + ' の商品を発送しました。' + (o.trackingNumber ? '\n追跡番号：' + o.trackingNumber : '\n配送状況は追跡番号でご確認ください。') },
        receive: { type: 'logistics', title: '【配達完了】商品が到着しました',             body: '注文番号 ' + (o.ref || o.id) + ' の商品が到着しました。受け取り後は「受け取り確認」ボタンを押してください。' },
        review:  { type: 'order',     title: '【レビュー依頼】商品はいかがでしたか？',     body: '注文番号 ' + (o.ref || o.id) + ' のご購入ありがとうございました。ぜひレビューをお願いします！レビュー投稿で50ポイントプレゼント🎁' },
        done:    { type: 'order',     title: '【注文完了】ご利用ありがとうございました',   body: '注文番号 ' + (o.ref || o.id) + ' のお取引が完了しました。またのご利用をお待ちしております。' },
        cancel:  { type: 'system',    title: '【注文キャンセル】ご注文をキャンセルしました', body: '注文番号 ' + (o.ref || o.id) + ' をキャンセルしました。ご不明な点はカスタマーサポートにお問い合わせください。' }
      };
      if (templates[o.status]) {
        msgs.unshift({ id: key, type: templates[o.status].type, title: templates[o.status].title, body: templates[o.status].body, time: o.date || new Date().toLocaleString('ja-JP'), unread: true, orderId: o.ref || o.id });
        added = true;
      }
    });
    if (added) { setLS('hinoka_messages', msgs); window.dispatchEvent(new Event('messageUpdated')); }
  }

  function isOver24h(dateStr) {
    if (!dateStr) return false;
    var d = new Date(dateStr.replace(/\//g, '-'));
    return !isNaN(d.getTime()) && (Date.now() - d.getTime()) > 24 * 60 * 60 * 1000;
  }

  var CARRIER_URLS = {
    yamato:    'https://jizen.kuronekoyamato.co.jp/jizen/servlet/crjz.b.CRJZb001?id=',
    sagawa:    'https://k2k.sagawa-exp.co.jp/p/sagawa/web/otoiawase.jsp?SearchNo=',
    japanpost: 'https://trackings.post.japanpost.jp/services/srv/search/direct?reqCodeNo1=',
    seino:     'https://track.seino.co.jp/kamotsu/denpyoNumber.do?DENPYO_NO='
  };

  function trackingLink(order) {
    if (!order.trackingNumber) return '';
    var carrier = order.carrier || 'sagawa';
    var url     = (CARRIER_URLS[carrier] || CARRIER_URLS.sagawa) + order.trackingNumber;
    var labels  = { yamato: 'ヤマト運輸', sagawa: '佐川急便', japanpost: '日本郵便', seino: '西濃運輸' };
    return '<a href="' + esc(url) + '" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;font-size:11px;color:#2b6cb0;padding:6px 12px;border:1px solid #bee3f8;background:#ebf8ff;margin-top:8px;text-decoration:none;">📦 ' + (labels[carrier] || '配送会社') + '　追跡番号：' + esc(order.trackingNumber) + ' →</a>';
  }

  function orderCard(order) {
    var items = (order.items || []).map(function (item) {
      return '<div class="order-item"><img class="thumb" src="' + esc(item.img || 'assets/images/placeholder.jpg') + '" alt="" onerror="this.src=\'assets/images/placeholder.jpg\'"><div><div class="item-name">' + esc(item.name) + '</div><div class="item-spec">' + esc(item.spec || '') + '</div></div><div class="item-price">' + yen(item.price) + '<br>×' + Number(item.qty || 1) + '</div></div>';
    }).join('');
    var extra = '';
    if (order.status === 'ship' || order.status === 'receive') extra += trackingLink(order);
    if (order.status === 'receive' && isOver24h(order.shipDate || order.date)) {
      extra += '<div style="margin-top:8px;padding:8px 12px;background:#fffaf0;border:1px solid #ffe0b2;font-size:11px;color:#b7791f;">⏰ 商品が届いていたら「受け取りを確認」ボタンを押してください。ご不明な点はカスタマーサポートへ。</div>';
    }
    if (order.status === 'review') {
      extra += '<div style="margin-top:8px;padding:8px 12px;background:#f0fff4;border:1px solid #9ae6b4;font-size:11px;color:#276749;">⭐ ' + (order.items || []).length + '点の商品のレビューをお待ちしています。レビュー投稿で50ポイントプレゼント！</div>';
    }
    if (extra) extra = '<div style="padding:0 16px 12px;">' + extra + '</div>';
    return '<article class="order-card"><div class="order-head"><span class="order-id">注文番号：' + esc(order.id) + '</span><span class="order-time">' + esc(order.date) + '</span><span class="status ' + esc(order.status) + '">' + esc(order.statusText) + '</span></div><div class="order-body">' + items + '</div>' + extra + '<div class="order-foot"><div class="order-total">合計 <strong>' + yen(order.total) + '</strong></div><div class="action-row">' + orderActions(order) + '</div></div></article>';
  }

  var BANK_INFO = {
    name:   'GMOあおぞらネット銀行（金融機関コード0310）',
    branch: '法人営業部（支店コード101）',
    number: '2569980',
    holder: 'カ）ヒノカ'
  };

  function orderActions(order) {
    var map = {
      pay:     [['今すぐ支払う','pay-now'],         ['注文をキャンセル','cancel-order']],
      ship:    [['追跡する','track-order'],          ['返金を申請','request-refund']],
      receive: [['受け取りを確認','confirm-received'],['問い合わせる','contact-support']],
      review:  [['レビューを書く','write-review'],   ['もう一度購入','rebuy']],
      done:    [['もう一度購入','rebuy'],             ['アフターサービス','after-service']],
      cancel:  [['もう一度購入','rebuy'],             ['削除','delete-order']],
      refund:  [['サポートへ','contact-support']]
    };
    var actions = map[order.status] || [['詳細を見る','detail']];
    return actions.map(function (a, i) {
      return '<button class="mini-btn ' + (i === 0 ? 'primary' : '') + '" type="button" data-order-action="' + a[1] + '" data-order-id="' + esc(order.id) + '">' + a[0] + '</button>';
    }).join('');
  }

  function handleOrderAction(action, orderId) {
    var orders = getOrders();
    var order  = orders.find(function (o) { return o.id === orderId; });
    if (!order && action !== 'delete-order') return;

    if (action === 'pay-now') {
      var cart = getLS('cartItems', []);
      (order.items || []).forEach(function (item) {
        var found = cart.find(function (c) { return c.id === item.id; });
        if (found) found.qty = Math.max(found.qty, Number(item.qty || 1));
        else cart.push({ id: item.id, name: item.name, price: item.price, img: item.img || 'assets/images/placeholder.jpg', qty: Number(item.qty || 1), color: '', size: item.spec || '' });
      });
      setLS('cartItems', cart);
      setLS('hinoka_repay_ref', orderId);
      window.dispatchEvent(new Event('cartUpdated'));
      location.href = 'checkout.html';

    } else if (action === 'cancel-order') {
      if (!confirm('注文をキャンセルしますか？\nキャンセル後は元に戻せません。')) return;
      var stored = getLS('hinoka_orders', []);
      stored.forEach(function (o) {
        if ((o.ref || o.id) === orderId) { o.status = 'cancel'; o.statusText = 'キャンセル'; o.cancelDate = new Date().toLocaleString('ja-JP'); }
      });
      setLS('hinoka_orders', stored);
      if (order) {
        var itemIds = (order.items || []).map(function (i) { return i.id; });
        var newCart = getLS('cartItems', []).filter(function (c) { return itemIds.indexOf(c.id) === -1; });
        setLS('cartItems', newCart);
        window.dispatchEvent(new Event('cartUpdated'));
      }
      window.dispatchEvent(new Event('orderUpdated'));
      autoGenerateMessages(); buildNavigation(); renderOrders();
      showToast('注文をキャンセルしました。');

    } else if (action === 'confirm-received') {
      var stored2 = getLS('hinoka_orders', []);
      stored2.forEach(function (o) {
        if ((o.ref || o.id) === orderId) { o.status = 'review'; o.statusText = 'レビュー待ち'; o.receivedDate = new Date().toLocaleString('ja-JP'); }
      });
      setLS('hinoka_orders', stored2);
      if (order) {
        var earned = addPoints(order.total || 0);
        var rank   = getMemberRank(calcTotalSpend());
        showToast('受け取りを確認しました！' + earned + 'ポイントを獲得（' + rank.label + '会員 ' + rank.rate + '倍）');
        grantFirstPurchaseCoupon();
        checkRankUpgradeCoupon();
      }
      window.dispatchEvent(new Event('orderUpdated'));
      autoGenerateMessages(); buildNavigation(); renderOrders();

    } else if (action === 'write-review') {
      state.reviewFilter = 'pending'; switchView('reviews');

    } else if (action === 'rebuy') {
      var cart2 = getLS('cartItems', []);
      (order.items || []).forEach(function (item) {
        var found = cart2.find(function (c) { return c.id === item.id; });
        if (found) found.qty += Number(item.qty || 1);
        else cart2.push({ id: item.id, name: item.name, price: item.price, img: item.img || 'assets/images/placeholder.jpg', qty: Number(item.qty || 1), color: '', size: item.spec || '' });
      });
      setLS('cartItems', cart2);
      window.dispatchEvent(new Event('cartUpdated'));
      location.href = 'cart.html';

    } else if (action === 'after-service' || action === 'contact-support' || action === 'request-refund') {
      switchView('service');

    } else if (action === 'track-order') {
      if (order && order.trackingNumber) {
        var carrier = order.carrier || 'sagawa';
        window.open((CARRIER_URLS[carrier] || CARRIER_URLS.sagawa) + order.trackingNumber, '_blank');
      } else {
        showToast('追跡番号は発送後にメールでお知らせします。しばらくお待ちください。');
      }

    } else if (action === 'delete-order') {
      if (!confirm('この注文を履歴から削除しますか？')) return;
      setLS('hinoka_orders', getLS('hinoka_orders', []).filter(function (o) { return (o.ref || o.id) !== orderId; }));
      window.dispatchEvent(new Event('orderUpdated'));
      renderOrders();
      showToast('注文を削除しました');
    }
  }

  // ══════════════════════════════════
  //  OVERVIEW（プレミアムUI）
  // ══════════════════════════════════
  function renderOverview() {
    var orders     = getOrders();
    var wish       = getWishlistProducts();
    var msgs       = getMessages();
    var spend      = calcTotalSpend();
    var rank       = getMemberRank(spend);
    var pts        = calcPoints();
    var coupons    = getMonthCoupons();
    var rankColors  = { BRONZE: '#cd7f32', SILVER: '#9e9e9e', GOLD: '#8b6f47', DIAMOND: '#6b8cae' };
    var rankColor   = rankColors[rank.name] || '#8b6f47';
    var rankMedals  = { BRONZE: '✦', SILVER: '✦✦', GOLD: '✦✦✦', DIAMOND: '◆' };
    var rankMedal   = rankMedals[rank.name] || '✦';
    var initial     = ((state.user.displayName || state.user.email || 'H')[0]).toUpperCase();
    var name        = state.user.displayName || 'HINOKA MEMBER';

    var quickRows = [
      ['pay',    'お支払い待ち', '💳'],
      ['ship',   '発送待ち',     '📦'],
      ['receive','受け取り待ち', '🚚'],
      ['review', 'レビュー待ち', '⭐'],
      ['refund', '返品・返金',   '↩️']
    ];

    var hero =
      '<div class="overview-hero">' +
        '<div class="hero-profile">' +
          '<div class="hero-avatar-ring" style="background:linear-gradient(135deg,' + rankColor + ',#c9a96e);">' + esc(initial) + '</div>' +
          '<div class="hero-info">' +
            '<div class="hero-info-sub">MEMBER NAME</div>' +
            '<div class="hero-info-name">' + esc(name) + '</div>' +
            '<div class="hero-info-rank">' + rankMedal + ' ' + rank.label.toUpperCase() + ' MEMBER</div>' +
          '</div>' +
          '<div class="hero-logo-area"><span>HINOKA</span><span>MEMBER CARD</span></div>' +
        '</div>' +
        '<div class="hero-stats">' +
          '<div class="hero-stat" style="cursor:pointer;" data-hero-go="assets" data-asset-filter="points"><div class="hero-stat-num">' + Number(pts.available).toLocaleString() + '</div><div class="hero-stat-label">POINTS</div></div>' +
          '<div class="hero-stat" style="cursor:pointer;" data-hero-go="assets" data-asset-filter="coupons"><div class="hero-stat-num">' + coupons.length + '</div><div class="hero-stat-label">COUPONS</div></div>' +
          '<div class="hero-stat"><div class="hero-stat-num">' + (state.user.emailVerified ? '✓' : '!') + '</div><div class="hero-stat-label">' + (state.user.emailVerified ? 'VERIFIED' : 'UNVERIFIED') + '</div></div>' +
        '</div>' +
      '</div>';

    var quickGrid =
      '<div class="quick-grid">' +
      quickRows.map(function (q) {
        var cnt = orders.filter(function (o) { return o.status === q[0]; }).length;
        return '<button class="quick-card" type="button" data-order-filter="' + q[0] + '">' +
          '<div class="quick-icon">' + q[2] + '</div>' +
          '<div class="quick-label">' + q[1] + '</div>' +
          '<div class="quick-count">' + cnt + '</div>' +
        '</button>';
      }).join('') +
      '</div>';

    var cartItems = getCartItems();
    var cartCount = cartItems.reduce(function (s, i) { return s + Number(i.qty || 1); }, 0);
    var statsRow =
      '<div class="stat-grid">' +
        dataBlock('累計注文数', orders.length, 'orders') +
        dataBlock('バッグ', cartCount, 'cart') +
        dataBlock('お気に入り', wish.length, 'wishlist') +
        dataBlock('未読メッセージ', msgs.filter(function (m) { return m.unread; }).length, 'messages') +
      '</div>';

    var recentOrder = orders[0] ? orderCard(orders[0]) : empty('ご注文履歴はありません。');
    var recentMsgs  = msgs.length ? msgs.slice(0, 3).map(messageCard).join('') : empty('メッセージはありません。');

    var sections =
      '<div class="section-grid">' +
        '<div class="section-block" style="box-shadow:0 4px 20px rgba(0,0,0,.07);border-radius:12px;">' +
          '<div class="section-title-row"><h3 class="section-title">RECENT ORDER <span style="font-size:10px;color:var(--muted);font-family:sans-serif;">最新のご注文</span></h3>' +
          '<button class="text-btn" type="button" data-go="orders">すべて見る</button></div>' +
          recentOrder +
        '</div>' +
        '<div class="section-block" style="box-shadow:0 4px 20px rgba(0,0,0,.07);border-radius:12px;">' +
          '<div class="section-title-row"><h3 class="section-title">MESSAGE <span style="font-size:10px;color:var(--muted);font-family:sans-serif;">メッセージ</span></h3>' +
          '<button class="text-btn" type="button" data-go="messages">すべて見る</button></div>' +
          recentMsgs +
        '</div>' +
      '</div>';

    document.getElementById('view-overview').innerHTML =
      head(biHead('OVERVIEW', 'ホーム'), '会員情報、ご注文状況、保有資産をまとめて確認できます。') +
      hero + quickGrid + statsRow + sections;

    // bind hero stat clicks
    document.querySelectorAll('[data-hero-go]').forEach(function(el) {
      el.addEventListener('click', function() {
        var v = el.dataset.heroGo;
        if (el.dataset.assetFilter) state.assetFilter = el.dataset.assetFilter;
        switchView(v);
      });
    });

    document.querySelectorAll('[data-order-filter]').forEach(function (b) {
      b.addEventListener('click', function () { state.orderFilter = b.dataset.orderFilter; switchView('orders'); });
    });
    document.querySelectorAll('[data-go]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.dataset.assetFilter) state.assetFilter = b.dataset.assetFilter;
        switchView(b.dataset.go);
      });
    });
    document.querySelectorAll('[data-order-action]').forEach(function (b) {
      b.addEventListener('click', function () { handleOrderAction(b.dataset.orderAction, b.dataset.orderId); });
    });
  }

  function dataBlock(label, value, goView, assetTab) {
    var attrs = '';
    if (goView) {
      attrs += ' data-go="' + esc(goView) + '"';
      if (assetTab) attrs += ' data-asset-filter="' + esc(assetTab) + '"';
    }
    return '<div class="data-card"' + attrs + '><div class="data-label">' + label + '</div><div class="data-value">' + value + '</div></div>';
  }
  function empty(text) { return '<div class="empty">' + text + '</div>'; }

  function tabsHtml(tabs, active, attr) {
    return '<div class="tabs">' + tabs.map(function (t) {
      return '<button class="tab-btn ' + (active === t[0] ? 'active' : '') + '" type="button" ' + attr + '="' + t[0] + '">' + t[1] + '</button>';
    }).join('') + '</div>';
  }

  // ══════════════════════════════════
  //  ご注文履歴
  // ══════════════════════════════════
  function renderOrders() {
    var list = getOrders().filter(function (o) { return state.orderFilter === 'all' || o.status === state.orderFilter; });
    document.getElementById('view-orders').innerHTML =
      head(biHead('MY ORDERS', 'ご注文履歴'), 'ご注文状況の確認、配送確認、レビュー、返品・返金申請ができます。') +
      tabsHtml(orderTabs, state.orderFilter, 'data-order-tab') +
      '<div class="order-list">' + (list.length ? list.map(orderCard).join('') : empty('該当するご注文はありません。')) + '</div>';
    document.querySelectorAll('[data-order-tab]').forEach(function (b) { b.addEventListener('click', function () { state.orderFilter = b.dataset.orderTab; renderOrders(); }); });
    document.querySelectorAll('[data-order-action]').forEach(function (b) {
      b.addEventListener('click', function () { handleOrderAction(b.dataset.orderAction, b.dataset.orderId); });
    });
  }

  // ══════════════════════════════════
  //  MY ASSETS（プレミアムUI）
  // ══════════════════════════════════
  function renderAssets() {
    var html = head(biHead('MY ASSETS', '資産管理'), 'クーポン、ポイント、残高をまとめて管理します。') + tabsHtml(assetTabs, state.assetFilter, 'data-asset-tab');

    if (state.assetFilter === 'coupons') {
      var coupons = getMonthCoupons();
      var activeCoupons  = coupons.filter(function(c){ return !isCouponExpired(c); });
      var expiredCoupons = coupons.filter(function(c){ return isCouponExpired(c); });

      function couponCard(c) {
        var expired  = isCouponExpired(c);
        var days     = couponDaysLeft(c);
        var urgent   = !expired && days !== null && days <= 3;
        var faceStyle = expired
          ? 'background:linear-gradient(135deg,#bbb,#999);'
          : c.claimed === true
            ? 'background:linear-gradient(135deg,#c9a96e,#8b6f47);'
            : 'background:linear-gradient(135deg,#8b6f47,#c9a96e);';
        var statusTag = expired
          ? '<span style="display:inline-block;padding:2px 8px;border-radius:20px;font-size:9px;background:rgba(176,90,74,.15);color:#b05a4a;letter-spacing:.06em;">期限切れ</span>'
          : c.claimed === true
            ? '<span style="display:inline-block;padding:2px 8px;border-radius:20px;font-size:9px;background:rgba(47,125,70,.12);color:#2f7d46;letter-spacing:.06em;">✓ 受取済み・使用可能</span>'
            : '<span style="display:inline-block;padding:2px 8px;border-radius:20px;font-size:9px;background:rgba(183,121,31,.12);color:#b7791f;letter-spacing:.06em;">未受取</span>';
        var expiryTag = !expired && days !== null
          ? '<span style="font-size:10px;color:' + (urgent ? '#b05a4a' : 'var(--muted)') + ';font-weight:' + (urgent ? '600' : '400') + ';">' + (urgent ? '⚠️ あと'+days+'日' : 'あと'+days+'日') + '</span>'
          : '';
        var actionBtn = expired
          ? '<button disabled style="margin-top:10px;background:#ddd;border:none;color:#999;padding:7px 18px;border-radius:20px;font-size:11px;cursor:not-allowed;font-family:inherit;">期限切れ</button>'
          : c.claimed === true
            ? '<button disabled style="margin-top:10px;background:linear-gradient(135deg,#c9a96e,#8b6f47);border:none;color:#fff;padding:7px 18px;border-radius:20px;font-size:11px;cursor:default;font-family:inherit;opacity:.7;">✓ 受取済み</button>'
            : '<button style="margin-top:10px;background:linear-gradient(135deg,#8b6f47,#c9a96e);border:none;color:#fff;padding:7px 18px;border-radius:20px;font-size:11px;cursor:pointer;font-family:inherit;box-shadow:0 3px 10px rgba(139,111,71,.3);" data-coupon-use="'+esc(c.id)+'">受け取る</button>';
        return '<article class="coupon-card" style="' + (expired ? 'opacity:.55;' : '') + '">' +
          '<div class="coupon-face" style="'+faceStyle+'">' +
            '<div class="coupon-amount" style="' + (expired ? 'color:#eee;' : '') + '">' + esc(c.amount) + '</div>' +
            '<div style="font-size:10px;letter-spacing:.1em;color:rgba(255,255,255,.8);">COUPON</div>' +
          '</div>' +
          '<div class="coupon-info">' +
            '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">' + statusTag + expiryTag + '</div>' +
            '<div class="message-title">' + esc(c.title) + '</div>' +
            '<div class="message-body">' + esc(c.rule) + '<br>' + esc(c.date) + '</div>' +
            actionBtn +
          '</div>' +
        '</article>';
      }

      if (activeCoupons.length) {
        html += '<p style="font-size:11px;color:var(--muted);margin-bottom:12px;">「受け取る」を押すとお会計時にご利用いただけます。毎月1日に新しいクーポンが配布されます。</p>';
        html += '<div class="coupon-grid">' + activeCoupons.map(couponCard).join('') + '</div>';
      } else {
        html += empty('現在利用可能なクーポンはありません。<br>毎月1日に新しいクーポンが配布されます。');
      }
      if (expiredCoupons.length) {
        html += '<div style="margin-top:16px;"><p style="font-size:10px;color:var(--muted);margin-bottom:8px;letter-spacing:.06em;">期限切れ</p>' +
          '<div class="coupon-grid">' + expiredCoupons.map(couponCard).join('') + '</div></div>';
      }
    }

    if (state.assetFilter === 'points') {
      var pts   = calcPoints();
      var spend = calcTotalSpend();
      var rank  = getMemberRank(spend);
      // Premium dark gradient card
      html +=
        '<div style="background:linear-gradient(135deg,#fdf8f3,#f5ede0);border-radius:20px;padding:28px 32px;position:relative;overflow:hidden;margin-bottom:20px;color:#3d2c1e;box-shadow:0 8px 32px rgba(139,111,71,.12),inset 0 1px 0 rgba(255,255,255,.8);border:1px solid rgba(201,169,110,.2);">' +
          '<div style="position:absolute;top:-40px;right:-40px;width:180px;height:180px;border-radius:50%;background:rgba(201,169,110,.07);pointer-events:none;"></div>' +
          '<div style="font-size:10px;letter-spacing:.2em;color:#8b6f47;margin-bottom:8px;">AVAILABLE POINTS</div>' +
          '<div style="font-family:\'Cormorant Garamond\',serif;font-size:56px;color:#8b6f47;line-height:1;margin-bottom:4px;">' + Number(pts.available).toLocaleString() + '<span style="font-size:20px;margin-left:6px;">pt</span></div>' +
          '<div style="font-size:11px;color:#a08060;margin-top:8px;">1ポイント = ¥1 としてご利用いただけます</div>' +
        '</div>' +
        '<div class="member-benefit-grid" style="grid-template-columns:repeat(4,1fr);">' +
          '<div class="mbc"><div class="mbc-icon">◈</div><div class="mbc-val">' + Number(pts.available).toLocaleString() + '</div><div class="mbc-label">利用可能ポイント</div></div>' +
          '<div class="mbc"><div class="mbc-icon">¥</div><div class="mbc-val" style="font-size:22px;">¥' + Number(pts.available).toLocaleString() + '</div><div class="mbc-label">利用可能額</div></div>' +
          '<div class="mbc"><div class="mbc-icon">⏳</div><div class="mbc-val">' + Number(pts.expire).toLocaleString() + '</div><div class="mbc-label">失効予定ポイント</div></div>' +
          '<div class="mbc" data-nav-view="member" style="cursor:pointer;"><div class="mbc-icon">✦</div><div class="mbc-val">' + rank.rate + 'x</div><div class="mbc-label">ポイント倍率</div></div>' +
        '</div>' +
        '<div class="section-block" style="margin-top:16px;background:linear-gradient(145deg,#fdf8f3,#f0e6d6)!important;border:1px solid rgba(201,169,110,.18)!important;box-shadow:0 4px 16px rgba(139,111,71,.1),inset 0 1px 0 rgba(255,255,255,.9)!important;border-radius:14px;"><div class="section-title-row"><h3 class="section-title" style="color:#8b6f47;">ポイント制度について</h3></div>' +
          '<div style="font-size:11px;line-height:2.4;color:#7a5c3a;">' +
            '✦ 購入金額の1%（ランクに応じて最大2%）をポイント付与<br>' +
            '✦ 受け取り確認後、翌日に反映されます<br>' +
            '✦ 有効期限：最終利用日より1年間<br>' +
            '✦ レビュー投稿ボーナス：1件につき50ポイント' +
          '</div>' +
        '</div>';
    }

    if (state.assetFilter === 'balance') {
      var bal = getLS('hinoka_balance', { available: 0, frozen: 0, totalCharged: 0, totalUsed: 0 });
      html +=
        '<div style="background:linear-gradient(135deg,#fdf8f3,#f5ede0);border-radius:20px;padding:28px 32px;position:relative;overflow:hidden;margin-bottom:20px;color:#3d2c1e;box-shadow:0 8px 32px rgba(139,111,71,.12),inset 0 1px 0 rgba(255,255,255,.8);border:1px solid rgba(201,169,110,.2);">' +
          '<div style="position:absolute;top:-40px;right:-40px;width:180px;height:180px;border-radius:50%;background:rgba(201,169,110,.07);pointer-events:none;"></div>' +
          '<div style="font-size:10px;letter-spacing:.2em;color:#8b6f47;margin-bottom:8px;">ACCOUNT BALANCE</div>' +
          '<div style="font-family:\'Cormorant Garamond\',serif;font-size:56px;color:#8b6f47;line-height:1;margin-bottom:4px;">¥' + Number(bal.available).toLocaleString() + '</div>' +
          '<div style="font-size:11px;color:#a08060;margin-top:8px;">チャージ・返金はinfo@hinokaglobal.comまでご連絡ください</div>' +
        '</div>' +
        '<div class="member-benefit-grid" style="grid-template-columns:repeat(4,1fr);">' +
          '<div class="mbc"><div class="mbc-icon">◈</div><div class="mbc-val" style="font-size:20px;">¥' + Number(bal.available).toLocaleString() + '</div><div class="mbc-label">利用可能残高</div></div>' +
          '<div class="mbc"><div class="mbc-icon">🔒</div><div class="mbc-val" style="font-size:20px;">¥' + Number(bal.frozen).toLocaleString() + '</div><div class="mbc-label">凍結中残高</div></div>' +
          '<div class="mbc"><div class="mbc-icon">↑</div><div class="mbc-val" style="font-size:20px;">¥' + Number(bal.totalCharged).toLocaleString() + '</div><div class="mbc-label">累計チャージ</div></div>' +
          '<div class="mbc"><div class="mbc-icon">↓</div><div class="mbc-val" style="font-size:20px;">¥' + Number(bal.totalUsed).toLocaleString() + '</div><div class="mbc-label">累計利用</div></div>' +
        '</div>' +
        '<div class="section-block" style="margin-top:16px;background:linear-gradient(145deg,#fdf8f3,#f0e6d6)!important;border:1px solid rgba(201,169,110,.18)!important;box-shadow:0 4px 16px rgba(139,111,71,.1),inset 0 1px 0 rgba(255,255,255,.9)!important;border-radius:14px;"><div class="section-title-row"><h3 class="section-title" style="color:#8b6f47;">残高のご利用方法</h3></div>' +
          '<div style="font-size:11px;line-height:2.4;color:#7a5c3a;">' +
            '✦ チャージ：銀行振込でアカウントにチャージ可能<br>' +
            '✦ お会計時にポイントと併用してご利用可能<br>' +
            '✦ 返金は残高として返却（入金まで3〜5営業日）<br>' +
            '✦ チャージご希望は <a href="mailto:info@hinokaglobal.com" style="color:#8b6f47;">info@hinokaglobal.com</a> までご連絡ください' +
          '</div>' +
        '</div>';
    }

    document.getElementById('view-assets').innerHTML = html;
    document.querySelectorAll('[data-asset-tab]').forEach(function (b) { b.addEventListener('click', function () { state.assetFilter = b.dataset.assetTab; renderAssets(); }); });
    document.querySelectorAll('[data-nav-view]').forEach(function (b) { b.addEventListener('click', function () { switchView(b.dataset.navView); }); });
    document.querySelectorAll('[data-go]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.dataset.assetFilter) state.assetFilter = b.dataset.assetFilter;
        switchView(b.dataset.go);
      });
    });
    document.querySelectorAll('[data-coupon-use]').forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.dataset.couponUse;
        var stored = getLS('hinoka_coupons', []);
        stored.forEach(function (c) { if (c.id === id) c.claimed = true; });
        setLS('hinoka_coupons', stored);
        window.dispatchEvent(new Event('couponUpdated'));
        showToast('クーポンを受け取りました！お会計時にご利用いただけます。');
        b.textContent = '✓ 受取済み';
        b.disabled = true;
        b.style.background = 'linear-gradient(135deg,#aaa,#888)';
      });
    });
  }

  // ══════════════════════════════════
  //  商品カード・ウィッシュリスト・履歴・カート
  // ══════════════════════════════════
  function productCard(p, meta) {
    return '<article class="product-card"><div class="product-img-wrap"><img src="' + esc(p.img || 'assets/images/placeholder.jpg') + '" alt="" onerror="this.src=\'assets/images/placeholder.jpg\'"></div><div class="product-body"><p class="product-name">' + esc(p.name) + '</p><div class="product-price">' + yen(p.price) + (p.oldPrice ? '<span class="old-price">' + yen(p.oldPrice) + '</span>' : '') + '</div><div class="stock">' + esc(meta || p.stock || '在庫あり') + '</div><div class="action-row"><button class="mini-btn primary" type="button" data-product-id="' + esc(p.id) + '" data-product-action="cart">バッグに追加</button><button class="mini-btn" type="button" data-product-id="' + esc(p.id) + '" data-product-action="detail">詳細を見る</button></div></div></article>';
  }

  function wishlistCard(p) {
    return '<article class="product-card" style="position:relative;">' +
      '<button type="button" data-wishlist-remove="' + esc(p.id) + '" style="position:absolute;top:8px;right:8px;z-index:2;background:rgba(255,255,255,.88);border:none;border-radius:50%;width:28px;height:28px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.12);" title="削除">×</button>' +
      '<div class="product-img-wrap"><img src="' + esc(p.img || 'assets/images/placeholder.jpg') + '" alt="" onerror="this.src=\'assets/images/placeholder.jpg\'"></div>' +
      '<div class="product-body"><p class="product-name">' + esc(p.name) + '</p>' +
      '<div class="product-price">' + yen(p.price) + (p.oldPrice ? '<span class="old-price">' + yen(p.oldPrice) + '</span>' : '') + '</div>' +
      '<div class="stock">' + esc(p.stock || '在庫あり') + '</div>' +
      '<div class="action-row"><button class="mini-btn primary" type="button" data-product-id="' + esc(p.id) + '" data-product-action="cart">バッグに追加</button><button class="mini-btn" type="button" data-product-id="' + esc(p.id) + '" data-product-action="detail">詳細を見る</button></div>' +
      '</div></article>';
  }

  function renderWishlist() {
    var list = getWishlistProducts();
    document.getElementById('view-wishlist').innerHTML = head(biHead('WISHLIST', 'お気に入り'), 'お気に入り商品を確認し、ショッピングバッグに追加できます。', '<a class="view-action-link" href="store.html">商品を見る</a>') + '<div class="product-grid">' + (list.length ? list.map(wishlistCard).join('') : empty('お気に入り商品はありません。')) + '</div>';
    document.querySelectorAll('[data-wishlist-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id  = btn.dataset.wishlistRemove;
        var ids = getLS('hinoka_wishlist', []).filter(function (x) { return x !== id; });
        setLS('hinoka_wishlist', ids);
        window.dispatchEvent(new Event('wishlistUpdated'));
        renderWishlist();
        showToast('お気に入りから削除しました');
      });
    });
    bindProductActions();
  }

  function renderHistory() {
    var raw = getHistory();
    // Support both flat array (new format) and grouped array (old format)
    var items = [];
    if (raw.length && raw[0] && raw[0].items) {
      // old grouped format → flatten
      raw.forEach(function(g) { (g.items || []).forEach(function(p) { items.push(p); }); });
    } else {
      items = raw;
    }
    // Group by date for display
    var grouped = [];
    var dateMap  = {};
    items.forEach(function(p) {
      var d = p.date || '—';
      if (!dateMap[d]) { dateMap[d] = []; grouped.push({ date: d, items: dateMap[d] }); }
      dateMap[d].push(p);
    });

    document.getElementById('view-history').innerHTML =
      head(biHead('BROWSING HISTORY', '閲覧履歴'), '最近閲覧した商品（最大10件）。', '<button class="view-action-btn" id="clearHistoryBtn" type="button">履歴を削除</button>') +
      (grouped.length
        ? grouped.map(function(group) {
            return '<div class="section-title-row" style="margin-top:18px;"><h3 class="section-title">' + esc(group.date) + '</h3></div>' +
              '<div class="product-grid">' + group.items.map(function(p) {
                return '<article class="product-card" style="position:relative;">' +
                  '<a href="product-detail.html?id=' + esc(p.id) + '" style="text-decoration:none;color:inherit;">' +
                    '<div class="product-img-wrap"><img src="' + esc(p.img || '') + '" alt="' + esc(p.name) + '" onerror="this.src=\'assets/images/placeholder.jpg\'"></div>' +
                    '<div class="product-body">' +
                      '<div class="product-name">' + esc(p.name) + '</div>' +
                      '<div class="product-price">¥' + Number(p.price).toLocaleString() + '</div>' +
                      '<div style="font-size:10px;color:var(--muted);margin-bottom:8px;">閲覧 ' + esc(p.time || '') + '</div>' +
                    '</div>' +
                  '</a>' +
                  '<div style="display:flex;gap:6px;padding:0 13px 13px;">' +
                    '<button class="mini-btn primary" style="flex:1;" data-product-action="cart" data-product-id="' + esc(p.id) + '">カートに追加</button>' +
                    '<a class="mini-btn" href="product-detail.html?id=' + esc(p.id) + '" style="flex:1;text-align:center;text-decoration:none;">詳細を見る</a>' +
                  '</div>' +
                '</article>';
              }).join('') + '</div>';
          }).join('')
        : empty('閲覧履歴はありません。<br>商品ページを開くと自動的に記録されます。'));

    var clearBtn = document.getElementById('clearHistoryBtn');
    if (clearBtn) clearBtn.addEventListener('click', function () {
      setLS('hinoka_browsing_history', []);
      window.dispatchEvent(new Event('historyUpdated'));
      renderHistory();
      showToast('閲覧履歴を削除しました');
    });
    bindProductActions();
  }

  function bindProductActions() {
    document.querySelectorAll('[data-product-action]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.dataset.productAction === 'cart') {
          var id = btn.dataset.productId;
          var products = window.HINOKA_PRODUCTS || [];
          var p = products.find(function (x) { return x.id === id; });
          if (p) {
            var items = getLS('cartItems', []);
            var found = items.find(function (i) { return i.id === id; });
            if (found) found.qty++; else items.push({ id: id, name: p.name, price: p.price, img: (p.images && p.images[0]) || p.mainImg || '', qty: 1, color: '', size: '' });
            setLS('cartItems', items);
            window.dispatchEvent(new Event('cartUpdated'));
          }
          showToast('ショッピングバッグに追加しました');
        } else {
          if (btn.dataset.productId) location.href = 'product-detail.html?id=' + btn.dataset.productId;
        }
      });
    });
  }

  function renderCart() {
    var items = getCartItems();
    var total = items.reduce(function (s, i) { return s + Number(i.price || 0) * Number(i.qty || 1); }, 0);
    var cartRows = items.length ? items.map(function (item, idx) {
      var detailUrl = 'product-detail.html?id=' + esc(item.id || '');
      return '<div style="display:grid;grid-template-columns:100px 1fr;gap:16px;padding:18px;margin-bottom:12px;background:linear-gradient(145deg,#fdf8f3,#f0e6d6);border:1px solid rgba(201,169,110,.22);border-radius:14px;box-shadow:0 4px 16px rgba(139,111,71,.1),inset 0 1px 0 rgba(255,255,255,.9);">' +
        '<a href="' + detailUrl + '" style="display:block;border-radius:8px;overflow:hidden;">' +
          '<img src="' + esc(item.img || 'assets/images/placeholder.jpg') + '" alt="" onerror="this.src=\'assets/images/placeholder.jpg\'" style="width:100%;aspect-ratio:3/4;object-fit:cover;display:block;">' +
        '</a>' +
        '<div style="display:flex;flex-direction:column;justify-content:space-between;">' +
          '<div>' +
            '<a href="' + detailUrl + '" style="text-decoration:none;"><div style="font-size:13px;color:#3d2c1e;letter-spacing:.04em;margin-bottom:4px;line-height:1.5;">' + esc(item.name) + '</div></a>' +
            '<div style="font-size:11px;color:#a08060;margin-bottom:10px;">' + esc([item.color, item.size].filter(Boolean).join(' / ')) + '</div>' +
          '</div>' +
          '<div style="display:flex;align-items:center;justify-content:space-between;">' +
            '<div style="display:flex;align-items:center;gap:6px;">' +
              '<button style="width:28px;height:28px;border-radius:50%;background:rgba(139,111,71,.1);border:none;cursor:pointer;font-size:16px;color:#8b6f47;font-weight:600;display:flex;align-items:center;justify-content:center;" data-cart-dec="' + idx + '">−</button>' +
              '<span style="font-size:14px;min-width:24px;text-align:center;font-weight:600;color:#3d2c1e;">' + Number(item.qty || 1) + '</span>' +
              '<button style="width:28px;height:28px;border-radius:50%;background:rgba(139,111,71,.1);border:none;cursor:pointer;font-size:16px;color:#8b6f47;font-weight:600;display:flex;align-items:center;justify-content:center;" data-cart-inc="' + idx + '">+</button>' +
            '</div>' +
            '<div style="font-size:14px;font-weight:600;color:#6b4f2e;">' + yen(item.price * Number(item.qty || 1)) + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('') : '';
    var checkoutBtn = items.length
      ? '<button type="button" id="cartToCheckoutBtn" style="margin-top:12px;width:100%;padding:16px;background:linear-gradient(135deg,#8b6f47,#c9a96e);color:#fff;border:none;border-radius:12px;font-size:14px;letter-spacing:.12em;cursor:pointer;box-shadow:0 6px 20px rgba(139,111,71,.35);font-family:inherit;transition:transform .2s,box-shadow .2s;">お会計へ進む &nbsp;—&nbsp; ' + yen(total) + '</button>'
      : '';
    document.getElementById('view-cart').innerHTML =
      head(biHead('SHOPPING BAG', 'バッグ'), '現在のバッグ内容を確認・編集できます。', '<a class="view-action-link" href="store.html">買い物を続ける</a>') +
      (items.length ? cartRows : '<div style="padding:40px;text-align:center;color:var(--muted);font-size:13px;">ショッピングバッグは空です。</div>') +
      checkoutBtn;
    if (document.getElementById('cartToCheckoutBtn')) {
      document.getElementById('cartToCheckoutBtn').addEventListener('click', function () { location.href = 'checkout.html'; });
    }
    document.querySelectorAll('[data-cart-inc]').forEach(function (b) {
      b.addEventListener('click', function () { var cart = getLS('cartItems', []); cart[+b.dataset.cartInc].qty = Number(cart[+b.dataset.cartInc].qty || 1) + 1; setLS('cartItems', cart); window.dispatchEvent(new Event('cartUpdated')); renderCart(); });
    });
    document.querySelectorAll('[data-cart-dec]').forEach(function (b) {
      b.addEventListener('click', function () { var i = +b.dataset.cartDec; var cart = getLS('cartItems', []); if (cart[i].qty > 1) cart[i].qty--; else cart.splice(i, 1); setLS('cartItems', cart); window.dispatchEvent(new Event('cartUpdated')); renderCart(); });
    });
  }

  // ══════════════════════════════════
  //  お届け先住所（郵便番号自動入力付き）
  // ══════════════════════════════════
  function renderAddresses() {
    var list = getAddresses();
    document.getElementById('view-addresses').innerHTML = head(biHead('ADDRESS', 'お届け先住所'), '最大20件までお届け先住所を登録できます。', '<button class="add-action-btn" id="addAddressBtn" type="button">＋ 住所を追加</button>') +
      '<div class="address-list">' + (list.length ? list.map(function (a) {
        return '<article class="address-card"><div class="address-top"><div class="address-name">' + esc(a.name) + ' / ' + esc(a.phone) + '</div>' + (a.isDefault ? '<span style="display:inline-block;padding:2px 10px;border-radius:20px;font-size:10px;letter-spacing:0.08em;background:linear-gradient(135deg,#c9a96e,#8b6f47);color:#fff;font-weight:600;box-shadow:0 2px 6px rgba(139,111,71,.25);">既定</span>' : '') + '</div><div class="address-detail">〒' + esc(a.zip) + ' ' + esc(a.pref) + esc(a.city) + ' ' + esc(a.detail) + '</div><div class="action-row" style="margin-top:14px;display:flex;align-items:center;gap:10px;"><button style="background:none;border:none;cursor:pointer;font-size:12px;letter-spacing:0.06em;color:#8b6f47;font-family:inherit;padding:4px 0;border-bottom:1px solid rgba(139,111,71,.4);transition:color .2s,border-color .2s;" data-edit-address="' + a.id + '" type="button">編集</button><button style="background:linear-gradient(135deg,#fdf8f3,#e8d9bf);border:none;cursor:pointer;font-size:11px;letter-spacing:0.06em;color:#6b4f2e;font-family:inherit;padding:5px 12px;border-radius:20px;box-shadow:0 2px 6px rgba(139,111,71,.15),inset 0 1px 0 rgba(255,255,255,.8);transition:box-shadow .2s;" data-default-address="' + a.id + '" type="button">既定にする</button><button style="background:none;border:none;cursor:pointer;font-size:12px;letter-spacing:0.06em;color:#b05a4a;font-family:inherit;padding:4px 0;border-bottom:1px solid rgba(176,90,74,.35);transition:color .2s;" data-delete-address="' + a.id + '" type="button">削除</button></div></article>';
      }).join('') : empty('お届け先住所が登録されていません。<br>「住所を追加」ボタンから登録できます。')) + '</div>';
    document.getElementById('addAddressBtn').addEventListener('click', function () { openAddressModal(); });
    document.querySelectorAll('[data-edit-address]').forEach(function (b) { b.addEventListener('click', function () { openAddressModal(b.dataset.editAddress); }); });
    document.querySelectorAll('[data-default-address]').forEach(function (b) { b.addEventListener('click', function () { setDefaultAddress(b.dataset.defaultAddress); }); });
    document.querySelectorAll('[data-delete-address]').forEach(function (b) { b.addEventListener('click', function () { deleteAddress(b.dataset.deleteAddress); }); });
  }

  function openAddressModal(id) {
    var a = getAddresses().find(function (x) { return x.id === id; }) || {};
    state.editingAddressId = id || null;
    document.getElementById('addrName').value    = a.name   || '';
    document.getElementById('addrPhone').value   = a.phone  || '';
    document.getElementById('addrZip').value     = a.zip    || '';
    document.getElementById('addrPref').value    = a.pref   || '';
    document.getElementById('addrCity').value    = a.city   || '';
    document.getElementById('addrDetail').value  = a.detail || '';
    document.getElementById('addrDefault').checked = !!a.isDefault;
    document.getElementById('addressModal').classList.add('show');

    // 郵便番号自動入力
    var zipInput = document.getElementById('addrZip');
    var zipHandler = function () {
      var zip = zipInput.value.replace(/[^0-9]/g, '');
      if (zip.length !== 7) return;
      fetch('https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + zip)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.results && data.results[0]) {
            var r = data.results[0];
            document.getElementById('addrPref').value = r.address1 || '';
            document.getElementById('addrCity').value = (r.address2 || '') + (r.address3 || '');
            showToast('住所を自動入力しました');
          }
        }).catch(function () {});
    };
    zipInput.removeEventListener('blur', zipInput._zipHandler);
    zipInput._zipHandler = zipHandler;
    zipInput.addEventListener('blur', zipHandler);
  }

  function closeAddressModal() { document.getElementById('addressModal').classList.remove('show'); state.editingAddressId = null; }

  function saveAddress() {
    var list = getAddresses();
    if (!state.editingAddressId && list.length >= 20) return showToast('住所は20件まで登録できます');
    var item = {
      id:        state.editingAddressId || ('a' + Date.now()),
      name:      document.getElementById('addrName').value.trim(),
      phone:     document.getElementById('addrPhone').value.trim(),
      zip:       document.getElementById('addrZip').value.trim(),
      pref:      document.getElementById('addrPref').value.trim(),
      city:      document.getElementById('addrCity').value.trim(),
      detail:    document.getElementById('addrDetail').value.trim(),
      isDefault: document.getElementById('addrDefault').checked
    };
    if (!item.name || !item.phone || !item.zip || !item.pref || !item.city || !item.detail) return showToast('必須項目を入力してください');
    if (item.isDefault) list.forEach(function (a) { a.isDefault = false; });
    var index = list.findIndex(function (a) { return a.id === item.id; });
    if (index >= 0) list[index] = item; else list.push(item);
    if (!list.some(function (a) { return a.isDefault; })) list[0].isDefault = true;
    setLS('hinoka_addresses', list);
    window.dispatchEvent(new Event('addressUpdated'));
    closeAddressModal();
    renderAddresses();
    showToast('住所を保存しました');
  }

  function setDefaultAddress(id) {
    setLS('hinoka_addresses', getAddresses().map(function (a) { a.isDefault = a.id === id; return a; }));
    window.dispatchEvent(new Event('addressUpdated'));
    renderAddresses();
  }

  function deleteAddress(id) {
    var list = getAddresses().filter(function (a) { return a.id !== id; });
    if (list.length && !list.some(function (a) { return a.isDefault; })) list[0].isDefault = true;
    setLS('hinoka_addresses', list);
    window.dispatchEvent(new Event('addressUpdated'));
    renderAddresses();
  }

  // ══════════════════════════════════
  //  レビュー管理
  // ══════════════════════════════════
  function renderReviews() {
    var allReviews = getReviews();
    var pendingCnt = allReviews.filter(function(r){ return r.status === 'pending'; }).length;
    var doneCnt = allReviews.filter(function(r){ return r.status === 'done'; }).length;
    var photoCnt = allReviews.filter(function(r){ return r.hasPhoto; }).length;
    var reviewTabs = [['pending', 'レビュー待ち（' + pendingCnt + '）']];
    if (doneCnt > 0) reviewTabs.push(['done', '投稿済み（' + doneCnt + '）']);
    if (photoCnt > 0) reviewTabs.push(['photo', '写真付き（' + photoCnt + '）']);
    // reset filter if invalid
    if (state.reviewFilter !== 'pending' && !(state.reviewFilter === 'done' && doneCnt > 0) && !(state.reviewFilter === 'photo' && photoCnt > 0)) {
      state.reviewFilter = 'pending';
    }

    var list = allReviews.filter(function (r) {
      return state.reviewFilter === 'pending' ? r.status === 'pending' : state.reviewFilter === 'photo' ? r.hasPhoto : r.status === 'done';
    });
    document.getElementById('view-reviews').innerHTML = head(biHead('REVIEWS', 'レビュー管理'), 'レビュー待ち、投稿済み、写真付きレビューを管理します。') +
      tabsHtml(reviewTabs, state.reviewFilter, 'data-review-tab') +
      '<div class="review-list">' + (list.length ? list.map(function (r) {
        return '<article class="review-card"><div class="review-top"><div class="review-product">' + esc(r.product) + '</div><div class="rating">' + (r.rating ? '★'.repeat(r.rating) : 'レビュー待ち') + '</div></div><div class="review-body">' + esc(r.body || '') + '</div><div class="action-row" style="margin-top:12px;"><button style="background:linear-gradient(135deg,#c9a96e,#8b6f47);border:none;cursor:pointer;font-size:11px;letter-spacing:0.1em;color:#fff;font-family:inherit;padding:8px 20px;border-radius:20px;box-shadow:0 3px 10px rgba(139,111,71,.3),inset 0 1px 0 rgba(255,255,255,.2);transition:box-shadow .2s,transform .15s;" type="button" data-review-id="' + esc(r.id) + '">' + (r.status === 'pending' ? 'レビューを書く' : 'レビューを編集') + '</button></div></article>';
      }).join('') : empty('レビューはありません。')) + '</div>';
    document.querySelectorAll('[data-review-tab]').forEach(function (b) { b.addEventListener('click', function () { state.reviewFilter = b.dataset.reviewTab; renderReviews(); }); });
    document.querySelectorAll('[data-review-id]').forEach(function (b) { b.addEventListener('click', function () { openReviewModal(b.dataset.reviewId); }); });
  }

  function openReviewModal(reviewId) {
    var reviews = getReviews();
    var r = reviews.find(function (x) { return x.id === reviewId; }) || { id: reviewId, product: '', rating: 0, body: '' };
    var existing = document.getElementById('reviewModal');
    if (existing) existing.remove();
    var div = document.createElement('div');
    div.id = 'reviewModal';
    div.className = 'modal-mask show';
    div.innerHTML = '<div class="modal"><div class="modal-head"><h3 class="modal-title">レビューを書く</h3><button class="close-btn" id="closeReviewModal">&times;</button></div>' +
      '<p style="font-size:13px;margin-bottom:16px;color:#555;">' + esc(r.product) + '</p>' +
      '<div style="margin-bottom:14px;"><label class="form-label">評価</label>' +
      '<div id="reviewStars" style="display:flex;gap:6px;font-size:28px;cursor:pointer;">' +
      [1,2,3,4,5].map(function(i){ return '<span data-star="'+i+'" style="color:'+(i<=(r.rating||0)?'#8b6f47':'#ddd')+'">★</span>'; }).join('') +
      '</div></div>' +
      '<label class="form-label" for="reviewBody">レビュー内容</label>' +
      '<textarea class="form-input form-textarea" id="reviewBody" placeholder="商品の使い心地、品質などをご記入ください。">' + esc(r.body || '') + '</textarea>' +
      '<button class="auth-btn" id="submitReviewBtn">レビューを投稿する</button></div>';
    document.body.appendChild(div);
    var selectedRating = r.rating || 0;
    div.querySelectorAll('[data-star]').forEach(function (s) {
      s.addEventListener('click', function () {
        selectedRating = Number(s.dataset.star);
        div.querySelectorAll('[data-star]').forEach(function (x) { x.style.color = Number(x.dataset.star) <= selectedRating ? '#8b6f47' : '#ddd'; });
      });
      s.addEventListener('mouseenter', function () {
        div.querySelectorAll('[data-star]').forEach(function (x) { x.style.color = Number(x.dataset.star) <= Number(s.dataset.star) ? '#8b6f47' : '#ddd'; });
      });
      s.addEventListener('mouseleave', function () {
        div.querySelectorAll('[data-star]').forEach(function (x) { x.style.color = Number(x.dataset.star) <= selectedRating ? '#8b6f47' : '#ddd'; });
      });
    });
    document.getElementById('closeReviewModal').addEventListener('click', function () { div.remove(); });
    div.addEventListener('click', function (e) { if (e.target === div) div.remove(); });
    document.getElementById('submitReviewBtn').addEventListener('click', function () {
      var body = document.getElementById('reviewBody').value.trim();
      if (!selectedRating) return showToast('評価を選択してください');
      if (!body) return showToast('レビュー内容を入力してください');
      var list = getLS('hinoka_reviews', []);
      var idx  = list.findIndex(function (x) { return x.id === reviewId; });
      var updated = { id: reviewId, product: r.product, rating: selectedRating, body: body, status: 'done', hasPhoto: false };
      if (idx >= 0) list[idx] = updated; else list.push(updated);
      setLS('hinoka_reviews', list);
      window.dispatchEvent(new Event('reviewUpdated'));
      // ボーナスポイント＋クーポン付与
      var pts = calcPoints();
      pts.total += 50; pts.available += 50;
      setLS('hinoka_points_log', pts);
      grantReviewCoupon();
      div.remove();
      state.reviewFilter = 'done';
      renderReviews(); buildNavigation();
      showToast('レビューを投稿しました！50pt＋¥100OFFクーポンをプレゼント🎁');
    });
  }

  // ══════════════════════════════════
  //  メッセージ
  // ══════════════════════════════════
  function messageCard(m) {
    var typeIcons = { order: '🛍️', logistics: '📦', promo: '🎁', system: '🔔' };
    var icon = typeIcons[m.type] || '📩';
    var unreadStyle = m.unread
      ? ' msg-unread" style="border-left:3px solid #8b6f47;background:#fff;'
      : ' msg-read" style="border-left:3px solid transparent;background:var(--soft);opacity:0.85;';
    return '<article class="message-row' + unreadStyle + 'cursor:pointer;" data-msg-id="' + esc(m.id) + '">' +
      '<div class="message-top">' +
      '<div class="message-title">' + icon + ' ' + esc(m.title) + '</div>' +
      (m.unread ? '<span class="unread-tag">未読</span>' : '') +
      '</div>' +
      '<div class="message-body" style="white-space:pre-line;">' + esc((m.body || '').substring(0, 60)) + (m.body && m.body.length > 60 ? '...' : '') + '</div>' +
      '<div style="font-size:10px;color:var(--muted);margin-top:4px;">' + esc(m.time || '') + '</div>' +
      '</article>';
  }

  function showMessageDetail(msgId) {
    var msgs = getMessages();
    var m    = msgs.find(function (x) { return x.id === msgId; });
    if (!m) return;
    var stored = getLS('hinoka_messages', []);
    stored.forEach(function (x) { if (x.id === msgId) x.unread = false; });
    setLS('hinoka_messages', stored);
    window.dispatchEvent(new Event('messageUpdated'));
    buildNavigation();
    var existing = document.getElementById('msgDetailModal');
    if (existing) existing.remove();
    var typeLabels = { order: '注文', logistics: '配送', promo: 'キャンペーン', system: 'お知らせ' };
    var div = document.createElement('div');
    div.id = 'msgDetailModal';
    div.className = 'modal-mask show';
    div.innerHTML = '<div class="modal"><div class="modal-head">' +
      '<h3 class="modal-title">' + esc(m.title) + '</h3>' +
      '<button class="close-btn" id="closeMsgModal">&times;</button>' +
      '</div>' +
      '<div style="font-size:11px;color:var(--muted);margin-bottom:16px;">' +
      '<span style="background:var(--soft);border:1px solid var(--line);padding:3px 8px;margin-right:8px;">' + esc(typeLabels[m.type] || 'お知らせ') + '</span>' +
      esc(m.time || '') + '</div>' +
      '<div style="font-size:13px;line-height:2;white-space:pre-line;min-height:80px;">' + esc(m.body || '') + '</div>' +
      (m.orderId ? '<a class="mini-btn primary" style="display:inline-block;margin-top:16px;" href="#orders" id="msgGoOrder">注文を確認する</a>' : '') +
      '</div>';
    document.body.appendChild(div);
    document.getElementById('closeMsgModal').addEventListener('click', function () { div.remove(); renderMessages(); });
    div.addEventListener('click', function (e) { if (e.target === div) { div.remove(); renderMessages(); } });
    if (m.orderId && document.getElementById('msgGoOrder')) {
      document.getElementById('msgGoOrder').addEventListener('click', function (e) { e.preventDefault(); div.remove(); switchView('orders'); });
    }
  }

  function renderMessages() {
    autoGenerateMessages();
    var allMsgs = getMessages();
    var list    = allMsgs.filter(function (m) { return state.messageFilter === 'all' || m.type === state.messageFilter; });

    document.getElementById('view-messages').innerHTML =
      head(biHead('MESSAGE CENTER', 'メッセージ'), '注文、配送、キャンペーン、システム通知を確認できます。', '<button class="view-action-btn" id="markReadBtn" type="button">すべて既読</button>') +
      tabsHtml(messageTabs, state.messageFilter, 'data-message-tab') +
      (list.length ? '<div class="message-list">' + list.map(messageCard).join('') + '</div>' : empty('メッセージはありません。'));

    document.querySelectorAll('[data-message-tab]').forEach(function (b) { b.addEventListener('click', function () { state.messageFilter = b.dataset.messageTab; renderMessages(); }); });
    document.getElementById('markReadBtn').addEventListener('click', function () {
      setLS('hinoka_messages', getMessages().map(function (m) { m.unread = false; return m; }));
      window.dispatchEvent(new Event('messageUpdated'));
      buildNavigation(); renderMessages();
    });
    document.querySelectorAll('[data-msg-id]').forEach(function (card) { card.addEventListener('click', function () { showMessageDetail(card.dataset.msgId); }); });
  }

  // ══════════════════════════════════
  //  会員ランク（プレミアムUI）
  // ══════════════════════════════════
  function renderMember() {
    var spend        = calcTotalSpend();
    var rank         = getMemberRank(spend);
    var nextRankIdx  = RANK_TABLE.findIndex(function (r) { return r.name === rank.name; }) + 1;
    var nextRank     = RANK_TABLE[nextRankIdx];
    var progress     = nextRank ? Math.min(100, Math.round((spend - rank.min) / (nextRank.min - rank.min) * 100)) : 100;
    var rankColors   = { BRONZE: '#cd7f32', SILVER: '#aaa', GOLD: '#8b6f47', DIAMOND: '#6b8cae' };
    var rankColor    = rankColors[rank.name] || '#8b6f47';
    var rankMedals   = { BRONZE: '✦', SILVER: '✦✦', GOLD: '✦✦✦', DIAMOND: '◆' };
    var rankMedal    = rankMedals[rank.name] || '✦';

    var heroCard =
      '<div class="member-hero-card">' +
        '<div class="member-rank-badge">' + rankMedal + '</div>' +
        '<div class="member-rank-label">' + rank.label.toUpperCase() + ' MEMBER</div>' +
        '<div class="member-rank-sub">累計購入金額：¥' + Number(spend).toLocaleString() + '</div>' +
        (nextRank ?
          '<div class="member-progress-track"><div class="member-progress-fill" style="width:' + progress + '%"></div></div>' +
          '<div class="member-progress-labels"><span>¥' + Number(rank.min).toLocaleString() + '</span><span>' + nextRank.label + 'まで ¥' + Number(nextRank.min - spend).toLocaleString() + '</span><span>¥' + Number(nextRank.min).toLocaleString() + '</span></div>' :
          '<div style="font-size:12px;color:#c9a96e;">✨ 最高ランク達成！全ての特典をご利用いただけます。</div>'
        ) +
      '</div>';

    document.getElementById('view-member').innerHTML =
      head(biHead('MEMBER CENTER', '会員ランク'), '会員ランク、アップグレード条件、特典を確認できます。') +
      heroCard +
      '<div class="member-benefit-grid">' +
        '<div class="mbc"><div class="mbc-icon">✦</div><div class="mbc-val">' + rank.rate + 'x</div><div class="mbc-label">ポイント倍率</div></div>' +
        '<div class="mbc"><div class="mbc-icon">◈</div><div class="mbc-val">' + rank.discount + '%</div><div class="mbc-label">会員割引</div></div>' +
        '<div class="mbc"><div class="mbc-icon">◉</div><div class="mbc-val">' + (rank.freeShip === 999 ? '∞' : rank.freeShip) + '</div><div class="mbc-label">送料無料回数/月</div></div>' +
        '<div class="mbc"><div class="mbc-icon">❋</div><div class="mbc-val">' + (rank.name === 'BRONZE' ? '—' : '🎁') + '</div><div class="mbc-label">誕生日特典</div></div>' +
      '</div>' +
      '<div class="rank-table-wrap"><div class="section-title-row"><h3 class="section-title" style="color:#c9a96e;letter-spacing:.12em;">ランク別特典一覧</h3></div>' +
        '<div style="overflow-x:auto;">' +
          '<table style="width:100%;border-collapse:collapse;font-size:12px;">' +
            '<thead><tr style="background:linear-gradient(135deg,#1e293b,#0f172a);">' +
              '<th style="padding:12px 14px;text-align:left;font-weight:600;color:#c9a96e;letter-spacing:.08em;">ランク</th>' +
              '<th style="padding:12px 14px;text-align:center;font-weight:600;color:#c9a96e;letter-spacing:.08em;">昇格条件</th>' +
              '<th style="padding:12px 14px;text-align:center;font-weight:600;color:#c9a96e;letter-spacing:.08em;">会員割引</th>' +
              '<th style="padding:12px 14px;text-align:center;font-weight:600;color:#c9a96e;letter-spacing:.08em;">ポイント倍率</th>' +
              '<th style="padding:12px 14px;text-align:center;font-weight:600;color:#c9a96e;letter-spacing:.08em;">送料無料</th>' +
            '</tr></thead><tbody>' +
            RANK_TABLE.map(function (r) {
              var isCurrent = r.name === rank.name;
              var color = rankColors[r.name] || '#8b6f47';
              return '<tr style="border-bottom:1px solid rgba(201,169,110,.12);' + (isCurrent ? 'background:rgba(201,169,110,.07);' : '') + '">' +
                '<td style="padding:10px 14px;color:' + color + ';font-weight:' + (isCurrent ? '700' : '400') + ';font-size:13px;">' + r.label + (isCurrent ? ' <span style="font-size:10px;background:' + color + ';color:#fff;padding:1px 6px;border-radius:20px;vertical-align:middle;">現在</span>' : '') + '</td>' +
                '<td style="padding:10px 14px;text-align:center;color:#aaa;">¥' + Number(r.min).toLocaleString() + '〜</td>' +
                '<td style="padding:10px 14px;text-align:center;font-weight:600;">' + r.discount + '%</td>' +
                '<td style="padding:10px 14px;text-align:center;font-weight:600;">' + r.rate + 'x</td>' +
                '<td style="padding:10px 14px;text-align:center;">' + (r.freeShip === 999 ? '無制限' : r.freeShip + '回/月') + '</td>' +
              '</tr>';
            }).join('') +
            '</tbody></table>' +
        '</div>' +
      '</div>';
  }

  // ══════════════════════════════════
  //  カスタマーサポート（プレミアムUI）
  // ══════════════════════════════════
  function renderService() {
    var services = [
      { icon: '✉️', title: 'メールサポート', desc: 'ご注文・配送・返品のご相談はメールで。通常24時間以内にご返答します。', href: 'mailto:info@hinokaglobal.com', btn: 'メールを送る →' },
      { icon: '📋', title: 'お問い合わせ', desc: '注文番号・お問い合わせ内容をご記入の上お送りください。', href: 'mailto:info@hinokaglobal.com', btn: 'メールを送る →' },
      { icon: '📚', title: 'ヘルプセンター', desc: 'ご利用ガイド・配送・支払い方法はこちら。', href: 'legal.html#shipping', btn: 'ページを開く →' },
      { icon: '❓', title: 'よくある質問', desc: 'クーポン・ポイント・会員ランクなど。', href: 'legal.html', btn: 'FAQを見る →' }
    ];
    document.getElementById('view-service').innerHTML =
      head(biHead('CUSTOMER SERVICE', 'サポート'), 'サポート、ヘルプ、返品・返金ポリシーはこちらです。') +
      '<div class="service-grid">' + services.map(function (s) {
        return '<article class="service-card-v2">' +
          '<div class="service-icon-lg">' + s.icon + '</div>' +
          '<h3>' + esc(s.title) + '</h3>' +
          '<p>' + esc(s.desc) + '</p>' +
          '<a class="service-cta-link" href="' + esc(s.href) + '">' + esc(s.btn) + '</a>' +
        '</article>';
      }).join('') + '</div>';
  }

  // ══════════════════════════════════
  //  アカウント設定（プレミアムUI）
  // ══════════════════════════════════
  function renderSettings() {
    var user = state.user;
    var logs = getLS('hinoka_login_log', []);
    var name    = user.displayName || (user.email ? user.email.split('@')[0] : 'MEMBER');
    var initial = (name || 'H').charAt(0).toUpperCase();
    var spend   = calcTotalSpend();
    var rank    = getMemberRank(spend);
    var rankColors = { BRONZE: '#cd7f32', SILVER: '#9e9e9e', GOLD: '#8b6f47', DIAMOND: '#6b8cae' };
    var rankColor  = rankColors[rank.name] || '#8b6f47';
    var rankMedals = { BRONZE: '✦', SILVER: '✦✦', GOLD: '✦✦✦', DIAMOND: '◆' };

    function parseDevice(ua) {
      if (!ua) return 'パソコン';
      if (/iPhone/i.test(ua)) return 'iPhone';
      if (/Android/i.test(ua)) return 'Android';
      if (/Mobile/i.test(ua)) return 'モバイル端末';
      return 'パソコン';
    }
    function deviceIcon(ua) {
      var d = parseDevice(ua);
      if (d === 'iPhone') return '📱';
      if (d === 'Android') return '📱';
      if (d === 'モバイル端末') return '📱';
      return '💻';
    }

    var loginTimelineHtml = logs.length
      ? '<div class="login-timeline">' + logs.map(function(l) {
          return '<div class="login-entry">' +
            '<div class="login-entry-icon">' + deviceIcon(l.ua) + '</div>' +
            '<div><div class="login-entry-time">' + esc(l.time) + '</div>' +
            '<div class="login-entry-device">' + esc(parseDevice(l.ua)) + '</div></div>' +
          '</div>';
        }).join('') + '</div>'
      : empty('ログイン記録はありません。');

    var profileCard =
      '<div class="settings-profile-card">' +
        '<div class="settings-avatar-ring">' + esc(initial) + '</div>' +
        '<div class="settings-profile-info">' +
          '<div class="settings-profile-name">' + esc(name) + '</div>' +
          '<div class="settings-profile-email">' + esc(user.email || '') + '</div>' +
          '<div class="settings-profile-badge" style="color:' + rankColor + ';">' + rankMedals[rank.name] + ' ' + rank.label.toUpperCase() + ' MEMBER</div>' +
        '</div>' +
      '</div>';

    var premBtn = 'background:linear-gradient(135deg,#c9a96e,#8b6f47);border:none;color:#fff;padding:6px 18px;border-radius:20px;font-size:11px;letter-spacing:0.08em;cursor:pointer;font-family:inherit;box-shadow:0 2px 8px rgba(139,111,71,.3);transition:box-shadow .2s,transform .15s;white-space:nowrap;';

    document.getElementById('view-settings').innerHTML =
      head(biHead('ACCOUNT SETTINGS', 'アカウント設定'), 'プロフィール、安全設定、ログイン履歴を管理します。') +
      profileCard +
      '<div class="section-block settings-info-block">' +
        '<div class="section-title-row"><h3 class="section-title">プロフィール・セキュリティ</h3></div>' +
        '<div class="info-table">' +
          infoRow('ニックネーム',   esc(user.displayName || '未設定'), '') +
          infoRow('メールアドレス', esc(user.email || ''), '') +
          infoRow('メール確認',     user.emailVerified ? '確認済み ✓' : '未確認', '<button id="resendVerifyBtn" style="' + premBtn + '" type="button">再送信</button>') +
          infoRow('パスワード',     '再設定メールを送信します', '<button id="changePwBtn" style="' + premBtn + '" type="button">変更</button>') +
          infoRow('生年月日',       (function(){ var p=getLS('hinoka_profile',{}); return p.birthday ? p.birthday.replace('-','/') + ' 🎂' : '未設定'; })(), '') +
          infoRow('メールマガジン', '<span id="marketingLabel">受信しない</span>', '<label><input id="marketingToggle" type="checkbox" style="accent-color:#8b6f47;width:16px;height:16px;cursor:pointer;"></label>') +
        '</div>' +
      '</div>' +
      '<div class="section-block settings-info-block">' +
        '<div class="section-title-row"><h3 class="section-title">LOGIN RECORD <span style="font-size:10px;color:var(--muted);font-weight:400;">ログイン履歴</span></h3></div>' +
        loginTimelineHtml +
      '</div>' +
      '<div class="settings-logout-mobile">' +
        '<button id="settingsLogoutBtn" type="button" style="width:100%;padding:14px;background:transparent;border:1px solid rgba(176,90,74,.4);color:#b05a4a;border-radius:10px;font-size:12px;letter-spacing:.12em;cursor:pointer;font-family:inherit;transition:background .2s,color .2s;">ログアウト</button>' +
      '</div>';

    var settingsLogoutBtn = document.getElementById('settingsLogoutBtn');
    if (settingsLogoutBtn) settingsLogoutBtn.addEventListener('click', function () {
      if (confirm('ログアウトしますか？')) auth.signOut();
    });
    document.getElementById('resendVerifyBtn').addEventListener('click', function () {
      if (auth.currentUser) auth.currentUser.sendEmailVerification().then(function () { showToast('確認メールを再送信しました'); }).catch(function () { showToast('送信に失敗しました'); });
    });
    document.getElementById('changePwBtn').addEventListener('click', function () {
      if (!user.email) return;
      auth.sendPasswordResetEmail(user.email).then(function () {
        showToast('パスワード変更メールを送信しました。変更後は全デバイスで再ログインが必要です。');
        // パスワード変更メール送信後、ローカルセッション情報をクリアして強制ログアウト
        setTimeout(function () {
          localStorage.removeItem(TS_LOGIN_KEY);
          localStorage.removeItem(TS_ACTIVE_KEY);
          // known devices リストをリセット（全デバイス再認証）
          if (user.uid) localStorage.removeItem('_hinoka_known_' + user.uid);
          auth.signOut();
        }, 3000);
      }).catch(function () { showToast('送信に失敗しました'); });
    });
    var mktToggle = document.getElementById('marketingToggle');
    var mktLabel  = document.getElementById('marketingLabel');
    db.collection('users').doc(user.uid).get().then(function (snap) {
      if (snap.exists && snap.data().marketingConsent) { mktToggle.checked = true; mktLabel.textContent = '受信する'; }
    }).catch(function () {});
    mktToggle.addEventListener('change', function () {
      mktLabel.textContent = this.checked ? '受信する' : '受信しない';
      db.collection('users').doc(user.uid).set({ marketingConsent: this.checked }, { merge: true }).then(function () { showToast('設定を保存しました'); });
    });
  }

  function infoRow(label, value, action) {
    return '<div class="info-row"><span class="info-label">' + label + '</span><span>' + value + '</span><span>' + action + '</span></div>';
  }

  function renderCurrentView() {
    if      (state.activeView === 'overview')  renderOverview();
    else if (state.activeView === 'orders')    renderOrders();
    else if (state.activeView === 'assets')    renderAssets();
    else if (state.activeView === 'wishlist')  renderWishlist();
    else if (state.activeView === 'history')   renderHistory();
    else if (state.activeView === 'cart')      renderCart();
    else if (state.activeView === 'addresses') renderAddresses();
    else if (state.activeView === 'reviews')   renderReviews();
    else if (state.activeView === 'messages')  renderMessages();
    else if (state.activeView === 'member')    renderMember();
    else if (state.activeView === 'service')   renderService();
    else if (state.activeView === 'settings')  renderSettings();
  }

  function createUserDoc(user, extra) {
    extra = extra || {};
    var ref = db.collection('users').doc(user.uid);
    return ref.get().then(function (snap) {
      if (snap.exists) return { isNew: false };
      return ref.set({
        uid:              user.uid,
        email:            user.email,
        displayName:      user.displayName || '',
        lastName:         extra.lastName  || '',
        firstName:        extra.firstName || '',
        createdAt:        firebase.firestore.FieldValue.serverTimestamp(),
        emailVerified:    user.emailVerified,
        marketingConsent: !!extra.marketingConsent,
        provider:         extra.provider || 'email'
      }).then(function () { return { isNew: true }; });
    });
  }

  function handleGoogleAuth() {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function (result) {
      if (result.user) createUserDoc(result.user, { provider: 'google' });
    }).catch(function (err) {
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') return;
      showError('login-error', authError(err.code));
    });
  }

  function showLogin() {
    var load = document.getElementById('loadingSection');
    var auth_ = document.getElementById('authSection');
    var shell = document.getElementById('accountShell');
    if (load)  load.style.display  = 'none';
    if (shell) shell.style.display = 'none';
    if (auth_) auth_.style.display = 'block';
    document.body.classList.remove('is-logged-in');
    document.body.classList.add('is-logged-out');
  }

  function showAccount(user) {
    if (checkExpiry()) return;
    user.reload().then(function () {
      var u = auth.currentUser || user;
      state.user = u;
      // 新デバイス検出：メール確認済みユーザーのみ検査
      if (!isKnownDevice(u.uid)) {
        registerDevice(u.uid); // 初回は登録して通過、2回目以降は既知
        // Google ログインは検証不要（Google 側で保証）
        if (u.providerData && u.providerData[0] && u.providerData[0].providerId === 'google.com') {
          _showAccountUI(u); return;
        }
        // メール未確認の場合はモーダルを表示してブロック
        if (!u.emailVerified) {
          showNewDeviceModal(u); return;
        }
      }
      touchActivity();
      _showAccountUI(u);
    }).catch(function () {
      state.user = user;
      touchActivity();
      _showAccountUI(user);
    });
  }

  function _showAccountUI(user) {
    var load = document.getElementById('loadingSection');
    var auth_ = document.getElementById('authSection');
    var shell = document.getElementById('accountShell');
    if (load)  load.style.display  = 'none';
    if (auth_) auth_.style.display = 'none';
    if (shell) shell.style.display = 'block';
    document.body.classList.remove('is-logged-out');
    document.body.classList.add('is-logged-in');
    window.scrollTo(0, 0);
    recordLogin();
    checkBirthdayCoupon();
    checkRankUpgradeCoupon();
    buildNavigation();
    // 未領取クーポン通知（1.5秒後）
    setTimeout(function() {
      var all = getLS('hinoka_coupons', []);
      var unclaimed = all.filter(function(c){ return !c.used && c.claimed === false && !isCouponExpired(c); });
      if (unclaimed.length > 0) {
        showToast('🎟️ ' + unclaimed.length + '枚のクーポンが受け取り待ちです！マイページ→クーポンへ');
      }
    }, 1500);
    renderUser(user);
    var validViews = navItems.map(function (n) { return n.id; });
    switchView(validViews.indexOf(state.activeView) !== -1 ? state.activeView : 'overview');

    // Re-render 2s after login to catch Firestore sync data arriving late
    setTimeout(function () { if (state.user) { buildNavigation(); renderCurrentView(); } }, 2000);

    // Re-render current view whenever firebase-sync downloads remote data
    var syncEvents = ['cartUpdated','orderUpdated','wishlistUpdated','addressUpdated',
                      'reviewUpdated','messageUpdated','couponUpdated','pointsUpdated',
                      'balanceUpdated','historyUpdated','profileUpdated'];
    syncEvents.forEach(function (evt) {
      window.addEventListener(evt, function () {
        buildNavigation();
        renderCurrentView();
        if (evt === 'profileUpdated') { checkBirthdayCoupon(); renderUser(state.user); }
      });
    });
  }

  function bindAuthUi() {
    document.querySelectorAll('[data-auth-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.dataset.authTab;
        document.querySelectorAll('.auth-tab').forEach(function (t) { t.classList.toggle('active', t.dataset.authTab === target); });
        document.querySelectorAll('.auth-panel').forEach(function (p) { p.classList.toggle('active', p.id === 'auth-' + target); });
      });
    });
    document.querySelectorAll('.pw-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var input = document.getElementById(btn.dataset.target);
        input.type = input.type === 'password' ? 'text' : 'password';
        btn.textContent = input.type === 'password' ? '表示' : '非表示';
      });
    });
    document.getElementById('googleLoginBtn').addEventListener('click', handleGoogleAuth);
    document.getElementById('googleRegisterBtn').addEventListener('click', handleGoogleAuth);
    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('registerBtn').addEventListener('click', register);
    document.getElementById('forgotPwLink').addEventListener('click', function () {
      document.getElementById('loginCard').style.display  = 'none';
      document.getElementById('resetPanel').style.display = 'block';
      document.getElementById('reset-email').value = document.getElementById('login-email').value.trim();
    });
    document.getElementById('backToLogin').addEventListener('click', function () {
      document.getElementById('resetPanel').style.display = 'none';
      document.getElementById('loginCard').style.display  = 'block';
    });
    document.getElementById('resetSendBtn').addEventListener('click', resetPassword);
    document.getElementById('logoutBtn').addEventListener('click', function () { auth.signOut(); });
    document.getElementById('saveAddressBtn').addEventListener('click', saveAddress);
    document.querySelectorAll('[data-close-modal]').forEach(function (b) { b.addEventListener('click', closeAddressModal); });
    document.getElementById('addressModal').addEventListener('click', function (e) { if (e.target === this) closeAddressModal(); });

    document.getElementById('reg-pass').addEventListener('input', function () {
      var v    = this.value;
      var bars = [1, 2, 3].map(function (i) { return document.getElementById('pwBar' + i); });
      var lbl  = document.getElementById('pwLabel');
      bars.forEach(function (b) { b.className = 'pw-bar'; });
      if (!v) { lbl.textContent = ''; return; }
      var strong = v.length >= 10 && /[A-Z]/.test(v) && /[0-9]/.test(v) && /[^A-Za-z0-9]/.test(v);
      if (strong) { bars.forEach(function (b) { b.classList.add('strong'); }); lbl.textContent = '強い'; }
      else if (v.length >= 8) { bars[0].classList.add('medium'); bars[1].classList.add('medium'); lbl.textContent = '普通'; }
      else { bars[0].classList.add('weak'); lbl.textContent = '弱い'; }
    });
  }

  function login() {
    hideMsg('login-error');
    var email      = document.getElementById('login-email').value.trim();
    var pass       = document.getElementById('login-pass').value;
    var rememberEl = document.getElementById('rememberMeCheck');
    var remember   = rememberEl ? rememberEl.checked : true;
    if (!email || !pass) return showError('login-error', 'メールアドレスとパスワードを入力してください。');
    setLoading('loginBtn', true);
    var persistence = remember
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION;
    auth.setPersistence(persistence)
      .then(function () { return auth.signInWithEmailAndPassword(email, pass); })
      .then(function () {
        var now = Date.now().toString();
        localStorage.setItem(TS_LOGIN_KEY,  now);
        localStorage.setItem(TS_ACTIVE_KEY, now);
      })
      .catch(function (err) { showError('login-error', authError(err.code)); })
      .finally(function () { setLoading('loginBtn', false); });
  }

  function register() {
    hideMsg('reg-error');
    var last       = document.getElementById('reg-last').value.trim();
    var first      = document.getElementById('reg-first').value.trim();
    var email      = document.getElementById('reg-email').value.trim();
    var pass       = document.getElementById('reg-pass').value;
    var pass2      = document.getElementById('reg-pass2').value;
    var privacy    = document.getElementById('consentPrivacy').checked;
    var marketing  = document.getElementById('consentMarketing').checked;
    if (!last || !first)  return showError('reg-error', 'お名前を入力してください。');
    if (!email)           return showError('reg-error', 'メールアドレスを入力してください。');
    if (pass.length < 8)  return showError('reg-error', 'パスワードは8文字以上で設定してください。');
    if (pass !== pass2)   return showError('reg-error', 'パスワードが一致しません。');
    if (!privacy)         return showError('reg-error', 'プライバシーポリシーと利用規約への同意が必要です。');
    setLoading('registerBtn', true);
    auth.createUserWithEmailAndPassword(email, pass).then(function (cred) {
      var user = cred.user;
      return user.updateProfile({ displayName: last + ' ' + first })
        .then(function () { return createUserDoc(user, { lastName: last, firstName: first, marketingConsent: marketing, provider: 'email' }); })
        .then(function () { return user.sendEmailVerification(); })
        .then(function () { showSuccess('reg-success', '登録が完了しました。確認メールを送信しました。'); });
    }).catch(function (err) {
      showError('reg-error', authError(err.code));
    }).finally(function () { setLoading('registerBtn', false); });
  }

  function resetPassword() {
    hideMsg('reset-error');
    hideMsg('reset-success');
    var email = document.getElementById('reset-email').value.trim();
    if (!email) return showError('reset-error', 'メールアドレスを入力してください。');
    setLoading('resetSendBtn', true);
    auth.sendPasswordResetEmail(email).then(function () {
      document.getElementById('resetFormArea').style.display = 'none';
      showSuccess('reset-success', email + ' にパスワード再設定メールを送信しました。');
    }).catch(function (err) {
      showError('reset-error', authError(err.code));
    }).finally(function () { setLoading('resetSendBtn', false); });
  }

  bindAuthUi();
  auth.onAuthStateChanged(function (user) { user ? showAccount(user) : showLogin(); });
})();
