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
          >{{ tab.name }}
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
      <section
        v-if="showSection(index)"
      >
        <h2>
          {{ getSectionName(index) }}
        </h2>
        <p>
          {{ getSectionDescription(index) }}
        </p>
        <div class="products">
          <product-group-card
            v-for="(product, productIndex) of getSectionProducts(index)"
            :key="`bundles-section-${index}-product-${productIndex}`"
            class="product-group-card"
            :product="product"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import StoreService from "@/vue/services/store.service";

export default {
  props: {
    bundles: {
      type: Object,
      required: false
    },
    oosData: {
      type: Object
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
      currentTabIndex: 0
    };
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
    }
  },
  async mounted() {
    console.log(this.bundles);
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.bundle-offers-component {

  .test {
    height: 300px;
  }

  .header-tabs {

    .header {
      padding: 20px 0;
      background-image: url("https://cdn.shopify.com/s/files/1/0275/7784/3817/files/dsq-woodgrain_texture-DARK.svg?v=1616535182");
      background-size: 200%;
      background-repeat: repeat;
      background-color: $dark-brown;
      text-align: center;
      @include font-style-body($size: 20px, $weight: 600, $color: $white);

      @include layout-md {
        padding: 45px;
      }

      h1 {
        margin-bottom: 13px;
        @include font-style-heading($size: 46px, $color: $white, $lh: 46px);

        @include layout-md {
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
      // overflow-x: scroll;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none;  /* Internet Explorer 10+ */
    }

    .tabs::-webkit-scrollbar { /* WebKit */
      width: 0;
      height: 0;
    }

    .tab {
      // flex: 1;
      // min-width: 80px;
      text-align: center;
      padding: 0 12px;

      .tab-name {
        padding: 6px;
        white-space: nowrap;
        cursor: pointer;
        @include font-style-body($weight: 600, $color: $dark-brown);

        &:hover {
          border-bottom: 2px solid $orange;
        }

        &.active {
          border-bottom: 2px solid $orange;
          color: $orange;
        }
      }
    }
  }

  .section-wrapper {
    padding: 30px 15px;
    background-color: $white-off;

    @include layout-md {
      padding: 30px 40px;
    }

    &.hidden {
      display: none;
    }

    &.starter-bundles {
      background-color: $white;
    }

    section {
      max-width: 1000px;
      margin: auto;

      h2 {
        margin-bottom: 13px;
        @include font-style-heading($size: 30px, $color: $dark-brown);
      }

      p {
        margin-bottom: 20px;
        @include font-style-body($size: 16px, $color: $brown, $lh: 16px);

        @include layout-md {
          margin-bottom: 30px;
        }
      }

      .products {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        
        .product-group-card {
          
          @include layout-md {
            max-width: 870px;
          }

          @include layout-lg {
            max-width: 410px;
          }
        }
      }
    }
  }
}
</style>