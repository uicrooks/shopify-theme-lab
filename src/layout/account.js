import {Vue, store} from "../main";
console.log("layout-account");

new Vue({
  el: "#app",
  components: {
  },
  store,
  mounted() {
    window.app = this;
  }
});
