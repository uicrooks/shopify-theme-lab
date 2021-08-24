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
          product-unit="soap"
          :quantity-options="[2, 1, 3]"
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
          Free Shipping over {{ freeShippingMinimum | money("$", 0) }}
        </div>
      </template>
      <template #cta-button>
        <squatch-button
          v-if="isSubscription"
          path="/pages/subscription-flow"
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
const ProductBaseTemplate = () => import(/* webpackChunkName: "product-main" */
  /* webpackPreload: true */"./base-template.vue")
import ProductFeatureDescriptions from "../reusables/feature-descriptions.vue";
import ProductQuantityOptions from "../reusables/quantity-options.vue";
import ProductQuantitySelector from "../reusables/quantity-selector.vue";
import ProductPurchaseTypeSelector from "../reusables/purchase-type-selector.vue";

export default {
  name: "ProductWithSubscriptionFlow",
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
  created() {
    this.product = JSON.parse(this.prod);
  },
  mounted() {
    this.productIdentityTags = ProductIdentifier.identify(this.product);
    this.productIdentityString = this.productIdentityTags.join("-");
    if (this.productIdentityString === "barsoap") {
      this.quantity = 2;
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/styles/main" as global;

.product-with-subscription-flow-component {

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