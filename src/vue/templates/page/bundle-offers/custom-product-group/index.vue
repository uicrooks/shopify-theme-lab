<template>
  <div
    class="customizable-product-group-card-component"
    :class="{'selected': selected}"
    @click="$emit('selectStarterBundle', product.handle)"
  >
    <div class="image-box">
      <div class="banners">
        <span
          v-if="discountAmount"
          class="discount"
        >
          {{ discountAmount | money("$", 0) }} Off
        </span>
        <span
          v-if="isFreeShipping"
          class="free-shipping"
        >
          Free Shipping!
        </span>
      </div>
      <img
        :src="product.featured_image"
        :alt="`${product.title} image`"
      >
    </div>
    <div class="details-box">
      <div class="product-preheader">
        <span
          v-if="discountAmount"
          class="discount"
        >
          {{ discountAmount | money("$", 0) }} Off
        </span>
        <span
          v-if="isFreeShipping"
          class="free-shipping"
        >
          Free Shipping!
        </span>
      </div>
      <div class="product-header">
        <h4>{{ product.title.split(" ")[0] }}</h4>
        <div class="product-pricing">
          {{ product.price | money("$", 0) }}
          <span
            v-if="product.compare_at_price"
            class="compare-at-pricing"
          >
            {{ product.compare_at_price | money("$", 0) }}
          </span>
        </div>
      </div>
      <p class="product-description">
        {{ includedList.join(", ") }}
      </p>
      <squatch-button
        v-if="selected"
        @clicked="$emit('openScentSelection')"
      >
        Select Scents
      </squatch-button>
    </div>
  </div>
</template>

<script>
import SquatchButton from "@/vue/reusables/squatch-button.vue";
import IncludedList from "@/configs/product-group-card-included-list";
import {money} from "@/vue/filters/money";

export default {
  name: "CustomProductGroupCard",
  components: {
    SquatchButton
  },
  filters: {
    money
  },
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    },
    selected: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      includedList: IncludedList[this.product.handle]
    };
  },
  computed: {
    isFreeShipping() {
      return this.product.price >= 3900;
    },
    // TODO: add new label
    isNew() {
      return this.product.tags.includes("new");
    },
    discountAmount() {
      return this.product.compare_at_price - this.product.price;
    }
  },
  methods: {
    openScentSelection() {
      console.log("selec scents");
      this.scentSelectionFlag = true;
    }
  }
};
</script>

<style scoped lang="scss">
@use "@/styles/main" as global;

.customizable-product-group-card-component {
  display: flex;
  flex-flow: row wrap;
  border: 2px solid rgba(53, 46, 46, .125);
  border-radius: 4px;
  box-shadow: 0 .5rem 1rem rgba(26, 17, 12, .15);
  cursor: pointer;

  &.selected {
    border: 2px solid global.$orange;
  }

  .image-box {
    position: relative;
    width: 40%;
    padding: 10px 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-image: url(https://cdn.shopify.com/s/files/1/0275/7784/3817/files/woodgrain-default.svg?v=1615322353);
    background-size: 200%;
    background-repeat: repeat;
    background-color: global.$sand;
    text-align: center;

    @include global.layout-md {
      width: 100%;
    }

    .banners {
      display: none;
      position: absolute;
      left: 0;
      top: 15px;

      @include global.layout-md {
        display: inline-block;
      }

      .discount {
        margin-right: 7px;
        padding: 5px 10px;
        background-color: global.$maroon;
        @include global.font-style-body($size: 12px, $weight: 600, $color: global.$white);
      }

      .free-shipping {
        padding: 5px 10px;
        background-color: global.$orange;
        @include global.font-style-body($size: 12px, $weight: 600, $color: global.$white);
      }
    }

    img {
      max-width: 120px;
      width: 100%;
      height: auto;

      @include global.layout-md {
        max-width: unset;
        object-fit: contain; 
      }
    }
  }

  .details-box {
    width: 60%;
    padding: 10px 12px 15px 12px;

    @include global.layout-md {
      width: 100%;
      padding: 15px;
      text-align: center;
    }

    .product-preheader {
      margin-bottom: 12px;

      @include global.layout-md {
        display: none;
      }

      .discount {
        margin-right: 7px;
        padding: 5px 10px;
        background-color: global.$maroon;
        @include global.font-style-body($size: 12px, $weight: 600, $color: global.$white);
      }

      .free-shipping {
        padding: 5px 10px;
        background-color: global.$orange;
        @include global.font-style-body($size: 12px, $weight: 600, $color: global.$white);
      }
    }

    .product-header {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      margin-bottom: 10px;

      h4 {
        margin: 0 5px 0 0;
        @include global.font-style-heading($size: 21px);

        @include global.layout-md {
          margin: 0 0 8px 0;
          width: 100%;
        }
      }

      .product-pricing {
        @include global.font-style-body($weight: 800, $color: global.$green);

        @include global.layout-md {
          width: 100%;
          @include global.font-style-body($size: 16px, $weight: 800, $color: global.$green);
        }

        .compare-at-pricing {
          text-decoration: line-through;
          @include global.font-style-body($size: 12px, $color: #afafaf, $weight: 500);

          @include global.layout-md {
            @include global.font-style-body($size: 16px, $color: #afafaf);
          }
        }
      }
    }

    .product-description {
      margin-bottom: 10px;
      @include global.font-style-body($lh: 17px, $color: global.$brown);

      @include global.layout-md {
        margin-bottom: 20px;
      }
    }
  }
}

</style>