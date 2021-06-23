<template>
  <div class="product-purchase-type-selector-component">
    <div
      class="purchase-type-option"
      :class="{'selected': !isSubscription}"
      @click="$emit('updatePurchaseType')"
    >
      <div class="radio-button">
        <span />
      </div>
      <span>One-time</span>
      <span class="pricing">
        {{ price | money("$", 0) }} / {{ unit }}
      </span>
    </div>
    <div
      class="purchase-type-option"
      :class="{'selected': isSubscription}"
      @click="$emit('updatePurchaseType')"
    >
      <div class="radio-button">
        <span />
      </div>
      <div class="subscribe">
        <h6>Subscribe & Save {{ totalDiscountForSubscription | money("$", 0) }} </h6>
        + Get Free Shipping For Life!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductPurchaseTypeSelector",
  props: {
    isSubscription: {
      type: Boolean,
      required: true,
      default: false
    },
    unit: {
      type: String,
      required: false,
      default: ""
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    quantity: {
      type: Number,
      required: true,
      default: 0
    },
    discountForSubscription: {
      type: Number,
      required: true,
      default: 0
    }
  },
  computed: {
    totalDiscountForSubscription() {
      return this.discountForSubscription * this.quantity;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-purchase-type-selector-component {
  .purchase-type-option {
    padding: 10px 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    cursor: pointer;
    @include font-style-body($weight: 500, $color: $brown);

    &:hover {
      background-color: #f4f2f0;
    }

    &.selected {
      background-color: $off-white;
      
      .radio-button {
        border: 6px solid $orange;
      }

      .pricing {
        visibility: visible;
      }
    }

    .radio-button {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      border: 2px solid $orange;
      margin-right: 5px;
      background-color: $white;
    }

    .pricing {
      visibility: hidden;
      margin-left: 14px;
    }

    .subscribe {

      h6 {
        margin: 0;
        @include font-style-body($weight: 800, $color: $brown);
      }
    }
  }
}
</style>