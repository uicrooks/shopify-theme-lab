<template>
  <div class="product-quantity-selector-component">
    <h6>Quantity</h6>
    <div class="quantity-selector">
      <button
        class="decrease-button"
        @click="decrease"
      >
        -
      </button>
      <div class="quantity">
        {{ quantity }}
      </div>
      <button
        class="increase-button"
        @click="increase"
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
  },
  methods: {
    decrease() {
      let newQty = this.quantity > 1 ? this.quantity - 1 : this.quantity;
      this.$emit("quantityUpdated", newQty);
    },
    increase() {
      let newQty = this.quantity + 1;
      this.$emit("quantityUpdated", newQty);
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/styles/main" as global;

.product-quantity-selector-component {
  margin: 15px 0;
  
  h6 {
    margin-bottom: 14px;
    @include global.font-style-accent($size: 12px, $color: global.$brown);
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
    background-color: global.$white;
    color: #91a24f;
    width: 32px;
    height: 32px;
  }

  .quantity {
    width: 32px;
    padding: 0 7px;
    text-align: center;
    @include global.font-style-body();
  }
}
</style>