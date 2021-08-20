<script>
import StoreService from "@/vue/services/store.service";
import SkuToId from "@/configs/account-sku-to-id";
import { mapGetters } from "vuex";

export default {
  name: "AccountRenderlessOrderItem",
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {}
    },
    index: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {
      loading: true,
      productData: {},
      propertyObj: {},
      lineItems: []
    };
  },
  computed: {
    ...mapGetters("products", ["subscriptionCollections"]),
    isOnetime() {
      return this.item.status === "ONETIME";
    },
    displayTitle() {
      return this.isOnetime ? this.item.variant_title.split(" / ")[0] : this.item.product_title.split(" - ")[0];
    },
    price() {
      return this.item.price * this.item.quantity;
    },
    compareAtPrice() {
      if (this.loading) return null;
      return this.productData.variants && this.productData.variants[0].compareAtPrice ? parseInt(this.productData.variants[0].compareAtPrice) * this.item.quantity : null;
    },
    imageSrc() {
      if (this.loading) return null;
      return this.generateImageSrc(this.productData);
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
      if (this.isOnetime) {
        return { [this.item.product_title]: this.item.quantity };
      }
      return this.loading ? {} : this.generateIncludedList(this.lineItems);
    }
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
      return itemData && itemData.images && itemData.images[0] ? itemData.images[0].src : "";
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
    this.loading = true;
    let updateObj = {
      productData: {},
      propertyObj: {},
      lineItems: []
    };

    if (!this.item.productData) {
      const productData = await StoreService.getProductById(this.item.shopify_product_id);
      updateObj.productData = productData;
      this.productData = productData;
    } else {
      this.productData = this.item.productData;
    }

    if (!this.item.propertyObj) {
      let obj = {};
      this.item.properties.forEach(prop => {
        obj[prop.name] = prop.value;
      });
      updateObj.propertyObj = obj;
      this.propertyObj = obj;
    } else {
      this.propertyObj = this.item.propertyObj;
    }

    if (!this.item.lineItems) {
      const lineItemIds = this.item.properties.filter(prop => prop.name.includes("fulfillment")).map(item => SkuToId[item.value.toLowerCase()]);
      console.log("lineItemIds", this.item, lineItemIds);
      const lineItems = await this.fetchLineItems(lineItemIds);
      updateObj.lineItems = lineItems;
      this.lineItems = lineItems;
    } else {
      this.lineItems = this.item.lineItems;
    }

    if (!this.item.productData || !this.item.propertyObj || !this.item.lineItems) {
      this.$store.commit("account/updateOrderItemInRefillBox", {
        index: this.index,
        data: updateObj
      });
    }
    this.loading = false;
    this.$emit("loaded");
  },
  render() {
    return this.$scopedSlots.default({
      loading: this.loading,
      isOnetime: this.isOnetime,
      item: this.item,
      displayTitle: this.displayTitle,
      imageSrc: this.imageSrc,
      price: this.price,
      compareAtPrice: this.compareAtPrice,
      subscriptionInterval: this.subscriptionInterval,
      includedList: this.includedList,
    });
  }
};
</script>