/* eslint-disable */
import Vue from "vue";
import store from "@/vue/store";
import axios from "axios";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "@/styles/bootstrap_variables.scss";
import VueApp from "@/vue/core/app";
const mixins = [VueApp];

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

// Import core components
const MainNav = () => import(
  /* webpackChunkName: "core" */
  /* webpackPreload: true */
  "./vue/core/main-nav/index.vue");
const MainFooter = () => import(/* webpackChunkName: "core" */"@/vue/core/main-footer/index.vue");
const CartDrawer = () => import(/* webpackChunkName: "core" */"@/vue/core/cart/index.vue");
Vue.component("MainNav", MainNav);
Vue.component("MainFooter", MainFooter);
Vue.component("CartDrawer", CartDrawer);

export { Vue, store, mixins };