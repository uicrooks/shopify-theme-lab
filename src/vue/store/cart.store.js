import CartService from "@/vue/services/cart.service";

const state = () => ({
  currencyCode: "USD",
  currencySymbol: "$",
  cart: {}
});

const getters = {
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
  }
};

const mutations = {
  setCurrency(state, currencyObj) {
    state.currencyCode = currencyObj.isoCode;
    state.currencySymbol = currencyObj.symbol;
  },
  setCart(state, cartData) {
    state.cart = cartData;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};