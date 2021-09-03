<template>
  <div class="product-with-in-page-custom-subscription-component">
    <product-base-template
      :product="productSelected"
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
          {{ subscriptionProduct.price | money("$", 0) }} <span v-if="unit && quantity === 1">/ {{ unit }}</span>
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
        <product-custom-options-selector
          v-if="isSubscription"
          :options="customOptions"
          :selected-options="selectedCustomOptions"
          @selectionUpdated="selectOptions"
        />
        <product-quantity-options
          v-if="productIdentityString === 'deodorant'"
          product-unit="stick"
          :quantity-options="[2, 1, 3]"
          :selected="quantity"
          @quantitySelected="selectQuantity"
        />
        <product-quantity-selector
          v-else-if="!isSubscription"
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
          :disabled="quantity === 0"
          @clicked="addToCart"
        >
          {{ quantity === 0 ? 'Selection Required' : 'Subscribe & Save' }}
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
import ProductCustomOptionsSelector from "../reusables/custom-options-selector.vue";
import ProductBaseTemplate from "./base-template.vue";
import ProductFeatureDescriptions from "../reusables/feature-descriptions.vue";
import ProductQuantityOptions from "../reusables/quantity-options.vue";
import ProductQuantitySelector from "../reusables/quantity-selector.vue";
import ProductPurchaseTypeSelector from "../reusables/purchase-type-selector.vue";

export default {
  name: "ProductWithInPageCustomSubscription",
  filters: {
    money
  },
  components: {
    ProductBaseTemplate,
    ProductCustomOptionsSelector,
    ProductFeatureDescriptions,
    ProductQuantityOptions,
    ProductQuantitySelector,
    ProductPurchaseTypeSelector,
    NewLookBanner,
    SquatchButton
  },
  props: {
    productData: {
      type: Object,
      required: true,
      default: () => {}
    },
    collectionData: {
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
      isSubscription: false,
      selectedCustomOptions: []
    };
  },
  computed: {
    product() {
      return this.productData;
    },
    collection() {
      return this.collectionData;
    },
    productSelected() {
      return this.isSubscription ? this.subscriptionProduct : this.product;
    },
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
      if (this.productIdentityString === "deodorant") {
        return this.subscriptionCollection.products.filter(product => {
          return product.handle.includes(this.quantity === 0 ? 1 : this.quantity);
        })[0];
      }
      return {};
    },
    discountForSubscription() {
      if (this.subscriptionProduct && this.subscriptionProduct.price && this.subscriptionProduct.compare_at_price) {
        return this.subscriptionProduct.compare_at_price - this.subscriptionProduct.price;
      }
      return ProductDetails.discountForSubscription[this.productIdentityString];
    },
    customOptions() {
      if (this.productIdentityString === "deodorant") {
        return this.collection.products.filter(product => {
          return !ProductIdentifier.checkIfGrouped(product);
        });
      }
      return [];
    }
  },
  methods: {
    selectQuantity(qty) {
      this.quantity = qty;
    },
    selectOptions(option, add = true) {
      function findMatchingIndex(option, selectedOptions) {
        for (let i = 0; i < selectedOptions.length; i++) {
          if (selectedOptions[i].handle == option.handle) {
            return i;
          }
        }
        return null;
      }

      if (add) {
        this.selectedCustomOptions.push(option);
      } else {
        const index = findMatchingIndex(option, this.selectedCustomOptions);
        if (index !== null) {
          this.selectedCustomOptions.splice(index, 1);
        }
      }
      this.quantity = this.selectedCustomOptions.length;
    },
    async addToCart() {
      if (this.quantity === 0) {
        return;
      }
      const qty = this.isSubscription ? 1 : this.quantity;
      const product = this.isSubscription ? this.subscriptionProduct : this.product;
      const props = this.isSubscription ? this.getSubscriptionProperties(this.selectedCustomOptions) : {};
      const added = await CartService.addItem(product, qty, "", props);
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
    },
    getSubscriptionProperties(selectedOptions) {
      console.log(selectedOptions);
      let props = ProductDetails.subscriptionPropertiesByHandle[this.subscriptionProduct.handle];
      selectedOptions.forEach((option, index)=> {
        props[`_fulfillment_Scent${index + 1}`] = option.variants[0].sku;
      });
      return props;
    }
  },
  mounted() {
    this.productIdentityTags = ProductIdentifier.identify(this.product);
    this.productIdentityString = this.productIdentityTags.join("-");
    if (this.productIdentityString === "deodorant") {
      this.quantity = 2;
    }
    // eslint-disable-next-line no-unused-vars
    this.selectedCustomOptions = Array.from({ length: this.quantity }, i => this.product);
  }
};
</script>

<style lang="scss">
@use "@/styles/main" as global;

.product-with-in-page-custom-subscription-component {

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