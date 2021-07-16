<template>
  <div class="squatch-difference-men-component">
    <div class="hero-display-banner">
      <hero-display 
        :reversed="false"
        header="Performance Without Compromise"
        sub-header="Formulated For Men"
        text-heading="You've got needs. We've got the goods"
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/soap-inuse-closeup-2.png?v=1593397621"
      >
        We’re harnessing the power of Mother Nature and putting it to work in all of our products, so they can work for you. How’s that for teamwork?
      </hero-display>
    </div>

    <squatch-difference-subnav 
      tab="men"
    />

    <div class="hero-display-middle">
      <hero-display 
        :reversed="true"
        header="Products Built For You"
        text-heading="We develop products specifically with men's needs in mind."
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/mh-1_copy.gif?v=1624577360"
      >
        Let’s face it, men have different needs for their skin, pits and hair. Plus, they naturally deal with higher levels of sweat, dirt and stink on the regular. That’s why we’re dedicated to male-specific formulations that directly address the personal care demands of men everywhere.
      </hero-display>
    </div>

    <div class="toxic-ingredients-display">
      <div class="ingredient-title">
        <h1 class="title">
          Purpose-Built Products 
        </h1>
        <p class="text">
          We create products that are designed to handle the demands of men everywhere. 
        </p>
      </div>
      <div class="ingredient-content">
        <div class="ingredient-tab">
          <div class="icon">
            <img src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/exfoliating_soaps.png?v=1621972313">
          </div>
          <div class="ingredient-header">
            Exfoliating Soaps
          </div>
          <div class="ingredient-text">
            Gentle but effective scrubs with nourishing ingredients that are designed for men’s thicker skin and the extra sweat and grime of your day-to-day.
          </div>
        </div>
        <div class="ingredient-tab">
          <div class="icon">
            <img src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/natural_deodorant.png?v=1621972314">
          </div>
          <div class="ingredient-header">
            Natural Deodorant
          </div>
          <div class="ingredient-text">
            Busy, active men need strong stink protection and we’ve got you covered. The natural ingredients in our powerful Odor-Squatching™ formula attack stink at the source for all-day freshness and confidence. 
          </div>
        </div>
        <div class="ingredient-tab">
          <div class="icon">
            <img src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/hair_care.png?v=1621972314">
          </div>
          <div class="ingredient-header">
            Hair Care
          </div>
          <div class="ingredient-text">
            With all the rigors of daily life, keeping your manly mane shiny and healthy is no easy task. Our hair care products clean, strengthen and protect your hair with effective natural ingredients.
          </div>
        </div>
      </div>
    </div>

    <div class="hero-display-middle">
      <hero-display 
        :reversed="false"
        header="Committed to Men's Health"
        text-heading="We take your manly well-being seriously."
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-natural-deo.png?v=1618944216"
      />

      <div class="men-ingredients">
        <div class="men-ingredient-container">
          <h1 class="men-ingredients-title">
            Just Say <span style="color:#911a1d">No!</span>
          </h1>
          <p class="men-ingredients-text">
            We <span style="font-weight:700;">avoid</span> estrogenics and other ingredients that have been shown to have adverse effects on men’s health: 
          </p>
          <div class="men-ingredient-column">
            <div class="ingredient-row">
              <img 
                class="row-image" 
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/no.png?v=1621971766" 
              >
              <p class="ingredient-title">
                Soybean Oil
              </p>
            </div>
            <div class="ingredient-row">
              <img 
                class="row-image" 
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/no.png?v=1621971766"
              >
              <p class="ingredient-title">
                Pthalates
              </p>
            </div>
            <div class="ingredient-row">
              <img 
                class="row-image" 
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/no.png?v=1621971766" 
              >
              <p class="ingredient-title">
                Parabens
              </p>
            </div>
          </div> 
        </div>
        <div class="men-ingredient-container">
          <h1 class="men-ingredients-title">
            Just Say <span style="color:#40a041">Yes!</span>
          </h1>
          <p class="men-ingredients-text">
            We <span style="font-weight:700;">add</span> ingredients that can be potentially beneficial to men’s health. The kind of natural ingredients that you won’t typically find in other products:
          </p> 
          <div class="men-ingredient-column">
            <div class="ingredient-row">
              <img 
                class="row-image" 
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/yes.png?v=1621971940" 
              >
              <p class="ingredient-title">
                Saw Palmetto
              </p>
            </div>
            <div class="ingredient-row">
              <img 
                class="row-image" 
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/yes.png?v=1621971940" 
              >
              <p class="ingredient-title">
                Ginseng
              </p>
            </div>
            <div class="ingredient-row">
              <img 
                class="row-image" 
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/yes.png?v=1621971940"
              >
              <p class="ingredient-title">
                Valerian
              </p>
            </div>
          </div> 
        </div>
      </div>
    </div>

    <div 
      class="hero-display-middle" 
      style="background-color: #FAF6F1;"
    >
      <hero-display 
        :reversed="true"
        header="Smell Like A Man"
        text-heading="We source the best nature has to offer to help you smell damn good."
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/smell-like-a-man.png?v=1621972315"
      >
        Too many personal care products for men smell like the chemicals they're made of and give us flashbacks to our middel school locker room. You're a man, it's time to smell like one!
      </hero-display>
    </div>

    <difference-cardnav  
      selected-tab="men"
    />

    <div class="hero-display-banner bottom">
      <hero-display 
        :reversed="true"
        header="Natural Toothpaste"
        sub-header="Treat your pearly whites right"
        text-heading="Still brushing your teeth with synthetic goo?"
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-men-holding-toothpaste.svg?v=1619128825"
        cta-path="/products/toothpaste"
        cta-text="Shop Natural Toothpaste"
      >
        Fight cavities, protect enamel and gently whiten teeth without harsh chemicals.
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
import SudisfactionGuarantee from '@/vue/reusables/sudisfaction-guarantee';

export default {
  name: "SquatchDifferenceMen",
  components: {
    HeroDisplay,
    DifferenceCardnav,
    SudisfactionGuarantee
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

  .squatch-difference-men-component {
    margin: 75px 0 0 0;

    .toxic-ingredients-display {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      background-color: #FAF6F1;
      padding: 12px 0;


      .ingredient-title {
        text-align: center;
        padding: 0 16px;
        margin-top:30px;
        .title {
          margin-bottom: 15px;
          font-family: $font-heading;

          @media (min-width: $md) {
            font-size:35px;
          }
        }

        .text{
          font-family: $font-body;

          @media (min-width: $md) {
            font-size:16px;
          }
        }
        
        @media (min-width: $md) {
          width: 80%;
          max-width:780px;
          padding: 0;
        }

      }

      .ingredient-content {
        display:flex;
        flex-direction: column;
        margin-bottom: 30px;

        @media (min-width: $md) {
          flex-direction: row !important;
          width: 85%;
          justify-content: space-evenly;
          min-width: 768px;
          max-width: 1440px;
        }
      }

      .ingredient-tab {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        text-align: center;
        min-height: 131px;
        padding: 16px;

        @media (min-width: $md) {
          width: unset;
          flex: 1;
        }

        @media (min-width: $xl) {
          max-width: 350px;
        }

        .icon {
          width: 100%;

          @media(min-width:$md) {
            max-width: 336px;
            max-height: 274px;
          }

          img {
            width: 100%;
          }
        }

        

        .ingredient-header {
          font-family: $font-heading;
          font-size: 16px;
          padding: 16px 0 5px 0;
          color: $dark-brown;

          @media (min-width: $md) {
            font-size: 20px;
            padding: 25px 0 14px 0;
            margin-top:20px;
            width: unset;
          }
        }

        .ingredient-text {
          text-align: center;
          font-size: 14px;
          line-height: 130%;
          width: 90%;
          color: $brown;

          @media (min-width: $md) {
            font-size: 16px;
          }
        }
      }
    }

    .men-ingredients {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      margin: auto;
      max-width: 1224px;

      @media (min-width: $md) {
        flex-direction: row;
      }
      .men-ingredient-container {
        display: flex;
        flex-direction: column;
        text-align: left;
        flex: 50%;
      }

      .men-ingredients-title {
        @include font-style-heading($size: 20px);
        margin-bottom: 15px;

        @media (min-width: $md) {
          font-size: 30px;
        }
      }

      .men-ingredients-text {
        @include font-style-body;
        
        @media (min-width: $md) {
          font-size: 16px;
        }
      }

      .men-ingredient-column {
        margin-bottom: 20px;

        .ingredient-row {
          display: flex;
          align-items: center;
          padding-bottom: 15px;

          .ingredient-title {
            @include font-style-body-bold;
            margin: 0;
            padding-left: 10px;
          }

          .row-image {
            height: 28px;
            width: 28px;
          }
        }
      }
    }

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

    .hero-display-middle {
        .sub-header, .header {
            color: $dark-brown;
        }

        .text {
            color: $brown;
        }
    }

    .scents-display {
      text-align: center;
      background-image: url("https://cdn.shopify.com/s/files/1/0275/7784/3817/files/woodgrain-default.svg?v=1615322353");
      background-color: $sand;
      background-size: 200%;
      padding: 30px 18px;
    
      .sub-header {
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 12px;
        color: $dark-brown;

        @media (min-width: $md) {
          font-size: 16px;
          line-height: 18px;
        }
      }
    
      .header {
        margin: 18px 30px 12px 30px;
        font-size: 30px;
        line-height: 100%;
        font-family: $font-heading;
        color: $dark-brown;

        @media (min-width: $md) {
          margin: 10px 30px 12px 30px;
          font-size: 40px;
        }
      }

      .text {
        font-size: 14px;
        line-height: 130%;
        text-align: left;
        margin: 0 auto 30px auto;
        max-width: 725px;
        color: $dark-brown;
      }

      .scents {

        @media (min-width: $md) {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
        }

        @media (min-width: $xl) {
          max-width: 1200px;
          margin: auto;
        }
        
        .scent {
          width: 86%;
          margin: 20px auto;
          padding: 16px;
          display: flex;
          flex-flow: column nowrap;
          justify-content: stretch;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
          text-align: left;

          @media (min-width: $md) {
            width: unset;
            flex: 1;
            margin: 5px 8px;
          }

          @media (min-width: $lg) {
            margin: 5px 12px;
          }

          @media (min-width: $xl) {
            max-width: 250px;
          }

          .scent-image {
            padding: 16px;
            text-align: center;
            
            img {
              max-width: 150px;
              width: 75%;
              height: auto;
            }
          }

          .scent-name {
            font-size: 20px;
            line-height: 100%;
            font-family: $font-heading;
            color: $dark-brown;
          }

          .scent-function {
            margin: 7px 0 10px 0;
            font-weight: 700;
            font-size: 14px;
            line-height: 130%;
            font-family: $font-body;
            color: $dark-brown;
          }

          .scent-description {
            font-size: 12px;
            line-height: 130%;
            color: $brown;
            margin: 0;
          }
        }
      }
    
      .cta-wrapper {
        margin: 30px 0 0 0;
        text-align: center;
      
        .link {
          display: inline-block;
          width: 86%;
          margin: auto;
          border-radius: 5px;
          background-color: $orange;
          border: none;
          padding: 15px 0 11px 0;
          text-transform: uppercase;
          font-family: $font-heading;
          font-size: 14px;
          line-height: 17px;
          color: #ffffff;
          text-align: center;

          @media (min-width: $md) {
            width: 70%;
            max-width: 300px;
          }
        }
      }
    }

    .guarantee {
      margin: 10px 0;
    }
  }
</style>