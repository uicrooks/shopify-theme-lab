import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { BootstrapVue } from 'bootstrap-vue'
/*import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './css/main.scss'*/

import "./css/main.scss";

Vue.use(BootstrapVue)

/**
 * vue settings
 */
Vue.config.productionTip = false

/**
 * vue components
 * auto-import all vue components
 */
const vueComponents = require.context('./vue/components/', true, /\.(vue|js)$/)

vueComponents.keys().forEach(key => {
  const component = vueComponents(key).default;
  const file = component.__file.split('src/')[1];
  const name = component.name
    ? component.name
    : key.replace(/\.(\/|vue|js)/g, '').replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase())
  Vue.component(name, () => import(`./${file}`));
})

/**
 * vuex
 * auto-import all modules
 */
Vue.use(Vuex)

const vuexModules = require.context('./vue/store/', true, /\.js$/)
const modules = {}

vuexModules.keys().forEach(key => {
  const name = key.replace(/\.(\/|js)/g, '').replace(/\s/g, '-')
  modules[name] = vuexModules(key).default
})

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules
})

/**
 * vue mixins
 * auto-register all mixins with a 'global' keyword in their filename
 */
const mixins = require.context('./vue/mixins/', true, /.*global.*\.js$/)

mixins.keys().forEach(key => {
  Vue.mixin(mixins(key).default)
})

/**
 * vue directives
 * auto-register all directives with a 'global' keyword in their filename
 */
const directives = require.context('./vue/directives/', true, /.*global.*\.js$/)

directives.keys().forEach(key => {
  const directive = directives(key).default
  Vue.directive(directive.name, directive.directive)
})

/**
 * vue prototype
 * extend with additional features
 */
Vue.prototype.$axios = axios

/**
 * vue plugins
 * extend with additional features
 */
// register additional plugins here

/**
 * create vue instance
 */
new Vue({
  el: '#app',
  store
})

/**
 * fix: properly render vue components inside sections on user insert in the theme editor
 * add the 'vue' keyword to the section's wrapper classes e.g.:
 * {% schema %}
 * {
 *   "class": "shopify-section-vue"
 * }
 * {% endschema %}
 */
// eslint-disable-next-line
Shopify.designMode && document.addEventListener('shopify:section:load', (event) => {
  if (event.target.classList.value.includes('vue')) {
    new Vue({
      el: event.target,
      store
    })
  }
})