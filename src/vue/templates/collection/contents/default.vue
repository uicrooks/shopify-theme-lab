<template>
  <b-container class="collection-default-content-component">
    <b-row>
      <b-col md="3" v-for="(product, index) of products">
        <product-card 
          :key="`collection-product-${index}`"
          :product="product"
          class="product-card"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ProductCard from "../reusables/product-card.vue";
export default {
  name: "CollectionDefaultContent",
  components: {
    ProductCard
  },
  props: {
    products: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    console.log(this.products);
  }
};
</script>

<style scoped lang="scss">
@use "@/styles/main" as global;

.collection-default-content-component {
  padding: 35px 15px;
  width: calc(100% - 200px);
  .product-card {
    width: 100%;
  }
}
</style>