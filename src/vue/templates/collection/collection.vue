<template>
  <div class="collection-component">
    <jumbotron
      v-if="jumbotronConfig"
      :video-id="jumbotronConfig.videoId"
      :image-src="jumbotronConfig.imageSrc"
      :pre-header="jumbotronConfig.preHeader"
      :header="jumbotronConfig.header"
      :body-text="jumbotronConfig.bodyText"
      :cta-button="jumbotronConfig.ctaButton"
    />
    <div
      v-else
      class="default-jumbotron"
    >
      <h1>Our Products</h1>
      <p>
        Handmade, natural products to tame your inner Squatch.
      </p>
    </div>
    <div class="content-container">
      <collection-nav />
      <slot name="collection-content" />
    </div>
  </div>
</template>

<script>
import Jumbotron from "@/vue/reusables/jumbotron";
import CollectionNav from "./reusables/collection-nav.vue";
// import StoreService from "@/vue/services/store.service";
import JumbotronConfigs from "@/configs/collection-jumbotron";

export default {
  name: "CollectionBaseTemplate",
  components: {
    Jumbotron,
    CollectionNav
  },
  props: {
    handle: {
      type: String,
      required: false,
      default: ""
    },
  },
  data() {
    return {
    };
  },
  computed: {
    jumbotronConfig() {
      const match = JumbotronConfigs[this.handle];
      if (match) {
        return {
          videoId: match.videoId,
          preHeader: match.preHeader,
          header: match.header,
          bodyText: match.bodyText,
          ctaButton: match.ctaButton
        };
      }
      return {
        videoId: "",
        preHeader: "",
        header: "",
        bodyText: "",
        ctaButton: {
          text: "",
          path: ""
        }
      };
    }
  },
  async mounted() {
    console.log("collection-base");
  }
};
</script>
<style scoped lang="scss">
@use "@/styles/main" as global;

.collection-component {

  .content-container {
    max-width: 1600px;
    margin:auto;
    display: flex;
    h1 {
      margin-bottom: 14px;
      @include global.font-style-heading($size: 32px, $color: global.$white);
    }
  
    p {
      margin-bottom: 0;
      @include global.font-style-body($color: global.$white);
    }
  
    .default-jumbotron {
      background-image: url("https://cdn.shopify.com/s/files/1/0275/7784/3817/files/dsq-woodgrain_texture-DARK.svg?v=1616535182");
      background-size: 200%;
      background-repeat: repeat;
      background-color: global.$dark-brown;
      padding: 42px 0;
      text-align: center;
    }
  }
}
</style>