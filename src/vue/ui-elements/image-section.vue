<template>
  <div>
    <div class="banner-display row-element outer-row">
      <div 
        class="banner-content" 
        :class="reversed ? 'reversed' : ''"
      >
        <div 
          class="banner-text" 
          :class="reversed ? 'reversed' : ''"
        >
          <div class="image-mobile">
            <img 
              v-if="imageSrc" 
              :src="imageSrc"
            >
          </div>
          <div 
            class="brand-content" 
            :class="reversed ? 'reversed' : ''"
          >
            <p class="preheader">
              {{ preheader }}
            </p>
            <h1 class="header">
              {{ header }}
            </h1>
            <p 
              v-if="subheader" 
              class="subheader"
            >
              {{ subheader }}
            </p>
            <div 
              v-if="path" 
              class="cta-wrapper"
            >
              <squatch-button
                v-if="cta"
                class="big-cta-button"
                :text="cta"
                :path="path"
              />
              <a 
                v-else 
                class="link" 
                :href="path"
              >
                Learn More
              </a>
            </div> 
          </div>
        </div>
      </div>

      <div 
        class="banner-image banner-desktop" 
        :class="reversed ? 'desktop-image reversed' : 'desktop-image'"
      >
        <img 
          v-if="imageSrc" 
          class="desktop-image" 
          :src="imageSrc"
        >
        <!-- <div class="wistia_embed wistia_async_1sri3k4jg1 seo=false videoFoam=true" allowtransparency="true" style="height:100%;width:100%"  v-if="videoId" >
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import SquatchButton from "@vue/ui-elements/squatch-button";

export default {
  components: {
    SquatchButton,
  },
  props: {
    preheader: {
      type: String, 
      required: false,
      default: "",
    },
    header: {
      type: String,
      required: true,
      default: "",
    },
    subheader: {
      type: String,
      required: false,
      default: "",
    },
    imageSrc: {
      type: String,
      required: false,
      default: "",
    },
    videoId: {
      type: String, 
      required: false,
      default: "",
    },
    path: {
      type: String,
      required: false,
      default: "",
    },
    cta: {
      type: String,
      required: false,
      default: "",
    },
    reversed: {
      type: Boolean,
      required: true,
      default: true,
    }
  },
  methods: {
    navigateTo() {
      console.log("navigateTo");
      if (this.path) {
        window.location = this.path;
      }
    }
  },
}
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.image-mobile {
  @media(min-width:$md) {
    display: none;
  }

  img {
    width: 100%;
  }
}

.big-cta-button {
  width: 256px;
}

.preheader {
  margin-bottom: 15px;
  font-size: 16px;
  color: #1a110c;
}
.subheader {
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 20px;
}

.banner-desktop {
  padding: 60px 0px 60px 15px;

  &.reversed {
    padding: 60px 15px 60px 0;
  }

  @media(max-width:767px) {
    display: none;
  }
}
.banner-display {
    max-width:1440px;
    width:100%;
    margin:auto;
}
.outer-row {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    margin-bottom: 30px;

    @media(max-width:767px) {
      flex-direction: column;
    }

    .brand-content {
      padding: 15px;
      
      &.reversed {
        width: 100%;
      }
      @media(min-width: $md) {
        padding: 0 15px;
      }
    }
    .banner-image{
        flex: 0 0 100%;
        max-width: 100%;
        @media(min-width: $md) {
          flex: 0 0 50%;
          max-width: 50%;
        }

      .desktop-image {
        width: 100%;
      }
    }
    .banner-content {
        flex: 0 0 100%;
        max-width: 100%;
        padding: 0;

        &.reversed {
          @media(min-width: $md) {
            padding: 0 0 0 15px !important; 
            order:2 !important;
          }
        }

        @media(min-width: $md) {
          flex: 0 0 50%;
          max-width: 50%;
          padding-right: 15px;
        }
      
      .banner-text {
        display:flex; 
        align-items:center;
        height:100%;
        flex-direction: column;
        justify-content: center;
        padding: 0;
        text-align: center;

        @media(min-width:$md) {
          padding-right: 2.5rem;
          text-align: initial;
        }

        .cta-wrapper {
          display: flex;
          justify-content: center;

          @media(min-width: $md) {
            justify-content: initial;
          }
        }

        &.reversed{
          @media(min-width: $md) {
            padding: 0 0 0 2.5rem;
          }
        }

      }
    }
}

</style>