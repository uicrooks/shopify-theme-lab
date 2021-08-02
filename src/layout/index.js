import {Vue, store} from '../main';
console.log("layout-index");
console.log('asdfasdf')

//import IndexTemplate from "../vue/templates/index/index.vue";
const IndexTemplate = () => import(/* webpackChunkName: "index-main" */"../vue/templates/index/index.vue");
new Vue({
  el: "#app",
  components: {
    IndexTemplate
  },
  store,
  mounted() {
    window.app = this;
  }
});
