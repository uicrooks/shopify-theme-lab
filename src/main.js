import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.filter("money", function(val, currency) {
  if (!val) return "0";
  const money = val.toString().splice(1, ".");
  return currency ? `${currency} ${money}` : money;
});

// CAN WE IMPROVE IMPORT?
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

/**
 * vuex
 * auto-import all modules ** CAN WE IMPROVE?
 */
Vue.use(Vuex);

/*
COMMENTED, add back as needed
const vuexModules = require.context('./vue/store/', true, /\.js$/)
const modules = {}

vuexModules.keys().forEach(key => {
  const name = key.replace(/\.(\/|js)/g, '').replace(/\s/g, '-')
  modules[name] = vuexModules(key).default
})

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules
})*/

/*
COMMENTED: add back as needed
const mixins = require.context('./vue/mixins/', true, /.*global.*\.js$/)

mixins.keys().forEach(key => {
  Vue.mixin(mixins(key).default)
})
*/

/*
COMMENTED: add back as needed
const directives = require.context('./vue/directives/', true, /.*global.*\.js$/)

directives.keys().forEach(key => {
  const directive = directives(key).default
  Vue.directive(directive.name, directive.directive)
})
*/

Vue.prototype.$axios = axios;

/**
 * vue components
 * auto-import all Vue core components
 */
 const vueComponents = require.context("./vue/core/", true, /\.(vue|js)$/);

 vueComponents.keys().forEach(key => {
   const component = vueComponents(key).default;
   const name = component.name
     ? component.name
     : key.replace(/\.(\/|vue|js)/g, "").replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());
   Vue.component(name, component);
 });

new Vue({
  el: "#app",  
});
// window.app = Vue;
// window.app.cart = CartService;

// NOT NEEDED, showing it's okay to delete;
/*
Shopify.designMode && document.addEventListener('shopify:section:load', (event) => {
  if (event.target.classList.value.includes('vue')) {
    new Vue({
      el: event.target,
      store
    })
  }
});*/