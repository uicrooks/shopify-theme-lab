<template>
  <div class="product-groupable-with-subscription-component">
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
        {{ pricingVerbatim }}
        <span
          v-if="isSubscription"
          class="discount"
        >
          (Save {{ totalDiscountForSubscription | money("$", 0) }}!)
        </span>
        <!-- <span
          v-else-if="isGrouped"
          class="discount strikethrough"
        >
          {{ product.compare_at_price | money("$", 0) }}
        </span> -->
      </template>
      <template #product-options>
        <product-feature-descriptions
          :handle="product.handle"
          :items="iconDescriptionItems"
        />
        <product-groupable-selector
          :product-groups="collection.products ? collection.products : {}"
          :selected="currentProduct"
          @selected="selectProduct"
        />
        <product-quantity-selector
          :quantity="quantity"
          @quantityUpdated="selectQuantity"
        />
        <product-purchase-type-selector
          v-if="hasSubscriptionOption"
          :is-subscription="isSubscription"
          :product="product"
          :quantity="quantity"
          :total-discount-for-subscription="totalDiscountForSubscription"
          class="purchase-type-selector"
          @updatePurchaseType="isSubscription = !isSubscription"
        />
      </template>
      <template #cta-banner>
        <div class="free-shipping-banner">
          {{ freeShippingVerbatim }}
        </div>
      </template>
      <template #cta-button>
        <squatch-button
          @clicked="addToCart"
        >
          {{ addToCartVerbatim }}
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
  name: "ProductGroupableWithSubscription",
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
      currentProduct: {},
      isSubscription: false,
      quantity: 1,
      quantityOptions: [2, 1, 3],
      added: false,
    };
  },
  computed: {
    productIdentity() {
      return this.currentProduct ? ProductIdentifier.identify(this.currentProduct) : [];
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
    hasSubscriptionOption() {
      return !["deodorant-bundle", "deodorant-pack"].includes(this.productIdentity);
    },
    freeShippingVerbatim() {
      const verbatim = this.isSubscription ? "for life" : `over $${this.$store.state.core.freeShippingMinimum}`;
      return `Free Shipping ${verbatim}`;
    },
    addToCartVerbatim() {
      if (this.isSubscription) {
        return "Subscribe & Save";
      }
      const totalPrice = this.product.price * this.quantity;
      return this.added ? "Add More" : `${this.$options.filters.money(totalPrice, "$", 0)} | Add To Cart`;
    },
    pricingVerbatim() {
      const val = this.isSubscription ? this.product.price - this.discountForSubscription : this.product.price;
      const price = this.$options.filters.money(val, "$", 0);
      return this.unit ? `${price} / ${this.unit}` : price;
    },
    totalDiscountForSubscription() {
      return this.discountForSubscription * this.quantity;
    },
    showBanner() {
      const productIdentity = ProductIdentifier.identify(this.product);
      return productIdentity[0] === "deodorant"; 
    },
    hasOldPackaging() {
      const productIdentity = ProductIdentifier.identify(this.product);
      return productIdentity[0] === "deodorant"; 
    }
  },
  watch: {
    productGroups(val) {
      console.log(val);
      let groups = [];
      let individuals = [];
      val.forEach(product => {
        const grouped = ProductIdentifier.checkIfGroupedByHandle(product.handle);
        grouped ? groups.push(product) : individuals.push(product);
      });
      this.groupings = {
        bundles: groups,
        individuals: individuals
      };
      console.log(this.groupings);
    }
  },
  methods: {
    async selectProduct(product) {
      console.log("selectProduct", product);
      // this.currentProduct = product;
    },
    selectQuantity(qty) {
      this.quantity = qty;
    },
    async addToCart() {
      if (this.isSubscription) {
        window.location = "/pages/subscription-flow";
        return;
      }
      const added = await CartService.addItem(this.product);
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
  async mounted() {
    this.currentProduct = this.product;
    this.productIdentityTags = ProductIdentifier.identify(this.product);
    this.productIdentityString = this.productIdentityTags.join("-");
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-groupable-with-subscription-component {

  .discount {
    margin-left: 8px;
    @include font-style-body($weight: 800, $color: $tan);

    &.strikethrough {
      text-decoration: line-through;
    }
  }
}
</style>