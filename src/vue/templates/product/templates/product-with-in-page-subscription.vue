<template>
  <div class="product-with-in-page-subscription-component">
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
          {{ subscriptionProduct.price | money("$", 0) }} <span v-if="unit">/ {{ unit }}</span>
          <span class="discount">
            (Save {{ discountForSubscription | money("$", 0) }}!)
          </span>
        </div>
        <div v-else>
          {{ product.price | money("$", 0) }} <span v-if="unit">/ {{ unit }}</span>
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
        <product-quantity-selector
          v-if="!isSubscription"
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
          v-if="isSubscription"
          @clicked="addToCart"
        >
          Subscribe & Save
        </squatch-button>
        <squatch-button
          v-else
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
  name: "ProductWithInPageSubscription",
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
    },
    subscriptionCollection: {
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
      return this.productIdentityTags[0] !== "toothpaste";
    },
    hasOldPackaging() {
      return ["deodorant"].includes(this.productIdentityTags[0]);
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
    subscriptionProduct() {
      if (this.productIdentityString === "toothpaste-kit") {
        return this.subscriptionCollection.products[0];
      }
    },
    discountForSubscription() {
      if (this.subscriptionProduct && this.subscriptionProduct.price && this.subscriptionProduct.compare_at_price) {
        return this.subscriptionProduct.compare_at_price - this.subscriptionProduct.price;
      }
      return ProductDetails.discountForSubscription[this.productIdentityString];
    },
  },
  methods: {
    selectQuantity(qty) {
      this.quantity = qty;
    },
    async addToCart() {
      const qty = this.isSubscription ? 1 : this.quantity;
      const product = this.isSubscription ? this.subscriptionProduct : this.product;
      console.log(product);
      const added = await CartService.addItem(product, qty);
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
    if (this.productIdentityTags[0] === "deodorant") {
      this.quantity = 2;
    }
    console.log("subsCol", this.subscriptionCollection);
    //TODO:
    //toothpaste: change onetime product to subscription before adding to cart

  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-with-in-page-subscription-component {

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