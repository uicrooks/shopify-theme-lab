<template>
  <section class="radio-labels row justify-content-center">
    <template v-if="tabs.length">
      <b-button-toolbar aria-label="Choose your Subscription product">
        <b-button
          v-for="(prod,i) in tabs"
          :key="prod.sku"
          class="subProduct__tab"
          :class="{'active' : prod.sku == selectedSku }"
          @click="changeSelectedProduct(prod.sku)"
        >
          {{ prod.short_title }}
        </b-button>
      </b-button-toolbar>
    </template>
    <!--
    <div class="col-12 mt-3">
      <p class="mb-0 text-center sticky-header-pricing" v-if="screen.required">{{ currency_flat($parent.screen.subDetails().price) }} <span class="text-success">(Save {{ currency_flat($parent.screen.unit_subPrice().compare_at_price * $parent.screen.maxScentsAllowed) }})</span></p>
      <p class="mb-0 text-center sticky-header-pricing" v-else>{{ currency_flat($parent.screen.unit_subPrice().price) }} / {{$parent.screen.unit_name() }} <span class="text-success">(Save {{ currency_flat($parent.screen.unit_subPrice().compare_at_price * $parent.screen.maxScentsAllowed) }})</span></p>
    </div>
    -->
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "SubProductToggle",
  props: {
    products: {required: true}
  },
  computed: {
    ...mapGetters("subFlow", ["screen","steps"]),
    currentHandle() {
      return this.screen.handle;
    },
    selectedSku() {
      return this.screen.selectedSku();
    },
    tabs() {
      let tabs = [];
      this.products.forEach((product) => {
        if (product.type == "BarSoap") {
          product.short_title = product.title.split(" - ")[1];
        } else if (product.type == "Deodorant") {
          // Split on Kit, Shampoo, Conditioner
          product.short_title = product.title.split(" - ")[1];
        } else if (product.type == "HairCare") {
          // Split on Kit, Shampoo, Conditioner
          let short_title = product.title.split(" Subscription - ")[0];
          product.short_title = short_title.indexOf("Hair")>-1 ? short_title+" Kit" : short_title;
        } else if (product.type == "Toothpaste") {
          product.short_title = "Toothpaste Kit";
        }
        tabs.push(product);
      });
      return tabs;
    }
  },
  methods: {
    changeSelectedProduct(sku) {
      this.$store.commit("subFlow/setChosenScreenSku", sku);
      this.$store.commit("subFlow/clearScreenScents");
    }
  }
};
</script>
<style scoped lang="scss">
.btn-toolbar {
  justify-content: center;
}
.subProduct__tab {
    text-align: center;
    margin: 20px 10px 15px;
    min-width: 110px;
    background: transparent;
    border-color: transparent;
    color: #212529;
    &.active {
      background:#cc6328;
      border-color: transparent;
      color: #fff;
    }
}
</style>