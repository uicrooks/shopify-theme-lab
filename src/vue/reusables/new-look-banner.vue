<template>
  <div
    v-if="showBanner"
    class="new-look-banner-component"
  >
    <div
      v-if="hasOldPackaging"
      class="old-packaging"
    >
      <h6>
        New look, same Squatch!
      </h6>
      <p>
        Our upgrade is in progress so some products may ship with older packaging.
      </p>
    </div>
    <div
      v-else
      class="new-packaging"
    >
      <img
        src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/new_packaging-1?v=1616520305"
      >
      <h6>
        New look, same Squatch!
      </h6>
      <p>
        Everything you know and love about Dr. Squatch but with a fresh new look.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewLookBanner",
  props: {
    handle: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: false
    }
  },
  computed: {
    showBanner() {
      if (["toothpaste", "shower-boosters", "best-sellers", "hand-sanitizer", "hand-soap", "squatch-gift-card", "gear", "bay-rum-candle"].includes(this.handle)) {
        return false;
      }
      return ["bar-soaps", "hair-care", "deodorant", "colognes", "beard"].includes(this.handle) || this.handle.includes("deodorant") || this.handle.includes("hair-care-kit") || this.handle.includes("shampoo") || this.handle.includes("conditioner");
    },
    hasOldPackaging() {
      return ["deodorant", "colognes", "beard"].includes(handle) || title.includes("Cypress");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.new-look-banner-component {
  background-color: #fbf6f0;
  padding: 8px 0;
  text-align: center;

  .new-packaging {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;

    img {
      height: 34px;
    }

    h6 {
      margin: 0 0 0 14px;
      @include font-style-heading($size: 14px, $lh: 14px, $color: $dark-brown);
    }

    p {
      display: none;
      margin: 0 0 0 7px;
      @include font-style-body($color: $dark-brown);

      @include layout-md {
        display: inline-block;
      }
    }
  }

  .old-packaging {

    @include layout-md {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    }
    
    h6 {
      margin: 0;
      padding: 8px 0 4px 0;
      @include font-style-heading($size: 14px, $lh: 14px, $color: $dark-brown);
    }

    p {
      margin: 0;
      min-width: 475px;
      @include font-style-body($color: $dark-brown);

      @include layout-md {
        margin: 4px 0 0 8px;
      }
    }
  }
}
</style>