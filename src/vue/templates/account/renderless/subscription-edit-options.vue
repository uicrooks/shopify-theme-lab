<script>
import ProductIdentifier from "@/vue/services/product-identifier";

export default {
  name: "AccountRenderlessSubscriptionEdit",
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {}
    },
    subscriptionProducts: {
      type: Array,
      required: true,
      default: () => []
    },
    subscriptionOptionSource: {
      type: Array,
      required: true,
      default: () => []
    },
  },
  data() {
    return {
      productOptions: [],
      productSelected: null,
      indexForHaircareProductSelected: null,
      intervalOptions: [],
      intervalSelected: null,
      quantityOptions: [],
      quantitySelected: 1,
      selectionOptions: [],
    };
  },
  computed: {
    productType() {
      const productIdentityTags = ProductIdentifier.identify(this.item.productData);
      return productIdentityTags[0] ? productIdentityTags[0] : "";
    },
    productSubType() {
      const productIdentityTags = ProductIdentifier.identify(this.item.productData);
      return productIdentityTags[1] ? productIdentityTags[1] : "";
    },
    subscriptionOptions() {
      if (this.productType === "barsoap") {
        return this.subscriptionOptionSource;
      }
      if (this.productType === "haircare") {
        console.log("productSubType", this.productSubType);
        const filtered = this.subscriptionOptionSource.filter(option => {
          const optionIdentityTags = ProductIdentifier.identify(option);
          console.log(optionIdentityTags);
          if (!optionIdentityTags[1]) return false;
          if (this.productSubType === "kit") {
            return optionIdentityTags[1] !== this.productSubType;
          } else {
            return optionIdentityTags[1] === this.productSubType;
          }
        });
        return filtered;
      }
      return [];
    },
    intervalSelectedText() {
      const num = Number(this.item.order_interval_frequency);
      const unit = num > 1 ? `${this.item.order_interval_unit}s` : this.item.order_interval_unit;
      return `Every ${num === 1 ? unit : num + " " + unit}`;
    },
    selection() {
      let arr = [];
      this.selectionOptions.forEach((option, index) => {
        option.selectionOptionIndex = index;
        for (let i = 0; i < option.quantity; i++) {
          arr.push(option);
        }
      });
      return arr;
    },
    selectionUpdated() {
      if (!this.item.lineItems) return false;
      const current = this.selection.map(option => option.handle).sort();
      const initial = this.item.lineItems.map(option => option.handle).sort();
      for (let i = 0; i < initial.length; i++) {
        if (initial[i] !== current[i]) {
          return true;
        }
      }
      return false;
    },
    selectionComplete() {
      return this.selection.length === this.quantitySelected;
    },
  },
  watch: {
    item(val) {
      this.resetOptions();
      if (!val.productData) return;

      if (this.productType === "barsoap") {
        this.initializeOptionsForBarsoap();
      }
      if (this.productType === "haircare") {
        this.initializeOptionsForHaircare();
      }

      // Need options for: interval
      if (this.productType === "toothpaste") {
        this.invervalOptions = [
          { text: "Every 3 months", value: 3 },
          { text: "Every 6 months", value: 6 
        }];
        this.quantityOptions = [1, 2, 3, 4, 5];
      }

      // Need options for: quantity, selection
      if (this.productType === "deodorant") {
        this.quantityOptions = [1, 2, 3];
      }
      console.log("productOptions");
      console.log(this.productOptions);
      console.log(this.productSelected);
      console.log("intervalOptions");
      console.log(this.intervalOptions);
      console.log(this.intervalSelected);
      console.log("qtyOptions");
      console.log(this.quantityOptions);
      console.log(this.quantitySelected);
      console.log("selectionOptions");
      console.log(this.selectionOptions);
      console.log(this.selection);
    },
    quantitySelected(val) {
      // if qtySelected is smaller than current selection, trim the selection
      const optionsToRemove = val < this.selection.length ? this.selection.slice(val) : [];
      optionsToRemove.forEach(option => this.removeOption(option));
    },
  },
  methods: {
    resetOptions() {
      console.log("resetOptions");
      this.productOptions = [];
      this.productSelected = null;
      this.intervalOptions = [];
      this.intervalSelected = null;
      this.quantityOptions = [];
      this.quantitySelected = 1;
      this.selectionOptions = [];
    },
    getQuantityOptionsForBarsoap() {
      return this.intervalSelected === 1 ? [2, 3] : [3, 6, 9];
    },
    initializeOptionsForBarsoap() {
      // Need options for: interval, quantity, selection
      this.intervalOptions = [
        { text: "Every 3 months", value: 3 },
        { text: "Every month", value: 1 }
      ];
      this.intervalSelected = Number(this.item.order_interval_frequency);

      this.quantityOptions = this.getQuantityOptionsForBarsoap();
      this.quantitySelected = this.item.lineItems.length;

      this.selectionOptions = this.processSelectionOptionsForBarsoap();
    },
    processSelectionOptionsForBarsoap() {
      if (!this.item.lineItems) return [];
      return this.subscriptionOptions.map(option => {
        const inCurrentOrder = this.item.lineItems.filter(item => item.handle === option.handle);
        return {
          handle: option.handle,
          sku: option.variants && option.variants[0] ? option.variants[0].sku : null,
          title: option.title,
          imageSrc: option.fatured_image || option.images[0],
          quantity: inCurrentOrder.length
        };
      });
    },
    initializeOptionsForHaircare() {
      // Need options for: product, quantity, selection
      // match by index in subscriptionProdcuts
      this.productOptions = this.subscriptionProducts.map((product, index) => {
        return {
          text: product.title,
          value: index
        };
      });

      this.indexForHaircareProductSelected = this.subscriptionProducts.findIndex(product => product.handle === this.item.productData.handle);

      this.quantityOptions = [1, 2, 3, 4, 5];

      this.processSelectionOptionsForHaircare();
    },
    processSelectionOptionsForHaircare() {
      const processed = this.subscriptionOptions.map(option => {
        const inCurrentOrder = this.item.lineItems.filter(item => item.handle === option.handle);
        return {
          handle: option.handle,
          sku: option.variants && option.variants[0] ? option.variants[0].sku : null,
          title: option.title,
          imageSrc: option.fatured_image || option.images[0],
          selected: inCurrentOrder.length
        };
      });
      console.log(processed);
      this.selectionOptions = processed;
    },
    decreaseQuantity(index) {
      console.log("Decrase", index);
      let option = this.selectionOptions[index];
      if (option.quantity >= 1) {
        option.quantity--;
      }
      console.log(option);
    },
    increaseQuantity(index) {
      console.log("Increase", index);
      let option = this.selectionOptions[index];
      option.quantity++;
      console.log(option);
    },
    removeOption(option) {
      console.log("remove", option);
      const index = option.selectionOptionIndex;
      this.decreaseQuantity(index);
    },
  },
  render() {
    return this.$scopedSlots.default({
      productOptions: this.productOptions,
      productAttr: {
        value: this.productType === "haircare" ? this.indexForHaircareProductSelected : this.productSelected,
      },
      productEvents: {
        change: (val) => this.productSelected = val
      },
      intervalOptions: this.intervalOptions,
      intervalSelectedText: this.intervalSelectedText,
      intervalAttr: {
        value: this.intervalSelected,
      },
      intervalEvents: {
        change: (val) => {
          this.intervalSelected = val;
          if (this.productType === "barsoap") {
            console.log("if barsoap, swtiching between interval defaults qty to 3");
            this.quantitySelected = 3;
            this.quantityOptions = this.getQuantityOptionsForBarsoap();
          }
        }
      },
      quantityOptions: this.quantityOptions,
      quantityAttr: {
        value: this.quantitySelected,
      },
      quantityEvents: {
        change: (val) => this.quantitySelected = val
      },
      selectionOptions: this.selectionOptions,
      selection: this.selection,
      selectionComplete: this.selectionComplete,
      selectionUpdated: this.selectionUpdated,
      decreaseQuantity: this.decreaseQuantity,
      increaseQuantity: this.increaseQuantity,
      removeOption: this.removeOption,
    });
  }
};
</script>

