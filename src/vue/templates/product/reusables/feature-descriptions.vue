<template>
  <div
    v-if="items.length"
    class="product-feature-descriptions-component"
  >
    <div
      v-for="(item, index) of items"
      :key="`product-icon-desc-item-${index}`"
      :class="['description-item', `text-${handleBasedClassName}`]"
    >
      <i :class="['squatch-icon', `icon-${item.iconName}`]" />
      <div class="description">
        <h6>{{ item.label }}</h6>
        {{ item.metafieldName }}
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  name: "ProductFeatureDescriptions",
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    handle: {
      type: String,
      required: true,
      default: ""
    }
  },
  computed: {
    handleBasedClassName() {
      const arr = this.handle.split("-");
      return arr.slice(0, -1).join("-");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-feature-descriptions-component {
  border-top: 1px solid $tan;
  border-bottom: 1px solid $tan;

  @include layout-md {
    display: flex;
    flex-flow: row wrap;
  }

  .description-item {
    display: flex;
    flex-flow: row wrap;
    margin: 15px 0;

    @include layout-md {
      flex: 1;
    }

    .description {
      padding-right: 15px;
      @include font-style-body($color: inherit);

      h6 {
        margin: 0;
        @include font-style-heading($size: 14px);
      }
    }
  }
}
</style>