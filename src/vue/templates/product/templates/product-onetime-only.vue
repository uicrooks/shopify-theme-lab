<template>
  <div class="product-onetime-only-component">
    <product-base-template
      :product="product"
      :collection="collection"
    >
      <template #page-banner>
        <new-look-banner
          v-if="showBanner"
          :has-old-packaging="hasOldPackaging"
        />
      </template>
      <template #pricing>
        {{ product.price | money("$", 0) }}
        <span
          v-if="product.compare_at_price && product.price !== product.compare_at_price"
          class="original-pricing"
        >
          {{ product.compare_at_price | money("$", 0) }}
        </span>
      </template>
      <template #product-options>
        <product-feature-descriptions
          :handle="product.handle"
          :items="iconDescriptionItems"
        />
        <product-quantity-selector
          :quantity="quantity"
          @quantityUpdated="selectQuantity"
        />
      </template>
      <template #cta-banner>
        <div class="free-shipping-banner">
          Free Shipping over {{ freeShippingMinimum | money("$", 0) }}
        </div>
      </template>
      <template #cta-button>
        <squatch-button
          @clicked="addToCart"
        >
          {{ added ? "Add More" : "Add To Cart" }}
        </squatch-button>
      </template>
    </product-base-template>
  </div>
</template>

<script>
import CartService from "@/vue/services/cart.service";
import ProductIdentifier from "@/vue/services/product-identifier";
import ProductDetails from "@/configs/product-details";

export default {
  name: "ProductOnetimeOnly",
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    },
    collection: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      productIdentityTags: [],
      productIdentityString: "",
      quantity: 1,
      added: false,
    };
  },
  computed: {
    showBanner() {
      return !["sanitizer"].includes(this.productIdentityTags[0]);
    },
    hasOldPackaging() {
      return ["deodorant", "cologne", "beard"].includes(this.productIdentityTags[0]);
    },
    freeShippingMinimum() {
      return this.$store.state.core.freeShippingMinimum;
    },
    iconDescriptionItems() {
      return ProductDetails.featureDescriptions[this.productIdentityString];
    },
  },
  methods: {
    selectQuantity(qty) {
      this.quantity = qty;
    },
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
  },
  mounted() {
    this.productIdentityTags = ProductIdentifier.identify(this.product);
    this.productIdentityString = this.productIdentityTags.join("-");
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-onetime-only-component {

  .original-pricing {
    margin-left: 8px;
    text-decoration: line-through;
    @include font-style-body($weight: 600, $color: $gray);
  }
}
</style>