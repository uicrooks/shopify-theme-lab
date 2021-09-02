<script>
import StoreService from "@/vue/services/store.service";
import ProductIdentifier from "@/vue/services/product-identifier";
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
    },
    fetchAndUpdate: {
      type: Boolean,
      required: false,
      default: true,
    },
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
      return this.isOnetime ? (this.item.variant_title ? this.item.variant_title.split(" / ")[0] : "") : (this.item.product_title ? this.item.product_title.split(" - ")[0] : "");
    },
    displayTitleWithQuantity() {
      if (this.isOnetime) return this.displayTitle;
      return `${this.displayTitle} - ${this.quantityWithUnit}`;
    },
    quantityWithUnit() {
      if (this.isOnetime) return "";
      const identityString = ProductIdentifier.getIdentityString(this.productData);
      const unit = ProductIdentifier.getUnitNameByIdentityString(identityString);
      const quantity = ["barsoap", "deodorant"].includes(identityString) ? this.lineItems.length : this.item.quantity;
      const unitText = quantity > 1 ? `${unit}s` : unit;
      return `${quantity} ${unitText}`;
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
      if (!this.isOnetime) {
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
  watch: {
    item() {
      console.log("(renderless OrderItem) item watched");
      this.initialize("item watched");
    }
  },
  methods: {
    async initialize() {
      console.log("(renderless OrderItem) initialize()");
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
        // console.log("lineItemIds", lineItemIds);
        const lineItems = await this.fetchLineItems(lineItemIds);
        updateObj.lineItems = lineItems;
        this.lineItems = lineItems;
      } else {
        this.lineItems = this.item.lineItems;
      }

      if (this.fetchAndUpdate && (!this.item.productData || !this.item.propertyObj || !this.item.lineItems)) {
        console.log("~~~ initialize(), update item to store");
        this.$store.commit("account/updateOrderItemInRefillBox", {
          index: this.index,
          data: updateObj
        });
      }
      this.loading = false;
      console.log("~~~ initialize(), loading done");
      this.$emit("loaded");
    },
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
        list[item.title] ? list[item.title] += this.item.quantity : list[item.title] = this.item.quantity;
      });
      return list;
    }
  },
  render() {
    return this.$scopedSlots.default({
      loading: this.loading,
      isOnetime: this.isOnetime,
      item: this.item,
      displayTitle: this.displayTitle,
      displayTitleWithQuantity: this.displayTitleWithQuantity,
      quantityWithUnit: this.quantityWithUnit,
      price: this.price,
      compareAtPrice: this.compareAtPrice,
      subscriptionInterval: this.subscriptionInterval,
      imageSrc: this.imageSrc,
      includedList: this.includedList,
    });
  },
  async mounted() {
    this.initialize();
  },
  render() {
    return this.$scopedSlots.default({
      loading: this.loading,
      isOnetime: this.isOnetime,
      item: this.item,
      displayTitle: this.displayTitle,
      displayTitleWithQuantity: this.displayTitleWithQuantity,
      quantityWithUnit: this.quantityWithUnit,
      price: this.price,
      compareAtPrice: this.compareAtPrice,
      subscriptionInterval: this.subscriptionInterval,
      imageSrc: this.imageSrc,
      includedList: this.includedList,
    });
  }
};
</script>