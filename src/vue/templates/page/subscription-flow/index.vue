<template>
  <div class="new-sub-flow">
      <section class="sub-flow-log"></section>
      <SubscriptionFlowHeader
        :screen="screen"
        :steps="steps"
        :subProductsBarsoap="subProducts_BarSoap"
        :subProductsDeodorant="subProducts_Deodorant"
        :subProductsHaircare="subProducts_HairCare"
        :subProductsToothpaste="subProducts_Toothpaste"
      />

      <IntroScreen v-if="currentHandle == 'Intro'" />

      <transition name="fade" mode="out-in">

        <ScentScreen
          :scents="scents['BarSoap']"
          v-if="currentHandle == 'BarSoap'"
          :key="currentHandle+'_screen'"
        />
        <ScentScreen
          :scents="scents['Deodorant']"
          v-if="currentHandle == 'Deodorant'"
          :key="currentHandle+'_screen'"
        />
        <ScentScreen
          :scents="scents['HairCare']"
          v-if="currentHandle == 'HairCare'"
          :key="currentHandle+'_screen'"
        />
        <ScentScreen
          :scents="scents['Toothpaste']"
          v-if="currentHandle == 'Toothpaste'"
          :key="currentHandle+'_screen'"
        />
        <AddonsScreen v-if="currentHandle == 'Addons'" />

      </transition>

      <SubscriptionFlowFooter
        :currentHandle="currentHandle"
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
const BarSoapScreen = () => import("./steps/bar-soap-screen.vue");
const HairCareScreen = () => import("./steps/hair-care-screen.vue");
const DeodorantScreen = () => import("./steps/deodorant-screen.vue");
const ToothpasteScreen = () => import("./steps/toothpaste-screen.vue");
const AddonsScreen = () => import("./steps/addons-screen.vue");
const IntroScreen = () => import("./steps/intro-screen.vue");

export default {
  name: "SubscriptionFlow",
  props: {
    barsoapsubdetails: {required: true, type: String},
    deodorantsubdetails: {required: true, type: String},
    haircaresubdetails: {required: true, type: String},
    toothpastesubdetails: {required: true, type: String},
    productdetails: {required: true, type: String},
  },
  components: {
    BarSoapScreen,
    HairCareScreen,
    DeodorantScreen,
    ToothpasteScreen,
    AddonsScreen,
    IntroScreen
  },
  data() {
    return {
      subProducts_BarSoap:[],
      subProducts_HairCare: [],
      subProducts_Deodorant: [],
      subProducts_Toothpaste: [],
      addons: {},
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
  mounted() {
    window.test=this;
    window.tStore=store;
    let scents = {};
    let skuPrices = {};
    ["BarSoap","HairCare","Deodorant","Toothpaste"].forEach(type => {
      // Parse Subscription Products To Variables
      this[`subProducts_${type}`] = JSON.parse(this[`${type.toLowerCase()}subdetails`]);
      // set sku prices
      this[`subProducts_${type}`].forEach(prod => {
        skuPrices[prod.sku] = {...prod};
      })
      for (var i in this.steps) {
        if (this.steps[i].handle == type) {
          this.steps[i].selectedSku = function() {
            if (this.required) {
              return this.chosenSku || store.state().defaultSubSkus[this.handle];
            } else {
              return this.chosenSku || store.state().defaultSubSkus[this.handle];
            }
          }
          this.steps[i].selectedScents = function() {
            const scents = store.state().scents[this.handle] || [];
            console.log(this.handle)
            console.log(scents)
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
    this.$store.commit("subFlow/setSteps", this.steps);
    this.$store.commit("subFlow/setScents", scents);
    this.$store.commit("subFlow/setSkuPrices", skuPrices);
    this.$store.commit('subFlow/setCurrentScreen', 'BarSoap');
  }
}
</script>
<style lang="scss">
@import "@/styles/main.scss";
.new-sub-flow {
  overflow-x:hidden;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
<style scoped lang="scss">

</style>