import {Vue, store, mixins} from "../main";
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
  mixins: [...mixins],
  store,
  mounted() {
    window.app = this;
  }
});
