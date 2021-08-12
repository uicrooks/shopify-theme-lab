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
      lineItems: [],
    }
  },
  computed: {
    isOnetime() {
      return this.item.status === "ONETIME";
    },
    displayTitle() {
      return this.isOnetime ? this.itemData.productType : this.item.product_title.split(" - ")[0];
    },
    imageSrc() {
      return this.generateImageSrc(this.itemData);
    },
    subscriptionInterval() {
      if (this.item.status !== "ONETIME") {
        const intervalFrequency = this.item.order_interval_frequency > 1 ? `${this.item.order_interval_frequency} ` : "";
        const intervalUnit = this.item.order_interval_frequency > 1 ? `${this.item.order_interval_unit}s` : this.item.order_interval_unit;
        return `Every ${intervalFrequency}${intervalUnit}`;
      }
      return "";
    },
    includedList() {
      return this.isOnetime ? { [this.item.product_title]: this.item.quantity } : this.generateIncludedList(this.lineItems);
    }
    // itemProps() {
    //   let obj = {};
    //   this.item.properties.forEach(prop => {
    //     obj[prop.name] = prop.value;
    //   });
    //   return obj;
    // },
  },
  methods: {
    async fetchLineItems(lineItemIds) {
      let lineItems = [];
      for (let i = 0; i < lineItemIds.length; i++) {
        const lineItem = await StoreService.getProductById((lineItemIds[i]));
        if (lineItem) {
          lineItems.push({
            id: lineItem.id,
            handle: lineItem.handle,
            title: lineItem.title,
            productType: lineItem.productType,
            imageSrc: lineItem.images[0].src
          });
        }
      }
      return lineItems;
    },
    generateImageSrc(itemData) {
      return itemData.images && itemData.images[0] ? itemData.images[0].src : "";
    },
    generateIncludedList(lineItems = null) {
      if (!lineItems) {
        return {};
      }
      let list = {};
      lineItems.forEach(item => {
        list[item.title] ? list[item.title] += 1 : list[item.title] = 1;
      });
      return list;
    }
  },
  async mounted() {
    if (!this.item.data) {
      this.itemData = await StoreService.getProductById(this.item.shopify_product_id);
      this.item.data = this.itemData;
    } else {
      this.itemData = this.item.data;
    }

    if (this.isOnetime) return;
    if (!this.item.lineItems) {
      const lineItemIds = this.item.properties.filter(prop => prop.name.includes("fulfillment")).map(item => SkuToId[item.value.toLowerCase()]);
      this.lineItems = await this.fetchLineItems(lineItemIds);
      this.item.lineItems = this.lineItems;
    } else {
      this.lineItems = this.item.lineItems;
    }

    console.log(this.item);
  },
  render() {
    return this.$scopedSlots.default({
      item: this.item,
      displayTitle: this.displayTitle,
      imageSrc: this.imageSrc,
      // itemProps: this.itemProps,
      subscriptionInterval: this.subscriptionInterval,
      isOnetime: this.isOnetime,
      includedList: this.includedList,
    });
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