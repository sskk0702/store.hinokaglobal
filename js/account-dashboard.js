(function () {
  var auth = firebase.auth();
  var db = firebase.firestore();

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
    { id: 'overview', label: 'ホーム' },
    { id: 'orders', label: 'ご注文履歴', countKey: 'ordersTodo' },
    { id: 'assets', label: 'クーポン・ポイント' },
    { id: 'wishlist', label: 'お気に入り', countKey: 'wishlist' },
    { id: 'history', label: '閲覧履歴' },
    { id: 'cart', label: 'ショッピングバッグ', countKey: 'cart' },
    { id: 'addresses', label: 'お届け先住所' },
    { id: 'reviews', label: 'レビュー管理', countKey: 'reviews' },
    { id: 'messages', label: 'メッセージ', countKey: 'messages' },
    { id: 'member', label: '会員ランク' },
    { id: 'service', label: 'カスタマーサポート' },
    { id: 'settings', label: 'アカウント設定' }
  ];

  var orderTabs = [
    ['all', 'すべて'],
    ['pay', 'お支払い待ち'],
    ['ship', '発送待ち'],
    ['receive', '受け取り待ち'],
    ['review', 'レビュー待ち'],
    ['done', '完了'],
    ['cancel', 'キャンセル'],
    ['refund', '返品・返金']
  ];

  var assetTabs = [
    ['coupons', 'クーポン'],
    ['points', 'ポイント'],
    ['balance', '残高'],
    ['giftcards', 'ギフトカード']
  ];

  var reviewTabs = [
    ['pending', 'レビュー待ち'],
    ['done', '投稿済み'],
    ['photo', '写真付き']
  ];

  var messageTabs = [
    ['all', 'すべて'],
    ['order', '注文'],
    ['logistics', '配送'],
    ['promo', 'キャンペーン'],
    ['system', 'お知らせ']
  ];

  var fallbackOrders = [
    makeOrder('HK20260601001', '2026/06/01 14:32', 'pay', 'お支払い待ち', 12800, [
      { id: 'p001', name: 'HINOKA Linen Shirt', spec: 'Ivory / M', price: 12800, qty: 1, img: 'assets/images/placeholder.jpg' }
    ]),
    makeOrder('HK20260528006', '2026/05/28 10:16', 'ship', '発送待ち', 25860, [
      { id: 'p002', name: 'Cotton Wide Pants', spec: 'Black / L', price: 15860, qty: 1, img: 'assets/images/placeholder.jpg' },
      { id: 'p003', name: 'Soft Knit Top', spec: 'Gray / F', price: 10000, qty: 1, img: 'assets/images/placeholder.jpg' }
    ]),
    makeOrder('HK20260518003', '2026/05/18 19:08', 'receive', '受け取り待ち', 8600, [
      { id: 'p004', name: 'Minimal Tote Bag', spec: 'Natural', price: 8600, qty: 1, img: 'assets/images/placeholder.jpg' }
    ])
  ];

  var fallbackCoupons = [
    { amount: '¥30', title: '200円以上で30円OFF', rule: '200円以上のご注文で利用可能', date: '有効期限：2026/08/31' },
    { amount: '10%', title: '会員限定10%OFF', rule: '対象カテゴリーで利用可能', date: '有効期限：2026/07/15' },
    { amount: '¥500', title: 'バースデークーポン', rule: '8,000円以上のご注文で利用可能', date: '有効期限：2026/06/30' }
  ];

  var fallbackMessages = [
    { id: 'm1', type: 'order', title: 'お支払い待ちのご注文があります', body: '注文 HK20260601001 のお支払いを24時間以内にお願いいたします。', time: '2026/06/01 14:35', unread: true },
    { id: 'm2', type: 'logistics', title: 'お荷物が配送センターに到着しました', body: '注文 HK20260518003 は配送中です。', time: '2026/05/20 09:12', unread: true },
    { id: 'm3', type: 'promo', title: '会員限定クーポンをお届けしました', body: '10%OFFクーポンがアカウントに追加されました。', time: '2026/05/18 12:00', unread: false }
  ];

  var fallbackReviews = [
    { id: 'r1', status: 'pending', product: 'HINOKA Linen Shirt', rating: 0, body: 'まだレビューされていません。', hasPhoto: false },
    { id: 'r2', status: 'done', product: 'Minimal Tote Bag', rating: 5, body: '質感がよく、毎日使いやすいです。', hasPhoto: false },
    { id: 'r3', status: 'photo', product: 'Soft Knit Top', rating: 4, body: '色味がきれいで着心地も良いです。', hasPhoto: true }
  ];

  var fallbackHistory = [
    { date: '今日', items: [
      { id: 'B001', name: 'プロ用ラベルプリンター', price: 12800, time: '21:08', img: 'assets/images/b001-1.jpg' },
      { id: 'L001', name: 'ナチュラルコットンエコバッグ', price: 2800, time: '19:42', img: 'assets/images/l001-1.jpg' }
    ]},
    { date: '昨日', items: [
      { id: 'P001', name: 'プレミアム ドッグフード 小粒 2kg', price: 3850, time: '16:20', img: 'assets/images/p001-1.jpg' }
    ]}
  ];

  var fallbackAddresses = [
    { id: 'a1', name: '山田 花子', phone: '090-1234-5678', zip: '150-0001', pref: '東京都', city: '渋谷区', detail: '神宮前1-2-3', isDefault: true }
  ];

  function makeOrder(id, date, status, statusText, total, items) {
    return { id: id, date: date, status: status, statusText: statusText, paymentMethod: 'Credit Card', total: total, items: items };
  }

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
      pay: 'お支払い待ち',
      ship: '発送待ち',
      receive: '受け取り待ち',
      review: 'レビュー待ち',
      done: '完了',
      cancel: 'キャンセル',
      refund: '返品・返金'
    })[status] || '受付済み';
  }

  function getOrders() {
    var local = getLS('hinoka_orders', []);
    if (!local.length) return fallbackOrders;
    return local.map(function (o, i) {
      var status = normalizeStatus(o);
      return {
        id: o.ref || o.id || ('HKLOCAL' + i),
        date: o.date || '',
        status: status,
        statusText: o.statusText || statusText(status),
        paymentMethod: o.paymentMethod || '',
        total: o.total || 0,
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
        return {
          id: p.id,
          name: p.name,
          price: p.price,
          oldPrice: p.oldPrice || null,
          img: (p.images && p.images[0]) || p.mainImg || 'assets/images/placeholder.jpg',
          stock: '在庫あり'
        };
      });
    }
    return [
      { id: 'B001', name: 'プロ用ラベルプリンター', price: 12800, oldPrice: 14800, img: 'assets/images/b001-1.jpg', stock: '在庫あり' },
      { id: 'L001', name: 'ナチュラルコットンエコバッグ', price: 2800, oldPrice: null, img: 'assets/images/l001-1.jpg', stock: '残りわずか' }
    ];
  }

  function getCartItems() { return getLS('cartItems', []); }
  function getAddresses() { return getLS('hinoka_addresses', fallbackAddresses); }
  function getMessages() { return getLS('hinoka_messages', fallbackMessages); }
  function getReviews() { return getLS('hinoka_reviews', fallbackReviews); }
  function getHistory() { return getLS('hinoka_browsing_history', fallbackHistory); }

  function showToast(text) {
    var el = document.getElementById('toast');
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(function () { el.classList.remove('show'); }, 2200);
  }

  function showError(id, text) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.style.display = 'block';
  }
  function showSuccess(id, text) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.style.display = 'block';
  }
  function hideMsg(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.style.display = 'none';
    el.textContent = '';
  }
  function setLoading(btnId, loading) {
    var btn = document.getElementById(btnId);
    if (!btn) return;
    if (loading) {
      btn.dataset.originalText = btn.textContent;
      btn.textContent = '処理中...';
      btn.disabled = true;
    } else {
      btn.textContent = btn.dataset.originalText || btn.textContent;
      btn.disabled = false;
    }
  }
  function authError(code) {
    return ({
      'auth/user-not-found': 'アカウントが見つかりません。',
      'auth/wrong-password': 'パスワードが正しくありません。',
      'auth/invalid-login-credentials': 'メールアドレスまたはパスワードが正しくありません。',
      'auth/email-already-in-use': 'このメールアドレスはすでに登録されています。',
      'auth/weak-password': 'パスワードは8文字以上で設定してください。',
      'auth/invalid-email': 'メールアドレスの形式が正しくありません。',
      'auth/too-many-requests': 'しばらく時間をおいてから再度お試しください。'
    })[code] || 'エラーが発生しました。もう一度お試しください。';
  }

  function counts() {
    var orders = getOrders();
    return {
      ordersTodo: orders.filter(function (o) { return ['pay', 'ship', 'receive', 'review', 'refund'].indexOf(o.status) !== -1; }).length,
      wishlist: getWishlistProducts().length,
      cart: getCartItems().reduce(function (s, i) { return s + Number(i.qty || 1); }, 0),
      reviews: getReviews().filter(function (r) { return r.status === 'pending'; }).length,
      messages: getMessages().filter(function (m) { return m.unread; }).length
    };
  }

  function buildNavigation() {
    var c = counts();
    var html = navItems.map(function (item) {
      var badge = item.countKey && c[item.countKey] ? '<span class="nav-count">' + c[item.countKey] + '</span>' : '';
      var icon = NAV_ICONS[item.id] ? '<span class="nav-icon">' + NAV_ICONS[item.id] + '</span>' : '';
      return '<button class="nav-btn" type="button" data-view="' + item.id + '">' + icon + '<span class="nav-label">' + item.label + '</span>' + badge + '</button>';
    }).join('');
    document.getElementById('sideNav').innerHTML = html;
    document.getElementById('mobileNav').innerHTML = html;
    document.querySelectorAll('.nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { switchView(btn.dataset.view); });
    });
  }

  function switchView(viewId) {
    state.activeView = viewId;
    location.hash = viewId;
    document.querySelectorAll('.view-panel').forEach(function (p) { p.classList.toggle('active', p.id === 'view-' + viewId); });
    document.querySelectorAll('.nav-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.view === viewId); });
    renderCurrentView();
  }

  function renderUser(user) {
    var name = user.displayName || (user.email ? user.email.split('@')[0] : 'HINOKA MEMBER');
    var photo = user.photoURL || '';
    var initial = (name || 'H').charAt(0).toUpperCase();
    document.getElementById('sideAvatar').innerHTML = photo ? '<img src="' + esc(photo) + '" alt="">' : esc(initial);
    document.getElementById('sideName').textContent = name;
    document.getElementById('sideEmail').textContent = user.email || '';
  }

  function head(title, desc, action) {
    return '<div class="view-head"><div><h1 class="view-title">' + title + '</h1><p class="view-desc">' + desc + '</p></div>' + (action || '') + '</div>';
  }

  function renderOverview() {
    var orders = getOrders();
    var wish = getWishlistProducts();
    var messages = getMessages();
    var totalSpend = orders.reduce(function (s, o) { return s + Number(o.total || 0); }, 0);
    var quick = [
      ['pay', 'お支払い待ち', '¥'],
      ['ship', '発送待ち', '□'],
      ['receive', '受け取り待ち', '→'],
      ['review', 'レビュー待ち', '★'],
      ['refund', '返品・返金', '↺']
    ];
    var content = head('OVERVIEW', '会員情報、ご注文状況、保有資産をまとめて確認できます。') +
      '<div class="summary-card hero-summary">' +
        '<div class="profile-hero"><div class="avatar">' + esc((state.user.displayName || state.user.email || 'H')[0].toUpperCase()) + '</div><div>' +
          '<h2 class="hero-name">' + esc(state.user.displayName || 'HINOKA MEMBER') + '</h2>' +
          '<div class="hero-meta">' + esc(state.user.email || '') + '</div>' +
          '<div class="hero-badges"><span class="badge gold">GOLD MEMBER</span><span class="badge">ポイント 3,280</span><span class="badge">クーポン 12</span><span class="badge">' + (state.user.emailVerified ? 'メール確認済み' : 'メール未確認') + '</span></div>' +
        '</div></div>' +
        '<div class="hero-assets"><div class="hero-asset"><div class="asset-num">3,280</div><div class="asset-label">POINTS</div></div><div class="hero-asset"><div class="asset-num">12</div><div class="asset-label">COUPONS</div></div><div class="hero-asset"><div class="asset-num">¥8,600</div><div class="asset-label">BALANCE</div></div></div>' +
      '</div>' +
      '<div class="quick-grid">' + quick.map(function (q) {
        var count = orders.filter(function (o) { return o.status === q[0]; }).length;
        return '<button class="quick-card" type="button" data-order-filter="' + q[0] + '"><div class="quick-icon">' + q[2] + '</div><div class="quick-label">' + q[1] + '</div><div class="quick-count">' + count + '</div></button>';
      }).join('') + '</div>' +
      '<div class="stat-grid">' +
        dataBlock('累計注文', orders.length) +
        dataBlock('累計購入金額', yen(totalSpend)) +
        dataBlock('お気に入り', wish.length) +
        dataBlock('未読メッセージ', messages.filter(function (m) { return m.unread; }).length) +
      '</div>' +
      '<div class="section-grid"><div class="section-block"><div class="section-title-row"><h3 class="section-title">RECENT ORDER</h3><button class="text-btn" type="button" data-go="orders">すべて見る</button></div>' + (orders[0] ? orderCard(orders[0]) : empty('ご注文履歴はありません。')) + '</div>' +
      '<div class="section-block"><div class="section-title-row"><h3 class="section-title">MESSAGE</h3><button class="text-btn" type="button" data-go="messages">すべて見る</button></div>' + messages.slice(0, 3).map(messageCard).join('') + '</div></div>';

    document.getElementById('view-overview').innerHTML = content;
    document.querySelectorAll('[data-order-filter]').forEach(function (b) {
      b.addEventListener('click', function () { state.orderFilter = b.dataset.orderFilter; switchView('orders'); });
    });
    document.querySelectorAll('[data-go]').forEach(function (b) { b.addEventListener('click', function () { switchView(b.dataset.go); }); });
    document.querySelectorAll('[data-order-action]').forEach(function (b) {
      b.addEventListener('click', function () { handleOrderAction(b.dataset.orderAction, b.dataset.orderId); });
    });
  }

  function dataBlock(label, value) {
    return '<div class="data-card"><div class="data-label">' + label + '</div><div class="data-value">' + value + '</div></div>';
  }
  function empty(text) { return '<div class="empty">' + text + '</div>'; }

  function tabsHtml(tabs, active, attr) {
    return '<div class="tabs">' + tabs.map(function (t) {
      return '<button class="tab-btn ' + (active === t[0] ? 'active' : '') + '" type="button" ' + attr + '="' + t[0] + '">' + t[1] + '</button>';
    }).join('') + '</div>';
  }

  function orderCard(order) {
    var items = (order.items || []).map(function (item) {
      return '<div class="order-item"><img class="thumb" src="' + esc(item.img || 'assets/images/placeholder.jpg') + '" alt="" onerror="this.src=\'assets/images/placeholder.jpg\'"><div><div class="item-name">' + esc(item.name) + '</div><div class="item-spec">' + esc(item.spec || '') + '</div></div><div class="item-price">' + yen(item.price) + '<br>×' + Number(item.qty || 1) + '</div></div>';
    }).join('');
    return '<article class="order-card"><div class="order-head"><span class="order-id">注文番号：' + esc(order.id) + '</span><span class="order-time">' + esc(order.date) + '</span><span class="status ' + esc(order.status) + '">' + esc(order.statusText) + '</span></div><div class="order-body">' + items + '</div><div class="order-foot"><div class="order-total">合計 <strong>' + yen(order.total) + '</strong></div><div class="action-row">' + orderActions(order) + '</div></div></article>';
  }

  var BANK_INFO = {
    name:   'GMOあおぞらネット銀行（金融機関コード0310）',
    branch: '法人営業部（支店コード101）',
    number: '2569980',
    holder: 'カ）ヒノカ'
  };

  function orderActions(order) {
    var status = order.status;
    var map = {
      pay:     [['今すぐ支払う','pay-now'], ['注文をキャンセル','cancel-order']],
      ship:    [['発送状況を確認','track-order'], ['返金を申請','request-refund']],
      receive: [['受け取りを確認','confirm-received'], ['問い合わせる','contact-support']],
      review:  [['レビューを書く','write-review'], ['もう一度購入','rebuy']],
      done:    [['もう一度購入','rebuy'], ['アフターサービス','after-service']],
      cancel:  [['もう一度購入','rebuy'], ['削除','delete-order']],
      refund:  [['進捗を確認','track-refund'], ['問い合わせる','contact-support']]
    };
    var actions = map[status] || [['詳細を見る','detail']];
    return actions.map(function (a, i) {
      return '<button class="mini-btn ' + (i === 0 ? 'primary' : '') + '" type="button" data-order-action="' + a[1] + '" data-order-id="' + esc(order.id) + '">' + a[0] + '</button>';
    }).join('');
  }

  function handleOrderAction(action, orderId) {
    var orders = getOrders();
    var order = orders.find(function (o) { return o.id === orderId; });
    if (!order) return;

    if (action === 'pay-now') {
      showBankModal(order);
    } else if (action === 'cancel-order') {
      if (!confirm('注文をキャンセルしますか？')) return;
      var stored = getLS('hinoka_orders', []);
      stored.forEach(function (o) { if ((o.ref || o.id) === orderId) { o.status = 'cancel'; o.statusText = 'キャンセル'; } });
      setLS('hinoka_orders', stored);
      window.dispatchEvent(new Event('orderUpdated'));
      renderOrders(); showToast('注文をキャンセルしました');
    } else if (action === 'confirm-received') {
      var stored2 = getLS('hinoka_orders', []);
      stored2.forEach(function (o) { if ((o.ref || o.id) === orderId) { o.status = 'review'; o.statusText = 'レビュー待ち'; } });
      setLS('hinoka_orders', stored2);
      window.dispatchEvent(new Event('orderUpdated'));
      renderOrders(); showToast('受け取りを確認しました。レビューをお願いします。');
    } else if (action === 'write-review') {
      state.reviewFilter = 'pending';
      switchView('reviews');
    } else if (action === 'rebuy') {
      var cart = getLS('cartItems', []);
      (order.items || []).forEach(function (item) {
        var found = cart.find(function (c) { return c.id === item.id; });
        if (found) found.qty += Number(item.qty || 1);
        else cart.push({ id: item.id, name: item.name, price: item.price, img: item.img || 'assets/images/placeholder.jpg', qty: Number(item.qty || 1), color: '', size: item.spec || '' });
      });
      setLS('cartItems', cart);
      window.dispatchEvent(new Event('cartUpdated'));
      location.href = 'cart.html';
    } else if (action === 'after-service' || action === 'contact-support') {
      switchView('service');
    } else if (action === 'track-order') {
      showToast('配送状況：配送センターから発送中です。');
    } else if (action === 'track-refund') {
      showToast('返金申請を受け付けました。3〜5営業日以内に処理いたします。');
    } else if (action === 'request-refund') {
      switchView('service');
    } else if (action === 'delete-order') {
      if (!confirm('この注文を削除しますか？')) return;
      var stored3 = getLS('hinoka_orders', []).filter(function (o) { return (o.ref || o.id) !== orderId; });
      setLS('hinoka_orders', stored3);
      window.dispatchEvent(new Event('orderUpdated'));
      renderOrders(); showToast('注文を削除しました');
    }
  }

  function showBankModal(order) {
    var existing = document.getElementById('bankInfoModal');
    if (existing) existing.remove();
    var div = document.createElement('div');
    div.id = 'bankInfoModal';
    div.className = 'modal-mask show';
    div.innerHTML = '<div class="modal"><div class="modal-head"><h3 class="modal-title">銀行振込のご案内</h3><button class="close-btn" id="closeBankModal">&times;</button></div>' +
      '<div style="font-size:13px;line-height:2.2;">' +
      '<p style="margin-bottom:12px;color:#777;">注文番号：<strong style="color:#111;">' + esc(order ? order.id : '') + '</strong>　合計：<strong style="color:#bf0000;">' + yen(order ? order.total : 0) + '</strong></p>' +
      '<table style="width:100%;border-collapse:collapse;font-size:12px;">' +
      '<tr><td style="color:#777;padding:6px 0;width:90px;">銀行名</td><td>' + esc(BANK_INFO.name) + '</td></tr>' +
      '<tr><td style="color:#777;padding:6px 0;">支店名</td><td>' + esc(BANK_INFO.branch) + '</td></tr>' +
      '<tr><td style="color:#777;padding:6px 0;">口座種別</td><td>普通　' + esc(BANK_INFO.number) + '</td></tr>' +
      '<tr><td style="color:#777;padding:6px 0;">口座名義</td><td>' + esc(BANK_INFO.holder) + '</td></tr>' +
      '</table>' +
      '<p style="margin-top:14px;font-size:11px;color:#b7791f;background:#fffaf0;padding:10px 14px;border:1px solid #ffe0b2;">⏰ お振込期限：ご注文日より3営業日以内<br>振込手数料はお客様ご負担となります。</p>' +
      '</div>' +
      '<button class="auth-btn" id="closeBankOk" style="margin-top:8px;">閉じる</button></div>';
    document.body.appendChild(div);
    document.getElementById('closeBankModal').addEventListener('click', function () { div.remove(); });
    document.getElementById('closeBankOk').addEventListener('click', function () { div.remove(); });
    div.addEventListener('click', function (e) { if (e.target === div) div.remove(); });
  }

  function renderOrders() {
    var list = getOrders().filter(function (o) { return state.orderFilter === 'all' || o.status === state.orderFilter; });
    document.getElementById('view-orders').innerHTML = head('MY ORDERS', 'ご注文状況の確認、配送確認、レビュー、返品・返金申請ができます。') + tabsHtml(orderTabs, state.orderFilter, 'data-order-tab') + '<div class="order-list">' + (list.length ? list.map(orderCard).join('') : empty('該当するご注文はありません。')) + '</div>';
    document.querySelectorAll('[data-order-tab]').forEach(function (b) { b.addEventListener('click', function () { state.orderFilter = b.dataset.orderTab; renderOrders(); }); });
    document.querySelectorAll('[data-order-action]').forEach(function (b) {
      b.addEventListener('click', function () { handleOrderAction(b.dataset.orderAction, b.dataset.orderId); });
    });
  }

  function renderAssets() {
    var html = head('MY ASSETS', 'クーポン、ポイント、残高、ギフトカードをまとめて管理します。') + tabsHtml(assetTabs, state.assetFilter, 'data-asset-tab');
    if (state.assetFilter === 'coupons') {
      html += '<div class="coupon-grid">' + fallbackCoupons.map(function (c) {
        return '<article class="coupon-card"><div class="coupon-face"><div class="coupon-amount">' + c.amount + '</div><div>COUPON</div></div><div class="coupon-info"><div class="message-title">' + c.title + '</div><div class="message-body">' + c.rule + '<br>' + c.date + '</div></div></article>';
      }).join('') + '</div>';
    }
    if (state.assetFilter === 'points') html += '<div class="asset-grid">' + dataBlock('現在のポイント', '3,280') + dataBlock('累計ポイント', '18,920') + dataBlock('失効予定ポイント', '460') + dataBlock('利用可能額', '¥328') + '</div>';
    if (state.assetFilter === 'balance') html += '<div class="asset-grid">' + dataBlock('アカウント残高', '¥8,600') + dataBlock('凍結中残高', '¥0') + dataBlock('累計チャージ', '¥20,000') + dataBlock('累計利用', '¥25,860') + '</div>';
    if (state.assetFilter === 'giftcards') html += empty('ギフトカードはありません。');
    document.getElementById('view-assets').innerHTML = html;
    document.querySelectorAll('[data-asset-tab]').forEach(function (b) { b.addEventListener('click', function () { state.assetFilter = b.dataset.assetTab; renderAssets(); }); });
  }

  function productCard(p, meta) {
    return '<article class="product-card"><div class="product-img-wrap"><img src="' + esc(p.img || 'assets/images/placeholder.jpg') + '" alt="" onerror="this.src=\'assets/images/placeholder.jpg\'"></div><div class="product-body"><p class="product-name">' + esc(p.name) + '</p><div class="product-price">' + yen(p.price) + (p.oldPrice ? '<span class="old-price">' + yen(p.oldPrice) + '</span>' : '') + '</div><div class="stock">' + esc(meta || p.stock || '在庫あり') + '</div><div class="action-row"><button class="mini-btn primary" type="button" data-product-id="' + esc(p.id) + '" data-product-action="cart">バッグに追加</button><button class="mini-btn" type="button" data-product-id="' + esc(p.id) + '" data-product-action="detail">詳細を見る</button></div></div></article>';
  }

  function renderWishlist() {
    var list = getWishlistProducts();
    document.getElementById('view-wishlist').innerHTML = head('WISHLIST', 'お気に入り商品を確認し、ショッピングバッグに追加できます。', '<button class="outline-btn" type="button" onclick="location.href=\'store.html\'">商品を見る</button>') + '<div class="product-grid">' + (list.length ? list.map(productCard).join('') : empty('お気に入り商品はありません。')) + '</div>';
    bindProductActions();
  }

  function renderHistory() {
    var groups = getHistory();
    document.getElementById('view-history').innerHTML = head('BROWSING HISTORY', '最近閲覧した商品を日付別に表示します。', '<button class="outline-btn" id="clearHistoryBtn" type="button">履歴を削除</button>') + (groups.length ? groups.map(function (group) {
      return '<div class="section-title-row" style="margin-top:18px;"><h3 class="section-title">' + esc(group.date) + '</h3></div><div class="product-grid">' + group.items.map(function (p) { return productCard(p, '閲覧時間 ' + p.time); }).join('') + '</div>';
    }).join('') : empty('閲覧履歴はありません。'));
    var clearBtn = document.getElementById('clearHistoryBtn');
    if (clearBtn) clearBtn.addEventListener('click', function () { setLS('hinoka_browsing_history', []); renderHistory(); showToast('閲覧履歴を削除しました'); });
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
      return '<div class="order-item" style="padding:12px 16px;border-bottom:1px solid var(--line);">' +
        '<img class="thumb" src="' + esc(item.img || 'assets/images/placeholder.jpg') + '" alt="" onerror="this.src=\'assets/images/placeholder.jpg\'">' +
        '<div><div class="item-name">' + esc(item.name) + '</div>' +
        '<div class="item-spec">' + esc([item.color, item.size].filter(Boolean).join(' / ')) + '</div>' +
        '<div style="display:flex;align-items:center;gap:8px;margin-top:8px;">' +
        '<button class="mini-btn" data-cart-dec="' + idx + '">−</button>' +
        '<span style="font-size:13px;min-width:24px;text-align:center;">' + Number(item.qty || 1) + '</span>' +
        '<button class="mini-btn" data-cart-inc="' + idx + '">+</button>' +
        '<button class="mini-btn" style="margin-left:8px;color:#b33a2f;border-color:#d9aaa4;" data-cart-del="' + idx + '">削除</button>' +
        '</div></div>' +
        '<div class="item-price">' + yen(item.price * Number(item.qty || 1)) + '</div></div>';
    }).join('') : '';
    var checkoutBtn = items.length ? '<button class="auth-btn" type="button" id="cartToCheckoutBtn" style="margin-top:16px;">お会計へ進む (' + yen(total) + ')</button>' : '';
    document.getElementById('view-cart').innerHTML = head('SHOPPING BAG', '現在のバッグ内容を確認・編集できます。', '<button class="outline-btn" type="button" onclick="location.href=\'store.html\'">買い物を続ける</button>') +
      '<div class="summary-card" style="padding:0;overflow:hidden;">' +
      (items.length ? cartRows : '<div style="padding:40px;text-align:center;color:var(--muted);font-size:13px;">ショッピングバッグは空です。</div>') +
      '</div>' + checkoutBtn;

    if (document.getElementById('cartToCheckoutBtn')) {
      document.getElementById('cartToCheckoutBtn').addEventListener('click', function () { location.href = 'checkout.html'; });
    }
    document.querySelectorAll('[data-cart-inc]').forEach(function (b) {
      b.addEventListener('click', function () {
        var cart = getLS('cartItems', []); cart[Number(b.dataset.cartInc)].qty = Number(cart[Number(b.dataset.cartInc)].qty || 1) + 1;
        setLS('cartItems', cart); window.dispatchEvent(new Event('cartUpdated')); renderCart();
      });
    });
    document.querySelectorAll('[data-cart-dec]').forEach(function (b) {
      b.addEventListener('click', function () {
        var idx = Number(b.dataset.cartDec); var cart = getLS('cartItems', []);
        if (cart[idx].qty > 1) cart[idx].qty--; else cart.splice(idx, 1);
        setLS('cartItems', cart); window.dispatchEvent(new Event('cartUpdated')); renderCart();
      });
    });
    document.querySelectorAll('[data-cart-del]').forEach(function (b) {
      b.addEventListener('click', function () {
        var cart = getLS('cartItems', []); cart.splice(Number(b.dataset.cartDel), 1);
        setLS('cartItems', cart); window.dispatchEvent(new Event('cartUpdated')); renderCart();
      });
    });
  }

  function renderAddresses() {
    var list = getAddresses();
    document.getElementById('view-addresses').innerHTML = head('ADDRESS', '最大20件までお届け先住所を登録できます。', '<button class="outline-btn" id="addAddressBtn" type="button">住所を追加</button>') + '<div class="address-list">' + (list.length ? list.map(function (a) {
      return '<article class="address-card"><div class="address-top"><div class="address-name">' + esc(a.name) + ' / ' + esc(a.phone) + '</div>' + (a.isDefault ? '<span class="default-tag">既定</span>' : '') + '</div><div class="address-detail">〒' + esc(a.zip) + ' ' + esc(a.pref) + esc(a.city) + ' ' + esc(a.detail) + '</div><div class="action-row" style="margin-top:12px;"><button class="mini-btn" data-edit-address="' + a.id + '" type="button">編集</button><button class="mini-btn" data-default-address="' + a.id + '" type="button">既定にする</button><button class="danger-btn" data-delete-address="' + a.id + '" type="button">削除</button></div></article>';
    }).join('') : empty('お届け先住所が登録されていません。')) + '</div>';
    document.getElementById('addAddressBtn').addEventListener('click', function () { openAddressModal(); });
    document.querySelectorAll('[data-edit-address]').forEach(function (b) { b.addEventListener('click', function () { openAddressModal(b.dataset.editAddress); }); });
    document.querySelectorAll('[data-default-address]').forEach(function (b) { b.addEventListener('click', function () { setDefaultAddress(b.dataset.defaultAddress); }); });
    document.querySelectorAll('[data-delete-address]').forEach(function (b) { b.addEventListener('click', function () { deleteAddress(b.dataset.deleteAddress); }); });
  }

  function openAddressModal(id) {
    var a = getAddresses().find(function (x) { return x.id === id; }) || {};
    state.editingAddressId = id || null;
    document.getElementById('addrName').value = a.name || '';
    document.getElementById('addrPhone').value = a.phone || '';
    document.getElementById('addrZip').value = a.zip || '';
    document.getElementById('addrPref').value = a.pref || '';
    document.getElementById('addrCity').value = a.city || '';
    document.getElementById('addrDetail').value = a.detail || '';
    document.getElementById('addrDefault').checked = !!a.isDefault;
    document.getElementById('addressModal').classList.add('show');
  }
  function closeAddressModal() { document.getElementById('addressModal').classList.remove('show'); state.editingAddressId = null; }
  function saveAddress() {
    var list = getAddresses();
    if (!state.editingAddressId && list.length >= 20) return showToast('住所は20件まで登録できます');
    var item = {
      id: state.editingAddressId || ('a' + Date.now()),
      name: document.getElementById('addrName').value.trim(),
      phone: document.getElementById('addrPhone').value.trim(),
      zip: document.getElementById('addrZip').value.trim(),
      pref: document.getElementById('addrPref').value.trim(),
      city: document.getElementById('addrCity').value.trim(),
      detail: document.getElementById('addrDetail').value.trim(),
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

  function renderReviews() {
    var list = getReviews().filter(function (r) { return state.reviewFilter === 'pending' ? r.status === 'pending' : state.reviewFilter === 'photo' ? r.hasPhoto : r.status === 'done'; });
    document.getElementById('view-reviews').innerHTML = head('REVIEWS', 'レビュー待ち、投稿済み、写真付きレビューを管理します。') + tabsHtml(reviewTabs, state.reviewFilter, 'data-review-tab') + '<div class="review-list">' + (list.length ? list.map(function (r) {
      return '<article class="review-card"><div class="review-top"><div class="review-product">' + esc(r.product) + '</div><div class="rating">' + (r.rating ? '★'.repeat(r.rating) : 'レビュー待ち') + '</div></div><div class="review-body">' + esc(r.body) + '</div><div class="action-row" style="margin-top:12px;"><button class="mini-btn primary" type="button" data-review-id="' + esc(r.id) + '">' + (r.status === 'pending' ? 'レビューを書く' : 'レビューを編集') + '</button></div></article>';
    }).join('') : empty('レビューはありません。')) + '</div>';
    document.querySelectorAll('[data-review-tab]').forEach(function (b) { b.addEventListener('click', function () { state.reviewFilter = b.dataset.reviewTab; renderReviews(); }); });
    document.querySelectorAll('[data-review-id]').forEach(function (b) {
      b.addEventListener('click', function () { openReviewModal(b.dataset.reviewId); });
    });
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
      '<textarea class="form-input form-textarea" id="reviewBody" placeholder="商品の使い心地、品質などをご記入ください。">' + esc(r.body === 'まだレビューされていません。' ? '' : r.body) + '</textarea>' +
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
      var list = getLS('hinoka_reviews', getReviews());
      var idx = list.findIndex(function (x) { return x.id === reviewId; });
      var updated = { id: reviewId, product: r.product, rating: selectedRating, body: body, status: 'done', hasPhoto: false };
      if (idx >= 0) list[idx] = updated; else list.push(updated);
      setLS('hinoka_reviews', list);
      window.dispatchEvent(new Event('reviewUpdated'));
      div.remove();
      state.reviewFilter = 'done';
      renderReviews();
      buildNavigation();
      showToast('レビューを投稿しました！');
    });
  }

  function messageCard(m) {
    return '<article class="message-row"><div class="message-top"><div class="message-title">' + esc(m.title) + '</div>' + (m.unread ? '<span class="unread-tag">未読</span>' : '') + '</div><div class="message-body">' + esc(m.body) + '<br><span style="font-size:11px;">' + esc(m.time || '') + '</span></div></article>';
  }
  function renderMessages() {
    var list = getMessages().filter(function (m) { return state.messageFilter === 'all' || m.type === state.messageFilter; });
    document.getElementById('view-messages').innerHTML = head('MESSAGE CENTER', '注文、配送、キャンペーン、システム通知を確認できます。', '<button class="outline-btn" id="markReadBtn" type="button">すべて既読</button>') + tabsHtml(messageTabs, state.messageFilter, 'data-message-tab') + '<div class="message-list">' + (list.length ? list.map(messageCard).join('') : empty('メッセージはありません。')) + '</div>';
    document.querySelectorAll('[data-message-tab]').forEach(function (b) { b.addEventListener('click', function () { state.messageFilter = b.dataset.messageTab; renderMessages(); }); });
    document.getElementById('markReadBtn').addEventListener('click', function () {
      setLS('hinoka_messages', getMessages().map(function (m) { m.unread = false; return m; }));
      window.dispatchEvent(new Event('messageUpdated'));
      buildNavigation();
      renderMessages();
    });
  }

  function renderMember() {
    document.getElementById('view-member').innerHTML = head('MEMBER CENTER', '会員ランク、アップグレード条件、特典を確認できます。') +
      '<div class="summary-card"><div class="section-title-row"><h3 class="section-title">GOLD MEMBER</h3><span class="badge gold">現在のランク</span></div><p class="view-desc">ダイヤモンド会員まで、あと ¥14,140 または 4,200 成長ポイントです。</p></div>' +
      '<div class="member-grid">' + dataBlock('送料無料特典', '3回') + dataBlock('会員割引', '10%') + dataBlock('誕生日特典', '1件') + dataBlock('ポイント倍率', '1.5x') + '</div>';
  }

  function renderService() {
    var services = [
      ['オンラインサポート', 'ご注文、配送、返品・返金についてすぐに相談できます。', 'https://hinokaglobal.com/'],
      ['お問い合わせフォーム', '内容を送信後、通常24時間以内に返信します。', 'mailto:sun_hua@hinokaglobal.com'],
      ['ヘルプセンター', 'ご利用ガイド、配送、支払い方法を確認できます。', 'legal.html#shipping'],
      ['よくある質問', 'クーポン、ポイント、会員ランクなどの質問をまとめています。', 'legal.html']
    ];
    document.getElementById('view-service').innerHTML = head('CUSTOMER SERVICE', 'サポート、ヘルプ、返品・返金ポリシーはこちらです。') + '<div class="service-grid">' + services.map(function (s) {
      return '<article class="service-card"><div class="section-title-row"><h3 class="section-title">' + s[0] + '</h3></div><p class="view-desc">' + s[1] + '</p><a class="mini-btn primary" href="' + s[2] + '" target="_blank">開く</a></article>';
    }).join('') + '</div>';
  }

  function renderSettings() {
    var user = state.user;
    document.getElementById('view-settings').innerHTML = head('ACCOUNT SETTINGS', 'プロフィール、安全設定、ログイン履歴を管理します。') +
      '<div class="section-block"><div class="section-title-row"><h3 class="section-title">PROFILE</h3></div><div class="info-table">' +
      infoRow('ニックネーム', esc(user.displayName || '未設定'), '') +
      infoRow('メールアドレス', esc(user.email || ''), '') +
      infoRow('メール確認', user.emailVerified ? '確認済み' : '未確認', '<button class="mini-btn" id="resendVerifyBtn" type="button">再送信</button>') +
      infoRow('パスワード', '再設定メールを送信します', '<button class="mini-btn" id="changePwBtn" type="button">変更</button>') +
      infoRow('メールマガジン', '<span id="marketingLabel">受信しない</span>', '<label><input id="marketingToggle" type="checkbox" style="accent-color:#111;"></label>') +
      '</div></div>' +
      '<div class="section-block"><div class="section-title-row"><h3 class="section-title">LOGIN RECORD</h3></div><div class="message-list">' + messageCard({ title: '現在のログイン', body: 'ブラウザ / メールまたはGoogleログイン', time: new Date().toLocaleString('ja-JP'), unread: false }) + '</div></div>';
    document.getElementById('resendVerifyBtn').addEventListener('click', function () {
      if (auth.currentUser) auth.currentUser.sendEmailVerification().then(function () { showToast('確認メールを再送信しました'); }).catch(function () { showToast('送信に失敗しました'); });
    });
    document.getElementById('changePwBtn').addEventListener('click', function () {
      if (user.email) auth.sendPasswordResetEmail(user.email).then(function () { showToast('パスワード変更メールを送信しました'); }).catch(function () { showToast('送信に失敗しました'); });
    });
    var mktToggle = document.getElementById('marketingToggle');
    var mktLabel = document.getElementById('marketingLabel');
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
    if (state.activeView === 'overview') renderOverview();
    else if (state.activeView === 'orders') renderOrders();
    else if (state.activeView === 'assets') renderAssets();
    else if (state.activeView === 'wishlist') renderWishlist();
    else if (state.activeView === 'history') renderHistory();
    else if (state.activeView === 'cart') renderCart();
    else if (state.activeView === 'addresses') renderAddresses();
    else if (state.activeView === 'reviews') renderReviews();
    else if (state.activeView === 'messages') renderMessages();
    else if (state.activeView === 'member') renderMember();
    else if (state.activeView === 'service') renderService();
    else if (state.activeView === 'settings') renderSettings();
  }

  function createUserDoc(user, extra) {
    extra = extra || {};
    var ref = db.collection('users').doc(user.uid);
    return ref.get().then(function (snap) {
      if (snap.exists) return { isNew: false };
      return ref.set({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        lastName: extra.lastName || '',
        firstName: extra.firstName || '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        emailVerified: user.emailVerified,
        marketingConsent: !!extra.marketingConsent,
        provider: extra.provider || 'email'
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
    document.getElementById('loadingSection').style.display = 'none';
    document.getElementById('accountShell').style.display = 'none';
    document.getElementById('authSection').style.display = 'block';
  }
  function showAccount(user) {
    state.user = user;
    document.getElementById('loadingSection').style.display = 'none';
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('accountShell').style.display = 'block';
    buildNavigation();
    renderUser(user);
    var validViews = navItems.map(function (n) { return n.id; });
    switchView(validViews.indexOf(state.activeView) !== -1 ? state.activeView : 'overview');
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
      document.getElementById('loginCard').style.display = 'none';
      document.getElementById('resetPanel').style.display = 'block';
      document.getElementById('reset-email').value = document.getElementById('login-email').value.trim();
    });
    document.getElementById('backToLogin').addEventListener('click', function () {
      document.getElementById('resetPanel').style.display = 'none';
      document.getElementById('loginCard').style.display = 'block';
    });
    document.getElementById('resetSendBtn').addEventListener('click', resetPassword);
    document.getElementById('logoutBtn').addEventListener('click', function () { auth.signOut(); });
    document.getElementById('saveAddressBtn').addEventListener('click', saveAddress);
    document.querySelectorAll('[data-close-modal]').forEach(function (b) { b.addEventListener('click', closeAddressModal); });
    document.getElementById('addressModal').addEventListener('click', function (e) { if (e.target === this) closeAddressModal(); });

    document.getElementById('reg-pass').addEventListener('input', function () {
      var v = this.value;
      var bars = [1, 2, 3].map(function (i) { return document.getElementById('pwBar' + i); });
      var lbl = document.getElementById('pwLabel');
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
    var email = document.getElementById('login-email').value.trim();
    var pass = document.getElementById('login-pass').value;
    if (!email || !pass) return showError('login-error', 'メールアドレスとパスワードを入力してください。');
    setLoading('loginBtn', true);
    auth.signInWithEmailAndPassword(email, pass).catch(function (err) {
      showError('login-error', authError(err.code));
    }).finally(function () { setLoading('loginBtn', false); });
  }

  function register() {
    hideMsg('reg-error');
    var last = document.getElementById('reg-last').value.trim();
    var first = document.getElementById('reg-first').value.trim();
    var email = document.getElementById('reg-email').value.trim();
    var pass = document.getElementById('reg-pass').value;
    var pass2 = document.getElementById('reg-pass2').value;
    var privacy = document.getElementById('consentPrivacy').checked;
    var marketing = document.getElementById('consentMarketing').checked;
    if (!last || !first) return showError('reg-error', 'お名前を入力してください。');
    if (!email) return showError('reg-error', 'メールアドレスを入力してください。');
    if (pass.length < 8) return showError('reg-error', 'パスワードは8文字以上で設定してください。');
    if (pass !== pass2) return showError('reg-error', 'パスワードが一致しません。');
    if (!privacy) return showError('reg-error', 'プライバシーポリシーと利用規約への同意が必要です。');
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
