import CartService from "@/vue/services/cart.service";

const state = () => ({
  currencyCode: "USD",
  currencySymbol: "$",
  cart: {},
  isOpen: false
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
    return state.cart.item_count ? state.cart.item_count : 0;
  },
};

const actions = {
  async initialize({ commit }) {
    const cart = await CartService.initCart();
    commit("setCart", cart);
  },
  async addItem({ dispatch }, item) {
    const itemAdded = await CartService.addItem(item.product, item.variantId ? item.variantId : "");
    if (itemAdded) {
      dispatch("initialize");
    }
  },
  async updateQuantity({ dispatch }, item) {
    const quantityUpdated = await CartService.updateItemQuantity(item.line, item.quantity);
    if (quantityUpdated) {
      dispatch("initialize");
    }
  }
};

const mutations = {
  setCurrency(state, currencyObj) {
    state.currencyCode = currencyObj.isoCode;
    state.currencySymbol = currencyObj.symbol;
  },
  setCart(state, cartData) {
    state.cart = cartData;
  },
  toggleCart(state) {
    state.isOpen = !state.isOpen;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};