import {Vue, store} from "../main";
console.log("layout-cart");

new Vue({
  el: "#app",
  components: {
  },
  store,
  mounted() {
    window.app = this;
  }
});
