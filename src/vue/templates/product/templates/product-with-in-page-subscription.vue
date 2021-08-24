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
          Free Shipping over {{ freeShippingMinimum | money("$", 0) }}
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
import {money} from "@/vue/filters/money";
import CartService from "@/vue/services/cart.service";
import ProductIdentifier from "@/vue/services/product-identifier";
import ProductDetails from "@/configs/product-details";
import NewLookBanner from "@/vue/reusables/new-look-banner.vue";
import SquatchButton from "@/vue/reusables/squatch-button.vue";
//
import ProductBaseTemplate from "./base-template.vue";
import ProductFeatureDescriptions from "../reusables/feature-descriptions.vue";
import ProductQuantityOptions from "../reusables/quantity-options.vue";
import ProductQuantitySelector from "../reusables/quantity-selector.vue";
import ProductPurchaseTypeSelector from "../reusables/purchase-type-selector.vue";

export default {
  name: "ProductWithInPageSubscription",
  filters: {
    money
  },
  components: {
    ProductBaseTemplate,
    ProductFeatureDescriptions,
    ProductQuantityOptions,
    ProductQuantitySelector,
    ProductPurchaseTypeSelector,
    NewLookBanner,
    SquatchButton
  },
  props: {
    prod: {
      type: String,
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
      return {};
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
  created() {
    this.product = JSON.parse(this.prod);
  },
  mounted() {
    this.productIdentityTags = ProductIdentifier.identify(this.product);
    this.productIdentityString = this.productIdentityTags.join("-");
  }
};
</script>

<style lang="scss" scoped>
@use "@/styles/main" as global;

.product-with-in-page-subscription-component {

  .discount {
    margin-left: 8px;
    @include global.font-style-body($weight: 600, $color: global.$gray);
  }

  .original-pricing {
    margin-left: 8px;
    text-decoration: line-through;
    @include global.font-style-body($weight: 600, $color: global.$gray);
  }
}
</style>