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
@use "@/styles/main" as global;

.quantity-switch-component {

  .decrease-button, .increase-button {
    // position: absolute;
    display: inline-block;
    width: 20px;
    height: 27px;
    text-align: center;
    // font-size: 24px;
    color: $white;
    border: 2px solid global.$orange;
    background-color: global.$orange;
    cursor: pointer;

    &:hover {
      color: global.$white-darken;
      border: 2px solid global.$white;
      background-color: global.$orange-darken;
    }
  }

  .quantity {
    display: inline-block;
    width: 40px;
    margin: 2px 7px;
    padding: 3px 7px;
    border: 2px solid #999;
    text-align: center;
    @include font-style-body($lh: 17px);
  }
}
</style>
