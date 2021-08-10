<template>
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
      required: false
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
    redirectToMatchingStore(currencyOption) {
      const query = Helpers.addQueryParam({ currency: currencyOption.currency }, window.location.search);
      const subdomain = currencyOption.handle ? `${currencyOption.handle}.` : "";
      console.log("redirect to:", `http://${subdomain}${window.location.host}${window.location.pathname}${query}`);
      // window.location.replace(`http://${subdomain}${window.location.host}${window.location.pathname}${query}`);
    }
  },
  async created() {
    this.currencyOption = await this.getDefaultCurrencyOption();
    console.log("currencyOption", this.currencyOption);

    if (this.currencyOption.currency) {
      CookieService.set("currency_option", this.currencyOption, { maxAge: 24 * 60 * 60, path: "/" });
      this.$store.commit("core/setDefaultCurrencyOption", this.currencyOption);
    }
    const match = checkIfStoreMatchesCurrencyOption(this.currencyOption.handle);
    console.log(match);
    if (!match) {
      this.redirectToMatchingStore(this.currencyOption);
    }

    function checkIfStoreMatchesCurrencyOption(currencyOptionHandle) {
      const storeHandle = window.location.host.split(".")[0];
      // const usStoreMatch = storeHandle === "drsquatch" && currencyOptionHandle === "";
      const usStoreMatch = currencyOptionHandle === "";
      const intlStoreMatch = storeHandle === currencyOptionHandle;
      console.log(usStoreMatch, intlStoreMatch);
      return usStoreMatch || intlStoreMatch;
    }

    console.log("oosItems", this.oosItems);
    this.$store.commit("core/setLoggedIn", this.loggedIn);
  }
};
</script>
