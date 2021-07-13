<template>
  <div class="squatch-difference-nontoxic-component">
    <div class="hero-display-banner">
      <hero-display 
        :reversed="false"
        header="Ingredients We Never Use"
        sub-header="Nature Good, Harmful Chemicals Bad"
        text-heading="We’re taking a stand."
        text="Traditional brands, and even some so-called “natural” brands, use harsh chemicals and harmful ingredients that are brutal on your skin, hair and body. But at Dr. Squatch we’re proudly standing on top of the mountain, triumphantly yelling “Hell no!” and taking a stand."
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/no_aluminum.jpg?v=1621972410"
      />
    </div>

    <squatch-difference-subnav 
      tab="nontoxic"
    />
    <!-- {% include 'UI-squatch-difference-subnav', selectedTab: 'nontoxic' % -->
    <div class="hero-display-middle">
      <hero-display 
        :reversed="true"
        header="The Sh*t List"
        sub-header="Ingredients We Never Use"
        text="Meet our Sh*t List, a roster of nasty, harmful ingredients that we vow to never use in any of our products. We refuse to cut corners and we avoid both common and lesser-known chemicals, synthetics and preservatives that can have a range of adverse effects on your skin and body."
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-men-everymorning.gif?v=1619543543"
      />
    </div>

    <div class="hero-display-middle">
      <hero-display 
        :reversed="false"
        header="Rigorous Testing and Quality Control"
        sub-header="Safety First"
        text="Not only do we give a damn about what we put in our products, but we’re committed to going the extra mile for safety. That’s why our products go through extensive testing and toxicology risk assessments, which is 'scientist' for “making sure they're safe for you.” We always want to make sure that both the individual ingredients and our final formulas are safe and effective."
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-men-qc.svg?v=1619129137"
      />  
    </div>

    <difference-cardnav  
      selected-tab="nontoxic"
    />

    <div class="hero-display-banner bottom">
      <hero-display
        :reversed="true"
        header="Natural Hair Care"
        sub-header="Respect your roots"
        text-heading="Maintain your manly mane the natural way."
        text="Cleanse, fortify and restore your hair and scalp without harsh chemicals."
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/drs_ff-haircare.jpg?v=1623193441"
        cta-path="/collections/hair-care"
        cta-text="Shop Natural Hair Care"
      />
    </div>

    <div class="guarantee">
      <sudisfaction-guarantee />
    </div>
  </div>
</template>

<script>
import HeroDisplay from "@/vue/reusables/squatch-difference/hero-display";
import SquatchDifferenceSubnav from "@/vue/reusables/squatch-difference/UI-squatch-difference-subnav"
import SudisfactionGuarantee from '@/vue/reusables/sudisfaction-guarantee';
import DifferenceCardnav from "@/vue/reusables/squatch-difference/UI-squatch-difference-cardnav";


  export default {
    name: "SquatchNontoxic",
    components: {
      HeroDisplay,
      SquatchDifferenceSubnav,
      SudisfactionGuarantee,
      DifferenceCardnav
    }
  }
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.squatch-difference-nontoxic-component {
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


  .toxic-ingredients-table-display {
    max-width: 1200px;
    margin: auto;
    padding: 30px 18px;
    
    .sub-header {
      font-family: $font-body;
      font-weight: 700;
      font-size: 14px;
      line-height: 130%;
      color: $brown;
      text-align: center;
    }

    .header {
      font-family: $font-heading;
      font-size: 30px;
      line-height: 100%;
      color: $dark-brown;
      text-align: center;
      margin: 12px;

      @media (min-width: $md) {
        font-size: 40px;
      }
    }

    .text {
      max-width: 800px;
      margin: auto;
      font-family: $font-body;
      font-size: 14px;
      line-height: 130%;
      color: $brown;
      text-align: center;
    }

    .UI-squatch-difference-accordion-table {
      margin-top: 20px;
    }
  }

  .hero-display-middle {
    .sub-header, .header {
      color: $dark-brown;
    }

    .text {
      color: $brown;
    }
  }

  .guarantee {
    margin: 10px 0;
  }
}


</style>