<template>
  <div class="product-template-component">
    <div class="page-banner-slot">
      <slot name="page-banner" />
    </div>
    <product-breadcrumb
      :collection="collection"
      :product="product"
    />
    <section class="product-header">
      <product-gallery
        :product="product"
        class="product-header-col"
      />
      <div class="product-header-col">
        <div class="info-box">
          <div class="info-row">
            <h4>{{ collection.title | singularize }}</h4>
            <h2>{{ product.title }}</h2>
            <p v-html="product.description"></p>
          </div>  
          <div class="info-row pricing">
            <div class="pricing-slot">
              <slot name="pricing" />
            </div>
            <div class="reveiws">
              review stuff here
            </div>
          </div>
          <div class="info-row product-options-slot">
            <slot name="product-options" />
          </div>
        </div>
        <div class="cta-box">
          <div class="cta-banner-slot">
            <slot name="cta-banner" />
          </div>
          <div class="cta-button-slot">
            <slot name="cta-button" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ProductBaseTemplate",
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    },
    collection: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-template-component {

  .product-header {
    @include layout-md {
      display: flex;
      flex-flow: row wrap;
      align-items: flex-start;
    }

    .product-header-col {
      @include layout-md {
        flex: 1;
      }

      .info-box {
        padding: 20px 15px;

        @include layout-md {
          padding: 0 15px 0 30px;
        }

        .info-row {
          
          &.pricing {
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            margin: 20px 0;

            .pricing-slot {
              margin-right: 20px;
              text-transform: capitalize;
              @include font-style-body($size: 20px, $color: $green, $weight: 600);
            }
          }
          
          h4 {
            margin-bottom: 15px;
            @include font-style-body($size: 16px);
          }
  
          h2 {
            margin-bottom: 1rem;
            @include font-style-heading($size: calc(1.10625rem + 2.69167vw));
          }
  
          p {
            margin: 0;
            @include font-style-body($size: 16px, $color: $brown, $weight: 600);
          }

        }
      }

      .cta-box {
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

        .cta-banner-slot {
          width: 100%;
          padding: 12px 15px;
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

        .cta-button-slot {
          width: 100%;
          padding: 12px 15px;
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