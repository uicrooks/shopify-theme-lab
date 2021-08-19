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
    subscriptionOptions: {
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
      return productIdentityTags[0] ? productIdentityTags[0] : "";
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
    }
  },
  watch: {
    item(val) {
      console.log("renderless edit watch", val);
      if (!val.productData) {
        this.resetOptions();
        return;
      }

      this.productOptions = [];
      this.productSelected = null;

      // if no intervalOptions, then text for display
      // this.intervalSelected = Number(this.item.order_interval_frequency);

      if (this.productType === "barsoap") {
        this.intervalOptions = [
          { text: "Every 3 months", value: 3 },
          { text: "Every month", value: 1 }
        ];
        this.intervalSelected = Number(this.item.order_interval_frequency);

        // TODO: hardcoded
        this.quantityOptions = this.getQuantityOptionsForBarsoap();
        this.quantitySelected = this.item.lineItems.length;

        this.selectionOptions = this.processSelectionOptions();
      }

      if (this.productType === "haircare") {
        this.quantityOptions = [1, 2, 3, 4, 5];
      }

      if (this.productType === "toothpaste") {
        this.invervalOptions = [
          { text: "Every 3 months", value: 3 },
          { text: "Every 6 months", value: 6 
        }];

        this.quantityOptions = [1, 2, 3, 4, 5];
      }

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
    // intervalSelected() {
    //   console.log("watch intervalSelected");
    //   // For barsoaps, when switching between monthly and quarterly, defaults to quantity 3 
    //   if (this.productType === "barsoap") {
    //     console.log("update barsoap qty to 3");
    //     this.quantitySelected = 3;
    //   }
    // },
    quantitySelected(val) {
      console.log("watch quantitySelected");
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
    processSelectionOptions() {
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
      })
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
    getQuantityOptionsForBarsoap() {
      return this.intervalSelected === 1 ? [2, 3] : [3, 6, 9];
    }
  },
  render() {
    return this.$scopedSlots.default({
      productOptions: this.productOptions,
      productSelected: this.productSelected,
      productAttr: {
        value: this.productSelected,
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

