const state = () => ({
  loggedIn: false,
  defaultCurrencyOption: {},
  currencyOptions: [
    {
      country: "United States",
      handle: "",
      currency: "USD",
      symbol: "$",
      imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Flag_of_the_U.S..svg?v=1613061492"
    }, // first element must be USD
    {
      country: "Canada",
      handle: "ca",
      currency: "CAD",
      symbol: "$",
      imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Flag_of_Canada.svg?v=1613061492"
    },
  ],
});

const getters = {
  loggedIn: (state) => {
    return state.loggedIn;
  },
  freeShippingMinimum: (state) => {
    return state.currentCurrency === "USD" ? 4000 : 5000;
  },
  defaultCurrencyOption: (state) => {
    return state.defaultCurrencyOption;
  },
  currencyOptions: (state) => {
    return state.currencyOptions;
  }
};

const actions = {

};

const mutations = {
  setLoggedIn: (state, loggedIn) => {
    state.loggedIn = loggedIn;
  },
  setDefaultCurrencyOption: (state, option) => {
    state.defaultCurrencyOption = option;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};