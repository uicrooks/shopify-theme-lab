<template>
  <div class="product-component">
    <product-individual-only-with-subscription
      v-if="individualOnlyWithSubscription"
      :product="product"
      :collection="collection"
    />
    <product-groupable-with-subscription
      v-else-if="groupableWithSubscription"
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
      default: "",
    },
    productDataString: {
      type: String,
      required: true,
      default: "",
    },
    collection: {
      type: Object,
      required: true,
      default: () => {},
    },
    collectionsData: {
      type: String,
      required: true,
      default: "",
    },
  },
  computed: {
    product() {
      return JSON.parse(this.productDataString);
    },
    productIdentity() {
      return ProductIdentifier.identify(this.product);
    },
    individualOnlyWithSubscription() {
      return ["barsoap", "haircare"].includes(this.productIdentity[0]);
    },
    groupableWithSubscription() {
      return ["toothpaste", "deodorant"].includes(this.productIdentity[0]);
    },
  },
  mounted() {
    console.log(this.collection);
    console.log(this.handle, this.product);
    console.log(JSON.parse(this.collectionsData));
  },
};
</script>