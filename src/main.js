import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import { BootstrapVue } from 'bootstrap-vue';

console.log('asdfs')
import "./css/main.scss";

//Vue.use(BootstrapVue)

/**
 * vue settings
 */
Vue.config.productionTip = false


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
const SiteHeader = () => import(/* webpackChunkName: "site-header" */'../components/FooterEmailCapture.vue');
const SiteFooter = () => import(/* webpackChunkName: "site-footer" */'../components/FooterEmailCaptured.vue');
new Vue({
  el: '#app',
  store,
  components: {
    SiteHeader,
    SiteFooter
  }
})

// eslint-disable-next-line
Shopify.designMode && document.addEventListener('shopify:section:load', (event) => {
  if (event.target.classList.value.includes('vue')) {
    new Vue({
      el: event.target,
      store
    })
  }
})