<template>
  <div class="product-icon-descriptions-component">
    <div
      v-for="(item, index) of items"
      :key="`product-icon-desc-item-${index}`"
      :class="['description-item', `text-${handle}`]"
    >
      <i :class="['squatch-icon', `icon-${item.iconName}`]" />
      <div class="description">
        <h6>{{ item.label }}</h6>
        {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  mounted() {
    console.log(this.items);
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-icon-descriptions-component {
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
      @include font-style-body();

      h6 {
        margin: 0;
        @include font-style-heading($size: 14px, $lh: 14px, $color: $dark-brown);
      }
    }
  }
}
</style>