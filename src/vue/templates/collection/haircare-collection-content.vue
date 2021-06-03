<template>
  <div class="haircare-collection-content-component">
    <div class="collection-section-header">
      Kits + Bundles
      <div class="sub-header">
        Save when you bundle products together!
      </div>
    </div>
    <div class="collection-section">
      <product-card 
        v-for="(product, index) of bundles"
        :key="`haircare-bundle-${index}`"
        :product="product"
        class="product-card"
      />
    </div>
    <div class="collection-section-header">
      Shampoo
      <div class="sub-header">
        Cleanse & strengthen your strands
      </div>
    </div>
    <div class="collection-section">
      <product-card 
        v-for="(product, index) of shampoos"
        :key="`haircare-shampoo-${index}`"
        :product="product"
        class="product-card"
      />
    </div>
    <div class="collection-section-header">
      Conditioner
      <div class="sub-header">
        Maintain your mane with natural daily moisture
      </div>
    </div>
    <div class="collection-section">
      <product-card 
        v-for="(product, index) of conditioners"
        :key="`haircare-conditioner-${index}`"
        :product="product"
        class="product-card"
      />
    </div>
  </div>
</template>

<script>
import productCard from "@/vue/ui-elements/product-card.vue";

export default {
  components: { productCard },
  props: {
    products: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    bundles() {
      return this.products.filter(product => {
        return product.variants[0].sku.includes("hair-kit");
      });
    },
    shampoos() {
      return this.products.filter(product => {
        return product.variants[0].sku.includes("shampoo") || product.variants[0].sku.includes("smp");
      });
    },
    conditioners() {
      return this.products.filter(product => {
        return product.variants[0].sku.includes("con");
      });
    },
  },
  watch: {
    bundles(val) {
      console.log("watch bundles", val);
    }
  },
  mounted() {
    console.log("harcare collection content", this.products);
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.haircare-collection-content-component {
  .collection-section-header {
    margin: 30px 0;
    padding: 0 15px;
    text-align: center;
    @include font-style-heading($size: 23px, $color: $dark-brown, $lh: 23px);

    @include layout-md {
      text-align: left;
    }
}

  .sub-header {
    margin-top: 7px;
    @include font-style-body($size: 16px, $color: $brown, $lh: 20px);
  }

  .collection-section {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;

    .product-card {
      width: 100%;

      @include layout-md {
        flex: 1;
        width: unset;
        max-width: 250px;
      }

      @include layout-lg {
        max-width: 300px;
      }
    }
  }
}
</style>