import {Vue, store} from "../main";
console.log("layout-collection");

new Vue({
  el: "#app",
  components: {
  },
  store,
  mounted() {
    window.app = this;
  }
});
