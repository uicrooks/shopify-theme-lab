const state = () => ({
  currentView: "Overview",
  userTags: [],
  rechargeUser: {},
  subscriptions: [],
  onetimes: [],
  squatchBoxes: {},
  currentBoxName: "", // address label: 4015 Marina St.
  currentBox: {},
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
  },
  squatchBoxes: (state) => {
    return state.squatchBoxes;
  },
  currentBoxName: (state) => {
    return state.currentBoxName;
  },
  currentBox: (state) => {
    return state.currentBox;
  },
  currentBoxNextRefillDate: (state) => {
    return state.currentBox && state.currentBox.upcomingRefillDates? state.currentBox.upcomingRefillDates[0] : null;
  },
  // currentBoxNextRefill: (state) => {
  //   return state.currentBoxNextRefillDate ? state.currentBox[state.currentBoxNextRefillDate] : {};
  // }
};

const actions = {
  initializeCurrentBox: ({ commit, state }, boxName) => {
    commit("setCurrentBoxName", boxName);
    commit("setCurrentBox", state.squatchBoxes[boxName]);
  }
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
  },
  setSquatchBoxes: (state, boxes) => {
    state.squatchBoxes = boxes;
  },
  setCurrentBoxName: (state, boxName) => {
    state.currentBoxName = boxName;
  },
  setCurrentBox: (state, box) => {
    state.currentBox = box;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};