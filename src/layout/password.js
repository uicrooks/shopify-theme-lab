import {Vue, store} from "../main";
console.log("layout-password");

new Vue({
  el: "#app",
  components: {
  },
  store,
  mounted() {
    window.app = this;
  }
});
