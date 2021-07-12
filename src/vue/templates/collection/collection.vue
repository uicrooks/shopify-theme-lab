<template>
  <div class="collection-component">
    collection component!
    <jumbotron
      :video-id="jumbotronConfig.videoId"
      :pre-header="jumbotronConfig.preHeader"
      :header="jumbotronConfig.header"
      :body-text="jumbotronConfig.bodyText"
      :cta-button="jumbotronConfig.ctaButton"
    />
    <haircare-collection-content
      v-if="handle === 'hair-care'"
      :products="products"
    />
  </div>
</template>

<script>
import Jumbotron from "@/vue/reusables/jumbotron";
// import HaircareCollectionContent from "@/vue/templates/collection/haircare-collection-content";
// import StoreService from "@/vue/services/store.service";
import JumbotronConfigs from "@/configs/collection-jumbotron";

export default {
  name: "Collection",
  components: {
    Jumbotron,
    HaircareCollectionContent
  },
  props: {
    handle: {
      type: String,
      required: false,
      default: ""
    },
    col: {
      type: Object,
      required: true
    },
    cart: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      collection: {},
      products: []
    }
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
        }
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
      }
    }
  },
  async mounted() {
    // console.log(`collection id: ${this.id}, handle: ${this.handle}`);
    console.log(this.col);
// const result = await StoreService.getCollectionById(this.id);
    // console.log(result);
    // this.collection = result;
    // this.products = result.products;
    // console.log(this.products);
  }
};
</script>