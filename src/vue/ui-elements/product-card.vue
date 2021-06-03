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
      <div class="yotpo" />
      <p class="product-title">
        {{ product.description }}
      </p>
      <div class="product-pricing">
        <span>{{ product.price }}</span>
        <span>{{ product.compare_at_price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import StoreService from "@/vue/services/store.service";

export default {
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
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
  .collection-section-header {
    margin: 30px 0;
    padding: 0 15px;
    @include font-style-heading($size: 23px, $color: $dark-brown, $lh: 23px);
  }

  .sub-header {
    margin-top: 7px;
    @include font-style-body($size: 16px, $color: $brown, $lh: 20px);
  }
}
</style>