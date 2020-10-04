/**
 * imports
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import './scss/main.scss'

/**
 * vue settings
 */
Vue.config.productionTip = false

/**
 * vue components
 * auto import all vue components
 */
const vueComponents = require.context('./vue/components/', true, /(\.vue$|\.js$)/)
const components = {}

vueComponents.keys().forEach(key => {
  const component = vueComponents(key).default

  // if the component has a name defined use the name else use path as component name
  const name = component.name
    ? component.name
    : key.replace(/(\.\/|\.vue|\.js)/g, '').replace(/(\/|-|_)\w/g, (match) => match.slice(1).toUpperCase())

  components[name] = component
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
 * vue prototype
 * extend with addtional features
 */
Vue.prototype.$axios = axios

/**
 * create vue instance
 */
new Vue({
  el: '#app',
  components,
  store
})