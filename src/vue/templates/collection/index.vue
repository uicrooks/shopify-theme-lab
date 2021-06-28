<template>
  <div class="collection-component">
    <new-look-banner
      :handle="handle"
    />
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

    <collection-best-sellers-content
      v-if="handle === 'collection-page-best-sellers'"
      :products="products"
    />
    <collection-haircare-content
      v-else-if="handle === 'hair-care'"
      :products="products"
    />
    <collection-default-content
      v-else
      :products="products"
    />
  </div>
</template>

<script>
import JumbotronConfigs from "@/configs/collection-jumbotron";

export default {
  name: "Collection",
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
      return match ? match : null;
    },
    
  },
  async mounted() {
    console.log("collection component, handle:", this.handle);
    this.products = JSON.parse(this.productsData);
    console.log(this.products);
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.collection-component {

  h1 {
    margin-bottom: 14px;
    @include font-style-heading($size: 32px, $color: $white);
  }

  p {
    margin-bottom: 0;
    @include font-style-body($color: $white);
  }

  .default-jumbotron {
    background-image: url("https://cdn.shopify.com/s/files/1/0275/7784/3817/files/dsq-woodgrain_texture-DARK.svg?v=1616535182");
    background-size: 200%;
    background-repeat: repeat;
    background-color: $dark-brown;
    padding: 42px 0;
    text-align: center;
  }
}
</style>