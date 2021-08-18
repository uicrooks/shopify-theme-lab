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
        <h6>
          Subscribe & Save {{ discountForSubscription | money("$", 0) }}
        </h6>
        + Get Free Shipping For Life!
      </div>
    </div>
  </div>
</template>

<script>
import {money} from "@/vue/filters/money";
export default {
  name: "ProductPurchaseTypeSelector",
  filters: {
    money
  },
  props: {
    isSubscription: {
      type: Boolean,
      required: true,
      default: false
    },
    product: {
      type: Object,
      required: true,
      default: () => {}
    },
    discountForSubscription: {
      type: Number,
      required: true,
      default: 0
    }
  }
};
</script>


<style lang="scss" scoped>
@use "@/styles/main" as global;

.product-purchase-type-selector-component {
  margin-top: 15px;
  
  .purchase-type-option {
    padding: 10px 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    cursor: pointer;
    @include global.font-style-body($weight: 500, $color: global.$brown);

    &:hover {
      background-color: #f4f2f0;
    }

    &.selected {
      background-color: global.$off-white;
      
      .radio-button {
        border: 6px solid global.$orange;
      }

      .pricing, .pricing-discount {
        visibility: visible;
      }
    }

    .radio-button {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      border: 2px solid global.$orange;
      margin-right: 5px;
      background-color: global.$white;
    }

    .pricing {
      visibility: hidden;
      margin-left: 14px;
      @include global.font-style-body($color: global.$green);
    }

    .pricing-discount {
      visibility: hidden;
      margin-left: 8px;
      @include global.font-style-body();

      .original {
        text-decoration: line-through;
        margin-right: 3px;
        @include global.font-style-body($color: grey);
      }
    }

    .subscribe {

      h6 {
        margin: 0;
        @include global.font-style-body($weight: 800, $color: global.$brown);
      }
    }
  }
}
</style>