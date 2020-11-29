/**
 * imports
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import './css/main.css'

/**
 * vue settings
 */
Vue.config.productionTip = false

/**
 * vue components
 * auto import all vue components
 */
const vueComponents = require.context('./vue/components/', true, /(\.vue$|\.js$)/)

vueComponents.keys().forEach(key => {
  const component = vueComponents(key).default

  // if the component has a name defined use the name else use path as component name
  const name = component.name
    ? component.name
    : key.replace(/(\.\/|\.vue|\.js)/g, '').replace(/(\/|-|_)\w/g, (match) => match.slice(1).toUpperCase())

  Vue.component(name, component)
})

/**
 * vuex
 * auto import all modules
 */
Vue.use(Vuex)

const vuexModules = require.context('./vue/store/', false, /\.js$/)
const modules = {}

vuexModules.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = vuexModules(key).default
})

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules
})

/**
 * vue mixins
 * auto register all mixins with a 'global' keyword in their name
 */
const mixins = require.context('./vue/mixins/', true, /.*global.*\.js$/)

mixins.keys().forEach(key => {
  Vue.mixin(mixins(key).default)
})

/**
 * vue directives
 * auto register all directives with a 'global' keyword in their name
 */
const directives = require.context('./vue/directives/', true, /.*global.*\.js$/)

directives.keys().forEach(key => {
  const directive = directives(key).default
  Vue.directive(directive.name, directive.directive)
})

/**
 * vue filters
 * auto register all filters with a 'global' keyword in their name
 */
const filters = require.context('./vue/filters/', true, /.*global.*\.js$/)

filters.keys().forEach(key => {
  const filter = filters(key).default
  Vue.filter(filter.name, filter.filter)
})

/**
 * vue prototype
 * extend with addtional features
 */
Vue.prototype.$axios = axios

/**
 * create vue instance
 */
new Vue({
  el: '#app',
  store
})