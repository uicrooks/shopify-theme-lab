<template>
  <b-sidebar
    id="customization-sidebar"
    v-model="drawerOpened"
    header-class="sidebar-header"
    body-class="sidebar-body"
    footer-class="sidebar-footer"
    sidebar-class="sidebar-drawer"
    :lazy="true"
    right
    shadow
    backdrop
  >
    <template #default>
      <div class="dialog-header">
        <span
          v-if="selectedCard.savings"
          class="discount"
        >
          {{ selectedCard.savings | money("$", 0) }} Off!
        </span>
        <span
          v-if="selectedCard.price>4000"
          class="free-shipping"
        >
          Free Shipping!
        </span>
        <b-icon
          icon="x"
          font-scale="1.5"
          @click="$emit('close')"
        />
      </div>
      <div class="header-box">
        <img
          :src="selectedVariant.featured_image.src"
          :alt="`${selectedVariant.title} image`"
        >
        <h2>{{ selectedCard.title.split(" ")[0] }}</h2>
        <p>{{ selectedVariant.title.split(" Bundle")[0] }}</p>
        <div class="product-pricing">
          {{ selectedCard.price | money("$", 0) }}
          <span
            v-if="selectedCard.compare_at_price"
            class="compare-at-pricing"
          >
            {{ selectedCard.compare_at_price | money("$", 0) }}
          </span>
        </div>
      </div>
      <div class="variants-box">
        <h3>Choose Your Scent Profile:</h3>
        <div class="variants">
          <div
            v-for="(scent) in scents"
            class="variant"
          >
            <div
              class="variant-icon"
              :class="{ 'selected' : selectedScent == scent.handle }"
              @click="changeScent(scent.handle)"
            >
              Icon
            </div>
            <span>{{ scent.title }}</span>
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
          <included-item
            v-for="(handle) in includedObject[category]"
            :key="handle"
            :handle="handle"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <squatch-button
        class="finish-button"
        :disabled="btnsDisabled"
        @clicked="finishFlow()"
      >
        Finish
      </squatch-button>
    </template>
  </b-sidebar>
</template>

<script>
import { mapGetters } from "vuex";
import SquatchButton from "@/vue/reusables/squatch-button.vue";
import IncludedList from "@/configs/product-group-card-included-list";
import { money } from "@/vue/filters/money";
import IncludedItem from "./included-item.vue";
export default {
    name: "SidebarContent",
    filters: {
      money
    },
    components: {
      SquatchButton,
      IncludedItem
    },
    computed: {
      ...mapGetters("starterBundles",["selectedVariant","selectedScent","selectedCard","starterBundleDrawerOpened","fetchedProducts","subscriptionProducts"]),
      includedObject() {
        return IncludedList["starter-bundles-variants"][this.selectedScent] || {};
      },
      includedListCategories() {
        return IncludedList[this.selectedCard.title];
      },

      drawerOpened: {
        get() {
          return this.starterBundleDrawerOpened;
        },
        set(val) {
          if (!val) {
            this.$store.commit("starterBundles/setDrawerOpened", val);
          }
        }
      }
    },
    data() {
      return {
        btnsDisabled: false,
        scents: [
          {
            title: "Beach",
            handle: "beach-bundle",
            icon: ""
          },
          {
            title: "Forest",
            handle: "forest-bundle",
            icon: ""
          },
          {
            title: "Squatch",
            handle: "squatch-bundle",
            icon: ""
          },
          {
            title: "Fresh",
            handle: "fresh-bundle",
            icon: ""
          },
        ]
      };
    },
    methods: {
      changeScent(handle) {
        if (this.btnsDisabled) {return;}
        this.$store.commit("starterBundles/setSelectedScent", handle);
      },
      async finishFlow() {
        this.btnsDisabled = true;
        var outputArray = [],
        outputProducts = {};
        this.includedListCategories.forEach(category => {
          let handles = this.includedObject[category];
          handles.forEach(prod_handle => {
            if (prod_handle) {
              const match = this.fetchedProducts[prod_handle];
              let sku_lower = match.variants[0].sku.toLowerCase();
              if (outputProducts[match.productType]) {
                outputProducts[match.productType].push(sku_lower);
              } else {
                outputProducts[match.productType] = [sku_lower];
              }
            }
          });
        });
        // SOAP SAVER
            outputArray.push({
              variant_id: 31305057960041,
              quantity: 1,
              properties: {}
            });

        const generateSubscriptionLineItem = (prod_type, scents) => {
          var fulfillmentScents = {},
          scents = outputProducts[prod_type];
          scents.forEach((sku,i) => {
            fulfillmentScents[`_fulfillment_Scent${i+1}`] = sku;
          });
          return {
            variant_id: this.subscriptionProducts[prod_type].variant_id,
            quantity: 1,
            properties: Object.assign(this.subscriptionProducts[prod_type].properties, fulfillmentScents)
          };
        };
        switch (this.selectedCard.title) {
          case "Clean":
            outputArray.push(generateSubscriptionLineItem("BarSoap"));
            break;
          case "Groomed":
            outputArray.push(generateSubscriptionLineItem("BarSoap"));
            outputArray.push(generateSubscriptionLineItem("HairCare"));
            break;
          case "Suave":
            outputArray.push(generateSubscriptionLineItem("BarSoap"));
            outputArray.push(generateSubscriptionLineItem("HairCare"));
            outputArray.push(generateSubscriptionLineItem("Deodorant"));
            break;
          case "Smooth":
            outputArray.push(generateSubscriptionLineItem("BarSoap"));
            outputArray.push(generateSubscriptionLineItem("HairCare"));
            outputArray.push(generateSubscriptionLineItem("Deodorant"));
            outputArray.push(generateSubscriptionLineItem("Toothpaste"));
            break;
        }
        console.log(outputArray);
        //await this.$store.dispatch("starterBundles/finish");
        this.btnsDisabled = false;
      }
    },
    mounted() {
      window.sbDrawer_test = this;
    }
};
</script>

<style lang="scss">
@use "@/styles/main" as global;
#customization-sidebar {
  margin: 0;
  header {
    display:none;
  }
  .sidebar-body {
    position:relative;
  }
     .dialog-header {
        position: absolute;
        width: 100%;
        padding: 15px;
        background: transparent;
        justify-content: space-between;
        display: flex;
        .close {
          margin-left: auto;
          margin-right: 0;
          z-index: 4;
        }
      }
    .hidden-icon {
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
    .header-box {
        background-image: url(https://cdn.shopify.com/s/files/1/0275/7784/3817/files/woodgrain-default.svg?v=1615322353);
        background-size: 200%;
        background-repeat: repeat;
        background-color: global.$sand;
        padding: 15px 20px;
        text-align: center;
        img {
            width: 100%;
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
    max-width: 500px !important;
    margin-right: 15px;
}

.sidebar-header,
.sidebar-body {
    background-color: global.$white;
}

.sidebar-footer {
    background-color: global.$white;
    padding: 10px;
}
</style>