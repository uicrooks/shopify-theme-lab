<template>
  <div class="cart-component">
    <b-sidebar
      id="cart"
      v-model="isOpen"
      aria-labelledby="cart-title"
      title="Sidebar"
      body-class="cart-body"
      sidebar-class="cart-drawer"
      :lazy="true"
      right
      no-header
      shadow
      backdrop
    >
      <template #default="{ hide }">
        <div class="cart-title">
          Your Cart
          <b-icon
            icon="x"
            style="font-size:36px;"
            @click="hide"
          />
        </div>
        <div
          v-if="items.length > 0"
          class="free-shipping-display"
        >
          <div v-if="amountTillFreeShipping > 0">
            Free Shipping is only <span class="accent">{{ amountTillFreeShipping | money("$", 0) }}</span> away!
          </div>
          <div v-else>
            Free Shipping Unlocked at Checkout!
          </div>
          <b-progress
            :value="subtotal"
            :max="freeShippingMinimum"
            height="7px"
            striped
            animated
            class="progress-bar-wrapper"
            :class="{'fulfilled': amountTillFreeShipping <= 0}"
          />
        </div>
        <div 
          v-if="items.length > 0" 
          class="cart-content"
        >
          <div
            v-for="(item, index) of items"
            :key="`cart-item-${index}`"
            class="item"
            :class="{'last-item': index === items.length - 1}"
          >
            <a 
              :href="item.url" 
              class="item-image-wrapper"
            >
              <b-img-lazy
                :src="item.image"
                :alt="`${item.product_title} image`"
                class="item-image"
              />
            </a>
            <div class="item-details">
              <a 
                :href="item.url"
                class="item-title"
              >
                {{ item.product_title }}
              </a>
              <b-icon
                icon="x"
                class="remove-icon"
                scale="2"
                @click="updateQuantity(index, 0)"
              />
              <div class="item-variant-title">
                {{ item.variant_title }}
              </div>
              <div class="item-pricing">
                <quantity-switch
                  :quantity="item.quantity"
                  @decrease="updateQuantity(index, item.quantity - 1)"
                  @increase="updateQuantity(index, item.quantity + 1)"
                />
                <span>{{ item.line_price | money("$") }}</span>
              </div>
            </div>
          </div>
          <div class="sub-total">
            SubTotal
            <span>
              {{ subtotal | money("$") }}
            </span>
          </div>
        </div>
        <div 
          v-else 
          class="cart-content empty"
        >
          <h3>
            Your Cart is empty
          </h3>
          <squatch-button 
            class="cta-button"
            @clicked="hide"
          >
            Continue Browsing
          </squatch-button>
        </div>
        <div class="checkout-button-wrapper">
          <squatch-button
            v-if="items.length > 0"
            @clicked="checkout"
          >
            Checkout
          </squatch-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import CartService from "@/vue/services/cart.service";
import SquatchButton from "@/vue/reusables/squatch-button.vue";
import QuantitySwitch from "@/vue/reusables/quantity-switch.vue";
import {money} from "@/vue/filters/money";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    SquatchButton,
    QuantitySwitch
  },
  filters: {
    money
  },
  computed: {
    isOpen: {
      get() {
        return this.$store.state.cart.isOpen;
      },
      set(val) {
        this.$store.commit("cart/setIsOpen", val);
      },
    },
    ...mapGetters("cart", ["subtotal", "items", "numberOfItems"]),
    ...mapGetters("core", ["freeShippingMinimum"]),
    amountTillFreeShipping() {
      return this.freeShippingMinimum - this.subtotal;
    }
  },
  methods: {
    async updateQuantity(itemIndex, quantity) {
      const updated = await CartService.updateItemQuantity(
        itemIndex + 1,
        quantity
      );
      if (updated) {
        this.$store.dispatch("cart/initialize");
      }
    },
    checkout() {
      CartService.redirectToCheckout();
    },
  },
  async mounted() {
    console.log("cart mounted");
    //await this.$store.dispatch("cart/initialize");
    /*const cart = await CartService.initCart();
    if (cart) {
      this.$store.commit("cart/setCart", cart);
    } else {
      // error handling
    }*/
  },
};
</script>

<style scoped lang="scss">
@use "@/styles/main" as global;

.cart-component {
  margin-right: 25px;

  @include global.layout-md {
    margin-right: 15px;
  }

  .cart-icon {
    position: relative;
    
    .icon-cart {
      cursor: pointer;
  
      &:hover {
        color: global.$orange;
      }
    }

    .item-total {
      position: absolute;
      top: -10px;
      left: 18px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: global.$orange;
      text-align: center;
      @include global.font-style-body($color: global.$white);
    }
  }

  .cart-title {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: global.$black;
    @include global.font-style-heading($size: 23px, $color: global.$white);

    .icon-cross {

      &:hover {
        color: #d9d9d9;
      }
    }
  }

  .free-shipping-display {
    background-color: global.$off-white;
    padding: 16px 7px 10px;
    text-align: center;
    @include global.font-style-heading($size: 14px, $weight: 500);

    .accent {
      color: global.$orange;
    }

    .progress-bar-wrapper {
      margin: 5px 30px 7px;
    }
  }

  .cart-content {
    padding: 10px 0 0;
    background-color: global.$white;

    &.empty {
      padding: 45px 0;
      text-align: center;

      h3 {
        margin-bottom: 15px;
        @include global.font-style-heading($size: 16px);
      }

      .cta-button {
        width: 70%;
        margin: auto;
      }
    }

    .item {
      display: flex;
      flex-flow: row nowrap;
      border-bottom: 1px solid global.$off-white;
      padding: 14px 0;
      margin: 0 14px;

      &.last-item {
        border-bottom: none;
      }

      .item-image-wrapper {
        flex: 1;
        text-align: center;
        margin-right: 16px;

        .item-image {
          max-height: 80px;
          width: auto;
          cursor: pointer;
        }
      }

      .item-details {
        flex: 3;
        position: relative;

        .item-title {
          text-decoration: none;
          cursor: pointer;
          padding-right: 15px;
          @include global.font-style-heading($size: 14px);

          &:hover {
            color: global.$orange;
          }
        }

        .item-variant-title {
          margin: 7px 0;
          @include global.font-style-body($color: global.$brown);
        }

        .remove-icon {
          position: absolute;
          top: 6px;
          right: 0;
          color: global.$maroon;
          cursor: pointer;
        }
      }

      .item-pricing {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        font-size: 15px;
      }
    }

    .sub-total {
      position: relative;
      padding: 15px 14px 15px 30px;
      border-top: 1px solid global.$off-white;
      @include global.font-style-body();

      span {
        position: absolute;
        right: 15px;
        top: 15px;
        @include global.font-style-body($size: 15px, $color: global.$green, $weight: 600);
      }
    }
  }

  .checkout-button-wrapper {
    width: 100%;
    padding: 20px;
  }
}
</style>

<style lang="scss">
@use "@/styles/main" as global;

.cart-drawer {
  width: 100%;
  min-width: 320px;

  @include global.layout-md {
    width: 440px;
  }
}

.cart-body {
  background-color: global.$off-white;
}

.progress-bar-wrapper {
  background-color: #fbf6f0;

  .progress-bar {
    background-color: global.$orange;
  }

  &.fulfilled {
    .progress-bar {
      background-color: #6c8128;
    }
  }
}
</style>