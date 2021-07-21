<template>
  <div class="orders-component">
    <ul>
      <li
        v-for="(order, index) of orders"
        :key="`account-order-${index}`"
      >
        {{ order.orderNumber }} - {{ order.createdAt }} - {{ order.totalPrice | money("$", 2) }} - {{ order.fulfillmentStatus }} & {{ order.financialStatus }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AccountOrders",
  computed: {
    orders() {
      return this.$store.state.account.orders;
    }
  },
  watch: {
    orders(val) {
      console.log(val);
    }
  },
  mounted() {
    console.log("orders comp", this.orders);
  }
};
</script>
