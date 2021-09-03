<template>
<collection-base-template
    :handle="handle"
  >
    <template #collection-content>
  <div class="collection-haircare-content-component">
    <div class="collection-section-header">
      Kits + Bundles
      <div class="sub-header">
        Save when you bundle products together!
      </div>
    </div>
    <b-container class="collection-section">
      <b-row>
        <b-col
          v-for="(product, index) of bundles"
          :key="`haircare-bundle-${index}`"
          md="3"
        >
          <product-card
            :product="product"
            class="product-card"
          />
        </b-col>
      </b-row>
    </b-container>
    <div class="collection-section-header">
      Shampoo
      <div class="sub-header">
        Cleanse & strengthen your strands
      </div>
    </div>
    <b-container class="collection-section">
      <b-row>
        <b-col
          v-for="(product, index) of shampoos"
          :key="`haircare-shampoo-${index}`"
          md="3"
        >
          <product-card 
            :product="product"
            class="product-card"
          />
        </b-col>
      </b-row>
    </b-container>
    <div class="collection-section-header">
      Conditioner
      <div class="sub-header">
        Maintain your mane with natural daily moisture
      </div>
    </div>
    <b-container class="collection-section">
      <b-row>
        <b-col
          v-for="(product, index) of conditioners"
          :key="`haircare-conditioner-${index}`"
          sm="6"
          lg="4"
          xl="3"
        >
          <product-card 
            :product="product"
            class="product-card"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
  </template>
  </collection-base-template>
</template>

<script>
import CollectionBaseTemplate from "../collection.vue";
import ProductCard from "../reusables/product-card.vue";
export default {
  name: "CollectionHaircareContent",
  components: {
    CollectionBaseTemplate,
    ProductCard,
  },
  props: {
    handle: {
      type: String
    },
    productsData: {
      type: String,
      default: () => "[]"
    }
  },
  computed: {
    products() {
      return JSON.parse(this.productsData);
    },
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
    console.log('haircares',this.products)
    // console.log("harcare collection content", this.products);
  }
};
</script>

<style scoped lang="scss">
@use "@/styles/main" as global;

.collection-haircare-content-component {
  width: 100%;
  padding: 0 15px;
  .collection-section-header {
    margin: 30px 0;
    text-align: center;
    @include global.font-style-heading($size: 23px);

    @include global.layout-md {
      text-align: left;
    }
}

  .sub-header {
    margin-top: 7px;
    @include global.font-style-body($size: 16px, $color: global.$brown, $lh: 20px);
  }

  .collection-section {

    .product-card {
      width: 100%;
    }
  }
}
</style>