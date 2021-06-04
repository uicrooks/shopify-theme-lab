<template>
  <div class="quantity-switch-component">
    <div
      class="decrease-button"
      @click="decrease"
    >
      -
    </div>
    <div class="quantity">
      {{ quantity }}
    </div>
    <div
      class="increase-button"
      @click="increase"
    >
      +
    </div>
  </div>
</template>

<script>
export default {
  props: {
    quantity: {
      type: Number,
      required: true
    }
  },
  methods: {
    decrease() {
      this.$emit("decrease");
    },
    increase() {
      this.$emit("increase");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.quantity-switch-component {

  .decrease-button, .increase-button {
    // position: absolute;
    display: inline-block;
    width: 20px;
    height: 27px;
    text-align: center;
    // font-size: 24px;
    color: $white;
    border: 2px solid $orange;
    background-color: $orange;
    cursor: pointer;

    &:hover {
      color: $white-darken;
      border: 2px solid $white;
      background-color: $orange-darken;
    }
  }

  .quantity {
    display: inline-block;
    width: 40px;
    margin: 2px 7px;
    padding: 3px 7px;
    border: 2px solid #999;
    text-align: center;
    @include font-style-body($color: $dark-brown, $lh: 17px);
  }
}
</style>
