<template>
  <div class="footer-component">
    <div class="newsletter woodgrain-bg">
      <div class="newsletter-content">
        <strong>GET 20% OFF YOUR FIRST SUBSCRIPTION!</strong>
        <div class="newsletter-form">
          <input 
            class="user-email" 
            type="email" 
            required="true" 
            placeholder="Email"
          >
          <button class="sign-up">
            Sign Up
          </button>
        </div>
      </div>
    </div>
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
@import "@/styles/partials/brand.scss";

.footer-component {
  // position: fixed;
  // bottom: 0;
  // left: 0;
  width: 100%;

  .newsletter{
    width: 100%;
    background-color: $tan;
    padding: 30px 15px;


    .newsletter-content{
      display: flex;
      justify-content: center;
      align-items: center;
      width:100%;
      max-width: 395px;
      margin:auto;
      flex-direction: column;

      @media(min-width:768px){
        max-width: 500px;
      }



      strong{
        font-family: "adrianna-bold", sans-serif;
        text-align: center;
      }

      .newsletter-form{
        display: flex;
        width: 100%;
        justify-content: center;

        .user-email{
          box-sizing: border-box;
          border-radius: 2px;
          padding: 0px 0px 0px 16px;
          height: 48px;
          text-align: left;
          color: rgb(36, 36, 36);
          font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
          font-size: 16px;
          font-weight: 400;
          letter-spacing: 0px;
          background-color: rgb(255, 255, 255);
          border: 1px solid rgb(36, 36, 36);
          width: 67%;
          outline:black;

          @media(min-width: 768px){
            width: 80%;
          }
        }
        .sign-up{
          position: relative;
          padding: 11px 10px;
          background: rgb(204, 99, 40);
          border-radius: 0px;
          border-style: solid;
          border-color: rgb(204, 99, 40);
          border-width: 5px;
          color: rgb(255, 255, 255);
          font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0px;
          line-height: 1;
          white-space: normal;
          text-align: center;
          word-break: break-word;
          align-self: flex-end;
          cursor: pointer;
        }
      }
    }

  }

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