/* eslint-disable */
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
console.log(window.location);
if (window.location.pathname.includes("/products")) {
  console.log("layout-product");
  const components = require.context("./vue/templates/product", true, /\.(vue|js)$/);
  components.keys().forEach(key => {
    const component = components(key).default;
    const name = component.name ?
      component.name :
      key.replace(/\.(\/|vue|js)/g, "").replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());
    Vue.component(name, component);
  });
} else if (window.location.pathname.includes("/pages") || window.location.pathname.includes("/account/")) {
  console.log("layout-page");
  const components = require.context("./vue/templates/page", true, /\.(vue|js)$/);
  components.keys().forEach(key => {
    const component = components(key).default;
    const name = component.name ?
      component.name :
      key.replace(/\.(\/|vue|js)/g, "").replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());
    Vue.component(name, component);
  });
} else if (window.location.pathname.includes("/collections")) {
  console.log("layout-collection");
  const components = require.context("./vue/templates/collection", true, /\.(vue|js)$/);
  components.keys().forEach(key => {
    const component = components(key).default;
    const name = component.name ?
      component.name :
      key.replace(/\.(\/|vue|js)/g, "").replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());
    Vue.component(name, component);
  });
} else {
  console.log("layout-index");
  const components = require.context("./vue/templates/index", true, /\.(vue|js)$/);
  components.keys().forEach(key => {
    const component = components(key).default;
    const name = component.name ?
      component.name :
      key.replace(/\.(\/|vue|js)/g, "").replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());
    Vue.component(name, component);
  });
}

Vue.filter("money", (val, currency, toFixedVal = 2) => {
  if (!val) return "N/A";
  const money = (val / 100).toFixed(toFixedVal);
  return currency ? `${currency}${money}` : money;
});

Vue.filter("singularize", (val) => {
  if (!val) return "";
  return val.slice(-1).toLowerCase() === "s" ? val.slice(0, -1) : val;
});

Vue.filter("readableHandle", (val) => {
  if (!val) return "";
  const capitalized = val.split("-").map(word => {
    return word[0].toUpperCase() + word.slice(1);
  });
  return capitalized.join(" ");
});

new Vue({
  el: "#app",
  store
});
window.app = Vue;
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
// window.app.cart = CartService;


/*
COMMENTED: add back as needed
const mixins = require.context("./vue/mixins/", true, /.*global.*\.js$/)

mixins.keys().forEach(key => {
  Vue.mixin(mixins(key).default)
})
*/

/*
COMMENTED: add back as needed
const directives = require.context("./vue/directives/", true, /.*global.*\.js$/)

directives.keys().forEach(key => {
  const directive = directives(key).default
  Vue.directive(directive.name, directive.directive)
})
*/

// NOT NEEDED, showing it's okay to delete;
/*
Shopify.designMode && document.addEventListener("shopify:section:load", (event) => {
  if (event.target.classList.value.includes("vue")) {
    new Vue({
      el: event.target,
      store
    })
  }
});*/