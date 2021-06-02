<template>
  <div class="product-card-component">
    <div class="image-box">
      <img
        :src="product.featured_image"
        :alt="`${product.title} image`"
      >
    </div>
    <div class="details-box">
      <div class="product-title">
        {{ product.title }}
      </div>
      <div class="yotpo"></div>
      <p class="product-title">
        {{ product.description }}
      </p>
      <div class="product-pricing">
        <span>{{ product.price }}</span>
        <span>{{ product.compare_at_price }}</span>
      </div>
      <div class="add-button">
        <button
          @click="addToCart"
        >
          {{ added ? 'Add More' : 'Add To Cart' }}
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import CartService from "@/vue/services/cart.service";
import StoreService from "@/vue/services/store.service";

export default {
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      added: false
    }
  },
  methods: {
    addToCart() {
      this.added = true;
    }
  },
  async mounted() {
    const result = await StoreService.getProductById(this.product.id);
    console.log(result);
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.product-card-component {

  .image-box {
    width: 100%;

    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>