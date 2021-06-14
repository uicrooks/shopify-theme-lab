<template>
  <div
    class="product-card-component"
  >
    <div class="image-box">
      <a :href="productDetailPageLink">
        <img
          :src="product.featured_image"
          :alt="`${product.title} image`"
        >
      </a>
    </div>
    <div class="details-box">
      <div class="product-title">
        <a :href="productDetailPageLink">
          {{ product.title }}
        </a>
      </div>
      <div class="yotpo">
        <span>review stuff here</span>
      </div>
      <p class="product-description">
        {{ product.description }}
      </p>
      <div class="product-pricing">
        {{ product.price | money("$") }}
        <span
          v-if="product.compare_at_price"
          class="compare-at-pricing"
        >
          {{ product.compare_at_price | money("$") }}
        </span>
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
import CartService from "@/vue/services/cart.service";

export default {
  name: "ProductCard",
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
    };
  },
  computed: {
    productDetailPageLink() {
      return `${window.location.pathname}/products/${this.product.handle}`;
    }
  },
  methods: {
    async addToCart() {
      const added = await CartService.addItem(this.product);
      if (added) {
        this.$store.dispatch("cart/initialize");
        this.$store.commit("cart/toggleIsOpen");
        this.added = true;
      }
    }
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

  a, a:hover, a:active, a:visited {
    text-decoration: none;
    color: inherit;
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
      width: 100%;
      height: 295px;
      object-fit: contain;
      cursor: pointer;
    }
  }

  .details-box {
    padding: 16px 16px 25px 16px;

    .product-title {
      cursor: pointer;
      min-height: 42px;
      @include font-style-heading($size: 20px, $color: $dark-brown, $lh: 20px);

      &:hover {
        text-decoration: underline;
      }
    }

    .product-description {
      margin-top: 14px;
      min-height: 50px;
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