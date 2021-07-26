<template>
  <div class="account-component">
    Account
    <account-orders />
  </div>
</template>

<script>
export default {
  name: "Account",
  props: {
    user: {
      type: Object,
      required: true,
      default: () => {},
    },
    ordersData: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    userTags() {
      return this.user.split("; ");
    }
  },
  mounted() {
    console.log(this.user);
    console.log(this.ordersData);

    if (!this.ordersData.id) return [];
    const ids = this.ordersData.id.split("; ");
    const orderNumbers = this.ordersData.orderNumber.split("; ");
    const createdDates = this.ordersData.createdAt.split("; ");
    const totalPrices = this.ordersData.totalPrice.split("; ");
    const fulfillmentStatus = this.ordersData.fulfillmentStatus.split("; ");
    const financialStatus = this.ordersData.financialStatus.split("; ");
    const orders = ids.map((el, index) => {
      return {
        id: el,
        orderNumber: orderNumbers[index],
        createdAt: createdDates[index],
        totalPrice: totalPrices[index],
        fulfillmentStatus: fulfillmentStatus[index],
        financialStatus: financialStatus[index]
      };
    });
    this.$store.commit("account/setOrders", orders);
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.account-component {

}
</style>