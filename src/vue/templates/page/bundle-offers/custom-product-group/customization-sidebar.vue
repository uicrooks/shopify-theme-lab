<template>
  <div
    v-if="product.title"
    class="custom-product-group-customization-sidebar-component"
  >
    <b-icon
      class="hidden-icon"
      aria-controls="customization-sidebar"
      :aria-expanded="isSidebarOpen"
      icon="cart"
    />
    <b-sidebar
      id="customization-sidebar"
      v-model="isSidebarOpen"
      title="Sidebar"
      header-class="sidebar-header"
      body-class="sidebar-body"
      footer-class="sidebar-footer"
      sidebar-class="sidebar-drawer"
      :lazy="true"
      right
      shadow
      backdrop
      @hidden="$emit('close')"
    >
      <template #header>
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
        <b-icon
          icon="x"
          font-scale="1.5"
          @click="$emit('close')"
        />
      </template>
      <div
        class="header-box"
      >
        <img
          :src="selectedVariant.featured_image.src"
          :alt="`${selectedVariant.title} image`"
        >
        <h2>{{ product.title.split(" ")[0] }}</h2>
        <p>{{ getVariantName(selectedVariant) }}</p>
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
      <div
        v-if="product.variants"
        class="variants-box"
      >
        <h3>Choose Your Scent Profile:</h3>
        <div class="variants">
          <div
            v-for="(variant, index) of product.variants"
            :key="`variant-${index}`"
            class="variant"
            @click="selectedVariantIndex = index"
          >
            <div
              :class="{'selected': selectedVariantIndex === index}"
              class="variant-icon"
            >
              Icon
            </div>
            <span>{{ getVariantName(variant) }}</span>
          </div>
        </div>
        <h4>See what's included!</h4>
      </div>
      <div class="included-box">
        <h3>What's Inside</h3>
        <div
          v-for="(category, categoryIndex) of includedListCategories"
          :key="`category-${categoryIndex}`"
          class="included-category"
        >
          <h4>{{ category }}</h4>
          <custom-product-group-included-list
            v-for="(variant, variantIndex) of product.variants"
            :key="`variant-${variantIndex}`"
            :product-handles="getIncludedListForCategory(variant, category)"
            :hidden="variantIndex !== selectedVariantIndex"
          />
        </div>
      </div>
      <template #footer>
        <squatch-button
          class="finish-button"
          @clicked="checkout"
        >
          Finish
        </squatch-button>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import CartService from "@/vue/services/cart.service";
import IncludedList from "@/configs/product-group-card-included-list";
import {money} from "@/vue/filters/money";

export default {
  name: "CustomProductGroupCustomizationSidebar",
  filters: {
    money
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: false
    },
    product: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      selectedVariantIndex: 0,
      includedListByVariant: IncludedList["starter-bundles-variants"]
    };
  },
  computed: {
    isSidebarOpen: {
      get() {
        return this.isOpen;
      },
      set(val) {
        return val;
      }
    },
    isFreeShipping() {
      return this.product.price >= 3900;
    },
    // TODO: add new label
    isNew() {
      return this.product.tags.includes("new");
    },
    discountAmount() {
      return this.product.compare_at_price - this.product.price;
    },
    selectedVariant() {
      return this.product.variants ? this.product.variants[this.selectedVariantIndex] : null;
    },
    includedListCategories() {
      return this.product.handle ? IncludedList[this.product.handle] : [];
    },
    starterBundlesVariants() {
      return this.$store.state.products.starterBundlesVariants;
    }
  },
  methods: {
    getVariantName(variant) {
      return variant.option1;
    },
    getIncludedListForCategory(variant, category) {
      const variantName = this.getVariantName(variant);
      if (!category || !variantName) {
        return [];
      }
      return this.includedListByVariant[variantName.toLowerCase()][category];
    },
    async checkout() {
      const added = await CartService.addItem(this.product);
      if (added) {
        this.added = true;
        const cart = await CartService.initCart();
        if (cart) {
          this.$store.commit("cart/setCart", cart);
          this.$emit("close");
          CartService.redirectToCheckout();
        } else {
          // error handling
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/styles/main" as global;

.custom-product-group-customization-sidebar-component {
  
  .hidden-icon {
    display: none;
  }

  .discount {
    margin-right: 7px;
    padding: 5px 10px;
    background-color: global.$maroon;
    @include global.font-style-body($size: 12px, $weight: 600, $color: $white);
  }

  .free-shipping {
    padding: 5px 10px;
    background-color: global.$orange;
    @include global.font-style-body($size: 12px, $weight: 600, $color: global.$white);
  }

  .header-box {
    background-image: url(https://cdn.shopify.com/s/files/1/0275/7784/3817/files/woodgrain-default.svg?v=1615322353);
    background-size: 200%;
    background-repeat: repeat;
    background-color: global.$sand;
    padding: 15px 20px;
    text-align: center;

    img {
      width: 88%;
      max-width: 350px;
    }

    h2 {
      margin: 13px 0 17px;
      @include global.font-style-heading($size: 25px);

      @include global.layout-md {
        font-size: 30px;
      }

      @include global.layout-lg {
        font-size: 40px;
      }
    }

    p {
      @include global.font-style-body($size: 20px, $color: global.$brown, $weight: 600);
    }

    .product-pricing {
      @include global.font-style-body($size: 20px, $weight: 600, $color: global.$green);

      .compare-at-pricing {
        text-decoration: line-through;
        @include global.font-style-body($size: 20px, $color: #afafaf);
      }
    }
  }

  .variants-box {
    position: sticky;
    top: -5px;
    padding: 15px 20px;
    box-shadow: rgb(212 212 212) 0px 4px 8px -2px;
    background-color: global.$white;

    h3 {
      margin-left: 9px;
      @include global.font-style-body($size: 16px, $color: global.$brown);
    }

    .variants {
      display: flex;
      flex-flow: row nowrap;
      margin: 15px 0 20px;

      .variant {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        text-align: center;
        width: 65px;

        .variant-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background-color: global.$off-white;
          font-size: 20px;
          cursor: pointer;

          &.selected {
            background-color: global.$orange;
          }
        }

        span {
          margin-top: 6px;
          @include global.font-style-body($color: global.$brown);
        }
      }
    }

    h4 {
      margin: 0 0 0 6px;
      cursor: pointer;
      @include global.font-style-body($size: 14px, $weight: 600, $color: global.$orange);
    }
  }

  .included-box {
    padding: 25px 25px 5px 25px;

    h3 {
      margin-bottom: 15px;
      @include global.font-style-heading();
    }

    .included-category {
      margin-bottom: 20px;

      h4 {
        padding-bottom: 9px;
        border-bottom: 1px solid global.$off-white;
        margin-bottom: 15px;
        @include global.font-style-body($size: 16px, $color: global.$brown);
      }
    }

  }

  .finish-button {
    text-transform: uppercase;
    @include global.font-style-heading($size: 14px, $weight: 400, $color: global.$white);
  }
}
</style>

<style lang="scss">
@use "@/styles/main" as global;

.sidebar-drawer {
  width: 90%;
  max-width: 500px;
  margin-right: 15px;
}

.sidebar-header, .sidebar-body {
  background-color: global.$white;
}

.sidebar-footer {
  background-color: global.$white;
  padding: 10px;
}
</style>