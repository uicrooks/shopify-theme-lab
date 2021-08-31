<template>
  <div class="new-sub-flow">
    <section class="sub-flow-log" />
    <SubscriptionFlowHeader
      :screen="screen"
      :steps="steps"
      :sub-products-barsoap="subProducts_BarSoap"
      :sub-products-deodorant="subProducts_Deodorant"
      :sub-products-haircare="subProducts_HairCare"
      :sub-products-toothpaste="subProducts_Toothpaste"
    />

    <IntroScreen v-if="currentHandle == 'Intro'" />

    <transition
      name="fade"
      mode="out-in"
    >
      <ScentScreen
        v-if="currentHandle == 'BarSoap'"
        :key="currentHandle+'_screen'"
        :scents="scents['BarSoap']"
      />
      <ScentScreen
        v-if="currentHandle == 'Deodorant'"
        :key="currentHandle+'_screen'"
        :scents="scents['Deodorant']"
      />
      <ScentScreen
        v-if="currentHandle == 'HairCare'"
        :key="currentHandle+'_screen'"
        :scents="scents['HairCare']"
      />
      <ScentScreen
        v-if="currentHandle == 'Toothpaste'"
        :key="currentHandle+'_screen'"
        :scents="scents['Toothpaste']"
      />
      <AddonsScreen v-if="currentHandle == 'Addons'" />
    </transition>

    <SubscriptionFlowFooter
      :current-handle="currentHandle"
      :steps="[]"
    />
  </div>
</template>

<script>
/* eslint-disable */
import store from "./store.js";
import { mapGetters } from "vuex";
import ProductIdentifier from "@/vue/services/product-identifier";

// COMPONENTS
import SubscriptionFlowHeader from "./components/subscription-flow-header.vue";
import SubscriptionFlowFooter from "./components/subscription-flow-footer.vue";
import AddonsScreen from "./steps/addons-screen.vue";
import IntroScreen from "./steps/intro-screen.vue";
import ScentScreen from "./steps/scent-screen.vue";

export default {
  name: "SubscriptionFlow",
  props: {
    barsoapsubdetails: {required: true, type: String},
    deodorantsubdetails: {required: true, type: String},
    haircaresubdetails: {required: true, type: String},
    toothpastesubdetails: {required: true, type: String},
    productdetails: {required: true, type: String},
    addons: {required: true, type: String}
  },
  components: {
    AddonsScreen,
    IntroScreen,
    ScentScreen,
    SubscriptionFlowHeader,
    SubscriptionFlowFooter
  },
  data() {
    return {
      subProducts_BarSoap:[],
      subProducts_HairCare: [],
      subProducts_Deodorant: [],
      subProducts_Toothpaste: [],
      screens: ["BarSoap","HairCare","Deodorant","Toothpaste"],
      steps: [{
        handle: "BarSoap",
        title: "Soap",
        icon: "",
        required: true,
        chosenSku: "",
        choicesRequired: false,
        numSubs: 1,
      },{
        handle: "Deodorant",
        title: "Deodorant",
        icon: "",
        required: false,
        chosenSku: "",
        choicesRequired: true,
        numSubs: 1,
      },{
        handle: "HairCare",
        title: "Hair Care",
        icon: "",
        required: true,
        chosenSku: "",
        choicesRequired: false,
        numSubs: 1,
      },{
        handle: "Toothpaste",
        title: "Toothpaste",
        icon: "",
        required: false,
        chosenSku: "",
        choicesRequired: false,
        numSubs:1,
      },{
        handle: "Addons",
        title: "Add-ons",
        icon: "",
        required: false,
        chosenSku: "",
        choicesRequired: false,
      }],
    }
  },
  computed: {
    ...mapGetters("subFlow", ["screen","scents","flowSummary"]),
    currentHandle() {
      return this.screen.handle
    }
  },
  created() {
    this.$store.registerModule("subFlow", store);
  },
  methods: {
    deeplinking() {
      let params = this.$root.session.params || {};
      var req_prods = params.req_prods || "",
        hide_prods = params.hide_prods || "",
        showInfo = params.showInfo || "false",
        hideSummary = params.hideSummary || "false",
        screenOrder = params.screenOrder || "",
        preselectedAddons = params.addonSkus || "";

      if (req_prods) {
        console.log(req_prods);
        this.steps[0].required=false;
        var initProds = req_prods.split(',');
        initProds.forEach((handle) => {
          for (var i in this.steps) {
            if (this.steps[i].handle == handle) {
              this.steps[i].required = true;
              console.log('match')
              console.log(this.steps[i])
              break;
            }
          }
        });
      }

      if (hide_prods) {
        var stepsToExclude = hide_prods.split(','),
          allowed_handles = ['BarSoap', 'Deodorant', 'HairCare', 'Toothapste', 'Addons'];
        var steps = this.steps.filter(step => {
          if (stepsToExclude.indexOf(step.handle) == -1) {
            return step;
          }
        });
        this.steps = steps;
      }

      if (screenOrder) {
        var order = screenOrder.split(','),
          newOrder = [];
        order.forEach(prodType => {
          var match = this.steps.filter(s => {
            if (s.handle == prodType) {
              return s
            }
          })[0];
          if (match) {
            newOrder.push(match);
          }
        });
        this.steps.forEach(step => {
          if (order.indexOf(step.handle) == -1) {
            newOrder.push(step)
          }
        });
        console.log(newOrder)
        this.steps = newOrder;
      }
      //
      //this.preselectedAddonSkus = preselectedAddons ? preselectedAddons.toLowerCase().split(',') : [];
    }
  },
  mounted() {
    window.test=this;
    window.tStore=store;
    this.deeplinking();
    let scents = {};
    let skuPrices = {};
    let addons = {};
    const that = this;
    ["BarSoap","HairCare","Deodorant","Toothpaste"].forEach(type => {
      // Parse Subscription Products To Variables
      console.log(type);
      this[`subProducts_${type}`] = JSON.parse(this[`${type.toLowerCase()}subdetails`]);
      // set sku prices
      this[`subProducts_${type}`].forEach(prod => {
        skuPrices[prod.sku] = {...prod};
      })
      for (var i in this.steps) {
        if (this.steps[i].handle == type) {
          this.steps[i].selectedSku = function() {
            const subFlowState = that.$store.state["subFlow"]
            let defaultSku = subFlowState.defaultSubSkus ? subFlowState.defaultSubSkus[this.handle] : "";
            if (this.required) {
              return this.chosenSku || defaultSku;
            } else {
              return this.chosenSku || defaultSku;
            }
          }
          this.steps[i].selectedScents = function() {
            const subFlowState = that.$store.state["subFlow"]
            const scents = subFlowState.scents ? subFlowState.scents[this.handle] : [];
            return scents.filter(s=> {
              return s.qty>0;
            });
          }
          break;
        }
      }
    });
    JSON.parse(this.productdetails).forEach(scent => {
      // set filter tag
      // didn't use product identifier because of sku grouping
      scent.count = function() {
        return this.qty;
      }
      switch (scent.type) {
        case "BarSoap":
          break;
        case "Deodorant":
          break;
        case "HairCare":
          if (scent.title.indexOf('Kit')>-1) {
            scent.filter_sku = "sq5357184";
          } else if (scent.title.indexOf('Shampoo')>-1) {
            scent.filter_sku = "sq7709481";
          } else if (scent.title.indexOf('Conditioner')>-1) {
            scent.filter_sku = "sq4579735";
          }
          break;
        case "Toothpaste":
          break;
      }
      if (scents[scent.type]) {
        scents[scent.type].push(scent);
      } else {
        scents[scent.type] = [scent];
      }
    });
    JSON.parse(this.addons).forEach(addon => {
      addon.count = function() {
        return this.qty;
      }
      if (addons[addon.type]) {
        addons[addon.type].push(addon);
      } else {
        addons[addon.type] = [addon];
      }
    });
    this.$store.commit("subFlow/setSteps", this.steps);
    this.$store.commit("subFlow/setScents", scents);
    this.$store.commit("subFlow/setAddons", addons);
    this.$store.commit("subFlow/setSkuPrices", skuPrices);
    this.$store.commit('subFlow/setCurrentScreen', this.steps[0].handle);
  }
}
</script>
<style lang="scss">
@use "@/styles/main" as global;
@import "@/styles/partials/brand";
.new-sub-flow {
  background: global.$black;
  min-height: 100vh;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>