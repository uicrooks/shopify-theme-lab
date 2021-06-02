<template>
  <div class="cart-component">
    <b-icon
      v-b-toggle.cart
      icon="cart"
      font-scale="2"
    />
    <span>{{ numOfItems }}</span>
    <b-sidebar
      id="cart"
      aria-labelledby="cart-title"
      title="Sidebar"
      right
      no-header
      shadow
      backdrop
    >
      <template #default="{ hide }">
        <div class="cart-title">
          Your Cart
          <b-icon
            v-b-toggle.cart
            icon="x"
            font-scale="1.5"
          />
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import CartService from "@/vue/services/cart.service";
// import StoreService from "@/vue/services/store.service";

export default {
  data() {
    return {
      cart: null
    }
  },
  computed: {
    numOfItems() {
      return this.cart && this.cart.item_count ? this.cart.item_count : 0;
    }
  },
  async mounted() {
    this.cart = await CartService.test();
    console.log(this.cart);
  }
};
</script>

<style scoped lang="scss">
.cart-component {

  .cart-title {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }

}
</style>