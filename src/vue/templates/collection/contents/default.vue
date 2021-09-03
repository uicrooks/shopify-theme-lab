<template>
  <collection-base-template
    :handle="handle"
  >
    <template #collection-content>
      <b-container class="collection-default-content-component">
        <b-row>
          <b-col
            v-for="(product, index) of products"
            :key="`collection-product-${index}`"
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
    </template>
  </collection-base-template>
</template>

<script>
import CollectionBaseTemplate from "../collection.vue";
import ProductCard from "../reusables/product-card.vue";
export default {
  name: "CollectionDefaultContent",
  components: {
    CollectionBaseTemplate,
    ProductCard
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
    }
  },
  mounted() {
    console.log(this)
    console.log(this.products);
  }
};
</script>

<style scoped lang="scss">
@use "@/styles/main" as global;

.collection-default-content-component {
  padding: 35px 15px;
  max-width: 1440px;
  @include global.layout-xl {
    width: calc(100% - 200px);
  }
  .product-card {
    width: 100%;
  }
}
</style>