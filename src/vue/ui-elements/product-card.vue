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
      <p class="product-description">
        {{ product.description }}
      </p>
      <div class="product-pricing">
        {{ product.price | money("$") }}
        <span class="compare-at-pricing">{{ product.compare_at_price | money("$") }}</span>
      </div>
      <div class="add-button">
        <squatch-button
          :text="added ? 'Add More' : '+ Add To Cart'"
          :action="true"
          @takeAction="addToCart"
        />
      </div>
    </div>

  </div>
</template>

<script>
import SquatchButton from "@vue/ui-elements/squatch-button";
import StoreService from "@/vue/services/store.service";

export default {
  components: { SquatchButton },
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
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 35px;

  &:hover {
    box-shadow: 0 4px 15px 5px rgba(0, 0, 0, .1);
  }

  .image-box {
    width: 100%;
    background-image: url(https://cdn.shopify.com/s/files/1/0275/7784/3817/files/woodgrain-default.svg?v=1615322353);
    background-size: 200%;
    background-repeat: repeat;
    background-color: $sand;
    padding: 25px;
    text-align: center;

    img {
      height: 295px;
      width: auto;
      object-fit: contain;
    }
  }

  .details-box {
    padding: 16px 16px 25px 16px;

    .product-title {
      cursor: pointer;
      @include font-style-heading($size: 20px, $color: $dark-brown, $lh: 20px);

      &:hover {
        text-decoration: underline;
      }
    }

    .product-description {
      margin-top: 14px;
      @include font-style-heading($size: 16px, $color: $brown, $lh: 16px);
    }

    .product-pricing {
      margin-bottom: 20px;
      @include font-style-heading($size: 16px, $color: $green, $weight: 700, $lh: 16px);

      .compare-at-pricing {
        text-decoration: line-through;
        @include font-style-heading($size: 14px, $color: $gray, $weight: 700, $lh: 14px);
      }
    }

  }
}
</style>