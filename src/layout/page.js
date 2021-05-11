import Vue from 'vue'

const vueComponents = require.context('../vue/templates/page', true, /\.(vue|js)$/);
vueComponents.keys().forEach(key => {
  const component = vueComponents(key).default;
  var t = '@/'+ key.split('./')[1];
  const name = component.name
    ? component.name
    : key.replace(/\.(\/|vue|js)/g, '').replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());
  Vue.component(name, () => import(t))
})

new Vue({
  el: '#layout-page',
  store,
})
