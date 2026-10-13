const store = require('../../utils/store');

Page({
  data: {
    orders: []
  },

  onShow() {
    this.setData({ orders: store.getOrders() });
  },

  goDetail(e) {
    wx.navigateTo({ url: '/pages/orderDetail/orderDetail?id=' + e.currentTarget.dataset.id });
  },

  goOrder() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});
