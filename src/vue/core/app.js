import StoreService from "@/vue/services/store.service";
import CartService from "@/vue/services/cart.service";
import CookieService from "@/vue/services/cookie.service";
import Helpers from "@/vue/services/general-helpers";
import TrackingService from "@/vue/services/tracking.service";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      currencyOption: null,
      loggedIn: window.theme.loggedIn,
      currency: window.theme.currencyCode,
      oosItems: window.theme.oosItems,
      CartService,
      CookieService
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
      const { country_code } = await StoreService.getCurrentGeolocation();
      const currencyOption = this.currencyOptions.filter(option => {
        return country_code === option.country_code;
      })[0];
      return currencyOption ? currencyOption : null;
    },
    shareCart() {
      const value = CookieService.get("cart");
      if (value) {
        CookieService.set("cart", value, {
          path: "/",
          domain: ".drsquatch.com"
        });
      }
    },
    generateMatchingStoreDomain(currencyOption) {
      const subdomain = currencyOption.handle ? `${currencyOption.handle}.` : "";
      return `http://${subdomain}${window.location.host}${window.location.pathname}`;
    },
    generateMatchingQuery(currencyOption) {
      return Helpers.addQueryParam({ currency: currencyOption.currency }, window.location.search);
    },
    initializeGlobalVariables() {
      this.session = {
        params: Helpers.convertQueryStringToObject(window.location.search),
        email: window.theme.email,
        template_name: window.theme.template_name,
        template_suffix: window.theme.template_suffix,
      }
    },
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
      console.log(redirect);
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
    this.$store.dispatch("cart/initialize");
    this.initializeGlobalVariables();
    Helpers.setScrollListener();
    Helpers.vaultDiscountCode();
    Helpers.scrollToLink();

    TrackingService.linkEmailToKlaviyo();
    TrackingService.PAGE_VIEW();
  }
};