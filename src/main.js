import Vue from "vue";
import store from "@/vue/store";
import axios from "axios";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// CAN WE IMPROVE IMPORT?
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

/**
 * import core components
 */
const coreComponents = require.context("./vue/core/", true, /\.(vue|js)$/);

coreComponents.keys().forEach(key => {
  const component = coreComponents(key).default;
  const name = component.name
    ? component.name
    : key.replace(/\.(\/|vue|js)/g, "").replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());
  Vue.component(name, component);
});

/**
 * import reusable components
 */
 const reusableComponents = require.context("./vue/reusables/", true, /\.(vue|js)$/);

 reusableComponents.keys().forEach(key => {
   const component = reusableComponents(key).default;
   const name = component.name
     ? component.name
     : key.replace(/\.(\/|vue|js)/g, "").replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());
   Vue.component(name, component);
 });

 /**
 * import module specific components
 */
if (window.location.pathname.includes("collection")) {
  console.log("layout-collection");
  const collectionComponents = require.context("./vue/templates/collection", true, /\.(vue|js)$/);
  collectionComponents.keys().forEach(key => {
    const component = collectionComponents(key).default;
    const name = component.name ?
      component.name :
      key.replace(/\.(\/|vue|js)/g, "").replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());
    Vue.component(name, component);
  });
}

Vue.filter("money", (val, currency) => {
  if (!val) return "N/A";
  const money = (val / 100).toFixed(2);
  return currency ? `${currency} ${money}` : money;
});

new Vue({
  el: "#app",
  store
});
// window.app = Vue;
// window.app.cart = CartService;


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