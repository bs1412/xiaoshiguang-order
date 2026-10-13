App({
  onLaunch() {
    // 首次启动时初始化本地存储，保证购物车和订单是空数组
    if (!Array.isArray(wx.getStorageSync('cart'))) {
      wx.setStorageSync('cart', []);
    }
    if (!Array.isArray(wx.getStorageSync('orders'))) {
      wx.setStorageSync('orders', []);
    }
  },
  globalData: {}
});
