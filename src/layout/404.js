import {Vue, store, mixins} from "../main";
console.log("layout-404");

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
