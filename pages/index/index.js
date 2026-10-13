const { categories, dishes } = require('../../utils/dishes');
const store = require('../../utils/store');

Page({
  data: {
    categories: [],
    allDishes: dishes,
    dishes: [],
    activeCategory: '',
    cartCount: 0
  },

  onLoad() {
    this.setData({ categories, activeCategory: categories[0] });
    this.filterDishes(categories[0]);
  },

  onShow() {
    this.updateBadge();
  },

  filterDishes(category) {
    const list = category === '全部'
      ? this.data.allDishes
      : this.data.allDishes.filter((d) => d.category === category);
    this.setData({ dishes: list });
  },

  switchCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ activeCategory: category });
    this.filterDishes(category);
  },

  addToCart(e) {
    const id = e.currentTarget.dataset.id;
    const dish = this.data.allDishes.find((d) => d.id === id);
    if (!dish) return;

    const cart = store.getCart();
    const exist = cart.find((c) => c.id === id);
    if (exist) {
      exist.count += 1;
    } else {
      cart.push({ id: dish.id, name: dish.name, price: dish.price, emoji: dish.emoji, count: 1 });
    }
    store.setCart(cart);
    wx.showToast({ title: '已加入购物车', icon: 'success' });
    this.updateBadge();
  },

  updateBadge() {
    const cart = store.getCart();
    const count = cart.reduce((sum, c) => sum + c.count, 0);
    this.setData({ cartCount: count });
    if (count > 0) {
      wx.setTabBarBadge({ index: 1, text: String(count) });
    } else {
      wx.removeTabBarBadge({ index: 1 });
    }
  }
});
