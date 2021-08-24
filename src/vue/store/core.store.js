const state = () => ({
  loggedIn: false,
  oosItems: [],
  defaultCurrencyOption: {},
  currencyOptions: [
    {
      country: "United States",
      country_code: "US",
      handle: "",
      currency: "USD",
      symbol: "$",
      imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Flag_of_the_U.S..svg?v=1613061492"
    }, // first element must be USD
    {
      country: "Canada",
      country_code: "CA",
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
  oosItems: (state) => {
    return state.oosItems;
  },
  freeShippingMinimum: (state) => {
    return state.currentCurrency === "USD" ? 4000 : 5000;
  },
  defaultCurrencyOption: (state) => {
    return state.defaultCurrencyOption;
  },
  currencyOptions: (state) => {
    return state.currencyOptions;
  },
};

const actions = {

};

const mutations = {
  setLoggedIn: (state, loggedIn) => {
    state.loggedIn = loggedIn;
  },
  setOosItems: (state, oosItems) => {
    state.oosItems = oosItems;
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