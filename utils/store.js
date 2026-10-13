const CART_KEY = 'cart';
const ORDERS_KEY = 'orders';

function getCart() {
  const cart = wx.getStorageSync(CART_KEY);
  return Array.isArray(cart) ? cart : [];
}

function setCart(cart) {
  wx.setStorageSync(CART_KEY, cart);
}

function clearCart() {
  wx.removeStorageSync(CART_KEY);
}

function getOrders() {
  const orders = wx.getStorageSync(ORDERS_KEY);
  return Array.isArray(orders) ? orders : [];
}

function addOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  wx.setStorageSync(ORDERS_KEY, orders);
  return order;
}

module.exports = { getCart, setCart, clearCart, getOrders, addOrder };
