<template>
  <div class="product-breadcrumb-component">
    <div
      v-for="(link, index) of links"
      :key="`breadcrum-link-${index}`"
      class="link-box"
      :class="{'active': index === links.length - 1}"
    >
      <a
        :href="link.path"
        class="link-label"
      >{{ link.label }}</a>
      <b-icon
        class="chevron-icon"
        icon="chevron-right"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: []
    };
  },
  methods: {
    runTest() {
      console.log("ADfadsfadf");
    }
  },
  mounted() {
    const pathArray = window.location.pathname.split("/");
    this.links = [
      { label: "Home", path: "/" },
      { label: pathArray[2].split("-").join(" "), path: `/collections/${pathArray[2]}` },
      { label: pathArray[4].split("-").join(" "), path: `/collections/${pathArray[2]}/products/${pathArray[4]}` }
    ];
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

    &.active {

      .link-label {
        color: $orange;
      }

      .chevron-icon {
        display:  none;
      }
    }

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
    }
  }

}
</style>