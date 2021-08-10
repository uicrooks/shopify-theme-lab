import Vue from "vue";
import store from "@/vue/store";
import axios from "axios";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

// Import core components
const MainNav = () => import(
  /* webpackChunkName: "core" */
  /* webpackPreload: true */
  "./vue/core/main-nav/index.vue");
const MainFooter = () => import(/* webpackChunkName: "core" */"./vue/core/main-footer/index.vue");
const CartDrawer = () => import(/* webpackChunkName: "core" */"./vue/core/cart/index.vue");
Vue.component("MainNav", MainNav);
Vue.component("MainFooter", MainFooter);
Vue.component("CartDrawer", CartDrawer);

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
});

export { Vue, store };