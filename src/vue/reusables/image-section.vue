<template>
  <div class="image-section-component">
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
                :path="path"
              >
                {{ cta }}
              </squatch-button>
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
import SquatchButton from "@/vue/reusables/squatch-button.vue";
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
    },
  },
  methods: {
    navigateTo() {
      if (this.path) {
        window.location = this.path;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@use "@/styles/main" as global;

.image-mobile {
  @include global.layout-md {
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
  margin: 0 0 15px 0;
  @include global.font-style-body($size: 16px);
}

.header {
  @include global.font-style-heading($size: calc(1.12188rem + 3.0875vw));
}

.subheader {
  font-weight: 600;
  margin: 0 0 20px 0;
  @include global.font-style-body-bold($size: 20px);
}

.banner-desktop {
  padding: 60px 0px 60px 15px;

  &.reversed {
    padding: 60px 15px 60px 0;
  }

  @media (max-width: 767px) {
    display: none;
  }
}
.banner-display {
  max-width: 1440px;
  width: 100%;
  margin: auto;
}
.outer-row {
  display: flex;
  flex-wrap: wrap;
  margin: 30px auto;

  @media (max-width: 767px) {
    flex-direction: column;
  }

  @include layout-md { 
    margin: auto;
  }

  .brand-content {
    padding: 15px;

    &.reversed {
      width: 100%;
    }
    @include global.layout-md {
      padding: 0 15px;
    }
  }
  .banner-image {
    flex: 0 0 100%;
    max-width: 100%;

    @include global.layout-md {
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
      @include global.layout-md {
        padding: 0 0 0 15px !important;
        order: 2 !important;
      }
    }

    @include global.layout-md {
      flex: 0 0 50%;
      max-width: 50%;
      padding-right: 15px;
    }

    .banner-text {
      display: flex;
      align-items: center;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      padding: 0;
      text-align: center;

      @include global.layout-md {
        padding-right: 2.5rem;
        text-align: initial;
      }

      .cta-wrapper {
        display: flex;
        justify-content: center;

        @include global.layout-md {
          justify-content: initial;
        }
      }

      &.reversed {
        @include global.layout-md {
          padding: 0 0 0 2.5rem;
        }
      }
    }
  }
}
</style>