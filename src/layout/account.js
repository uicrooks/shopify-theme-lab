import Vue from "vue";
console.log("layout-account");

const vueComponents = require.context("../vue/templates/account", true, /\.(vue|js)$/);
vueComponents.keys().forEach(key => {
  const component = vueComponents(key).default;
  const name = component.name
    ? component.name
    : key.replace(/\.(\/|vue|js)/g, "").replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());
  Vue.component(name, component);
});

/* Import Filters
const filters = require.context("./vue/filters/", true, /\.(vue|js)$/);
filters.keys().forEach(key => {
  const filterMethod = filters(key);
  const name = key.replace(/\.(\/|vue|js)/g, "").replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());
  Vue.filter(name, filterMethod);
});*/

new Vue({
  el: "#layout-account",
});
