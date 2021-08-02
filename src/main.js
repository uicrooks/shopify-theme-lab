import Vue from "vue";
import store from "@/vue/store";
import axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

// Import core components
const MainNav = () => import(/* webpackChunkName: "core" */"./vue/core/main-nav/index.vue");
const MainFooter = () => import(/* webpackChunkName: "core" */"./vue/core/main-footer/index.vue");
const CartDrawer = () => import(/* webpackChunkName: "core" */"./vue/core/cart/index.vue");
Vue.component("MainNav", MainNav);
Vue.component("MainFooter", MainFooter);
Vue.component("CartDrawer", CartDrawer);
/*
// Import Filters
const filters = require.context("./vue/filters/", true, /\.(vue|js)$/);
filters.keys().forEach(key => {
  const filterMethod = filters(key);
  const name = key.replace(/\.(\/|vue|js)/g, "").replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());
  Vue.filter(name, filterMethod);
});

const body = document.body;
const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    body.classList.remove(scrollUp);
    return;
  }

  if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
    // down
    body.classList.remove(scrollUp);
    body.classList.add(scrollDown);
  } else if (
    currentScroll < lastScroll &&
    body.classList.contains(scrollDown)
  ) {
    // up
    body.classList.remove(scrollDown);
    body.classList.add(scrollUp);
  }
  lastScroll = currentScroll;
});*/
console.log(Vue)
export { Vue, store };