<template>
  <div class="account-order-card-component">
    <div class="card-row">
      <div class="row-label">Order Date</div>
      <div class="row-val">{{ orderDate }}</div>
    </div>
    <div class="card-row">
      <div class="row-label">Order Number</div>
      <div class="row-val">#{{ order.orderNumber}}</div>
    </div>
    <div class="card-row">
      <div class="row-label">Order Total</div>
      <div class="row-val">{{ order.total | money("$", 2) }}</div>
    </div>
    <div class="card-row">
      <div class="row-label">Order Status</div>
      <div class="row-val">{{ orderStatus }}</div>
    </div>
  </div>
</template>

<script>
import DatetimeHelpers from "@/vue/services/datetime-helpers";

export default {
  name: "AccountOrderCard",
  props: {
    order: {
      type: Object,
      required: true,
      default: () => {}
    },
  },
  computed: {
    orderDate() {
      return DatetimeHelpers.format(this.order.createdAt, "MMM D, YYYY");
    },
    orderStatus() {
      if (this.order.cancelled === "true") {
        return this.order.financialStatus ? `Cancelled & ${this.order.financialStatus}` : "Cancelled";
      }
      if (this.order.fulfillmentStatus === "fulfilled") {
        return "Tracking Available";
      }
      return "Processing";
    }
  },
  mounted() {
    console.log(this.order);
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.account-order-card-component {
  padding: 20px 15px;
  background-color: $white;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 10%);
  margin-bottom: 30px;
  @include font-style-body($color: $brown);

  .card-row {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 8px;
  
    .row-label {
      @include font-style-body($weight: 600);
    }

    .row-val {
      flex: 1;
      text-align: right;
      text-transform: capitalize;

      &.green {
        color: #203620;
      }
    }
  }
}
</style>
