<template>
  <div class="squatch-difference-natural-component">
    <div class="hero-display-banner">
      <hero-display 
        :reversed="false"
        header="We Give A Damn About Natural"
        sub-header="Raising The Bar"
        text-heading="Here's why you should too."
        text="Too many products use synthetic detergents and harsh chemicals, wreaking havoc on your skin and body. At Dr. Squatch we’re dedicated to using the finest natural ingredients that will have you looking, smelling and feeling your best, day in and day out."
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-natural-spearmint-basil.png?v=1618943722"
      />
    </div>


    <squatch-difference-subnav 
      tab="natural"
    />

    <div class="hero-display-middle">
      <hero-display 
        :reversed="true"
        header='We Hold "Natural" To A Higher Standard'
        sub-header="We've Got Standards"
        text='Sure, you hear the term “natural” a lot. But what does "natural" really mean? How do we measure it? Great questions, we’ve got you.'
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-natural-meaning.png?v=1618943851"
      />
    </div>

    <div class="toxic-ingredients-display">
      <div class="ingredient-title">
        <h1 class="title">
          Dr. Squatch products are 98-100% natural in origin 
        </h1>
        <p class="text">
          That means we don’t cut corners and our ingredients come from nature; ingredients like plants, minerals and other natural elements.
        </p>
      </div>
      <div class="ingredient-content">
        <div class="ingredient-tab">
          <div class="icon">
            <img src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/question.png?v=1621972999">
          </div>
          <div class="ingredient-header">
            How do we measure how “natural” our products are?
          </div>
          <div class="ingredient-text">
            We use the international standard <b>ISO 16128 methodology</b> for calculating the naturalness of our personal care products.
          </div>
        </div>
        <div class="ingredient-tab">
          <div class="icon">
            <img src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/question.png?v=1621972999">
          </div>
          <div class="ingredient-header">
            What is ISO 16128?
          </div>
          <div class="ingredient-text">
            <b>ISO 16128</b> is a methodology to determine whether or not an ingredient should be considered natural. Wanna get in deep on the fine print? Here’s more info on <b>ISO 16128</b>.
          </div>
          <div>
            <a 
              href="https://www.iso.org/obp/ui/#iso:std:iso:16128:-2:ed-1:v1:en" 
              style="color:#cc6328;"
            >
              <b>Check it out</b>
            </a> 
          </div>
        </div>
        <div class="ingredient-tab">
          <div class="icon">
            <img src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/question.png?v=1621972999">
          </div>
          <div class="ingredient-header">
            How does Dr. Squatch use ISO 16128?
          </div>
          <div class="ingredient-text">
            Using <b>ISO 16128 </b>methodology, we ensure that all of our products are at least 98% natural origin.
          </div>
        </div>
      </div>
    </div>

    <div class="hero-display-middle">
      <hero-display 
        :reversed="false"
        :sub-below="true"
        header="We’re serious about transparency"
        sub-header='Looking to learn more about all of our ingredients? <br><br><a href="/pages/glossary" style="color: #cc6328;">Check out our Ingredient Glossary.</a>'
        text="At Dr. Squatch we’re not hiding behind false promises and we strive to be as transparent as possible with all of our products and ingredients. <br>That’s why every single ingredient that goes into each product is listed on its product page."
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/were_serious_about_transparency.jpg?v=1621967909"
      />
    </div>

    <div class="hero-display-middle middle-bottom">
      <hero-display 
        :reversed="true"
        header="The Truth About Natural Products"
        sub-header="Walking The Walk"
        text="There are a lot of so-called “natural” products out there, but the truth is, many of them aren’t really that natural at all. That’s why we’re dedicated to sharing how we make our products and what we put in them."
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Grapefruit-IPA-Select-4_2.jpg?v=1621965804"
      />
    </div>

    <div class="scents-display">
      <div class="sub-header">
        Smell Good, Feel Good
      </div>
      <div class="header">
        Fragrances From Nature
      </div>
      <p class="text text-center">
        You know what smells awesome? Nature. We thought you should too. That’s why we use naturally-derived scents that often have other benefits and avoid the synthetic junk that leaves you smelling like a middle school locker room. 
      </p>

      <div class="scents">
        <div class="scent">
          <div class="scent-image">
            <img 
              src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Ingredient_OrangeOil.png?v=1614382101" 
              alt="Orange image"
            >
          </div>
          <div class="scent-name">
            Orange Essential Oil
          </div>
          <p class="scent-description">
            When used in aromatherapy, inhalation of this essential oil may help to activate a feeling of alertness.
          </p>
        </div>
        <div class="scent">
          <div class="scent-image">
            <img 
              src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Ingredient_CedarwoodOil.png?v=1614382100" 
              alt="Cedarwood oil image"
            >
          </div>
          <div class="scent-name">
            Cedarwood Essential Oil
          </div>
          <p class="scent-description">
            Cedarwood promotes an even tone in problem areas of the skin when used topically.  It contains vitamins C and E, which. both help to calm those problem skin areas.
          </p>
        </div>
        <div class="scent">
          <div class="scent-image">
            <img 
              src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Ingredient_CypressOil.png?v=1614382101" 
              alt="Cypress image"
            >
          </div>
          <div class="scent-name">
            Cypress Essential Oil
          </div>
          <p class="scent-description">
            Cypress may assist with issues associated to excess oils in the hair follicle, resulting in a greasy head of hair.
          </p>
        </div>
        <div class="scent">
          <div class="scent-image">
            <img 
              src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Ingredient_SpearmintOil.png?v=1614382100" 
              alt="Spearmint oil image"
            >
          </div>
          <div class="scent-name">
            Spearmint Essential oil
          </div>
          <p class="scent-description">
            Spearmint contains a large number of antioxidant compounds, including rosmarinic acid, flavones and limonene that may help to fight the free radicals which lead to premature aging.
          </p>
        </div>
      </div>
      <div class="cta-wrapper">
        <a 
          class="link" 
          href="/pages/glossary"
        >
          Learn More
        </a>
      </div>
    </div>


    <difference-cardnav  
      selected-tab="natural"
    />

    <div class="hero-display-banner bottom">
      <hero-display 
        :reversed="true"
        header="Natural Deodorant"
        sub-header="Give B.O. the Boot"
        text-heading="Our Odor-Squatching&reg; System attacks stink from every angle"
        text="Squatch stank and detox from aluminum? Say less. Our powerful, natural deodorants contain charcoal powder to block odor, probiotics to help prevent the growth of odor-causing bacteria, and arrowroot powder to absorb moisture, leaving you feeling fresh all day. So go ahead and turn those bad pitts into Brad Pitts."
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-natural-deo.png?v=1618944216"
        cta-path="/collections/deodorant"
        cta-text="Shop Natural Deodorant"
      />
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
  name: "SquatchDifferenceNatural",
  components: {
    HeroDisplay,
    DifferenceCardnav,
    SudisfactionGuarantee
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.squatch-difference-natural-component {
  font-family: $font-body;
  margin: 75px 0 0 0;

  .toxic-ingredients-display {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    background-color: #FAF6F1;
    padding: 12px 0;


    .ingredient-title{
      text-align: center;
      margin-top:30px;
      .title{
        margin-bottom: 15px;
        font-family: $font-heading;
        @media (min-width: $md) {
          font-size:35px;
        }
      }
      .text{
        @media (min-width: $md) {
          font-size:16px;
        }
      }
      
      @media (min-width: $md) {
        width: 80%;
        max-width:780px;
      }

    }

    .ingredient-content{
      display:flex;
      flex-direction: column;

      @media (min-width: $md) {
        flex-direction: row !important;
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

      .icon{
        width: 74px;
        height: 74px;

        img{
          width:100%;
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

  .scents-display {
    text-align: center;
    color: $dark-brown;
    background-image: url("https://cdn.shopify.com/s/files/1/0275/7784/3817/files/woodgrain-default.svg?v=1615322353");
    background-color: $sand;
    background-size: 200%;
    padding: 30px 18px;

    .sub-header {
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
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
      color: $brown;
      text-align: left;
      margin: 0 auto 30px auto;
      max-width: 725px;
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
          margin: 0 0 10px 0;
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

  .hero-display-middle {

    &.middle-bottom {
      margin-bottom: 25px;
    }

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
