<template>
  <div class="index-starter-bundle">
    <image-section
      preheader="Bundle & Save"
      header="Starter Bundles"
      subheader="New to Squatch? Your choice of our curated best sellers"
      image-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Bundles_home-2.jpg?v=1616626929"
      :reversed="true"
      cta="Shop Now"
      path="/pages/bundle-offers"
    />
  </div>
</template>

<script>
import ImageSection from "@vue/ui-elements/image-section";
export default {
  name: "IndexBundle",
  components: {
    ImageSection,
  }
};
</script>