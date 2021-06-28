<template>
  <div class="product-component">
    <product-individual-only-with-subscription
      v-if="individualOnlyWithSubscription"
      :product="product"
      :collection-name="collectionName"
    />
    <product-groupable-with-subscription
      v-else-if="groupableWithSubscription"
      :product="product"
      :collection-name="collectionName"
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
      required: true
    },
    productData: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      product: {},
      type: "",
      collectionName: ""
    };
  },
  computed: {
    individualOnlyWithSubscription() {
      return ["barsoap", "haircare"].includes(this.type);
    },
    groupableWithSubscription() {
      return ["deodorant", "toothpaste"].includes(this.type);
    }
  },
  methods: {
  },
  mounted() {
    this.product = JSON.parse(this.productData);
    this.type = ProductIdentifier.getType(this.product);
    const pathArray = window.location.pathname.split("/");
    this.collectionName = pathArray[2];
    console.log(this.handle, this.product);
  }
};
</script>