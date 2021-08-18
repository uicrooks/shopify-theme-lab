const state = () => ({
  currentView: "Overview",
  userTags: [],
  rechargeUser: {},
  rechargePaymentSource: {},
  rechargeOrders: {},
  squatchBoxGroups: {},
  currentGroupName: "", // address label: 4015 Marina St.
  currentGroup: {},
  // currentGroupNextRefillDate: "",
  refillBox: []
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
  rechargePaymentSource: (state) => {
    return state.rechargePaymentSource;
  },
  // subscriptions: (state) => {
  //   return state.subscriptions;
  // },
  rechargeOrders: (state) => {
    return state.rechargeOrders;
  },
  squatchBoxGroups: (state) => {
    return state.squatchBoxGroups;
  },
  currentGroupName: (state) => {
    return state.currentGroupName;
  },
  currentGroup: (state) => {
    return state.currentGroup;
  },
  currentGroupNextRefillDate: (state) => {
    // return state.currentGroupNextRefillDate;
    return state.currentGroup && state.currentGroup.upcomingRefillDates ? state.currentGroup.upcomingRefillDates[0] : null;
  },
  refillBox: (state) => {
    return state.refillBox;
  },
};

const actions = {
  initializeCurrentGroup: ({ commit, state }, groupName) => {
    commit("setCurrentGroupName", groupName);
    commit("setCurrentGroup", state.squatchBoxGroups[groupName]);
    const refillDate = state.currentGroup && state.currentGroup.upcomingRefillDates ? state.currentGroup.upcomingRefillDates[0] : null;
    if (refillDate) {
      const refillBox = state.currentGroup.upcomingRefillsByDate[refillDate];
      if (refillBox) {
        commit("setRefillBox", refillBox);
      }
    }
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
  setRechargePaymentSource: (state, source) => {
    let cardImg;
    switch (source.card_brand) {
      case "mastercard":
        cardImg = "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/mastercard.svg?v=1602692830";
        break;
      case "visa":
        cardImg = "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/visa_29a6cf71-fd8f-42e7-ac9d-c8d3e51f88fb.svg?v=1602692830";
        break;
      case "amex":
        cardImg = "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/amex.svg?v=1602692830";
        break;
      case "paypal":
        cardImg = "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/paypal.svg?v=1602692830";
        break;
      case "discover":
        cardImg = "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/discover.svg?v=1602692830";
        break;
      default:
        cardImg = "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/generic.svg?v=1602692830";
    }
    state.rechargePaymentSource = { ...source, cardImage: cardImg };
  },
  setRechargeOrders: (state, orders) => {
    state.rechargeOrders = orders;
  },
  setSquatchBoxGroups: (state, boxes) => {
    state.squatchBoxGroups = boxes;
  },
  setCurrentGroupName: (state, groupName) => {
    state.currentGroupName = groupName;
  },
  setCurrentGroup: (state, group) => {
    state.currentGroup = group;
  },
  setCurrentGroupNextRefillDate: (state, refillDate) => {
    state.currentGroupNextRefillDate = refillDate;
  },
  setRefillBox: (state, refillBox) => {
    state.refillBox = refillBox;
  },
  updateOrderItemInRefillBox: (state, payload) => {
    const currentItem = state.refillBox[payload.index];
    const updatedItem = { ...currentItem, ...payload.data };
    let refillBoxCopy = state.refillBox.slice();
    refillBoxCopy[payload.index] = updatedItem;
    state.refillBox = refillBoxCopy;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};