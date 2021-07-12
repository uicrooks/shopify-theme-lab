<template>
  <div class="cart-component">
    <b-icon
      aria-controls="cart"
      :aria-expanded="isOpen"
      icon="cart"
      font-scale="2"
      class="cart-icon"
      @click="toggleCart"
    />
    <span>{{ numberOfItems }}</span>
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
            font-scale="1.5" 
            @click="hide" 
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
            :class="{ 'last-item': index === items.length - 1 }"
          >
            <a 
              :href="item.url" 
              class="item-image-wrapper"
            >
              <img
                :src="item.image"
                :alt="`${item.product_title} image`"
                class="item-image"
              >
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
        <squatch-button
          v-if="items.length > 0"
          text="Checkout"
          class="checkout-button"
          @clicked="checkout"
        >
          Checkout
        </squatch-button>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import CartService from "@/vue/services/cart.service";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  props: {
    currencyObj: {
      type: Object,
      required: true,
    },
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
  },
  methods: {
    toggleCart() {
      this.$store.commit("cart/toggleIsOpen");
    },
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
    this.$store.commit("cart/setCurrency", this.currencyObj);
    const cart = await CartService.initCart();
    if (cart) {
      this.$store.commit("cart/setCart", cart);
    } else {
      // error handling
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.cart-component {
  .cart-icon {
    cursor: pointer;
  }

  .cart-title {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: $black;
    @include font-style-heading($size: 23px, $color: $white);
  }

  .cart-content {
    padding: 10px 0 0;
    background-color: $white;

    &.empty {
      padding: 45px 0;
      text-align: center;

      h3 {
        margin-bottom: 15px;
        @include font-style-heading($size: 16px);
      }

      .cta-button {
        width: 70%;
        margin: auto;
      }
    }

    .item {
      display: flex;
      flex-flow: row nowrap;
      border-bottom: 1px solid $off-white;
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
          @include font-style-heading($size: 14px);

          &:hover {
            color: $orange;
          }
        }

        .item-variant-title {
          margin: 7px 0;
          @include font-style-body($color: $brown);
        }

        .remove-icon {
          position: absolute;
          top: 6px;
          right: 0;
          color: $maroon;
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
      padding: 15px 15px 15px 30px;
      border-top: 1px solid $off-white;
      @include font-style-body();

      span {
        position: absolute;
        right: 15px;
        top: 15px;
        @include font-style-body($size: 15px, $color: $green, $weight: 600);
      }
    }
  }

  .checkout-button {
    margin: 20px 30px;
    padding: 16px;
  }
}
</style>

<style lang="scss">
@import "@/styles/main.scss";

.cart-drawer {
  width: 100%;
  min-width: 320px;

  @include layout-md {
    width: 440px;
  }
}

.cart-body {
  background-color: $off-white;
}
</style>