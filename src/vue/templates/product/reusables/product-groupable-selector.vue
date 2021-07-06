<template>
  <div class="product-groupable-selector-component">
    <div class="grouping">
      <h6>
        {{ groupUnit }}
      </h6>
      <div class="grouping-products">
        <div
          v-for="(product, index) of groupedProducts"
          :key="`grouped-product-${index}`"
          class="product"
          :class="{selected: product.title === selected.title}"
          @click="$emit('selected', product)"
        >
          <img
            :src="product.images[0]"
            :alt="`${product.title} image`"
          >
          <div class="product-title">
            {{ product.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="grouping">
      <h6>
        Individuals
      </h6>
      <div class="grouping-products">
        <div
          v-for="(product, index) of individualProducts"
          :key="`individual-product-${index}`"
          class="product"
          :class="{selected: product.title === selected.title}"
          @click="$emit('selected', product)"
        >
          <img
            :src="product.images[0]"
            :alt="`${product.title} image`"
          >
          <div class="product-title">
            {{ product.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductIdentifier from "@/vue/services/product-identifier";

export default {
  name: "ProductGroupableSelector",
  props: {
    groupUnit: {
      type: String,
      required: false,
      default: "Bundles"
    },
    productGroups: {
      type: Array,
      required: true,
      default: () => []
    },
    selected: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  watch: {
    selected(val) {
      console.log("selected", val);
    },
  },
  computed: {
    groupedProducts() {
      return this.productGroups.filter(product => {
        const isGrouped = ProductIdentifier.checkIfGrouped(product);
        return isGrouped;
      });
    },
    individualProducts() {
      return this.productGroups.filter(product => {
        const isGrouped = ProductIdentifier.checkIfGrouped(product);
        return !isGrouped;
      });
    }
  },
  methods: {
    goToProduct(product) {
      const pathArray = window.location.pathname.split("/");
      pathArray[pathArray.length - 1] = product.handle;
      window.location = pathArray.join("/");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-groupable-selector-component {
  margin: 20px 0 0 0;

  .grouping {

    h6 {
      text-transform: capitalize;
      @include font-style-heading($size: 14px);
    }

    .grouping-products {
      display: flex;
      flex-flow: row wrap;

      .product {
        flex: 1 1 calc(100% / 3);
        max-width: calc(100% / 3);
        height: 36px;
        padding: 2px 0;
        text-align: center;
        border: 2px solid transparent;
        border-radius: 3px;
        margin-bottom: 45px;
        cursor: pointer;

        &:hover {
          border: 2px solid $orange;

          .product-title {
            @include font-style-body($size: 12px, $weight: 600, $color: $brown);
          }
        }

        &.selected {
          border: 2px solid $orange;

          .product-title {
            @include font-style-body($size: 12px, $weight: 600, $color: $brown);
          }
        }

        img {
          height: 100%;
        }

        .product-title {
          margin-top: 10px;
          @include font-style-body($size: 12px, $weight: 600, $color: #a5937f);
        }
      }
    }
  }
}
</style>