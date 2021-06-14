<template>
  <div class="product-component">
    <new-look-banner
      :handle="handle"
    />
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
      required: true
    }
  },
  async mounted() {
    console.log(this.id);
    console.log(this.handle);
  }
};
</script>