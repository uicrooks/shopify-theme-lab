<template>
  <div class="haircare-product-header-component">
    <product-gallery
      :product="product"
      class="product-gallery"
    />
    <div class="product-profile">
      <div class="product-details-inner-wrapper">
        <h4>{{ collection | readableHandle }}</h4>
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <div class="pricing-and-reviews">
          <span class="pricing">
            {{ pricePerUnit | money("$", 0) }} 
            <span class="unit">
              / {{ unit }}
            </span>
          </span>
          <span
            v-if="isSubscription"
            class="discount"
          >
            (Save $1!)
          </span>
          <span>review stuff here</span>
        </div>
        <product-icon-descriptions
          :handle="product.handle"
          :items="iconDescriptionItems"
        />
        <product-quantity-selector
          :quantity="quantity"
          class="quantity-selector"
          @increase="updateQuantity(true)"
          @decrease="updateQuantity(false)"
        />
        <product-purchase-type-selector
          :is-subscription="isSubscription"
          :unit="unit"
          :price="product.price"
          :quantity="quantity"
          :discount-for-subscription="discountForSubscription"
          class="purchase-type-selector"
          @updatePurchaseType="isSubscription = !isSubscription"
        />
      </div>
      <div class="cta-button-box">
        <div class="free-shipping-banner">
          Free Shipping {{ isSubscription ? 'for life!' : 'over $40' }}
        </div>
        <div class="squatch-button-wrapper">
          <squatch-button
            :text="isSubscription ? 'Subscribe & Save' : !added ? `$${totalPrice.toFixed(0)} | Add To Cart` : 'Add More'"
            :action="true"
            @takeAction="addToCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductGallery from "@/vue/templates/product/product-gallery";
import ProductIconDescriptions from "@/vue/templates/product/product-icon-descriptions";
import CartService from "@/vue/services/cart.service";

export default {
  name: "HaircareProductHeader",
  components: {
    ProductGallery,
    ProductIconDescriptions
  },
  props: {
    collection: {
      type: String,
      required: true,
      default: ""
    },
    product: {
      type: Object,
      required: true,
      default: () => {}
    },
  },
  data() {
    return {
      unit: "bottle",
      isSubscription: false,
      quantity: 1,
      discountForSubscription: this.isKit ? 400 : 200,
      added: false
    };
  },
  computed: {
    isKit() {
      return this.product.handle.includes("hair-care-kit");
    },
    pricePerUnit() {
      return this.isSubscription ? this.product.price - this.discountAmountForSubscriptionOption : this.product.price;
    },
    totalPrice() {
      return this.product.price * this.quantity / 100;
    },
    iconDescriptionItems() {
      return this.isKit ? [
        {
          iconName: this.product.handle,
          label: "Smells Like:",
          description: "Default description, update later"
        }
      ] : [
        {
          iconName: this.product.handle,
          label: "Smells Like:",
          description: "Default description, update later"
        },
        {
          iconName: "NaturalOils",
          label: "Featuring:",
          description: "Default description, update later"
        }
      ];
    }
  },
  methods: {
    showQuantityOption(num) {
      return num > 1 ? `${num} Soaps` : `${num} Soap`;
    },
    updateQuantity(increase = true) {
      if (increase) {
        this.quantity++;
        return;
      }
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    async addToCart() {
      if (this.isSubscription) {
        window.location = "/pages/subscription-flow";
        return;
      }
      const added = await CartService.addItem(this.product);
      if (added) {
        this.added = true;
        const cart = await CartService.initCart();
        if (cart) {
          this.$store.commit("cart/setCart", cart);
          this.$store.commit("cart/toggleIsOpen");
        } else {
          // error handling
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.haircare-product-header-component {

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

  .product-profile {
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
      // text-transform: capitalize;
      margin-bottom: 15px;
      @include font-style-body($size: 16px, $lh: 16px, $color: $dark-brown);
    }

    h2 {
      // text-transform: capitalize;
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

    .quantity-selector {
      margin: 15px 0 30px;
    }

    .purchase-type-selector {
      margin-top: 15px;
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
</style>