<template>
  <div class="jumbotron-component">
    <div class="jumbotron-content">
<div class="left-col">
      <div
        v-if="videoId"
        :class="`wistia_embed wistia_async_${videoId} seo=false videoFoam=true`"
        allowtransparency="true"
        style="height:100%;width:100%"
      />
      <img
        v-else
        :src="imageSrc"
        :alt="`${header} image`"
        class="image"
      >
    </div>
    <div class="right-col">
      <div
        v-if="preHeader"
        class="pre-header"
      >
        {{ preHeader }}
      </div>
      <div class="header">
        {{ header }}
      </div>
      <p
        v-if="bodyText"
        class="body-text"
      >
        {{ bodyText }}
      </p>
      <squatch-button
        v-if="ctaButton.text && ctaButton.path"
        :path="ctaButton.path"
      >
        {{ ctaButton.text }}
      </squatch-button>
    </div>
  </div>
    </div>
</template>

<script>
import SquatchButton from "@/vue/reusables/squatch-button.vue";
export default {
  name: "Jumbotron",
  components: {
    SquatchButton
  },
  props: {
    videoId: {
      type: String,
      required: false,
      default: ""
    },
    imageSrc: {
      type: String,
      required: false,
      default: ""
    },
    header: {
      type: String,
      required: true
    },
    preHeader: {
      type: String,
      default: ""
    },
    bodyText: {
      type: String,
      default: ""
    },
    ctaButton: {
      type: Object,
      default: () => {
        return {
          text: "",
          path: ""
        };
      }
    }
  }
};
</script>

<style scoped lang="scss">
@use "@/styles/main" as global;
.jumbotron-content {
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
}

.jumbotron-component {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  background-color: global.$dark-brown;
  background-image: url("https://cdn.shopify.com/s/files/1/0275/7784/3817/files/dsq-woodgrain_texture-DARK.svg?v=1616535182");
  background-size: 200%;
  background-repeat: repeat;
  text-align: center;
  padding: 42px 0;

  .left-col {
    @include global.layout-md {
      text-align: right;
    }
  }
  
  .left-col, .right-col {
    width: 100%;
    padding: 0 15px;

    @include global.layout-md {
      width: unset;
      flex: 1;
      justify-content: space-around;
    }

    .image {
      width: auto;
      max-height: 180px;
      margin-bottom: 30px;

      @include global.layout-md {
        max-height: 220px;
        margin-bottom: 0;
      }
    }

    .pre-header {
      margin-bottom: 15px;
      @include global.font-style-body($size: 16px, $color: global.$white);
    }

    .header {
      margin-bottom: 30px;
      @include global.font-style-heading($size: 28px, $color: global.$white);
    }

    .body-text {
      margin-bottom: 30px;
      @include global.font-style-body($size: 16px, $color: global.$white, $lh: 20px);
    }
  }

  .right-col {
    padding: 0 30px;
  }
}
</style>