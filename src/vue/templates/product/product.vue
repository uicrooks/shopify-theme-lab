<template>
  <div class="product-component">
    <product-with-subscription-flow
      v-if="subscriptionFlowProduct"
      :product="product"
      :collection="collection"
    />
    <product-with-in-page-subscription
      v-else-if="inPageSubscriptionProduct"
      :product="product"
      :collection="collection"
      :subscription-collection="subscriptionCollection"
    />
    <product-with-in-page-custom-subscription
      v-else-if="inPageCustomSubscriptionProduct"
      :product="product"
      :collection="collection"
      :subscription-collection="subscriptionCollection"
    />
    <product-onetime-only
      v-else
      :product="product"
      :collection="collection"
    />
  </div>
</template>

<script>
import ProductIdentifier from "@/vue/services/product-identifier";

export default {
  name: "Product",
  props: {
    productDataString: {
      type: String,
      required: true,
      default: ""
    },
    collection: {
      type: Object,
      required: true,
      default: () => {}
    },
    collectionsData: {
      type: String,
      required: true,
      default: ""
    },
    subscriptionCollection: {
      type: Object,
      required: false,
      default: () => {}
    },
    test: {
      type: String,
      required: false,
      default: ""
    }
  },
  computed: {
    product() {
      return JSON.parse(this.productDataString);
    },
    productIdentityTags() {
      return ProductIdentifier.identify(this.product);
    },
    productIdentityString() {
      return this.productIdentityTags ? this.productIdentityTags.join("-") : "";
    },
    subscriptionFlowProduct() {
      return ["barsoap", "haircare-kit", "haircare-shampoo", "haircare-conditioner"].includes(this.productIdentityString);
    },
    inPageSubscriptionProduct() {
      return ["toothpaste-kit"].includes(this.productIdentityString);
    },
    inPageCustomSubscriptionProduct() {
      return ["deodorant"].includes(this.productIdentityString);
    },
    // onetimeOnlyProduct() {
    //   return ["toothpaste", "deodorant-bundle", "deodorant-pack", "booster", "cologne", "beard", "sanitizer-pack", "sanitizer", "liquidsoap-pack", "liquidsoap", "candle", "gear"].includes(this.productIdentityString);
    // }
  },
  mounted() {
    console.log(this.product);
    console.log(this.productIdentityTags);
    console.log(this.collection);
    console.log(JSON.parse(this.collectionsData));
    console.log(this.subscriptionCollection);
  }
};
</script>