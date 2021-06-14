<template>
  <div class="product-component">
    <new-look-banner
      :handle="handle"
    />
    <product-breadcrumb />
    <h1>Product</h1>
  </div>
</template>

<script>
import productBreadcrumb from './product-breadcrumb.vue';
export default {
  components: { productBreadcrumb },
  name: "Product",
  props: {
    handle: {
      type: String,
      required: true
    },
    productData: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      product: null
    };
  },
  async mounted() {
    console.log(this.handle);
    this.product = JSON.parse(this.productData);
    console.log(this.product);
  }
};
</script>