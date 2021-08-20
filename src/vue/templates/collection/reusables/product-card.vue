<template>
  <div class="product-card-component">
    <div class="image-box">
      <a :href="productDetailPageLink">
        <b-img-lazy
          :src="product.featured_image"
          :alt="`${product.title} image`"
        />
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
      <p
        class="product-description"
        v-html="product.description"
      />
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
        <b-form-select
          v-if="showQuantitySelector"
          v-model="quantity"
          :options="quantityOptions"
          :clearable="false"
          :searchable="false"
          label="Qty"
          class="qty-selector"
        />
        <squatch-button
          @clicked="addToCart"
        >
          {{ added ? 'Add More' : '+ Add To Cart' }}
        </squatch-button>
      </div>
    </div>
  </div>
</template>

<script>
import CartService from "@/vue/services/cart.service";
import ProductIdentifier from "@/vue/services/product-identifier";
import SquatchButton from "@/vue/reusables/squatch-button.vue";
import {money} from "@/vue/filters/money";
export default {
  name: "ProductCard",
  components: {
    SquatchButton
  },
  filters: {
    money
  },
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      quantity: 1,
      quantityOptions: [1, 2, 3, 4, 5],
      added: false
    };
  },
  computed: {
    productIdentityString() {
      return ProductIdentifier.identify(this.product).join("-");
    },
    productDetailPageLink() {
      return `${window.location.pathname}/products/${this.product.handle}`;
    },
    showQuantitySelector() {
      return ["barsoap", "booster"].includes(this.productIdentityString);
    }
  },
  methods: {
    async addToCart() {
      const added = await CartService.addItem(this.product, this.quantity);
      if (added) {
        this.added = true;
        const cart = await CartService.initCart();
        if (cart) {
          this.$store.commit("cart/setCart", cart);
          this.$store.commit("cart/toggleIsOpen");
        } else {
          // error handling
        }
      }
    }
  }
};
</script>

<style lang="scss">
@use "@/styles/main" as global;

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
    background-color: global.$sand;
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
      @include global.font-style-heading($size: 20px);

      &:hover {
        text-decoration: underline;
      }
    }

    .product-description {
      margin-top: 14px;
      min-height: 50px;
      @include global.font-style-body($size: 16px, $color: global.$brown);
    }

    .product-pricing {
      margin-bottom: 20px;
      @include global.font-style-body($size: 16px, global.$color: global.$green, $weight: 700);

      .compare-at-pricing {
        text-decoration: line-through;
        @include global.font-style-body($size: 14px, $color: global.$gray, $weight: 700);
      }
    }

    .add-button {
      display: flex;
      flex-flow: row nowrap;

      .qty-selector {
        padding: 0 28px;
        margin-right: 15px;
        color: global.$dark-brown;
        border: 1px solid global.$brown;
        border-radius: 5px;
        height: 50px;
        width: 96px;
      }
    }

  }
}
</style>