<template>
  <div class="product-breadcrumb-component">
    <div
      class="link-box"
    >
      <a
        href="/"
        class="link-label"
      >
        Home
      </a>
      <b-icon
        class="chevron-icon"
        icon="chevron-right"
      />
      <a
        :href="`/collections/${collection}`"
        class="link-label"
      >
        {{ collection | readableHandle }}
      </a>
      <b-icon
        class="chevron-icon"
        icon="chevron-right"
      />
      <a
        href="#"
        class="link-label active"
      >
        {{ product.title }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    collection: {
      type: String,
      required: true,
      default: ""
    },
    product: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-breadcrumb-component {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding: 10px 15px;

  .link-box {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding-right: 9px;

    a, a:hover, a:visited {
      text-decoration: none;
    }

    a:hover {
      color: $orange;
    }

    .link-label {
      padding-right: 9px;
      text-transform: capitalize;
      cursor: pointer;
      @include font-style-body($size: 12px, $color: $brown);

      &.active, :hover {
        color: $orange;
      }
    }

    .chevron-icon {
      color: #dcdcdc;
      margin-right: 9px;
    }
  }

}
</style>