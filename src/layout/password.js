import {Vue, store, mixins} from "../main";
console.log("layout-password");

new Vue({
  el: "#app",
  components: {
  },
  mixins: [...mixins],
  store,
  mounted() {
    window.app = this;
  }
});
