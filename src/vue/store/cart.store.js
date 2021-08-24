import CartService from "@/vue/services/cart.service";

const state = () => ({
  cart: {
    item_count: null
  },
  isOpen: false,
});

const getters = {
  isOpen: (state) => {
    return state.isOpen;
  },
  subtotal: (state) => {
    return state.cart.total_price ? state.cart.total_price : 0;
  },
  items: (state) => {
    return state.cart.items;
  },
  numberOfItems: (state) => {
    return state.cart.item_count;
  },
};

const actions = {
  async initialize({ commit }) {
    console.log("adsf");
    const cart = await CartService.initCart();
    commit("setCart", cart);
  },
  async addItem({ dispatch }, item) {
    const itemAdded = await CartService.addItem(item.product, item.variantId ? item.variantId : "");
    if (itemAdded) {
      dispatch("initialize");
    }
    console.log("add item");
  },
  async updateQuantity({ dispatch }, item) {
    const quantityUpdated = await CartService.updateItemQuantity(item.line, item.quantity);
    if (quantityUpdated) {
      dispatch("initialize");
    }
    console.log("update item");
  }
};

const mutations = {
  setCart(state, cartData) {
    state.cart = cartData;
  },
  toggleIsOpen(state) {
    state.isOpen = !state.isOpen;
  },
  setIsOpen(state, val) {
    state.isOpen = val;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};