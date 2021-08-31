<template>
    <div
      class="included-product"
    >
      <template v-if="!product.title">
        <div class="image-box">
        </div>
        <div class="details-box">
          <h3>Loading</h3>
          <p>Loading</p>
        </div>
      </template>
      <template v-else>
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
      </template>
    </div>
</template>
<script>
export default {
  name: "IncludedItem",
  props: {
    handle: {required: true, type: String}
  },
  data() {
    return {
      product: {}
    }
  },
  async created() {
    this.product = await this.$store.dispatch("starterBundles/fetchProduct", this.handle);
  },
  methods: {
    getProductImage(product) {
      return product.images[0].src;
    }
  }
}
</script>
<style lang="scss" scoped>
@use "@/styles/main" as global;
.included-product {
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
        @include global.font-style-heading($size: 14px);
      }

      p {
        @include global.font-style-body($lh: 16px, $color: global.$brown);
      }
    }
  }
</style>