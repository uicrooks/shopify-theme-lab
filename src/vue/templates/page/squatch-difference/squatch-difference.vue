<template>
  <div class="squatch-difference-component">
    <div class="hero-display-banner">
      <hero-display 
        :reversed="false"
        header="The Squatch Difference"
        sub-header="About Us"
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-landing-1.svg?v=1619129565"
      >
        We craft natural, high-performance personal care products in manly scents with only the finest ingredients Mother Nature has to offer.
      </hero-display>
    </div>

    <div class="mission-display">
      <div class="sub-header">
        Our Mission
      </div>
      <div class="header">
        Raising The Bar On Men’s<br> Personal Care Products
      </div>
      <difference-cardnav  
        selected-tab="landing"
      />
    </div>

    <div class="mid-page-heading">
      <div>Changing The Way Men Approach Personal Care</div>
    </div>

    <div class="hero-display-middle">
      <hero-display 
        :reversed="true"
        sub-header="The Problem"
        header="The Personal Care Industry Needs Cleaning"
        :text-black="true"
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Bundles_home-2.jpg?v=1616626929"
      >
        For generations traditional mass-market brands have been stripping natural ingredients from personal care products to make production cheaper and faster. Men have been forced to settle for lackluster products that are packed with harsh ingredients, chemical irritants and unnatural smells. But one courageous Squatch hadn’t given up on natural products.
      </hero-display>    
    </div>

    <div class="hero-display-middle bottom">
      <hero-display 
        :reversed="false"
        sub-header="Changing The Game"
        header="The Squatch Story"
        :text-black="true"
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-jack.png?v=1618880952"
      >
        Inspired by a love of natural products, our founder Jack began creating his own natural soap in his garage. He also knew there must be other guys out there who wanted better products with natural ingredients and manly scents. With that, Dr. Squatch was born! Millions of happy customers later, the Dr. Squatch mission remains the same - to raise the bar for natural products and change the way men approach their personal care.
      </hero-display>    
    </div>


    <div class="quote-display">
      <img src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-icon-quote.svg?v=1619134106">
      <div class="quote-text">
        Our goal is to inspire and educate men to be happier and healthier.
      </div>
      <div class="quote-reference">
        - Jack Haldrup, Founder and CEO
      </div>
    </div>

    <div class="hero-display-banner bottom">
      <hero-display 
        :reversed="true"
        sub-header="Bag A Bundle"
        header="Upgrade Your Whole Routine"
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/drs_products_bathroom.jpg?v=1621972629"
        cta-path="/pages/bundle-offers"
        cta-text="Shop Bundles"
      >
        Take your whole routine up a notch with our curated bundles of best-selling Squatch favorites.
      </hero-display>    
    </div>
    <div class="guarantee">
      <sudisfaction-guarantee />
    </div>
  </div>
</template>

<script>
import HeroDisplay from "@/vue/reusables/squatch-difference/hero-display";
import DifferenceCardnav from "@/vue/reusables/squatch-difference/UI-squatch-difference-cardnav";
import SudisfactionGuarantee from "@/vue/reusables/sudisfaction-guarantee";

export default {
  name: "SquatchDifference",
  components: {
    HeroDisplay,
    DifferenceCardnav,
    SudisfactionGuarantee
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.squatch-difference-component {
  margin: 75px 0 0 0;

  .hero-display-banner {
    background-image: url("https://cdn.shopify.com/s/files/1/0275/7784/3817/files/dsq-woodgrain_texture-DARK.svg?v=1616535182");
    background-color: $dark-brown;
    background-position: center;
    color: #ffffff;

    &.bottom {
      margin-top: 30px;
    }

    .header {
      max-width: 500px;
      color: #ffffff;

      @media (min-width: $md) {
        font-size: 50px !important;
      }
    }
  }

  .mission-display {
    margin-top: 30px;

    .sub-header {
      @include font-style-body($weight: 700, $size: 14px, $color: $dark-brown);
      line-height: 130%;
      text-align: center;

      @media (min-width: $md) {
        font-size: 16px;
      }
    }

    .header {
      width: 90%;
      @include font-style-heading($size: 30px, $color: $dark-brown);
      line-height: 100%;;
      text-align: center;
      margin: 12px auto;

      @media (min-width: $md) {
        font-size: 35px;
        margin: 12px auto 2px;
      }
    }
  }

  .mid-page-heading {
    padding: 35px 10px 30px;
    background-image: url('https://cdn.shopify.com/s/files/1/0275/7784/3817/files/changing_the_way.jpg?v=1621972678') !important;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    line-height: 100%;
    @include font-style-heading($size: 30px, $color: white);
    text-align: center;
    margin-bottom:20px;

    @media (min-width: $md) {
      padding: 40px 10px 30px;
      font-size: 35px;
      margin-top: 25px;
    }

    div {
      margin: auto;
      width: 85%;
      max-width: 820px;

      @media (min-width: $md) {
        width: 75%;
      }

      @media (min-width: $lg) {
        width: 65%;
      }
    }
  }

  .hero-display-middle {
    background-color: #FAF6F1;

    &.bottom {
      .inner-wrapper {
        padding: 35px 0 35px 0;
      }
    }

    .inner-wrapper {
      padding: 30px 0 1px 0;
    }

    .sub-header {
      color: $dark-brown;
    }

    .header {
      color: $dark-brown;
      font-size: 25px !important;

      @media (min-width: $md) {
        font-size: 30px !important;
      }
    }

    .text {
      color: $brown;
    }
  }

  .quote-display {
    padding: 25px 10px 45px;
    background-image: url("https://cdn.shopify.com/s/files/1/0275/7784/3817/files/woodgrain-default.svg?v=1615322353");
    background-color: $sand;
    background-size: 200%;
    text-align: center;
    color: #000;

    .quote-text {
      @include font-style-heading($size: 20px);
      line-height: 100%;
      margin: 25px 0 16px;

      @media (min-width: $md) {
        font-size: 30px;
        width: 60%;
        margin: 25px auto 16px;
      }
    }

    .quote-reference {
      font-size: 16px;
      font-weight: 600;
      line-height: 100%;
      font-style: italic;

      @media (min-width: $md) {
        font-size: 18px;
      }

    }
  }

  .guarantee {
    margin: 10px 0;
  }
}

</style>
