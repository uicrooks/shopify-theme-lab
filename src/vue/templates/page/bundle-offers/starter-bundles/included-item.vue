<template>
  <div
    class="included-product"
  >
    <template v-if="!product.title">
      <div class="image-box" />
      <div class="details-box">
        <h3>Loading</h3>
        <p>Loading</p>
      </div>
    </template>
    <template v-else-if="product.title=='Soap Saver' && subPurchase">
      <p style="color:#40a040;font-weight:700;width:100%;" v-if="selectedLvl != 'Clean'">{{selectedLvl == "Groomed" ? "67% OFF" : "FREE"}} Soap Saver, sent with your first shipment!<br />Discount code applied at checkout.</p>
      <p v-else style="color:#40a040;font-weight:700;width:100%;">Only sent with your first shipment!</p>
      <div class="image-box">
        <img
          :src="getProductImage(product)"
          :alt="`${product.title} image`"
        >
      </div>
      <div class="details-box">
        <h3>{{ product.title }}</h3>
        <p>{{ product.description }}</p>
      </div>
    </template>
    <template v-else>
      <div class="image-box">
        <img
          :src="getProductImage(product)"
          :alt="`${product.title} image`"
        >
      </div>
      <div class="details-box">
        <h3>{{ product.title }}</h3>
        <p>{{ product.description }}</p>
      </div>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "IncludedItem",
  props: {
    handle: {required: true, type: String},
    subPurchase: {required: true, type: Boolean},
    selectedLvl: {required: true, type: String}
  },
  data() {
    return {
      product: {}
    };
  },
  methods: {
    getProductImage(product) {
      return product.images[0].src;
    }
  },
  async created() {
    this.product = await this.$store.dispatch("starterBundles/fetchProduct", this.handle);
  }
};
</script>
<style lang="scss" scoped>
@use "@/styles/main" as global;
.included-product {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    padding: 13px 0;
    
    .image-box {
      min-width: 60px;
      max-width: 70px;
      flex: 1;
      text-align: center;

      img {
        width: 100%;
        object-fit: contain;
      }
    }

    .details-box {
      flex: 3;
      padding-left: 20px;

      h3 {
        @include global.font-style-heading($size: 14px);
      }

      p {
        @include global.font-style-body($lh: 16px, $color: global.$brown);
      }
    }
  }
</style>