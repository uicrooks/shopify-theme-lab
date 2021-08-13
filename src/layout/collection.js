import {Vue, store} from "../main";
console.log("layout-collection");

const CollectionTemplate = () => import(
  /* webpackChunkName: "collection-main" */
  /* webpackPreload: true */
  "../vue/templates/collection/index.vue");

new Vue({
  el: "#app",
  components: {
    Collection: CollectionTemplate
  },
  store,
  mounted() {
    window.app = this;
  }
});
