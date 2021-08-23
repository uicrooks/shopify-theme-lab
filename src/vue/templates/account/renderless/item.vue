<script>
import RechargeService from "@/vue/services/recharge.service";
import StoreService from "@/vue/services/store.service";
import DatetimeHelpers from "@/vue/services/datetime-helpers";
import SkuToId from "@/configs/account-sku-to-id";

export default {
  name: "AccountRenderlessItem",
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      itemData: {},
      lineItems: []
    };
  },
  computed: {
    itemTitle() {
      return this.item.product_title;
    },
    itemImageSrc() {
      return this.itemData.images && this.itemData.images[0] ? this.itemData.images[0].src : "";
    },
    itemProps() {
      let obj = {};
      this.item.properties.forEach(prop => {
        obj[prop.name] = prop.value;
      });
      return obj;
    },
    subscriptionInterval() {
      if (this.item.status !== "ONETIME") {
        const intervalFrequency = this.item.order_interval_frequency > 1 ? `${this.item.order_interval_frequency} ` : "";
        const intervalUnit = this.item.order_interval_frequency > 1 ? `${this.item.order_interval_unit}s` : this.item.order_interval_unit;
        return `Every ${intervalFrequency}${intervalUnit}`;
      }
      return "";
    },
    isOnetime() {
      return this.item.status === "ONETIME";
    },
    includedList() {
      let list = {};
      this.lineItems.forEach(item => {
        if (list[item.title]) {
          list[item.title] += 1;
        } else {
          list[item.title] = 1;
        }
      });
      return list;
    }
  },
  render() {
    return this.$scopedSlots.default({
      item: this.item,
      itemTitle: this.itemTitle,
      itemImageSrc: this.itemImageSrc,
      itemProps: this.itemProps,
      subscriptionInterval: this.subscriptionInterval,
      isOnetime: this.isOnetime,
      includedList: this.includedList,
      itemData: this.itemData,
      lineItems: this.lineItems,
    });
  },
  async mounted() {
    this.itemData = await StoreService.getProductById(this.item.shopify_product_id);
    console.log(this.itemData);
    console.log(this.item);

    const lineItemHandles = this.item.properties.filter(prop => prop.name.includes("fulfillment")).map(item => SkuToId[item.value.toLowerCase()]);
    console.log("lineItemHandles", lineItemHandles);
    let lineItems = [];
    for (let i = 0; i < lineItemHandles.length; i++) {
      const lineItem = await StoreService.getProductById((lineItemHandles[i]));
      console.log(lineItemHandles[i], lineItem);
      if (lineItem) {
        lineItems.push(lineItem);
      }
    }
    this.lineItems = lineItems;
  }
  // props: {
  //   subscription: {
  //     type: Object,
  //     required: true,
  //     default: () => {}
  //   }
  // },
  // computed: {
  //   subscriptionTitle() {
  //     return this.item.product_title;
  //   },
  //   subscriptionInterval() {
  //     const intervalFrequency = this.item.order_interval_frequency > 1 ? `${this.item.order_interval_frequency} ` : "";
  //     const intervalUnit = this.item.order_interval_frequency > 1 ? `${this.item.order_interval_unit}s` : this.item.order_interval_unit;
  //     return `Every ${intervalFrequency}${intervalUnit}`;
  //   },
  //   subscriptionAddress() {
  //     return `${this.item.addressObj.address1}, ${this.item.addressObj.zip}`;
  //   },
  //   upcomingDate() {
  //     const sameYear = DatetimeHelpers.isSame(new Date(), this.item.next_charge_scheduled_at, "year");
  //     return DatetimeHelpers.format(this.item.next_charge_scheduled_at, sameYear ? "MMM D" : "MMM D YYYY");
  //   },
  //   includedList() {
  //     let list = {};
  //     this.item.lineItems.forEach(item => {
  //       if (list[item.title]) {
  //         list[item.title] += 1;
  //       } else {
  //         list[item.title] = 1;
  //       }
  //     });
  //     return list;
  //   }
  // },
  // methods: {
  // },
};
</script>