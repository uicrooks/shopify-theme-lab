import {Vue, store} from "../main";
console.log("layout-product");

const ProductTemplate = () => import(
  /* webpackChunkName: "product-main" */
  /* webpackPreload: true */
  "../vue/templates/product/index.vue");

new Vue({
  el: "#app",
  components: {
    Product: ProductTemplate
  },
  store,
  mounted() {
    window.app = this;
  }
});
