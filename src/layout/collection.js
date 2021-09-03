import {Vue, store, mixins} from "../main";
console.log("layout-collection");

const CollectionDefault = () => import(
  /* webpackChunkName: "collection-default" */
  /* webpackPreload: true */
  "@/vue/templates/collection/contents/default.vue");
const BestSellersCollection = () => import(
  /* webpackChunkName: "collection-best-sellers" */
  /* webpackPreload: true */
  "@/vue/templates/collection/contents/best-sellers.vue");
const CollectionHairCare = () => import(
  /* webpackChunkName: "collection-hair-care" */
  /* webpackPreload: true */
  "@/vue/templates/collection/contents/haircare.vue");

new Vue({
  el: "#app",
  components: {
    CollectionDefault,
    BestSellersCollection,
    CollectionHairCare
  },
  mixins: [...mixins],
  store,
  mounted() {
    window.app = this;
  }
});
