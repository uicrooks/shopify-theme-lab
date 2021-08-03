const state = () => ({
  loggedIn: false,
  freeShippingMinimum: 4000
});

const getters = {
  loggedIn: (state) => {
    return state.loggedIn;
  },
  freeShippingMinimum: (state) => {
    return state.freeShippingMinimum;
  }
};

const actions = {

};

const mutations = {
  setLoggedIn: (state, loggedIn) => {
    state.loggedIn = loggedIn;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};