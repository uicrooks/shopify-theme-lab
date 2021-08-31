<template>
  <div class="bundle-offers-component">
    <div class="header-tabs">
      <div class="header">
        <h1>Bundle & Save</h1>
        <span>Your Choice of Curated Best Sellers</span>
      </div>
      <div class="tabs">
        <div
          v-for="(tab, index) of tabs"
          :key="`tab-${index}`"
          class="tab"
        >
          <div
            :class="{'active': currentTabIndex === index}"
            class="tab-name"
            @click="selectTab(index)"
          >
            {{ tab.name }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="(tab, index) of tabs"
      :key="`bundles-section-${index}`"
      class="section-wrapper"
      :class="{'hidden': index === 0, 'starter-bundles': index === 1}"
    >
      <b-container
        v-if="showSection(index)"
        class="bundles-section"
      >
        <b-row>
          <b-col cols="12">
            <h2>
              {{ getSectionName(index) }}
            </h2>
            <p>
              {{ getSectionDescription(index) }}
            </p>
          </b-col>
          <template
            v-if="index === 1"
            class="products"
          >
            <b-col
              v-for="(product, productIndex) of getSectionProducts(index)"
              :key="`bundles-section-${index}-product-${productIndex}`"
              md="4"
              xl="3"
              cols="12"
            >
              <custom-product-group-card
                class="customizable-product-group-card"
                :product="product"
                :selected="selectedStarterBundleIndex === productIndex"
                @selectStarterBundle="selectStarterBundle"
                @openScentSelection="scentSelectionFlag = true"
              />
            </b-col>
          </template>
          <template
            v-else
            class="products"
          >
            <b-col
              v-for="(product, productIndex) of getSectionProducts(index)"
              :key="`bundles-section-${index}-product-${productIndex}`"
              cols="12"
              md="4"
              xl="3"
            >
              <product-group-card
                class="product-group-card"
                :product="product"
              />
            </b-col>
          </template>
        </b-row>
      </b-container>
    </div>
    <b-sidebar
      id="customization-sidebar"
      v-model="starterBundleDrawerOpened"
      header-class="sidebar-header"
      body-class="sidebar-body"
      footer-class="sidebar-footer"
      sidebar-class="sidebar-drawer"
      :lazy="true"
      right
      shadow
      backdrop
    >
      <custom-product-group-customization-sidebar
      :is-open="scentSelectionFlag"
      :product="selectedStarterBundle"
      @close="scentSelectionFlag = false"
      />
    </b-sidebar>
  </div>
</template>

<script>
// Reusuables
import SquatchButton from "@/vue/reusables/squatch-button.vue";
import ProductGroupCard from "./product-group/index.vue";
import CustomProductGroupCard from "./custom-product-group/index.vue";
import CustomProductGroupCustomizationSidebar from "./custom-product-group/index";

export default {
  name: "BundleOffers",
  components: {
    CustomProductGroupCard,
    ProductGroupCard,
    CustomProductGroupCustomizationSidebar
  },
  props: {
    bundles: {
      type: Object,
      required: false,
      default: () => {}
    },
    oosData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tabs: [
        {
          name: "All"
        }, {
          name: "Starter Bundles",
          description: "New To Squatch? Sample our curated best sellers & get big savings!"
        }, {
          name: "Best Sellers",
          description: "Tried-and-true Squatch Nation favorites"
        }, {
          name: "Full Routine",
          description: "Embrace the Squatch from head to toe"
        }, {
          name: "Soap Sets",
          description: "Squatch classic soap briccs"
        }, {
          name: "Deodorant Sets",
          description: "Squatch Odors at the Source"
        }, {
          name: "Signature Scents",
          description: "Go all in on one of our signature scents"
        }
      ],
      currentTabIndex: 0,
      selectedStarterBundleIndex: 1,
      scentSelectionFlag: false,
      starterBundleDrawerOpened: true,
    };
  },
  computed: {
    selectedStarterBundle: {
      get() {
        const starterBundles = this.bundles["Starter Bundles"];
        return starterBundles && this.selectedStarterBundleIndex !== null ? starterBundles[this.selectedStarterBundleIndex] : {};
      },
      set(val) {
        return val;
      }
    }
  },
  methods: {
    selectTab(index) {
      this.currentTabIndex = index;
    },
    showSection(index) {
      return this.currentTabIndex === 0 || this.currentTabIndex === index;
    },
    getSectionName(index) {
      return this.tabs[index].name;
    },
    getSectionDescription(index) {
      return this.tabs[index].description;
    },
    getSectionProducts(index) {
      return this.bundles[this.tabs[index].name];
    },
    selectStarterBundle(handle) {
      this.selectedStarterBundleIndex = findMatchingStarterBundleIndex(handle, this.bundles["Starter Bundles"]);

      function findMatchingStarterBundleIndex(handle, bundles) {
        for (let i = 0; i < bundles.length; i++) {
          if (bundles[i].handle === handle) {
            return i;
          }
        }
        return null;
      }
    }
  },
  mounted() {
    console.log(this.bundles);
    console.log("HERE");
  }
};
</script>

<style lang="scss">
@use "@/styles/main" as global;

.bundle-offers-component {
  .header-tabs {

    .header {
      padding: 20px 0;
      background-image: url("https://cdn.shopify.com/s/files/1/0275/7784/3817/files/dsq-woodgrain_texture-DARK.svg?v=1616535182");
      background-size: 200%;
      background-repeat: repeat;
      background-color: global.$dark-brown;
      text-align: center;
      @include global.font-style-body($size: 20px, $weight: 600, $color: global.$white);

      @include global.layout-md {
        padding: 45px;
      }

      h1 {
        margin-bottom: 13px;
        @include global.font-style-heading($size: 46px, $color: global.$white);

        @include global.layout-md {
          font-size: 28px;
          line-height: 28px;
        }
      }
    }

    .tabs {
      display: flex;
      flex-flow: row nowrap;
      margin: 10px 0;
      overflow-x: auto;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none;  /* Internet Explorer 10+ */

      @media(min-width: 825px) {
        justify-content: center;
      }
    }

    .tabs::-webkit-scrollbar { /* WebKit */
      width: 0;
      height: 0;
    }

    .tab {
      text-align: center;
      padding: 0 12px;

      .tab-name {
        padding: 6px;
        white-space: nowrap;
        cursor: pointer;
        @include global.font-style-body($weight: 600);

        &:hover {
          border-bottom: 2px solid global.$orange;
        }

        &.active {
          border-bottom: 2px solid global.$orange;
          color: global.$orange;
        }
      }
    }
  }

  .section-wrapper {
    background-color: global.$white-off;

    &.hidden {
      display: none;
    }

    &.starter-bundles {
      background-color: global.$white;
    }
  .bundles-section {
      max-width: 1440px;
      margin: auto;
      padding: 30px 15px;

      @include global.layout-md {
        padding: 30px 40px;
      }

      h2 {
        margin: 15px 0;
        @include global.font-style-heading($size: 30px);
      }

      p {
        margin-bottom: 20px;
        @include global.font-style-body($size: 16px, $color: global.$brown);

        @include global.layout-md {
          margin-bottom: 30px;
        }
      }

      .products {

        .customizable-product-group-card {
          width: 100%;
          margin-bottom: 10px;
        }
        
        .product-group-card {
          margin-bottom: 15px;
        }
      }
    }
  }
  #customization-sidebar {
     header {
        position: absolute;
        width: 100%;
        background: transparent;
        .close {
          margin-left: auto;
          margin-right: 0;
          z-index: 4;
        }
      }
    }
}
</style>