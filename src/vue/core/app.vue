<template>
  <div />
</template>

<script>
import StoreService from "@/vue/services/store.service";
import CookieService from "@/vue/services/cookie.service";
import Helpers from "@/vue/services/general-helpers";
import { mapGetters } from "vuex";

export default {
  name: "VueApp",
  props: {
    loggedIn: {
      type: Boolean,
      required: true
    },
    currency: {
      type: String,
      required: true,
    },
    oosItems: {
      type: Array,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      currencyOption: null
    };
  },
  computed: {
    ...mapGetters("core", ["currencyOptions"]),
  },
  watch: {
    loggedIn(val) {
      this.$store.commit("core/setLoggedIn", val);
    },
    currency(val) {
      this.$store.commit("core/setCurrentCurrency", val);
    }
  },
  methods: {
    async getDefaultCurrencyOption() {
      const storedOption = this.getStoredCurrencyOption();
      console.log("stored", storedOption);
      return storedOption ? storedOption : await this.getCurrencyOptionFromGeoLocation();
    },
    getStoredCurrencyOption() {
      const stored = CookieService.get("currency_option");
      return stored ? stored : null;
    },
    async getCurrencyOptionFromGeoLocation() {
      const country = await StoreService.getCurrentGeolocation();
      const currencyOption = this.currencyOptions.filter(option => {
        return country === option.country;
      })[0];
      return currencyOption ? currencyOption : null;
    },
    shareCart() {
      const value = CookieService.get("cart");
      CookieService.set("cart", value, {
        path: "/",
        domain: ".drsquatch.com"
      });
    },
    generateMatchingStoreDomain(currencyOption) {
      const subdomain = currencyOption.handle ? `${currencyOption.handle}.` : "";
      return `http://${subdomain}${window.location.host}${window.location.pathname}`;
    },
    generateMatchingQuery(currencyOption) {
      return Helpers.addQueryParam({ currency: currencyOption.currency }, window.location.search);
    }
  },
  async created() {
    this.currencyOption = await this.getDefaultCurrencyOption();

    if (this.currencyOption.currency) {
      CookieService.set(
        "currency_option",
        this.currencyOption,
        { maxAge: 24 * 60 * 60, path: "/" }
      );
      this.$store.commit("core/setDefaultCurrencyOption", this.currencyOption);
    }

    const storeMatch = checkIfStoreMatchesCurrencyOption(this.currencyOption.handle);
    const queryMatch = checkIfQueryMatchesCurrencyOption(this.currencyOption.currency);
    console.log("storeMatch", storeMatch, "queryMatch", queryMatch);
    if (!storeMatch || !queryMatch) {
      this.shareCart();
      const redirect = `${this.generateMatchingStoreDomain(this.currencyOption)}${this.generateMatchingQuery(this.currencyOption)}`;
      // window.location.replace(redirect);
    }

    function checkIfStoreMatchesCurrencyOption(currencyOptionHandle) {
      const storeHandle = window.location.host.split(".")[0];
      const usStoreMatch = storeHandle === "drsquatch" && currencyOptionHandle === "";
      const intlStoreMatch = storeHandle === currencyOptionHandle;
      return usStoreMatch || intlStoreMatch;
    }

    function checkIfQueryMatchesCurrencyOption(currencyOptionCurrency) {
      return window.location.search.includes(`currency=${currencyOptionCurrency}`);
    }
    console.log("oosItems", this.oosItems);
    this.$store.commit("core/setLoggedIn", this.loggedIn);
    this.$store.commit("core/setOosItems", this.oosItems);
  }
};
</script>
