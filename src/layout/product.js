import {Vue, store} from "../main";
console.log("layout-product");

new Vue({
  el: "#app",
  components: {
  },
  store,
  mounted() {
    window.app = this;
  }
});
