<template>
  <div class="product-individual-only-with-subscription-component">
    <product-base-template
      :product="product"
      :collection-name="collectionName"
    >
      <template #page-banner>
        <new-look-banner
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
      </template>
      <template #product-options>
        <product-feature-descriptions
          :handle="product.handle"
          :items="iconDescriptionItems"
        />
        <div v-if="!isSubscription">
          <product-quantity-options
            v-if="type === 'barsoap'"
            product-unit="Soap"
            :quantity-options="quantityOptions"
            :selected="quantity"
            class="product-quantity-options"
            @quantitySelected="selectQuantity"
          />
          <product-quantity-selector
            v-else
            :quantity="quantity"
            @quantityUpdated="selectQuantity"
          />
        </div>
        <product-purchase-type-selector
          :is-subscription="isSubscription"
          :unit="unit"
          :price="product.price"
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

const units = {
  "barsoap": "bar",
  "haircare-kit": "kit",
  "haircare-shampoo": "bottle",
  "haircare-conditioner": "bottle"
};
const featureDescriptions = {
  "barsoap": [
    { label: "Smells Like:", metafieldName: "scent", iconName: "" },
    { label: "Exfoliation:", metafieldName: "exfol_lvl", iconName: "ColdProcessSoap" }
  ],
  "haircare-kit": [
    { label: "Smells Like:", metafieldName: "scent", iconName: "" },
  ],
  "haircare-shampoo": [
    { label: "Smells Like:", metafieldName: "scent", iconName: "" },
    { label: "Featuring:", metafieldName: "exfol_lvl", iconName: "NaturalOils" }
  ],
  "haircare-conditioner": [
    { label: "Smells Like:", metafieldName: "scent", iconName: "" },
    { label: "Featuring:", metafieldName: "exfol_lvl", iconName: "NaturalOils" }
  ],
};
const discountForSubscription = {
  "barsoap": 100,
  "haircare-kit": 400,
  "haircare-shampoo": 200,
  "haircare-conditioner": 200
}

export default {
  name: "ProductIndividualOnlyWithSubscription",
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    },
    collectionName: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      type: "",
      productIdentity: "",
      isSubscription: false,
      quantity: 1,
      quantityOptions: [2, 1, 3],
      added: false,
    };
  },
  computed: {
    unit() {
      return units[this.productIdentity];
    },
    iconDescriptionItems() {
      return featureDescriptions[this.productIdentity];
    },
    discountForSubscription() {
      return discountForSubscription[this.productIdentity];
    },
    freeShippingVerbatim() {
      const verbatim = this.isSubscription ? "for life" : `over $${this.$store.state.core.freeShippingMinimum}`;
      return `Free Shipping ${verbatim}`
    },
    addToCartVerbatim() {
      if (this.isSubscription) {
        return "Subscribe & Save";
      }
      const totalPrice = this.product.price * this.quantity;
      return this.added ? 'Add More' : `${this.$options.filters.money(totalPrice, "$", 0)} | Add To Cart`;
    },
    pricingVerbatim() {
      const val = this.isSubscription ? this.product.price - this.discountForSubscription : this.product.price;
      const price = this.$options.filters.money(val, "$", 0);
      return this.unit ? `${price} / ${this.unit}` : price;
    },
    totalDiscountForSubscription() {
      return this.discountForSubscription * this.quantity;
    },
    hasOldPackaging() {
      return this.product.title && this.product.title === "Fresh Falls";
    }
  },
  methods: {
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
  mounted() {
    this.type = ProductIdentifier.getType(this.product);
    this.productIdentity = ProductIdentifier.identify(this.product);
    if (this.type === "barsoap") {
      this.quantity = 2;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-individual-only-with-subscription-component {

  .discount {
    margin-left: 8px;
    @include font-style-body($weight: 800, $color: $tan);
  }
}
</style>