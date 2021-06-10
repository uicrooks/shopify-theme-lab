<template>
  <div
    v-if="product.title"
    class="product-customization-sidebar-component"
  >
    <b-icon
      class="hidden-icon"
      aria-controls="product-customization-sidebar"
      :aria-expanded="isSidebarOpen"
      icon="cart"
    />
    <b-sidebar
      id="product-customization-sidebar"
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
        <p>{{ selectedVariant.option1 }}</p>
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
            <span>{{ variant.option1 }}</span>
          </div>
        </div>
        <h4>See what's included!</h4>
      </div>
      <div class="included-box">
        <h3>What's Inside</h3>
        <div
          v-for="(category, categoryIndex) of includedListCategories"
          :key="`varint-${selectedVariantIndex}-category-${categoryIndex}`"
          class="included-category"
        >
          <h4>{{ category }}</h4>
          <product-group-included-list
            :productHandles="getIncludedListForCategory(category)"
          />
        </div>
      </div>
      <template #footer>
        <squatch-button
          text="Finish"
          :action="true"
          @takeAction="checkout"
        />
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import CartService from "@/vue/services/cart.service";
import IncludedList from "@/configs/product-group-card-included-list";

export default {
  name: "ProductCustomizationSidebar",
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
      return this.product.handle ? IncludedList[this.product.handle] : []
    }
  },
  methods: {
    getIncludedListForCategory(category) {
      const variantName = this.selectedVariant ? this.selectedVariant.option1.toLowerCase() : null;
      if (!category || !variantName) {
        return [];
      }
      return this.includedListByVariant[variantName][category];
    },
    async checkout() {
      const added = await CartService.addItem(this.product);
      if (added) {
        this.$emit("close");
        this.$store.dispatch("cart/initialize");
        this.$store.commit("cart/toggleCart");
        console.log("go to checkout!");
        // go to checkout
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-customization-sidebar-component {
  
  .hidden-icon {
    display: none;
  }

  .discount {
    margin-right: 7px;
    padding: 5px 10px;
    background-color: $maroon;
    @include font-style-body($size: 12px, $weight: 600, $color: $white);
  }

  .free-shipping {
    padding: 5px 10px;
    background-color: $orange;
    @include font-style-body($size: 12px, $weight: 600, $color: $white);
  }

  .header-box {
    background-image: url(https://cdn.shopify.com/s/files/1/0275/7784/3817/files/woodgrain-default.svg?v=1615322353);
    background-size: 200%;
    background-repeat: repeat;
    background-color: $sand;
    padding: 15px 20px;
    text-align: center;

    img {
      width: 88%;
      max-width: 350px;
    }

    h2 {
      margin: 13px 0 17px;
      @include font-style-heading($size: 25px, $color: $dark-brown);

      @include layout-md {
        font-size: 30px;
      }

      @include layout-lg {
        font-size: 40px;
      }
    }

    p {
      @include font-style-body($size: 20px, $color: $brown, $weight: 600);
    }

    .product-pricing {
      @include font-style-body($size: 20px, $weight: 600, $color: $green, $lh: 20px);

      .compare-at-pricing {
        text-decoration: line-through;
        @include font-style-body($size: 20px, $color: #afafaf);
      }
    }
  }

  .variants-box {
    position: sticky;
    top: -5px;
    padding: 15px 20px;
    box-shadow: rgb(212 212 212) 0px 4px 8px -2px;
    background-color: $white;

    h3 {
      margin-left: 9px;
      @include font-style-body($size: 16px, $lh: 16px, $color: $brown);
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
          background-color: $off-white;
          font-size: 20px;
          cursor: pointer;

          &.selected {
            background-color: $orange;
          }
        }

        span {
          margin-top: 6px;
          @include font-style-body($color: $brown);
        }
      }
    }

    h4 {
      margin: 0 0 0 6px;
      cursor: pointer;
      @include font-style-body($size: 14px, $weight: 600, $color: $orange);
    }
  }

  .included-box {
    padding: 25px 25px 5px 25px;

    h3 {
      margin-bottom: 15px;
      @include font-style-heading($color: $dark-brown);
    }

    .included-category {
      margin-bottom: 20px;

      h4 {
        padding-bottom: 9px;
        border-bottom: 1px solid $off-white;
        margin-bottom: 15px;
        @include font-style-body($size: 16px, $lh: 16px, $color: $brown);
      }
    }

  }
}
</style>

<style lang="scss">
@import "@/styles/main.scss";

.sidebar-drawer {
  width: 90%;
  max-width: 500px;
  margin-right: 15px;
}

.sidebar-header, .sidebar-body {
  background-color: $white;
}

.sidebar-footer {
  background-color: $white;
  padding: 10px;
}
</style>