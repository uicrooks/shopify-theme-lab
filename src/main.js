/**
 * imports
 */

import { createApp } from "vue";
import { createStore } from "vuex";
import "./css/main.css";

/**
 * vuex
 * auto-import all modules and prepare shared store
 */
const vuexModules = import.meta.globEager("./vue/store/**/*.js");
const modules = {};

Object.entries(vuexModules).forEach(([path, definition]) => {
  const name = path
    .replace(/\/vue\/store/g, "")
    .replace(/\.(\/|js)/g, "")
    .replace(/\s/g, "-");

  modules[name] = definition.default;
});

const store = createStore({
  strict: process.env.NODE_ENV !== "production",
  modules,
});

/**
 * create vue instance function
 */
const createVueApp = () => {
  const app = createApp({});

  /**
   * vue components
   * auto-import all vue components
   */
  const components = import.meta.globEager("./vue/components/**/*.vue");

  Object.entries(components).forEach(([path, definition]) => {
    const componentName = path
      .replace(/\/vue\/components/g, "")
      .replace(/\.(\/|vue|js)/g, "")
      .replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());

    app.component(componentName, definition.default);
  });

  /**
   * vue mixins
   * auto-register all mixins with a 'global' keyword in their filename
   */
  //   const mixins = require.context('./vue/mixins/', true, /.*global.*\.js$/)
  const mixins = import.meta.globEager("./vue/mixins/*.js");

  Object.entries(mixins).forEach(([path, definition]) => {
    app.mixin(definition.default);
  });

  /**
   * vue directives
   * auto-register all directives with a 'global' keyword in their filename
   */
  const directives = import.meta.globEager("./vue/directives/*.js");

  Object.entries(directives).forEach(([path, definition]) => {
    const directive = definition.default;
    app.directive(directive.name, directive.directive);
  });

  /**
   * vue plugins
   * extend with additional features
   */
  app.use(store);

  return app;
};

/**
 * create and mount vue instance(s)
 */
const appElement = document.querySelector("#app");

if (appElement) {
  createVueApp().mount(appElement);
} else {
  const vueElements = document.querySelectorAll("[vue]");
  if (vueElements) vueElements.forEach((el) => createVueApp().mount(el));
}

/**
 * fixes for Shopify sections
 * 1. properly render vue components on user insert in the theme editor
 * 2. reload the current page to rerender async inserted sections with vue components
 *
 * add the 'vue' keyword to the section's wrapper classes if the section uses any vue functionality e.g.:
 * {% schema %}
 * {
 *   "class": "vue-section"
 * }
 * {% endschema %}
 */
if (Shopify.designMode) {
  document.addEventListener("shopify:section:load", (event) => {
    if (event.target.classList.value.includes("vue")) {
      createVueApp().mount(event.target);
    }
  });
} else if (!Shopify.designMode && process.env.NODE_ENV === "development") {
  new MutationObserver((mutationsList) => {
    mutationsList.forEach((record) => {
      const vue = Array.from(record.addedNodes).find(
        (node) => node.classList && node.classList.value.includes("vue")
      );
      if (vue) window.location.reload();
    });
  }).observe(document.body, {
    childList: true,
    subtree: true,
  });
}
