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
        {{ product.price | money("$", 0) }}
      </span>
      <span
        v-if="product.compare_at_price && product.price !== product.compare_at_price"
        class="pricing-discount"
      >
        <span class="original">{{ product.compare_at_price | money("$", 0) }}</span>({{ product.compare_at_price - product.price | money("$", 0) }} Off!)
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
    product: {
      type: Object,
      required: true,
      default: () => {}
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    totalDiscountForSubscription: {
      type: Number,
      required: true,
      default: 0
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/styles/main.scss";

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
    @include font-style-body($weight: 500, $color: $brown);

    &:hover {
      background-color: #f4f2f0;
    }

    &.selected {
      background-color: $off-white;
      
      .radio-button {
        border: 6px solid $orange;
      }

      .pricing, .pricing-discount {
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
      @include font-style-body($color: $green);
    }

    .pricing-discount {
      visibility: hidden;
      margin-left: 8px;
      @include font-style-body();

      .original {
        text-decoration: line-through;
        margin-right: 3px;
        @include font-style-body($color: grey);
      }
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