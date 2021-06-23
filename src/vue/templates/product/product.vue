<template>
  <div class="product-component">
    <new-look-banner
      :handle="handle"
      :title="product.title"
    />
    <product-breadcrumb
      :collection="collection"
      :product="product"
    />
    <barsoap-product-header
      v-if="isBarSoap"
      :collection="collection"
      :product="product"
    />
    <haircare-product-header
      v-else-if="isHairCare"
      :collection="collection"
      :product="product"
    />
  </div>
</template>

<script>
import ProductBreadcrumb from "@/vue/templates/product/product-breadcrumb";

export default {
  name: "Product",
  components: {
    ProductBreadcrumb
  },
  props: {
    handle: {
      type: String,
      required: true
    },
    productData: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      product: {}
    };
  },
  computed: {
    collection() {
      const pathArray = window.location.pathname.split("/");
      return pathArray[2];
    },
    isBarSoap() {
      return this.product.tags && this.product.tags.includes("bar-soap") && !this.product.tags.includes("shower-booster");
    },
    isHairCare() {
      return this.product.tags && this.product.tags.includes("hair-care");
    },
    isShowerBooster() {
      return this.product.tags && this.product.tags.includes("shower-booster");
    }
  },
  methods: {
  },
  mounted() {
    this.product = JSON.parse(this.productData);
    console.log(this.handle, this.product);
    
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-component {

  .product-summary {

    @include layout-md {
      display: flex;
      flex-flow: row wrap;
      align-items: flex-start;
    }

    .product-gallery {
      @include layout-md {
        flex: 1;
      }
    }

    .product-details {

      @include layout-md {
        flex: 1;
      }

      .product-details-inner-wrapper {
        padding: 20px 15px;

        @include layout-md {
          padding: 0 15px 0 30px;
        }
      }

      h4 {
        text-transform: capitalize;
        margin-bottom: 15px;
        @include font-style-body($size: 16px, $lh: 16px, $color: $dark-brown);
      }

      h2 {
        text-transform: capitalize;
        margin-bottom: 14px;
        @include font-style-heading($size: 34px, $lh: 34px, $color: $dark-brown);
      }

      p {
        margin: 0;
        @include font-style-body($size: 16px, $lh: 16px, $color:$brown, $weight: 600);
      }

      .pricing-and-reviews {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        margin: 20px 0;

        .pricing {
          margin-right: 14px;
          @include font-style-body($size: 20px, $lh: 20px, $color: $green, $weight: 600);
        }

        .discount {
          margin-right: 20px;
          @include font-style-body($weight: 800, $color: $tan);
        }
      }

      .scent-and-exfoliation {
        border-top: 1px solid $tan;
        border-bottom: 1px solid $tan;

        @include layout-md {
          display: flex;
          flex-flow: row wrap;
        }

        .scent, .exfoliation {
          display: flex;
          flex-flow: row wrap;
          margin: 15px 0;

          @include layout-md {
            flex: 1;
          }

          .icon {
            // placeholder
            border-radius: 50%;
            background-color: grey;
            margin-right: 9px;
          }

          .description {
            @include font-style-body($color: #b6b09c);

            h6 {
              margin: 0;
              @include font-style-heading($size: 14px, $lh: 14px, $color: $dark-brown);
            }
          }
        }
      }

      .quantity-selector {
        margin: 15px 0 30px;

        h6 {
          margin-bottom: 7px;
          @include font-style-accent($size: 12px, $lh: 12px, $color: $brown);
        }

        .quantity-options {
          display: flex;
          flex-flow: row wrap;
          align-items: center;

          .option {
            min-width: 30px;
            padding: 8px 14px;
            text-align: center;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 14px;
            @include font-style-body($weight: 600, $color: $brown);

            &:hover {
              background-color: #cc63287a;
            }

            &.selected {
              background-color: #cc63287a;
            }
          }
        }
      }

      .purchase-type-selector {
        margin-top: 15px;
        
        .purchase-type-option {
          padding: 10px 15px;
          margin-bottom: 10px;
          border-radius: 5px;
          display: flex;
          flex-flow: row wrap;
          align-items: center;
          cursor: pointer;
          @include font-style-body($weight: 500, $color: $brown);

          &:hover {
            background-color: #f4f2f0;
          }

          &.selected {
            background-color: $off-white;
            
            .radio-button {
              border: 6px solid $orange;
            }

            .pricing {
              visibility: visible;
            }
          }

          .radio-button {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            border: 2px solid $orange;
            margin-right: 5px;
            background-color: $white;
          }

          .pricing {
            visibility: hidden;
            margin-left: 14px;
          }

          .subscribe {

            h6 {
              margin: 0;
              @include font-style-body($weight: 800, $color: $brown);
            }
          }
        }
      }

      .cta-button-box {
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 1;
        display: flex;
        flex-flow: column nowrap;
        background-color: $white;

        @include layout-md {
          position: relative;
          bottom: unset;
          padding: 20px 15px 20px 30px;
        }

        .free-shipping-banner {
          width: 100%;
          padding: 8px 15px;
          order: 1;
          background-color: #203620;
          text-align: center;
          @include font-style-body($color: $white);

          @include layout-md {
            width: unset;
            padding: 8px;
            order: 2;
            background-color: unset;
            text-align: left;
            color: $brown;
          }
        }

        .squatch-button-wrapper {
          width: 100%;
          padding: 10px 15px;
          order: 2;

          @include layout-md {
            order: 1;
            padding: 0 
          }
        }
      }
    }
  }
}
</style>