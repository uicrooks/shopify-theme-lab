<template>
  <div class="hero-display-component">
    <div class="inner-wrapper">
      <div :class="reversed ? 'content-box reversed' : 'content-box'">
        <div 
          v-if="!subBelow"
          class="sub-header"
          v-html="subHeader" 
        />

        <div 
          class="header"
          v-html="header"
        />

        <div class="image-mobile">
          <img 
            v-if="imageSrc"
            :src="imageSrc"
          >
          <!-- <div 
            v-else-if="videoId"
            class="wistia_embed wistia_async_{{ videoId }} seo=false videoFoam=true" allowtransparency="true" style="height:100%;width:100%"
          >
          </div> -->
        </div>
        <div 
          class="text-container"
        >
          <div class="text-heading">
            {{ textHeading }}
          </div>
          <span class="text">
            <slot/>
          </span>
        </div>

        <div 
          v-if="subBelow"
          class="sub-header"
          v-html="subHeader"
        />

        <div 
          v-if="ctaPath"
          class="cta-wrapper"
        >
          <squatch-button
            :text="ctaText ? ctaText : 'Learn more'"
            path="/pages/about-us"
          />
        </div>

      </div>
      <div :class="reversed ? 'image-tablet reversed' : 'image-tablet'">
        <img 
          v-if="imageSrc"
          :src="imageSrc"
        >
          <!-- <div 
            v-else-if="videoId"
            class="wistia_embed wistia_async_{{ videoId }} seo=false videoFoam=true" allowtransparency="true" style="height:100%;width:100%">
          </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import SquatchButton from "@/vue/ui-elements/squatch-button";

export default {
  name: "HeroDisplay",
  components: {
    SquatchButton
  },
  props: {
    reversed: {
      type: Boolean,
      required: true
    },
    subBelow: {
      type: Boolean,
      required: false,
      default: false
    },
    subHeader: {
      type: String,
      required: false,
      default: ""
    },
    header: {
      type: String,
      required: false,
      default: ""
    },
    imageSrc: {
      type: String,
      required: false,
      default: ""
    },
    videoId: {
      type: String,
      required: false,
      default: ""
    },
    textHeading: {
      type: String,
      required: false,
      default: ""
    },
    text: {
      type: String,
      required: false,
      default: ""
    },
    ctaPath: {
      type: String,
      required: false,
      default: ""
    },
    ctaText: {
      type: String,
      required: false,
      default: ""  
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.hero-display-component {
  width: 100%;
  
  .inner-wrapper {
    padding: 30px 0;
    margin: auto;
  
    @media (min-width: $md) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    @media (min-width: $lg) {
      max-width: 979px;
    }

    @media (min-width: $xl) {
      max-width: 1200px;
    }
  }

  .content-box {


    &.reversed {
      @media (min-width: $md) {
        order: 2;
        padding: 0 0 0 15px;
      }
    }

    @media (min-width: $md) {
      width: 50%;
      margin: 0 10px;
    }

    .sub-header {
      font-size: 14px;
      line-height: 130%;
      font-weight: 700;
      padding: 0 18px;

      @media (min-width: $md) {
        font-size: 16px;
        line-height: 110%;
      }
    }
  
    .header {
      margin: 12px 0 17px 0;
      padding: 0 0 0 18px;
      font-family: $font-heading;
      font-size: 30px;
      line-height: 100%;

      @media (min-width: $md) {
        font-size: 40px !important;
      }

      @media(min-width: $lg) {
        font-size: 50px !important;
      }
    }
    
    .image-mobile {
      padding: 0 20px;
      width: 100%;

      @media (min-width: $md) {
        display: none;
      }

      img {
        width: 100%;
      }
    }

    .text-container {
      padding: 0 18px;
      margin: 20px 0 10px 0;

      
      .text-heading {
        @include font-style-body-bold;
        margin-bottom: 10px;

        @media (min-width: $xl) {
          font-size: 18px;
          line-height: 100%;
        }
      }

      .text {
        font-family: $font-body;
        font-size: 14px;
        line-height: 130%;

        @media (min-width: $xl) {
          font-size: 15px;
        }

        @media (min-width: $xl) {
          font-size: 16px;
        }
      }
    }

    .cta-wrapper {
      margin: 30px 0 0 0;
      text-align: center;
      display: flex;
      justify-content: center;
  
      @media (min-width: $md) {
        text-align: left;
        padding: 0 18px;
        justify-content: flex-start;
      }
   
      .link {
        display: inline-block;
        width: 80%;
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
        }
      }
    }
  
  }

  .image-tablet {
    display: none;

    &.reversed {
      @media (min-width: $md) {
        order: 1;
      }
    }

    img {
      width: 100%;
    }

    @media (min-width: $md) {
      display: inline-block;
      width: 50%;
    }

  }
}
</style>