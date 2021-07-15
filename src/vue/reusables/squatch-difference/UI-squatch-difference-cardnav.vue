<template>
  <div class="ui-squatch-difference-cardnav-component">
    <div 
      :class="selectedTab != 'landing' && selectedTab != 'men' ? 'UI-squatch-difference-cardnav with-breakline' : 'UI-squatch-difference-cardnav'"
    >
      <div 
        v-if="selectedTab == 'nontoxic' || selectedTab == 'men'"
        class="title"
      >
        Learn More About The Squatch Difference
      </div>
      <div 
        v-else-if="selectedTab != 'landing'"
        class="title"
      >
        The Squatch Difference
      </div>

      <div 
        v-if="selectedTab != 'landing'"
        class="cardbox-wrapper our-story"
      >
        <difference-cardbox
          heading="Our Story"
          text="Dr. Squatch was inspired by our founder Jack's  love of natural products and need for better soap without  harsh chemicals."
          icon-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-logo-landing.svg?v=1618949871"
          link-url="/pages/the-squatch-difference"
        />
      </div>

      <div 
        v-if="selectedTab != 'natural'"
        class="cardbox-wrapper"
      >
        <difference-cardbox
          heading="Natural Products"
          text="At Dr. Squatch, all of our products are of 98-100% natural origin (per the ISO standard). That means exceptional  natural ingredients and naturally-derived fragrances that smell awesome."
          icon-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-logo-natural.svg?v=1618877407"
          link-url="/pages/the-squatch-difference-natural-ingredients"
        />
      </div>


      <div 
        v-if="selectedTab != 'nontoxic'"
        class="cardbox-wrapper"
      >
        <difference-cardbox
          heading="No Harmful Ingredients"
          text="We never use the harmful ingredients or harsh chemicals often used by traditional brands. In fact, we have a full roster of no-go ingredients that we call The Sh*T List."
          icon-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-logo-nontoxic.svg?v=1618877407"
          link-url="/pages/the-squatch-difference-no-toxic-ingredients"
        />
      </div>

      <div 
        v-if="selectedTab != 'men'"
        class="cardbox-wrapper"
      >
        <difference-cardbox
          heading="Formulated For Men"
          text="Men have special needs. That's why we formulate products for men through performance, scent and avoidance of estrogenics (estro-what?)"
          icon-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-logo-male.svg?v=1618877407"
          link-url="/pages/the-squatch-difference-for-men"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DifferenceCardbox from "@/vue/reusables/UI-cardbox"

  export default {
    name: "DifferenceCardnav",
    coomponents: {
      DifferenceCardbox
    },
    props: {
      selectedTab: {
        type: String,
        required: true
      }
    }
  }


</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.ui-squatch-difference-cardnav-component {
  .UI-squatch-difference-cardnav{
    padding: 10px 20px 0;
    
    &.with-breakline {
      border-top: 2px solid #F0EEEB;
    }
  
    @media (min-width: $md) {
      padding: 20px 20px 0;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      margin: auto;
    }
  
    @media (min-width: $lg) {
      justify-content: center;
    }
  
    .title {
      width: 100%;
      font-size: 25px;
      font-weight: 900;
      font-family: $font-heading;
      line-height: 100%;
      margin: 25px 0;
      text-align: center;
      color: $dark-brown;
  
      @media (min-width: $md) {
        font-size: 30px;
      }
    }
  
    .cardbox-wrapper {
      padding: 0 10px;
      margin-bottom: 40px;
  
      &.our-story {
        .heading {
          width: 50%;
        }
      }
  
      @media (min-width: $md) {
        margin-bottom: 15px;
      }
  
      @media (min-width: $md) {
        max-width: 370px;
        flex: 1;
      }
  
      @media (min-width: $lg) {
        padding: 0 20px;
        max-width: 360px;
      }
    }
  }
}
</style>
