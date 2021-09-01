const state = () => ({
  products: {},
  subscriptionCollections: {},
  subscriptionOptionCollections: {}
});

const getters = {
  products: (state) => {
    return state.products;
  },
  subscriptionCollections: (state) => {
    return state.subscriptionCollections;
  },
  subscriptionOptionCollections: (state) => {
    return state.subscriptionOptionCollections;
  },
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
  setSubscriptionOptionCollections: (state, data) => {
    state.subscriptionOptionCollections = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};