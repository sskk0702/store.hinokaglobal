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
    }
  };
})();
