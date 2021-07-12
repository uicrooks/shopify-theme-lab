const state = () => ({
  freeShippingMinimum: 40
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