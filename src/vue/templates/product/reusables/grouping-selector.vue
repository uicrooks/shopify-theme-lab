<template>
  <div class="product-grouping-selector-component">
    <div
      v-for="name of groupingNames"
      :key="`grouping-${name}`"
      class="grouping"
    >
      <h6>
        {{ name }}
      </h6>
      <div class="grouping-products">
        <div
          v-for="(product, index) of groupings[name]"
          :key="`grouping-product-${index}`"
          class="product"
          :class="{selected: product.title === selected.title}"
          @click="$emit('selected', product)"
        >
          <img
            :src="product.images[0].src"
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
export default {
  name: "ProductGroupingSelector",
  props: {
    groupings: {
      type: Object,
      required: true,
      default: () => {}
    },
    selected: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    groupingNames() {
      return Object.keys(this.groupings);
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

.product-grouping-selector-component {
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