import {Vue, store} from "../main";
console.log("layout-404");

new Vue({
  el: "#app",
  components: {
  },
  store,
  mounted() {
    window.app = this;
  }
});
