<template>
  <div class="squatch-difference-component">
    <div class="hero-display-banner">
      <hero-display 
        :reversed="true"
        :sub-below="true"
        sub-header="Something"
        image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-landing-1.svg?v=1619129565"
        cta-path="/pages/bundle-offers"
        cta-text="Testing"
      />
      <!-- {% include 'UI-hero-display',
        subHeader: 'About Us',
        header: 'The Squatch Difference',
        text: 'We craft natural, high-performance personal care products in manly scents with only the finest ingredients Mother Nature has to offer.',
        imageSrc: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-landing-1.svg?v=1619129565'
      %} -->
    </div>
  </div>
</template>

<script>
import HeroDisplay from "@vue/ui-elements/squatch-difference/hero-display";

export default {
  name: "SquatchDifference",
    components: {
    HeroDisplay,
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

</style>
