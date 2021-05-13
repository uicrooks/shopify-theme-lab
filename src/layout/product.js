import Vue from 'vue';

if (window.theme.template_name == "product") {
  console.log("layout-product");

  const vueComponents = require.context('../vue/templates/product', true, /\.(vue|js)$/);
  vueComponents.keys().forEach(key => {
    const component = vueComponents(key).default;
    const name = component.name
      ? component.name
      : key.replace(/\.(\/|vue|js)/g, '').replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());
    Vue.component(name, component);
  })
  
  new Vue({
    el: '#layout-product',
  })
}
