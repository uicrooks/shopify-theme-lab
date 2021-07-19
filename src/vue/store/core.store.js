const state = () => ({
  freeShippingMinimum: 4000
});

const getters = {
  freeShippingMinimum: (state) => {
    return state.freeShippingMinimum;
  }
};

const actions = {

};

const mutations = {

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};