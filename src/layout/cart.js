import {Vue, store, mixins} from "../main";
console.log("layout-cart");

new Vue({
  el: "#app",
  mixins: [...mixins],
  components: {
  },
  store,
  mounted() {
    window.app = this;
  }
});
