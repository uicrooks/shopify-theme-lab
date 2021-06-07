<template>
  <div class="default-collection-content-component">
    <product-card 
      v-for="(product, index) of products"
      :key="`collection-product-${index}`"
      :product="product"
      class="product-card"
    />
  </div>
</template>

<script>
export default {
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
@import "@/styles/main.scss";

.default-collection-content-component {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  padding: 35px 15px;

  .product-card {
    width: 100%;

    @include layout-md {
      width: 45%;
    }

    @include layout-lg {
      min-width: 300px;
      max-width: 300px;
    }
  }
}
</style>