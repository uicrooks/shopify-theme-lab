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
        let shampoos = [];
        let conditioners = [];
        this.subscriptionOptionSource.forEach(option => {
          const optionIdentityTags = ProductIdentifier.identify(option);
          if (!optionIdentityTags[1]) return false;
          if (optionIdentityTags[1] === "shampoo") {
            shampoos.push(option);
          }
          if (optionIdentityTags[1] === "conditioner") {
            conditioners.push(option);
          }
        });
        return [...shampoos, ...conditioners];
        // const filtered = this.subscriptionOptionSource.filter(option => {
        //   const optionIdentityTags = ProductIdentifier.identify(option);
        //   console.log(optionIdentityTags);
        //   if (!optionIdentityTags[1]) return false;
        //   if (this.productSubType === "kit") {
        //     return optionIdentityTags[1] !== this.productSubType;
        //   } else {
        //     return optionIdentityTags[1] === this.productSubType;
        //   }
        // });
        // return filtered;
      }
      return [];
    },
    intervalSelectedText() {
      const num = Number(this.item.order_interval_frequency);
      const unit = num > 1 ? `${this.item.order_interval_unit}s` : this.item.order_interval_unit;
      return `Every ${num === 1 ? unit : num + " " + unit}`;
    },
    selection() {
      if (this.productType === "barsoap") {
        let arr = [];
        this.selectionOptions.forEach((option, index) => {
          option.selectionOptionIndex = index;
          for (let i = 0; i < option.quantity; i++) {
            arr.push(option);
          }
        });
        return arr;
      }
      if (this.productType === "haircare") {
        let arr = [];
        this.selectionOptions.forEach((option, index) => {
          option.selectionOptionIndex = index;
          if (option.quantity && arr.indexOf(option.handle) < 0) {
            arr.push(option);
          }
        });
        return arr;
      }
      return [];
    },
    selectionUpdated() {
      if (!this.item.lineItems) return false;
      
      const selectionOptionsUpdated = checkIfselectionOptionsUpated(this.selection.map(option => option.handle), this.item.lineItems.map(option => option.handle));
      
      const qtyUpdated = this.item.quantity !== this.quantitySelected;

      return selectionOptionsUpdated || qtyUpdated;

      function checkIfselectionOptionsUpated(arr1, arr2) {
        arr1.sort();
        arr2.sort();
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) {
            return true;
          }
        }
        return false;
      }
    },
    selectionComplete() {
      if (this.productType === "barsoap") {
        return this.selection.length === this.quantitySelected;
      }
      if (this.productType === "haircare") {
        const totalQty = this.selectionOptions.reduce((total, option) => total + option.quantity, 0);
        return this.quantitySelected * this.item.lineItems.length === totalQty;
      }
      return true;
    },
  },
  watch: {
    item(val) {
      console.log("subsEditOptions.vue", val);
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
      console.log("watching qtySelected", val);
      if (this.productType === "barsoap") {
        // if qtySelected is smaller than current selection, trim the selection
        const optionsToRemove = val < this.selection.length ? this.selection.slice(val) : [];
        optionsToRemove.forEach(option => this.removeOption(option));
      }
      if (this.productType === "haircare" && this.item.quantity !== val) {
        console.log("hair type, qty updated");
        this.selectionOptions.forEach(option => {
          option.quantity = option.quantity ? val : 0
        });
      }
    },
    selectionOptions() {
      console.log("watching selectionOptions");
      console.log(this.selectionOptions);

      // Need to watch selectionOptions change to update option.isFull property for quantity switch disabling
      if (this.productType === "haircare") {
        let shampoos = [];
        let conditioners = [];
        this.selectionOptions.forEach(option => {
          if (option.subType === "shampoo") {
            shampoos.push(option);
          }
          if (option.subType === "conditioner") {
            conditioners.push(option);
          }
        });
        const shampooSelected = shampoos.findIndex(option => option.quantity) > -1;
        const conditionerSelected = conditioners.findIndex(option => option.quantity) > - 1;
        console.log("shampooSelected", shampooSelected);
        console.log("condSelected", conditionerSelected);
        this.selectionOptions.forEach(option => {
          if (option.subType === "shampoo") {
            option.isFull = shampooSelected;
          }
          if (option.subType === "conditioner") {
            option.isFull = conditionerSelected;
          }
        });

      }
    }
  },
  methods: {
    resetOptions() {
      console.log("resetOptions");
      this.productOptions = [];
      this.productSelected = null;
      this.indexForHaircareProductSelected = null;
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
      this.quantitySelected = this.item.quantity;

      this.processSelectionOptionsForHaircare();
    },
    processSelectionOptionsForHaircare() {
      const processed = this.subscriptionOptions.map(option => {
        const inCurrentOrder = this.item.lineItems.filter(item => item.handle === option.handle);
        const subType = ProductIdentifier.identify(option) && ProductIdentifier.identify(option)[1];
        return {
          handle: option.handle,
          sku: option.variants && option.variants[0] ? option.variants[0].sku : null,
          title: option.title,
          imageSrc: option.fatured_image || option.images[0],
          quantity: inCurrentOrder.length ? this.item.quantity : 0,
          subType: subType,
        };
      });
      console.log(processed);
      this.selectionOptions = processed;
    },
    decreaseQuantity(index) {
      let selectionOptionsCopy = this.selectionOptions.slice(0);
      let option = selectionOptionsCopy[index];
      if (this.productType === "haircare") {
        option.quantity -= this.quantitySelected;
      } else {
        option.quantity--;
      }
      this.selectionOptions = selectionOptionsCopy;
    },
    increaseQuantity(index) {
      let selectionOptionsCopy = this.selectionOptions.slice(0);
      let option = selectionOptionsCopy[index];
      if (this.productType === "haircare") {
        option.quantity += this.quantitySelected;
      } else {
        option.quantity++;
      }
      this.selectionOptions = selectionOptionsCopy;
    },
    removeOption(option) {
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

