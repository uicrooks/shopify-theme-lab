const state = () => ({
  screen: {},
  steps: [],
  scents: {},
  defaultSubSkus: {
    BarSoap: "sq8300569",
    HairCare: "sq5357184",
    Deodorant: "sq0000003",
    Toothpaste: "sq0000001"
  },
  skuPrices: {},
  skuLimits: {
    "sq8300569": 6,
    "sq6813766": 9,
    "sq5343053": 3,
    "sq5357184": 3,
    "sq7709481": 3,
    "sq4579735": 3,
    "sq0000003": 1,
    "sq0000004": 2,
    "sq0000005": 3,
    "sq0000001": 3,
    "sq0000002": 3,
  },
  choicesRequired: function() {
    if (!this.screen.choicesRequired) {
      return false;
    }
    if (this.scents[this.screen.handle]) {
      let count = 0;
      this.scents[this.screen.handle].forEach(s=> {
        if (s.qty) {count+=s.qty}
      });
      if (this.screen.required && ["HairCare", "Toothpaste"].indexOf(this.screen.handle)>-1 && count==0) {
        return true;
      }
      if (this.screen.required || (this.screen.choicesRequired && count > 0 && count < this.skuLimits[this.screen.selectedSku()])) {
        return true;
      }
    }
    return false;
  },
  flowSummary: function() {
    let total = 0,
    compare_at_price = 0;
    this.steps.forEach(step => {
      if (step.required || step.chosenSku) {
        const selectedSku = step.selectedSku(),
        match = this.skuPrices[selectedSku]
        total+=(Number(match.price) * step.numSubs);
        compare_at_price+=Number(match.compare_at_price * step.numSubs);
      }
    })
    return {total, compare_at_price}
  },
  selectedScentsOnScreen: function() {
    const match = this.scents[this.screen.handle];
    if (!match) { return []; }
    let arr = [];
    match.forEach(scent => {
      if (scent.qty) {
        for (let i = 0; i < scent.qty; i++) {
          arr.push({
            sku: scent.sku,
            title: scent.title,
            handle: scent.handle
          });
        }
      }
    });
    return arr;
  }
});

const getters = {
  screen: (state) => {
    return state.screen;
  },
  steps: (state) => {
    return state.steps;
  },
  scents: (state) => {
    return state.scents;
  },
  skuLimits: (state) => {
    return state.skuLimits;
  },
  choicesRequired: (state) => {
    return state.choicesRequired();
  },
  flowSummary: (state) => {
    return state.flowSummary();
  },
  selectedScentsOnScreen: (state) => {
    return state.selectedScentsOnScreen();
  }
};

const actions = {
  async finish({ dispatch }, item) {
    const quantityUpdated = await CartService.updateItemQuantity(item.line, item.quantity);
    if (quantityUpdated) {
      dispatch("initialize");
    }
  },
};

const mutations = {
  setCurrentScreen(state, step_handle) {
    let match = state.steps.filter(s => {return s.handle == step_handle })[0];
    if (match) {
      state.screen = match;
    }
  },
  setScents(state, scents) {
    state.scents = scents;
  },
  changeScentQty(state,obj) {
    const {qty, index} = obj;
    let currentHandle = state.screen.handle;
    state.scents[currentHandle][index].qty = qty;
  },
  setSteps(state, steps) {
    state.steps = steps;
  },
  setSkuPrices(state, prices) {
    state.skuPrices = prices;
  },
  clearScreenScents(state, handle) {
    let currentHandle = handle || state.screen.handle;
    state.scents[currentHandle].forEach(p => {
      if (p.qty) {p.qty = 0;}
    });
  },
  setChosenScreenSku(state,sku) {
    state.screen.chosenSku = sku;
    let currentHandle = state.screen.handle;
    for (var i in state.steps) {
      if (state.steps[i].handle == currentHandle) {
        state.steps[i].chosenSku = sku;
        break;
      }
    }
  },
  setScreenSubQuantity(state, val) {
    state.screen.numSubs = val;
    let currentHandle = state.screen.handle;
    for (var i in state.steps) {
      if (state.steps[i].handle == currentHandle) {
        state.steps[i].numSubs = val;
        break;
      }
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};