import {Vue, store, mixins} from "../main";
console.log("layout-product");

const ProductBaseTemplate = () => import(
  /* webpackChunkName: "product-main" */
  /* webpackPreload: true */
  "@/vue/templates/product/templates/base-template.vue");
const ProductWithSubscriptionFlow= () => import(
  /* webpackChunkName: "product-with-sub-link" */
  /* webpackPreload: true */
  "@/vue/templates/product/templates/product-with-subscription-flow.vue");
const ProductWithInPageSubscription = () => import(
  /* webpackChunkName: "product-with-sub-flow" */
  /* webpackPreload: true */
  "@/vue/templates/product/templates/product-with-in-page-subscription.vue");
const ProductWithInPageCustomSubscription = () => import(
  /* webpackChunkName: "product-with-cust-sub-flow" */
  /* webpackPreload: true */
  "@/vue/templates/product/templates/product-with-in-page-custom-subscription.vue");
const ProductOnetimeOnly = () => import(
  /* webpackChunkName: "product-onetime-only" */
  /* webpackPreload: true */
  "@/vue/templates/product/templates/product-onetime-only.vue");

new Vue({
  el: "#app",
  components: {
    ProductBaseTemplate,
    ProductWithSubscriptionFlow,
    ProductWithInPageSubscription,
    ProductWithInPageCustomSubscription,
    ProductOnetimeOnly
  },
  mixins: [...mixins],
  store,
  mounted() {
    window.app = this;
  }
});
