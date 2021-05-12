import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import { BootstrapVue } from 'bootstrap-vue';

console.log('MAIN/CORE')
import "./css/main.scss";

//Vue.use(BootstrapVue) ** CAN WE IMPROVE IMPORT?

Vue.config.productionTip = false


/**
 * vuex
 * auto-import all modules ** CAN WE IMPROVE?
 */
Vue.use(Vuex)

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

// TO DO: loop import
import SiteHeader from './vue/shared/components/SiteHeader.vue';
import SiteFooter from './vue/shared/components/SiteFooter.vue';

new Vue({
  el: '#app',
  components: {
    SiteHeader,
    SiteFooter
  }
})

// NOT NEEDED, showing it's okay to delete;
/*
Shopify.designMode && document.addEventListener('shopify:section:load', (event) => {
  if (event.target.classList.value.includes('vue')) {
    new Vue({
      el: event.target,
      store
    })
  }
})*/