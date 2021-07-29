const state = () => ({
  userTags: [],
  rechargeUser: {},
  subscriptions: [],
  onetimes: []
});

const getters = {
  userTags: (state) => {
    return state.userTags;
  },
  rechargeUser: (state) => {
    return state.rechargeUser;
  },
  subscriptions: (state) => {
    return state.subscriptions;
  },
  onetimes: (state) => {
    return state.onetimes;
  }
};

const actions = {

};

const mutations = {
  setUserTags: (state, tags) => {
    state.userTags = tags;
  },
  setRechargeUser: (state, user) => {
    state.rechargeUser = user;
  },
  setSubscriptions: (state, subscriptions) => {
    state.subscriptions = subscriptions;
  },
  setOnetimes: (state, onetimes) => {
    state.onetimes = onetimes;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};