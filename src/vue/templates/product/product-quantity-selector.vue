<template>
  <div class="product-quantity-selector-component">
    <h6>Quantity</h6>
    <div class="quantity-selector">
      <button
        class="decrease-button"
        @click="$emit('decrease')"
      >
        -
      </button>
      <div class="quantity">
        {{ quantity }}
      </div>
      <button
        class="increase-button"
        @click="$emit('increase')"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductQuantitySelector",
  props: {
    quantity: {
      type: Number,
      required: true,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-quantity-selector-component {
  h6 {
    margin-bottom: 14px;
    @include font-style-accent($size: 12px, $lh: 12px, $color: $brown);
  }

  .quantity-selector {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .decrease-button, .increase-button {
    font-size: 16px;
    border: 2px solid #91a24f;
    border-radius: 50%;
    background-color: $white;
    color: #91a24f;
    width: 32px;
    height: 32px;
  }

  .quantity {
    width: 32px;
    padding: 0 7px;
    text-align: center;
    @include font-style-body($color: $dark-brown);
  }
}
</style>