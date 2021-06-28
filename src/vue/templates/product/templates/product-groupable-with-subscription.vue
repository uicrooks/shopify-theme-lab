<template>
  <div class="product-groupable-with-subscription-component">
    <product-base-template
      :product="product"
      :collection-name="collectionName"
    >
      <template #page-banner>
        <new-look-banner
          v-if="type === 'deodorant'"
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
        <span
          v-else-if="isGrouped"
          class="discount strikethrough"
        >
          {{ product.compare_at_price | money("$", 0) }}
        </span>
      </template>
      <template #product-options>
        <product-feature-descriptions
          :handle="product.handle"
          :items="iconDescriptionItems"
        />
        <product-grouping-selector
          :groupings="groupings"
          :selected="product"
        />
        <product-quantity-selector
          :quantity="quantity"
          @quantityUpdated="selectQuantity"
        />
        <product-purchase-type-selector
          :is-subscription="isSubscription"
          :unit="unit"
          :product="product"
          :quantity="quantity"
          :total-discount-for-subscription="totalDiscountForSubscription"
          class="purchase-type-selector"
          @updatePurchaseType="isSubscription = !isSubscription"
        >
          {{ }}
        </product-purchase-type-selector>
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
import StoreService from "@/vue/services/store.service";
import ProductIdentifier from "@/vue/services/product-identifier";

const units = {
  "deodorant": "stick",
  "toothpaste-kit": "",
  "toothpaste": "tube",
};
const featureDescriptions = {
  "deodorant": [
    { label: "Smells Like:", metafieldName: "scent", iconName: "" },
    { label: "Exfoliation:", metafieldName: "exfol_lvl", iconName: "ColdProcessSoap" }
  ],
  "toothpaste-kit": [
    { label: "Flavor:", metafieldName: "scent", iconName: "spearmint-basil" },
    { label: "Featuring:", metafieldName: "featuring", iconName: "tooth-bun_whitens" }
  ],
  "toothpaste": [
    { label: "Flavor:", metafieldName: "scent", iconName: "" },
    { label: "Featuring:", metafieldName: "featuring", iconName: "tooth-bun_whitens" }
  ],
};
const discountForSubscription = {
  "deodorant": 100,
  "toothpaste-kit": 400,
  "toothpaste": 200
}

export default {
  name: "ProductGroupableWithSubscription",
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
      collection: {},
      groupings: {},
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
    isGrouped() {
      return ["toothpaste-kit"].includes(this.productIdentity);
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
      return true;
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
  async mounted() {
    this.type = ProductIdentifier.getType(this.product);
    this.productIdentity = ProductIdentifier.identify(this.product);
    const collectionId = this.type === "toothpaste" ? "170016243817" : "";
    const collection = await StoreService.getCollectionById(collectionId);
    if (collection && collection.products) {
      let groups = [];
      let individuals = [];
      collection.products.forEach(product => {
        const isGrouped = ProductIdentifier.isGrouped(product);
        isGrouped ? groups.push(product) : individuals.push(product);
      });
      this.groupings = {
        "bundles": groups,
        "individuals": individuals
      };
      console.log(this.groupings);
    }
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