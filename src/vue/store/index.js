import Vue from "vue";
import Vuex from "vuex";
import core from "./core.store";
import cart from "./cart.store";
import account from "./account.store";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    core,
    cart,
    account
  },
  strict: debug
});