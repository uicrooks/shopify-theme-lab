/**
 * imports
 */
import { createApp } from 'vue'
import { createStore } from 'vuex'
import axios from 'axios'
import './css/main.css'

/**
 * create vue instance function
 */
const createVueApp = () => {
  const app = createApp({})

  /**
   * vue components
   * auto-import all vue components
   */
  const vueComponents = require.context('./vue/components/', true, /\.(vue|js)$/)

  vueComponents.keys().forEach(key => {
    const component = vueComponents(key).default

    // if a component has a name defined use the name, else use the path as the component name
    const name = component.name
      ? component.name
      : key.replace(/\.(\/|vue|js)/g, '').replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase())

    app.component(name, component)
  })

  /**
   * vuex
   * auto-import all modules
   */
  const vuexModules = require.context('./vue/store/', true, /\.js$/)
  const modules = {}

  vuexModules.keys().forEach(key => {
    const name = key.replace(/\.(\/|js)/g, '').replace(/\s/g, '-')
    modules[name] = vuexModules(key).default
  })

  const store = createStore({
    strict: process.env.NODE_ENV !== 'production',
    modules
  })

  app.use(store)

  /**
   * vue mixins
   * auto-register all mixins with a 'global' keyword in their filename
   */
  const mixins = require.context('./vue/mixins/', true, /.*global.*\.js$/)

  mixins.keys().forEach(key => {
    app.mixin(mixins(key).default)
  })

  /**
   * vue directives
   * auto-register all directives with a 'global' keyword in their filename
   */
  const directives = require.context('./vue/directives/', true, /.*global.*\.js$/)

  directives.keys().forEach(key => {
    const directive = directives(key).default
    app.directive(directive.name, directive.directive)
  })

  /**
   * vue config
   * extend with additional features
   */
  app.config.globalProperties.$axios = axios

  /**
   * vue plugins
   * extend with additional features
   */
  // app.use(MyPlugin)

  return app
}

/**
 * create and mount vue instance
 */
createVueApp().mount('#app')

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
    createVueApp().mount(event.target)
  }
})