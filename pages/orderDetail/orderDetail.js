const store = require('../../utils/store');

Page({
  data: {
    order: null
  },

  onLoad(options) {
    const order = store.getOrders().find((o) => o.id === options.id);
    this.setData({ order });
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});
