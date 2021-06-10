<template>
  <div class="product-group-included-list-component">
    <div
      v-for="(product, index) of products"
      :key="`product-${index}`"
      class="product"
    >
      <div class="image-box">
        <img
          :src="getProductImage(product)"
          :alt="`${product.title} image`"
        >
      </div>
      <div class="details-box">
        <h3>{{ product.title }}</h3>
        <p>{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import StoreService from "@/vue/services/store.service";

export default {
  props: {
    productHandles: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      products: []
    }
  },
  methods: {
    async fetchProduct(handle) {
      // add error handling 
      return await StoreService.getProductByHandle(handle);
    },
    getProductImage(product) {
      return product.images[0].src;
    }
  },
  async mounted() {
    console.log("product handles", this.productHandles);
    for (let i = 0; i < this.productHandles.length; i++) {
      const product = await this.fetchProduct(this.productHandles[i]);
      if (product) {
        this.products.push(product);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-group-included-list-component {

  .product {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    padding: 13px 0;
    
    .image-box {
      min-width: 60px;
      max-width: 70px;
      flex: 1;
      text-align: center;

      img {
        width: 100%;
        object-fit: contain;
      }
    }

    .details-box {
      flex: 3;
      padding-left: 20px;

      h3 {
        @include font-style-heading($size: 14px, $lh: 14px, $color: $dark-brown);
      }

      p {
        @include font-style-body($lh: 16px, $color: $brown);
      }
    }
  }
}
</style>