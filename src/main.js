/**
 * imports
 */
import Vue from 'vue'
import Vuex from 'vuex'
import './scss/main.scss'

Vue.config.productionTip = false

/**
 * vue components
 * auto import all vue components
 */
const vueComponents = require.context('./vue/components/', true, /\.vue$/)
const components = {}

vueComponents.keys().forEach(key => {
  components[key.replace(/(\.\/|\.vue)/g, '').replace(/^(.*[\\\/])/g, '')] = vueComponents(key).default
})

/**
 * vuex
 * auto import all modules
 */
Vue.use(Vuex)

const files = require.context('./vue/store/', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules
})

/**
 * create vue instance
 */
new Vue({
  el: '#app',
  components,
  store
})