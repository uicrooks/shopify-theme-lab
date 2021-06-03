<template>
  <div class="product-component">
    product component!
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    id: {
      type: String,
      required: true
    },
    handle: {
      type: String,
      required: false
    }
  },
  async mounted() {
    console.log(this.id);
    console.log(this.handle);
  }
};
</script>