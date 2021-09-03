import {Vue, store, mixins} from "../main";
console.log("layout-product");

const ProductOnetimeOnly = () => import(
  /* webpackChunkName: "product-onetime-only" */
  /* webpackPreload: true */
  "@/vue/templates/product/templates/product-onetime-only.vue");
const ProductWithInPageCustomSubscription = () => import(
  /* webpackChunkName: "product-with-in-page-custom-subscription" */
  /* webpackPreload: true */
  "@/vue/templates/product/templates/product-with-in-page-custom-subscription.vue");
const ProductWithInPageSubscription = () => import(
  /* webpackChunkName: "product-with-in-page-subscription" */
  /* webpackPreload: true */
  "@/vue/templates/product/templates/product-with-in-page-custom-subscription.vue");
const ProductWithSubscriptionFlow = () => import(
  /* webpackChunkName: "product-with-subscription-flow" */
  /* webpackPreload: true */
  "@/vue/templates/product/templates/product-with-subscription-flow.vue");
new Vue({
  el: "#app",
  components: {
    ProductOnetimeOnly,
    ProductWithInPageCustomSubscription,
    ProductWithInPageSubscription,
    ProductWithSubscriptionFlow
  },
  mixins: [...mixins],
  store,
  mounted() {
    window.app = this;
  }
});
