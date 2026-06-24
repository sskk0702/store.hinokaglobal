/**
 * hinoka-mode.js — 法人/個人モード分離ユーティリティ
 * sessionStorage にモードを保存し、カート・割引を完全分離。
 */
(function () {
  window.HinokaMode = {
    get: function () {
      return sessionStorage.getItem('hinoka_mode') || 'personal';
    },
    set: function (mode) {
      sessionStorage.setItem('hinoka_mode', mode);
      window.dispatchEvent(new Event('hinokaModeChanged'));
    },
    isB2B: function () {
      return this.get() === 'b2b';
    },
    cartKey: function () {
      return this.isB2B() ? 'b2bCartItems' : 'cartItems';
    },
    cartEvent: function () {
      return this.isB2B() ? 'b2bCartUpdated' : 'cartUpdated';
    },
    loadCart: function () {
      try { return JSON.parse(localStorage.getItem(this.cartKey()) || '[]'); }
      catch (e) { return []; }
    },
    saveCart: function (items) {
      localStorage.setItem(this.cartKey(), JSON.stringify(items));
      window.dispatchEvent(new Event('cartUpdated'));
      window.dispatchEvent(new Event('b2bCartUpdated'));
    },
    cartCount: function () {
      return this.loadCart().reduce(function (s, i) { return s + (i.qty || 1); }, 0);
    },
    rewriteAccountLinks: function () {
      if (!this.isB2B()) return;
      document.querySelectorAll('a[href^="account.html"]').forEach(function (a) {
        a.href = 'b2b-dashboard.html';
      });
    },
    injectModeBanner: function () {
      if (!this.isB2B()) return;
      var existing = document.getElementById('b2bModeBanner');
      if (existing) return;
      var banner = document.createElement('div');
      banner.id = 'b2bModeBanner';
      banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:10001;background:linear-gradient(90deg,#111827,#1e293b,#0f2040);color:rgba(255,255,255,.9);text-align:center;font-size:11px;letter-spacing:0.18em;padding:6px 0;font-family:"Noto Sans JP",sans-serif;font-weight:500;';
      banner.innerHTML = '法人アカウントでご利用中';
      document.body.prepend(banner);
      document.body.style.paddingTop = 'calc(var(--nav-height) + 24px)';
      var nav = document.getElementById('main-nav');
      if (nav) nav.style.top = '24px';
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { HinokaMode.injectModeBanner(); HinokaMode.rewriteAccountLinks(); });
  } else {
    HinokaMode.injectModeBanner();
    HinokaMode.rewriteAccountLinks();
  }
})();
