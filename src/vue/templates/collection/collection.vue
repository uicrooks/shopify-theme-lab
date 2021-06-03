<template>
  <div class="collection-component">
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
import HaircareCollectionContent from "@/vue/templates/collection/haircare-collection-content";
import JumbotronConfigs from "@/configs/collection-jumbotron";

export default {
  name: "Collection",
  components: {
    HaircareCollectionContent
  },
  props: {
    handle: {
      type: String,
      required: false,
      default: ""
    },
    productsData: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      collection: {},
      products: []
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
    },
    
  },
  async mounted() {
    this.products = JSON.parse(this.productsData);
    console.log(this.products);
// const result = await StoreService.getCollectionById(this.id);
    // console.log(result);
    // this.collection = result;
    // this.products = result.products;
    // console.log(this.products);
  }
};
</script>