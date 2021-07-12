<template>
  <div class="product-with-subscription-flow-component">
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
        <div v-if="isSubscription">
          {{ subscriptionPrice | money("$", 0) }} / {{ unit }}
          <span class="discount">
            (Save {{ discountForSubscription | money("$", 0) }}!)
          </span>
        </div>
        <div v-else>
          {{ product.price | money("$", 0) }} / {{ unit }}
          <span
            v-if="product.compare_at_price && product.price !== product.compare_at_price"
            class="original-pricing"
          >
            {{ product.compare_at_price | money("$", 0) }}
          </span>
        </div>
      </template>
      <template #product-options>
        <product-feature-descriptions
          :handle="product.handle"
          :items="iconDescriptionItems"
        />
        <product-quantity-options
          v-if="productIdentityString === 'barsoap'"
          productUnit="soap"
          :quantityOptions="[2, 1, 3]"
          :selected="quantity"
          @quantitySelected="selectQuantity"
        />
        <product-quantity-selector
          v-else
          :quantity="quantity"
          @quantityUpdated="selectQuantity"
        />
        <product-purchase-type-selector
          :is-subscription="isSubscription"
          :product="product"
          :discount-for-subscription="discountForSubscription"
          @updatePurchaseType="isSubscription = !isSubscription"
        />
      </template>
      <template #cta-banner>
        <div class="free-shipping-banner">
          Free Shipping over ${{ freeShippingMinimum }}
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
  name: "ProductWithSubscriptionFlow",
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
      isSubscription: false
    };
  },
  computed: {
    showBanner() {
      return true;
    },
    hasOldPackaging() {
      return [].includes(this.productIdentityTags[0]);
    },
    freeShippingMinimum() {
      return this.$store.state.core.freeShippingMinimum;
    },
    unit() {
      return ProductDetails.units[this.productIdentityString];
    },
    iconDescriptionItems() {
      return ProductDetails.featureDescriptions[this.productIdentityString];
    },
    discountForSubscription() {
      return ProductDetails.discountForSubscription[this.productIdentityString];
    },
    subscriptionPrice() {
      return this.product.price - this.discountForSubscription; 
    }
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
    if (this.productIdentityString) {
      this.quantity = 2;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-with-subscription-flow-component {

  .discount {
    margin-left: 8px;
    @include font-style-body($weight: 600, $color: $gray);
  }

  .original-pricing {
    margin-left: 8px;
    text-decoration: line-through;
    @include font-style-body($weight: 600, $color: $gray);
  }
}
</style>