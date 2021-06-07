<template>
  <div class="new-look-banner-component">
    <img
      src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/new_packaging-1?v=1616520305"
    />
    <h6>
      New look, same Squatch!
    </h6>
    <p>
      Everything you know and love about Dr. Squatch but with a fresh new
      look.
    </p>
  </div>
</template>

<script>
export default {
  name: "NewLookBanner"
}
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.new-look-banner-component {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  background-color: #fbf6f0;
  padding: 8px 0;

  img {
    height: 34px;
  }

  h6 {
    // padding: 8px 0 4px;
    margin: 0 0 0 14px;
    @include font-style-heading($size: 14px, $lh: 14px, $color: $dark-brown);
  }

  p {
    display: none;

    @include layout-md {
      display: inline-block;
      margin: 0 0 0 7px;
      @include font-style-body($color: $dark-brown);
    }
  }
}
</style>