<template>
  <div class="account-subscriptions-component">
    <h4>Subscriptions</h4>
    <div
      v-if="subscriptions.length === 0"
      class="subscription-placeholder"
    >
      <b-spinner />
    </div>
    <div v-else>
      <account-subscription
        v-for="subscription of subscriptions"
        :key="`${subscription.id}`"
        :subscription="subscription"
      />
    </div>
  </div>
</template>

<script>
import RechargeService from "@/vue/services/recharge.service";
import StoreService from "@/vue/services/store.service";
import DatetimeHelpers from "@/vue/services/datetime-helpers";
import SkuToId from "@/configs/account-sku-to-id";
import { mapGetters } from "vuex";

export default {
  name: "AccountSubscriptions",
  computed: {
    ...mapGetters("account", ["rechargeUser", "subscriptions"]),
  },
  methods: {
    async processSubscriptionData(subscriptions, addresses, onetimes) {
      for (let i = 0; i < subscriptions.length; i++) {
        const addressMatch = addresses.filter(address => address.id === subscriptions[i].address_id)[0];
        subscriptions[i].addressObj = addressMatch;

        const onetimeMatches = onetimes.filter(onetime => {
          return onetime.address_id === subscriptions[i].address_id && DatetimeHelpers.isSame(onetime.next_charge_scheduled_at, subscriptions[i].next_charge_scheduled_at, "day");
        });
        subscriptions[i].onetimes = onetimeMatches;

        const product = await StoreService.getProductById(subscriptions[i].shopify_product_id);
        subscriptions[i].shopifyProduct = {
          handle: product.handle,
          description: product.description,
          imgSrc: product.images[0] && product.images[0].src,
          price: product.variants[0] && product.variants[0].price,
          compareAtPrice: product.variants[0] && product.variants[0].compare_at_price,
        };

        const lineItemHandles = subscriptions[i].properties.filter(prop => prop.name.includes("fulfillment")).map(item => parseInt(SkuToId[item.value]));
        console.log("lineItemHandles", lineItemHandles);
        let lineItems = [];
        for (let i = 0; i < lineItemHandles.length; i++) {
          const lineItem = await StoreService.getProductById((lineItemHandles[i]));
          console.log(lineItemHandles[i], lineItem);
          if (lineItem) {
            lineItems.push(lineItem);
          }
        }
        subscriptions[i].lineItems = lineItems;
      }
      return subscriptions;
    },
    
  },
  async mounted() {
    const data = await RechargeService.getUserResource(this.rechargeUser.id, "subscriptions");
    this.$store.commit("account/setOnetimes", data.onetimes);
    console.log(data);
    const subscriptionData = data.subscriptions.filter(subs => !subs.cancelled_at);
    // const subscriptions = data.subscriptions;
    const addressData = await RechargeService.getUserResource(this.rechargeUser.id, "addresses");
    const subscriptions = await this.processSubscriptionData(subscriptionData, addressData, data.onetimes);
    this.$store.commit("account/setSubscriptions", subscriptions);
    
    console.log(subscriptions);
  }
};
</script>

<style lang="scss" scoped>
@use "@/styles/main" as global;

.account-subscriptions-component {

  h4 {
    margin-bottom: 14px;
    @include global.font-style-body($size: 20px, $weight: 600);
  }

  .subscription-placeholder {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    background-color: global.$white;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 10%);
    padding: 20px;
    margin-bottom: 14px;
  }
}
</style>