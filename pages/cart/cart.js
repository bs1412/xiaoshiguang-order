const store = require('../../utils/store');

Page({
  data: {
    cart: [],
    total: '0.00'
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const cart = store.getCart();
    const total = cart.reduce((sum, c) => sum + c.price * c.count, 0);
    this.setData({ cart, total: total.toFixed(2) });
    this.updateBadge();
  },

  plus(e) {
    const id = e.currentTarget.dataset.id;
    const cart = store.getCart();
    const item = cart.find((c) => c.id === id);
    if (item) item.count += 1;
    store.setCart(cart);
    this.refresh();
  },

  minus(e) {
    const id = e.currentTarget.dataset.id;
    let cart = store.getCart();
    const item = cart.find((c) => c.id === id);
    if (!item) return;
    if (item.count > 1) {
      item.count -= 1;
    } else {
      cart = cart.filter((c) => c.id !== id);
    }
    store.setCart(cart);
    this.refresh();
  },

  updateBadge() {
    const count = store.getCart().reduce((sum, c) => sum + c.count, 0);
    if (count > 0) {
      wx.setTabBarBadge({ index: 1, text: String(count) });
    } else {
      wx.removeTabBarBadge({ index: 1 });
    }
  },

  checkout() {
    if (this.data.cart.length === 0) return;
    wx.navigateTo({ url: '/pages/pay/pay' });
  },

  goOrder() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});
