import {Vue, store, mixins} from "../main";
console.log("layout-page");

const BundleOffersTemplate = () => import(
  /* webpackChunkName: "page-bundle-offers" */
  /* webpackPreload: true */
  "../vue/templates/page/bundle-offers/index.vue");
const SubscriptionFlowTemplate = () => import(
    /* webpackChunkName: "page-subscription-flow" */
    /* webpackPreload: true */
    "../vue/templates/page/subscription-flow/index.vue");
const PrivacyPolicyTemplate = () => import(
    /* webpackChunkName: "page-privacy-policy" */
    /* webpackPreload: true */
    "../vue/templates/page/privacy-policy.vue");

new Vue({
  el: "#app",
  components: {
    BundleOffersTemplate,
    PrivacyPolicyTemplate,
    SubscriptionFlowTemplate
  },
  mixins: [...mixins],
  store,
  mounted() {
    window.app = this;
  }
});
