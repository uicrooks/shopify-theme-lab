<template>
  <div class="account-billing-info-component">
    <div 
      v-if="hasCreditCard"
      class="info"
    >
      <img
        v-if="rechargePaymentSource.cardImage"
        :src="rechargePaymentSource.cardImage"
        :alt="`${rechargePaymentSource.card_brand} logo`"
      >
      <span
        v-else-if="!rechargePaymentSource.cardImage || showDetails"
        class="card-brand"
      >
        {{ rechargePaymentSource.card_brand }}
      </span>
      <span>
        ending in {{ rechargePaymentSource.card_last4 }}
      </span>
      <div
        v-if="showDetails"
        class="info-row"
      >
        <span 
          v-if="hasActivePaymentMethod"
        >
          Expiring {{ rechargePaymentSource.card_exp_month}}/{{ rechargePaymentSource.card_exp_year }}
        </span>
        <span 
          v-else
          class="attention"
        >
          Expired
        </span>
      </div>
    </div>
    <div 
      v-else-if="hasActivePaymentMethod"
      class="info"
    >
      <img
        v-if="rechargePaymentSource.cardImage"
        :src="rechargePaymentSource.cardImage"
        :alt="`${rechargePaymentSource.card_brand} logo`"
      >
      <span>
        Paypal
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AccountBillingInfo",
  props: {
    showDetails: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters("account", ["rechargePaymentSource", "rechargeUser"]),
    hasActivePaymentMethod() {
      return this.rechargePaymentSource.status === "active";
    },
    hasCreditCard() {
      return this.rechargePaymentSource.card_last4;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.account-billing-info-component {

  .info {
    @include font-style-body($color: $brown);

    img {
      width: 30px;
      margin-right: 3px;
    }

    span {

      &.card-brand {
        text-transform: capitalize;
      }

      &.attention {
        color: $red;
      }
    }

    .info-row {
      margin-top: 3px;
    }
  }
}
</style>