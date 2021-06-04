<template>
  <div class="cart-component">
    <b-icon
      aria-controls="cart"
      :aria-expanded="isOpen"
      icon="cart"
      font-scale="2"
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
        <div class="cart-content">
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
        <squatch-button
          text="Checkout"
          class="checkout-button"
        />
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
      required: true
    }
  },
  computed: {
    ...mapGetters("cart", [
      "isOpen",
      "subtotal",
      "items",
      "numberOfItems"
    ])
  },
  watch: {
    items(val) {
      console.log("watching cart items", val);
    }
  },
  methods: {
    toggleCart() {
      this.$store.commit("cart/toggleCart");
    },
    async updateQuantity(itemIndex, quantity) {
      const updated = await CartService.updateItemQuantity(itemIndex + 1, quantity);
      if (updated) {
        this.$store.dispatch("cart/initialize");
      }
    }
  },
  async mounted() {
    this.$store.dispatch("cart/initialize");
    this.$store.commit("cart/setCurrency", this.currencyObj);
    console.log("items", this.items);
    console.log("cart", this.$store.state.cart);
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.cart-component {

  .cart-title {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: $black;
    @include font-style-heading($size: 23px, $color: $white, $lh: 23px);
  }

  .cart-content {
    padding: 10px 0 0;
    background-color: $white;

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
          @include font-style-heading($size: 14px, $color: $dark-brown, $lh: 14px);

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
      @include font-style-body($color: $dark-brown);

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