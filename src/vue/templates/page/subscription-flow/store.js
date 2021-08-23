const state = () => ({
  screen: {},
  steps: [],
  scents: {},
  addons: {},
  viewedAddons: false,
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
        if (s.qty) {count+=s.qty;}
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
      if (step.required || (step.chosenSku && this.selectedScentsOnScreen().length)) {
        const selectedSku = step.selectedSku(),
        match = this.skuPrices[selectedSku];
        total+=(Number(match.price) * step.numSubs);
        compare_at_price+=Number(match.compare_at_price * step.numSubs);
      }
    });
    if (this.viewedAddons) {
      for (var i in this.addons) {
        let addonGroup = this.addons[i];
        addonGroup.forEach(addon => {
          if (addon.qty) {
            total+=(Number(addon.price)*addon.qty);
            compare_at_price+=(Number(addon.price)*addon.qty);
          }
        });
      }
    }
    return {total, compare_at_price};
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
  },
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
  addons: (state) => {
    return state.addons;
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
  async finishSubFlow({state}) {
    var finalAddToCart = [];
    const skuPrices = state.skuPrices;
    // Get All Scents
    state.steps.forEach(step => {
      let selectedScents = step.selectedScents ? step.selectedScents() : [],
      selectedSku = step.selectedSku ? step.selectedSku() : "",
      isRequired = step.isRequired,
      numSubs = step.numSubs;

      var subProdMatch, scent_arr;
      switch(step.handle) {
        case "BarSoap":
          if (selectedScents.length || step.required) {
            subProdMatch = skuPrices[selectedSku];
            if (subProdMatch) {
              subProdMatch = JSON.parse(JSON.stringify(subProdMatch));
              scent_arr = [];
              selectedScents.forEach(scent => {
                for (var i = 0; i < scent.qty; i++) {
                  scent_arr.push(scent.sku);
                }
              });
              let unPickedScents = state.skuLimits[selectedSku] - scent_arr.length;
              if (unPickedScents>0) {
                for (var i = 0; i < unPickedScents; i++) {
                  scent_arr.push("squatch-picks");
                }
              }
              var fulfillmentScents = {};
              scent_arr.forEach((sku, i) => {
                fulfillmentScents[`_fulfillment_Scent${i+1}`] = sku;
              });
              subProdMatch.properties = subProdMatch.properties || {};
              Object.assign(subProdMatch.properties, fulfillmentScents);
              subProdMatch.qty = 1;
              finalAddToCart.push({
                variant_id: subProdMatch.variant_id,
                quantity: subProdMatch.qty,
                properties: subProdMatch.properties
              });
            }
          }
          break;
        case "HairCare":
          if (selectedScents.length) {
            subProdMatch = skuPrices[selectedSku];
            if (subProdMatch) {
              selectedScents.forEach(scent => {
                scent_arr = [];
                subProdMatch = JSON.parse(JSON.stringify(subProdMatch));
                  if (scent.sku == "hair-kit-1") {
                    scent_arr.push("smp-cyp-01");
                    scent_arr.push("con-clc-01");
                  } else if (scent.sku == "hair-kit-fresh") {
                    scent_arr.push("smp-ffl-01");
                    scent_arr.push("con-ffl-01");
                  } else {
                    scent_arr.push(scent.sku);
                  }
                  var fulfillmentScents = {};
                  scent_arr.forEach((sku, i) => {
                    fulfillmentScents[`_fulfillment_Scent${i+1}`] = sku;
                  });
                  subProdMatch.properties = subProdMatch.properties || {};
                  Object.assign(subProdMatch.properties, fulfillmentScents);
                  subProdMatch.qty = scent.qty;
                  finalAddToCart.push({
                    variant_id: subProdMatch.variant_id,
                    quantity: subProdMatch.qty,
                    properties: subProdMatch.properties
                  });
              });
            }
          }
          break;
        case "Deodorant":
          if (selectedScents.length) {
            subProdMatch = skuPrices[selectedSku];
            if (subProdMatch) {
              subProdMatch = JSON.parse(JSON.stringify(subProdMatch));
              scent_arr = [];
              selectedScents.forEach(scent => {
                for (var i = 0; i < scent.qty; i++) {
                  scent_arr.push(scent.sku);
                }
              });
              var fulfillmentScents = {};
              scent_arr.forEach((sku, i) => {
                fulfillmentScents[`_fulfillment_Scent${i+1}`] = sku;
              });
              subProdMatch.properties = subProdMatch.properties || {};
              Object.assign(subProdMatch.properties, fulfillmentScents);
              subProdMatch.qty = 1;
              finalAddToCart.push({
                variant_id: subProdMatch.variant_id,
                quantity: subProdMatch.qty,
                properties: subProdMatch.properties
              });
            }
          }
          break;
        case "Toothpaste":
          if (selectedScents.length) {
            subProdMatch = skuPrices[selectedSku];
            if (subProdMatch) {
              selectedScents.forEach(scent => {
                scent_arr = [];
                subProdMatch = JSON.parse(JSON.stringify(subProdMatch));
                  if (scent.sku == "tooth-bun") {
                    scent_arr.push("tooth-cm-mng");
                    scent_arr.push("tooth-ss-nht")
                  } else {
                    scent_arr.push(scent.sku);
                  }
                  var fulfillmentScents = {};
                  scent_arr.forEach((sku, i) => {
                    fulfillmentScents[`_fulfillment_Scent${i+1}`] = sku;
                  });
                  subProdMatch.properties = subProdMatch.properties || {};
                  Object.assign(subProdMatch.properties, fulfillmentScents);
                  subProdMatch.qty = scent.qty;
                  finalAddToCart.push({
                    variant_id: subProdMatch.variant_id,
                    quantity: subProdMatch.qty,
                    properties: subProdMatch.properties
                  });
              });
            }
          }
          break;
        case "Addons":
          for (var prodType in state.addons) {
            var prods = state.addons[prodType];
            prods.forEach(prod => {
              if (prod.qty) {
                finalAddToCart.push({
                  variant_id: prod.variant_id,
                  qty: prod.qty,
                  properties: {}
                });
              }
            });
          }
          break;
        default:
          break;
      }
    });
    console.log(finalAddToCart);
    /*const quantityUpdated = await CartService.updateItemQuantity(item.line, item.quantity);
    if (quantityUpdated) {
      dispatch("initialize");
    }*/
  },
};

const mutations = {
  setCurrentScreen(state, step_handle) {
    let match = state.steps.filter(s => {return s.handle == step_handle })[0];
    if (match) {
      state.screen = match;
      window.scrollTo(0,0);
    }
  },
  setScents(state, scents) {
    state.scents = scents;
  },
  setAddons(state, addons) {
    state.addons = addons;
  },
  setViewedAddons(state, status) {
    state.viewedAddons = status;
  },
  changeScentQty(state,obj) {
    const {qty, index} = obj;
    let currentHandle = state.screen.handle;
    state.scents[currentHandle][index].qty = qty;
  },
  changeAddonQty(state, obj) {
    const {qty, variant_id, type} = obj;
    var addons = state.addons[type] || [],
    match_i;
    for (var i in addons) {
      if (addons[i].variant_id == variant_id) {
        match_i = i;
        break;
      }
    }
    if (!match_i) {return;}
    state.addons[type][match_i].qty = qty;
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