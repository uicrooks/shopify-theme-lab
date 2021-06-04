<template>
  <div class="cart-component">
    <b-icon
      v-b-toggle.cart
      icon="cart"
      font-scale="2"
    />
    <span>{{ numberOfItems }}</span>
    <b-sidebar
      id="cart"
      aria-labelledby="cart-title"
      title="Sidebar"
      body-class="cart-body"
      right
      no-header
      shadow
      backdrop
      lazy
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
          >
            <a :href="item.url">
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
              <div class="item-variant-title">
                {{ item.variant_title }}
              </div>
              <div class="item-pricing">
                <quantity-switch
                  :quantity="item.quantity"
                  @decrease="decreaseQuantity(index)"
                  @increase="increaseQuantity(index)"
                />
                <span>{{ item.line_price | money("$") }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import CartService from "@/vue/services/cart.service";
import QuantitySwitch from "@vue/reusables/quantity-switch.vue";

export default {
  components: { QuantitySwitch },
  name: "Cart",
  props: {
    currencyObj: {
      type: Object,
      required: true
    }
  },
  computed: {
    items() {
      return this.$store.getters["cart/items"];
    },
    numberOfItems() {
      return this.$store.getters["cart/numberOfItems"];
    }
  //   ...mapGetters('some/nested/module', [
  //   'someGetter', // -> this.someGetter
  //   'someOtherGetter', // -> this.someOtherGetter
  // ])
  },
  watch: {
    items(val) {
      console.log("watching cart items", val);
    }
  },
  methods: {
    async decreaseQuantity(itemIndex) {
      console.log("itemIndex", itemIndex);
      console.log(this.items[itemIndex]);
      const updated = await CartService.updateItemQuantity(itemIndex + 1, this.items[itemIndex].quantity--);
      console.log(updated);
      if (updated) {
        this.$store.dispatch("cart/initialize");
      }
      // this.$store.dispatch("cart/updateQuantity", { line: itemIndex + 1, quantity: this.items[itemIndex].quantity-- });
    },
    increaseQuantity(itemIndex) {

    }
  },
  async mounted() {
    this.$store.dispatch("cart/initialize");
    this.$store.commit("cart/setCurrency", this.currencyObj);
    console.log(this.items);
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

  .item {
    display: flex;
    flex-flow: row nowrap;
    border-bottom: 1px solid $off-white;
    padding: 14px;

    .item-image {
      max-height: 80px;
      width: auto;
      cursor: pointer;
      margin-right: 10px;
    }

    .item-details {
      flex: 1;

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
    }

    .item-pricing {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }
  }
}
</style>

<style lang="scss">
@import "@/styles/main.scss";

.cart-body {
  background-color: $white;
}
</style>