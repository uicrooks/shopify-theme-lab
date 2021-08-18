const state = () => ({
  currentView: "Overview",
  userTags: [],
  rechargeUser: {},
  rechargePaymentSource: {},
  rechargeOrders: {},
  squatchBoxGroups: {},
  currentGroupName: "", // address label: 4015 Marina St.
  currentGroup: {},
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
  currentGroupShippingAddress: (state) => {
    return state.currentGroup && state.currentGroup.fullAddress ? [`${state.currentGroup.fullAddress.address1} ${state.currentGroup.fullAddress.address2}`, `${state.currentGroup.fullAddress.city}, ${state.currentGroup.fullAddress.province}`, state.currentGroup.fullAddress.zip] : [];
  },
  refillBoxDate: (state) => {
    return state.currentGroup && state.currentGroup.upcomingRefillDates ? state.currentGroup.upcomingRefillDates[0] : null;
  },
  refillBox: (state, getters) => {
    return getters.refillBoxDate ? state.currentGroup.upcomingRefillsByDate[getters.refillBoxDate] : [];
  },
  refillBoxSubTotal: (state, getters) => {
    const total = getters.refillBox.reduce((total, item) => {
      const compareAtPrice = item.productData && item.productData.variants && item.productData.variants[0].compareAtPrice ? parseInt(item.productData.variants[0].compareAtPrice) : item.price;

      return total += compareAtPrice * item.quantity;
    }, 0);
    return total;
  },
  refillBoxSavingsTotal: (state, getters) => {
    const total = getters.refillBox.reduce((total, item) => {
      if (item.status === "ONETIME") {
        return total;
      }
      const compareAtPrice = item.productData && item.productData.variants && item.productData.variants[0].compareAtPrice ? parseInt(item.productData.variants[0].compareAtPrice) : 0;
      let savings = compareAtPrice ? compareAtPrice - item.price : 0;
      return total += savings * item.quantity;
    }, 0);
    return total;
  }
};

const actions = {
  initializeCurrentGroup: ({ commit, state }, groupName) => {
    commit("setCurrentGroupName", groupName);
    commit("setCurrentGroup", state.squatchBoxGroups[groupName]);
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
  updateOrderItemInRefillBox: (state, payload) => {
    let refillBox = state.currentGroup.upcomingRefillsByDate[state.currentGroup.upcomingRefillDates[0]];
    refillBox[payload.index] = { ...refillBox[payload.index], ...payload.data };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};