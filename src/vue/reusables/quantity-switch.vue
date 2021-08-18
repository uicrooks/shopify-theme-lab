<template>
  <div class="quantity-switch-component">
    <b-icon
      icon="dash-circle"
      font-scale="1.5"
      class="decrease-button"
      :class="{disabled: decreaseDisabled}"
      @click="decrease"
    />
    <div class="quantity">
      {{ quantity }}
    </div>
    <b-icon
      icon="plus-circle"
      font-scale="1.5"
      class="increase-button"
      :class="{disabled: increaseDisabled}"
      @click="increase"
    />
  </div>
</template>

<script>
export default {
  props: {
    quantity: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: false,
      default: 0
    },
    decreaseDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    increaseDisabled: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  methods: {
    decrease() {
      if (!this.decreaseDisabled) {
        this.$emit("decrease");
      }
    },
    increase() {
      if (!this.increaseDisabled) {
        this.$emit("increase");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.quantity-switch-component {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  .decrease-button, .increase-button {
    flex: 1;
    cursor: pointer;

    &.disabled {
      cursor: default;
    }
  }

  .quantity {
    flex: 2;
    min-width: 45px;
    padding: 0 10px;
    margin-top: 3px;
    text-align: center;
  }

  // .decrease-button, .increase-button {
  //   // position: absolute;
  //   display: inline-block;
  //   width: 20px;
  //   height: 27px;
  //   text-align: center;
  //   // font-size: 24px;
  //   color: $white;
  //   border: 2px solid $orange;
  //   background-color: $orange;
  //   cursor: pointer;

  //   &:hover {
  //     color: $white-darken;
  //     border: 2px solid $white;
  //     background-color: $orange-darken;
  //   }
  // }

  // .quantity {
  //   display: inline-block;
  //   width: 40px;
  //   margin: 2px 7px;
  //   padding: 3px 7px;
  //   border: 2px solid #999;
  //   text-align: center;
  //   @include font-style-body($lh: 17px);
  // }
}
</style>
