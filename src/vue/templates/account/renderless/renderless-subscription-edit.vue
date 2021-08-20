<script>
import ProductIdentifier from "@/vue/services/product-identifier";

const Helpers = {
  filterSubscriptionOptionSource: (productType, source) => {
    if (productType === "barsoap") {
      return source;
    }
    if (productType === "haircare") {
      let shampoos = [];
      let conditioners = [];
      source.forEach(option => {
        const optionIdentityTags = ProductIdentifier.identify(option);
        if (!optionIdentityTags[1]) return;
        if (optionIdentityTags[1] === "shampoo") {
          shampoos.push(option);
        }
        if (optionIdentityTags[1] === "conditioner") {
          conditioners.push(option);
        }
      });
      return [...shampoos, ...conditioners];
    }
    return [];
  },
  generateIntervalOptions: (productType) => {
    if (productType === "barsoap") {
      return [
        { text: "Every 3 months", value: 3 },
        { text: "Every month", value: 1 }
      ];
    }
    if (productType === "toothpaste") {
      return [
        { text: "Every 3 months", value: 3 },
        { text: "Every 6 months", value: 6 
      }];
    }
    return [];
  },
  generateSelectionOptions: (productType, item, subsOptions) => {
    if (!item || !item.lineItems) return [];

    if (productType === "barsoap") {
      return subsOptions.map(option => {
        const matchesInLineItems = item.lineItems.filter(item => {
          return item.handle == option.handle;
        });
        return {
          handle: option.handle,
          sku: option.variants && option.variants[0] ? option.variants[0].sku : null,
          title: option.title,
          imageSrc: option.fatured_image || option.images[0],
          quantity: matchesInLineItems.length,
        }
      });
    }

    if (productType === "haircare") {
      return subsOptions.map(option => {
        const optionInLineItems = item.lineItems.findIndex(item => {
          return item.handle == option.handle;
        }) >= 0;
        const subType = ProductIdentifier.identify(option) && ProductIdentifier.identify(option)[1];
        return {
          handle: option.handle,
          sku: option.variants && option.variants[0] ? option.variants[0].sku : null,
          title: option.title,
          imageSrc: option.fatured_image || option.images[0],
          quantity: optionInLineItems ? item.quantity : 0,
          subType: subType,
        }
      });
    }
  },
  getSelectionFromSelectionOptions: (productType, selectionOptions) => {
    if (productType === "barsoap") {
      let arr = [];
      // Keep index from selectionOptions array for selection removal later
      // Add n number of selection into the array; n being the quantity of the option
      selectionOptions.forEach((option, index) => {
        option.selectionOptionIndex = index;
        for (let i = 0; i < option.quantity; i++) {
          arr.push(option);
        }
      });
      return arr;
    }
    if (productType === "haircare") {
      let arr = [];
      // Add to the array if the option's quantity is bigger than 0 and the option has previousnly not been added to the array
      selectionOptions.forEach(option => {
        if (option.quantity && arr.indexOf(option.handle) < 0) {
          arr.push(option);
        }
      });
      return arr;
    }
    return [];
  },
  processHaircareSelectionOptionsOnUpdate: (selectionOptions) => {
    let shampoos = [];
    let conditioners = [];
    selectionOptions.forEach(option => {
      if (option.subType === "shampoo") {
        shampoos.push(option);
      }
      if (option.subType === "conditioner") {
        conditioners.push(option);
      }
    });
    const shampooSelected = shampoos.findIndex(option => option.quantity) > -1;
    const conditionerSelected = conditioners.findIndex(option => option.quantity) > -1;

    selectionOptions.forEach(option => {
      if (option.subType === "shampoo") {
        option.isFull = shampooSelected;
      }
      if (option.subType === "conditioner") {
        option.isFull = conditionerSelected;
      }
    });
  },
};
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
      return productIdentityTags[0] || "";
    },
    productSubType() {
      const productIdentityTags = ProductIdentifier.identify(this.item.productData);
      return productIdentityTags[1] ? productIdentityTags[1] : "";
    },
    subscriptionOptions() {
      return Helpers.filterSubscriptionOptionSource(this.productType, this.subscriptionOptionSource);
    },
    intervalText() {
      const num = Number(this.item.order_interval_frequency);
      const unit = num > 1 ? `${this.item.order_interval_unit}s` : this.item.order_interval_unit;
      const unitText = num === 1 ? unit : `${num} ${unit}`;
      return `Every ${unitText}`;
    },
    selection() {
      return Helpers.getSelectionFromSelectionOptions();
    },
    selectionUpdated() {
      if (!this.item.lineItems) return false;
      const selectionUpdated = checkIfDifferent(
        this.selection.map(option => option.handle),
        this.item.lineItems.map(option => option.handle)
      );
      // Not applicalbe to barsoap
      const quantityUpdated = this.quantitySelected !== this.item.quantity;
      return selectionUpdated || quantityUpdated;

      function checkIfDifferent(arr1, arr2) {
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
        // Calculate the total interating selectionOptions array and add each item's quantity
        const totalQty = this.selectionOptions.reduce((total, option) => total + option.quantity, 0);
        // lineItems included unique SKUs only
        return this.quantitySelected * this.item.lineItems.length === totalQty;
      }
      return true;
    },
  },
  watch: {
    item(val) {
      console.log("subs edit init!", val);
      this.resetOptions();

      if (!val.productData) return;

      this.intervalOptions = Helpers.generateIntervalOptions(this.productType);
      
      this.selectionOptions = Helpers.generateSelectionOptions(this.productType, this.item, this.subscriptionOptions);

      if (this.productType === "barsoap") {
        this.intervalSelected = Number(this.item.order_interval_frequency);
        this.quantityOptions = this.intervalSelected === 1 ? [2, 3] : [3, 6, 9];
        this.quantitySelected = this.item.lineItems.length;
      }

      if (this.productType === "haircare") {
        this.productOptions = this.subscriptionProducts.map((product, index) => {
          return {
            text: product.title,
            value: index
          };
        });
      this.productSelected = this.subscriptionProducts.findIndex(product => product.handle === this.item.productData.handle);

      this.quantityOptions = [1, 2, 3, 4, 5];
      this.quantitySelected = this.item.quantity;
      }

      if (this.productType === "toothpaste") {
        this.quantityOptions = [1, 2, 3, 4, 5];
      }

      if (this.productType === "deodorant") {
        this.quantityOptions = [1, 2, 3];
        // selectionOptions
      }

      console.log("---selectionOptions", this.selectionOptions);
    },
    selectionOptions() {
      console.log("selectionOptions on watch", this.selectionOptions);
      // Need to watch selectionOptions change to update option.isFull property for quantity switch disabling
      if (this.productType === "haircare") {
        Helpers.processHaircareSelectionOptionsOnUpdate(this.selectionOptions);
      }
    }
  },
  methods: {
    resetOptions() {
      this.productOptions = [];
      this.productSelected = null;
      this.intervalOptions = [];
      this.intervalSelected = null;
      this.quantityOptions = [];
      this.quantitySelected = 1;
      this.selectionOptions = [];
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
    onIntervalUpdated(val) {
      this.intervalSelected = val;
      if (this.productType === "barsoap") {
        // If switching between monthly and quarterly barsoap subscription, set the default quantity to 3
        this.quantitySelected = 3;
        this.quantityOptions = this.intervalSelected === 1 ? [2, 3] : [3, 6, 9];
      }
    },
    onQuantityUpdated(val) {
      this.quantitySelected = val;
      if (this.productType === "barsoap") {
        // if qtySelected is smaller than current selection, trim the selection
        const optionsToRemove = val < this.selection.length ? this.selection.slice(val) : [];
        optionsToRemove.forEach(option => this.removeOption(option));
      }
      if (this.productType === "haircare" && this.item.quantity !== val) {
        // Iterate selectionOptions array and update each item's quantity
        this.selectionOptions.forEach(option => {
          option.quantity = option.quantity ? val : 0
        });
      }
    },
  },
  render() {
    return this.$scopedSlots.default({
      productOptions: this.productOptions,
      productAttr: {
        value: this.productSelected,
      },
      productEvents: {
        change: (val) => this.productSelected = val
      },
      intervalOptions: this.intervalOptions,
      intervalText: this.intervalText,
      intervalAttr: {
        value: this.intervalSelected,
      },
      intervalEvents: {
        change: (val) => this.onIntervalUpdated(val)
      },
      quantityOptions: this.quantityOptions,
      quantityAttr: {
        value: this.quantitySelected,
      },
      quantityEvents: {
        change: (val) => this.onQuantityUpdated(val)
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

