<template>
  <div class="product-quantity-options-component">
    <h6>Quantity</h6>
    <div class="quantity-options">
      <div
        v-for="(option, index) of quantityOptions"
        :key="`quantity-option-${index}`"
        class="option"
        :class="{'selected': option === selected}"
        @click="$emit('quantitySelected', option)"
      >
        {{ showQuantityOption(option) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductQuantityOptions",
  props: {
    quantityOptions: {
      type: Array,
      required: true,
      default: () => []
    },
    productUnit: {
      type: String,
      required: false,
      default: ""
    },
    selected: {
      type: Number,
      required: false,
      default: 1
    }
  },
  methods: {
    showQuantityOption(num) {
      return num > 1 ? `${num} ${this.productUnit}s` : `${num} ${this.productUnit}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-quantity-options-component {
  h6 {
    margin-bottom: 7px;
    @include font-style-accent($size: 12px, $lh: 12px, $color: $brown);
  }

  .quantity-options {
    display: flex;
    flex-flow: row wrap;
    align-items: center;

    .option {
      min-width: 30px;
      padding: 8px 14px;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 14px;
      @include font-style-body($weight: 600, $color: $brown);

      &:hover {
        background-color: #cc63287a;
      }

      &.selected {
        background-color: #cc63287a;
      }
    }
  }
}
</style>