import {Vue, store, mixins} from "../main";
Vue.use(require("vue-moment"));
console.log("layout-account");

import AccountTemplate from /* webpackChunkName: "account-main" */"../vue/templates/account/index.vue";
import AccountOrderCard from /* webpackChunkName: "account-main" */"../vue/templates/account/templates/order-card.vue";
new Vue({
  el: "#app",
  components: {
    Account: AccountTemplate,
    AccountOrderCard
  },
  mixins: [...mixins],
  store,
  mounted() {
    window.app = this;
  }
});
