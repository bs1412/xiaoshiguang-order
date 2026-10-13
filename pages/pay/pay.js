const store = require('../../utils/store');

function pad(n) {
  return n < 10 ? '0' + n : '' + n;
}

function formatTime(d) {
  return (
    d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
    ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes())
  );
}

Page({
  data: {
    cart: [],
    total: '0.00',
    method: 'wechat'
  },

  onLoad() {
    const cart = store.getCart();
    if (cart.length === 0) {
      wx.showToast({ title: '购物车是空的', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 800);
      return;
    }
    const total = cart.reduce((sum, c) => sum + c.price * c.count, 0);
    this.setData({ cart, total: total.toFixed(2) });
  },

  selectMethod(e) {
    this.setData({ method: e.currentTarget.dataset.method });
  },

  pay() {
    const methodName = this.data.method === 'wechat' ? '微信支付' : '余额支付';
    const that = this;

    wx.showLoading({ title: '支付中...' });

    // 演示版：这里是模拟支付。
    // 真实微信支付需要：1) 注册微信支付商户号；2) 后端调用「统一下单」接口；
    // 3) 后端返回支付参数；4) 前端调用 wx.requestPayment 拉起收银台。
    setTimeout(() => {
      wx.hideLoading();

      const order = {
        id: 'DD' + Date.now(),
        items: that.data.cart.map((c) => ({
          name: c.name,
          emoji: c.emoji,
          price: c.price,
          count: c.count
        })),
        totalCount: that.data.cart.reduce((sum, c) => sum + c.count, 0),
        total: that.data.total,
        method: methodName,
        status: '已支付',
        createTime: formatTime(new Date())
      };

      store.addOrder(order);
      store.clearCart();
      wx.removeTabBarBadge({ index: 1 });
      wx.showToast({ title: '支付成功', icon: 'success' });

      setTimeout(() => {
        wx.redirectTo({ url: '/pages/orderDetail/orderDetail?id=' + order.id });
      }, 600);
    }, 1200);
  }
});
