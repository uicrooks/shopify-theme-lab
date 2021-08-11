const state = () => ({
  currentView: "Overview",
  userTags: [],
  rechargeUser: {},
  subscriptions: [],
  onetimes: []
});

const getters = {
  currentView: (state) => {
    return state.currentView;
  },
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
  setCurrentView: (state, view) => {
    state.currentView = view;
  },
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