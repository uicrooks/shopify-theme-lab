import StoreService from "@/vue/services/store.service";
import CartService from "@/vue/services/cart.service";
import cartService from "../../../../services/cart.service";

const state = () => ({
  fetchedProducts: {},
  starterBundles: {},
  subscriptionProducts: {},
  cards: [],
  selectedVariant: function() {
    return this.starterBundles[this.selectedScent].variants.filter((variant) => {
      return variant.option1 == this.selectedLevel;
    })[0] || {};
  },
  selectedCard: function() {
    return this.cards.filter((card)=> {
      return card.title == this.selectedLevel;
    })[0] || {};
  },
  selectedScent: "forest-bundle",
  selectedLevel: "Clean",
  isSubToBundle: true,
  starterBundleDrawerOpened: false,
});

const getters = {
  fetchedProducts: (state) => {
    return state.fetchedProducts;
  },
  selectedVariant: (state) => {
    return state.selectedVariant();
  },
  selectedCard: (state) => {
    return state.selectedCard();
  },
  selectedScent: (state) => {
    return state.selectedScent;
  },
  selectedLevel: (state) => {
    return state.selectedLevel;
  },
  isSubToBundle: (state) => {
    return state.isSubToBundle;
  },
  starterBundleDrawerOpened: (state) => {
    return state.starterBundleDrawerOpened;
  },
  subscriptionProducts: (state) => {
    return state.subscriptionProducts;
  }
};

const actions = {
  async fetchProduct({ commit, state }, prod_handle) {
    if (state.fetchedProducts[prod_handle]) {
      return state.fetchedProducts[prod_handle];
    }
    console.log("fetching: ",prod_handle);
    const prod = await StoreService.getProductByHandle(prod_handle);
    commit("addFetchedProduct", prod);
    return prod;
  },
  async finish({state}) {
    console.log(state.selectedVariant());
    const variant = state.selectedVariant();
    await cartService.addItem2(variant.id);
    return cartService.redirectToCheckout();
  },
};

const mutations = {
  addFetchedProduct: (state, prod) => {
    state.fetchedProducts[prod.handle] = prod;
  },
  setBundles: (state, bundles) => {
    state.starterBundles = bundles;
  },
  setCards: (state, cards) => {
    state.cards = cards;
  },
  setSelectedScent: (state, scent) => {
    state.selectedScent = scent;
  },
  setSelectedLevel: (state, level) => {
    state.selectedLevel = level;
  },
  setDrawerOpened: (state, val) => {
    state.starterBundleDrawerOpened = val;
  },
  setPurchaseType: (state, val) => {
    state.isSubToBundle = val;
  },
  setSubscriptionProducts: (state, obj) => {
    state.subscriptionProducts = obj;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};