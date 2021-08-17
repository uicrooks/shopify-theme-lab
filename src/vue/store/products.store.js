const state = () => ({
  products: {},
  subscriptionCollections: {},
  collections: {}
});

const getters = {
  products: (state) => {
    return state.products;
  },
  subscriptionCollections: (state) => {
    return state.subscriptionCollections;
  },
  collections: (state) => {
    return state.collections;
  }
};

const actions = {
};

const mutations = {
  addProduct: (state, productId, productData) => {
    state.products[productId] = productData;
  },
  setSubscriptionCollections: (state, data) => {
    state.subscriptionCollections = data;
  },
  setCollections: (state, data) => {
    state.collections = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};