<template>
  <div class="product-component">
    <product-onetime-only
      v-if="onetimeOnlyProduct"
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
    handle: {
      type: String,
      required: true,
      default: ""
    },
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
    onetimeOnlyProduct() {
      return ["deodorant-bundle", "booster", "cologne", "beard", "sanitizer-pack", "sanitizer", "liquidsoap-pack", "liquidsoap", "candle", "gear"].includes(this.productIdentityString);
    }
  },
  mounted() {
    console.log(this.handle, this.product);
    console.log(this.productIdentityTags);
    console.log(this.collection);
    console.log(JSON.parse(this.collectionsData));
  }
};
</script>