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
    setCurrencyPerGeolocation() {
      return StoreService.getCurrentGeolocation();
    }
  },
  async created() {
    const countryObj = await this.setCurrencyPerGeolocation();
    console.log("countryObj", countryObj);
    CookieService.set("geolocation", countryObj, { maxAge: 24 * 60 * 60 });
    if (countryObj.name !== "United States") {
      const currencyOption = this.currencyOptions.filter(option => {
        return countryObj.name === option.country;
      })[0];
      console.log("currencyOption", currencyOption);
      const newQueryParams = Helpers.addQueryParam({currency: currencyOption.currency}, window.location.search);
      console.log(newQueryParams);

    }
  },
  mounted() {
    console.log(this.loggedIn, this.currency);
    console.log(this.oosItems);
    this.$store.commit("core/setLoggedIn", this.loggedIn);
  }
};
</script>
