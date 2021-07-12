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
          v-if="selectedTab != 'men'"
          class="cardbox-wrapper our-story"
        >
          <difference-cardbox
            heading= "Our Story"
            text= "Dr. Squatch was inspired by our founder Jack's  love of natural products and need for better soap without  harsh chemicals."
            iconSrc= "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-logo-landing.svg?v=1618949871"
            linkUrl= "/pages/the-squatch-difference"
          />
        </div>
      <!-- {% if selectedTab != 'natural' %}
      <div 
        v-if="selectedTab != 'natural'"
        class="cardbox-wrapper"
      >
        {% include 'UI-cardbox',
          title: 'Natural Products',
          text: 'At Dr. Squatch, all of our products are of 98-100% natural origin (per the ISO standard). That means exceptional  natural ingredients and naturally-derived fragrances that smell awesome.',
          iconSrc: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-logo-natural.svg?v=1618877407',
          linkUrl: '/pages/the-squatch-difference-natural-ingredients'
        %}
      </div>

      <div 
        v-if="selectedTab != 'nontoxic'"
        class="cardbox-wrapper"
      >
        {% include 'UI-cardbox',
          title: 'No Harmful Ingredients',
          text: 'We never use the harmful ingredients or harsh chemicals often used by traditional brands. In fact, we have a full roster of no-go ingredients that we call <b>The Sh*T List.</b>',
          iconSrc: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-logo-nontoxic.svg?v=1618877407',
          linkUrl: '/pages/the-squatch-difference-no-toxic-ingredients'
        %}
      </div>

      {% if selectedTab != 'men' %}
      <div 
        v-if="selectedTab != 'men'"
        class="cardbox-wrapper"
      >
        {% include 'UI-cardbox',
          heading: 'Formulated For Men',
          text: "Men have special needs. That's why we formulate products for men through performance, scent and avoidance of estrogenics (estro-what?)",
          iconSrc: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-logo-male.svg?v=1618877407',
          linkUrl: '/pages/the-squatch-difference-for-men'
        %}
      </div> -->
    </div>
  </div>
</template>

<script>
import DifferenceCardbox from "@/vue/ui-elements/UI-cardbox"

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
