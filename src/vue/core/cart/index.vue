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
      </template>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: {
    currencyObj: {
      type: Object,
      required: true
    }
  },
  computed: {
    items() {
      return this.$store.state.cart;
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
    cart(val) {
      console.log("watching cart", val);
    }
  },
  async mounted() {
    this.$store.dispatch("cart/initialize");
    this.$store.commit("cart/setCurrency", this.currencyObj);
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

}
</style>