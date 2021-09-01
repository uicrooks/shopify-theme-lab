<template>
  <div class="hero-display-component">
    <div class="inner-wrapper">
      <div :class="reversed ? 'content-box reversed' : 'content-box'">
        <div 
          v-if="!subBelow"
          class="sub-header"
          v-html="subHeader" 
          :class="{ blackText : textBlack}"
        />

        <div 
          class="header"
          v-html="header"
          :class="{ blackText : textBlack}"
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
          <div 
            class="text-heading"
            :class="{ blackText : textBlack}"
          >
            {{ textHeading }}
          </div>
          <span 
            class="text"
            :class="{ blackText : textBlack}"
          >
            <slot />
          </span>
        </div>

        <div 
          v-if="subBelow"
          class="sub-header"
          v-html="subHeader"
          :class="{ blackText : textBlack}"
        />

        <div 
          v-if="ctaPath"
          class="cta-wrapper"
        >
          <squatch-button
            v-if="ctaText"
            :path="ctaPath"
          >
            {{ ctaText }}
          </squatch-button>

          <squatch-button
            v-else
            path="/pages/about-us"
          >
            Learn more
          </squatch-button>
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
import SquatchButton from "@/vue/reusables/squatch-button";

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
    },
    textBlack: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.hero-display-component {
  width: 100%;
  
  .inner-wrapper {
    padding: 30px 0;
    margin: auto;
  
    @include layout-md {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    @include layout-lg {
      max-width: 979px;
    }

    @include layout-xl {
      max-width: 1200px;
    }
  }

  .blackText {
    color: black !important;
  }

  .content-box {


    &.reversed {
      @include layout-md {
        order: 2;
        padding: 0 0 0 15px;
      }
    }

    @include layout-md {
      width: 50%;
      margin: 0 10px;
    }

    .sub-header {
      line-height: 130%;
      padding: 0 18px;
      @include font-style-body-bold($size: 14px, $weight: 700, $color: white);

      @include layout-md {
        font-size: 16px;
        line-height: 110%;
      }
    }
  
    .header {
      margin: 12px 0 17px 0;
      padding: 0 0 0 18px;
      @include font-style-heading($size: 30px, $color: white);
      line-height: 100%;

      @include layout-md {
        font-size: 40px !important;
      }

      @include layout-lg {
        font-size: 50px !important;
      }
    }
    
    .image-mobile {
      padding: 0 20px;
      width: 100%;

      @include layout-md {
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
        @include font-style-body-bold($color: white);
        margin-bottom: 10px;

        @include layout-xl {
          font-size: 18px;
          line-height: 100%;
        }
      }

      .text {
        @include font-style-body($size: 14px, $color: white);
        line-height: 130%;

        @include layout-xl {
          font-size: 15px;
        }

        @include layout-xl {
          font-size: 16px;
        }
      }
    }

    .cta-wrapper {
      margin: 30px 0 0 0;
      text-align: center;
      display: flex;
      justify-content: center;
  
      @include layout-md {
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
        @include font-style-heading($size: 14px, $color: white);
        line-height: 17px;
        text-align: center;

        @include layout-md {
          width: 70%;
        }
      }
    }
  
  }

  .image-tablet {
    display: none;

    &.reversed {
      @include layout-md {
        order: 1;
      }
    }

    img {
      width: 100%;
    }

    @include layout-md {
      display: inline-block;
      width: 50%;
    }

  }
}
</style>