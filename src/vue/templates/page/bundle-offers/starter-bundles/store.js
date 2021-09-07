import StoreService from "@/vue/services/store.service";
import CartService from "@/vue/services/cart.service";
import cartService from "../../../../services/cart.service";

const state = () => ({
  fetchedProducts: {},
  starterBundles: {},
  subscriptionProducts: {
    BarSoap: {
      price: 0,
    },
    HairCare: {
      price: 0,
    },
    Deodorant: {
      price: 0,
    },
    Toothpaste: {
      price: 0
    },
    SoapSaver: {
      price: 0
    }
  },
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
  subSelected_Clean: false,
  subSelected_Groomed: false,
  subSelected_Suave: false,
  subSelected_Smooth: false,
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
  subSelected_Clean: (state) => {
    return state.subSelected_Clean;
  },
  subSelected_Groomed: (state) => {
    return state.subSelected_Groomed;
  },
  subSelected_Suave: (state) => {
    return state.subSelected_Suave;
  },
  subSelected_Smooth: (state) => {
    return state.subSelected_Smooth;
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
  toggleBundleSubSelected: (state, bundleLvl) => {
    state[`subSelected_${bundleLvl}`] = !state[`subSelected_${bundleLvl}`];
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
    console.log("asdfsdf", obj)
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