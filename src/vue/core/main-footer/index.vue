<template>
  <div class="footer-component">
    <footer-menu />
    <div class="bottom-row">
      <div class="copyright">
        DR. SQUATCH is a registered trademark of Dr. Squatch, Inc. © 2021, Dr. Squatch, Inc. All rights reserved.
      </div>
      <div class="payment-methods">
        <img
          src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/asset-icon-visa.svg?v=1617925436"
          alt="Visa logo"
        >
        <img
          src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/asset-icon-mastercard.svg?v=1617925436"
          alt="Master card logo"
        >
        <img
          src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/asset-icon-amex.svg?v=1617925435"
          alt="American Express logo"
        >
        <img
          src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/asset-icon-shopify.svg?v=1617925435"
          alt="Shop Pay logo"
        >
        <img
          src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/asset-icon-paypal.svg?v=1617925436"
          alt="PayPal logo"
        >
        <img
          src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/asset-icon-googlepay.svg?v=1617925436"
          alt="Google Pay logo"
        >
      </div>      
    </div>
  </div>
</template>

<script>
import FooterMenu from "@vue/core/main-footer/footer-menu";

export default {
  name: "MainFooter",
  components: {
    FooterMenu
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.footer-component {
  // position: fixed;
  // bottom: 0;
  // left: 0;
  width: 100%;

  .bottom-row {
    display: flex;
    flex-flow: row wrap;
    padding: 15px;
    color: $sand;
    background-color: $black;

    @include layout-lg {
      align-items: center;
      justify-content: center;
    }
    
    .copyright {
      width: 100%;
      text-align: center;
      @include font-style-body($size: 11px, $color: $sand);

      @include layout-lg {
        width: unset;
        flex: 1;
        margin-right: 40px;
      }
    }

    .payment-methods {
      text-align: center;
      width: 100%;
      margin-top: 4px;

      @include layout-lg {
        width: unset;
        margin-top: 0;
      }

      img {
        margin: 0 6px;
      }
    }
  }
}

</style>