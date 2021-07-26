const state = () => ({
  orders: [],
});

const getters = {
  orders: (state) => {
    return state.orders;
  }
};

const actions = {

};

const mutations = {
  setOrders: (state, orders) => {
    state.orders = orders;
    console.log(state);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};