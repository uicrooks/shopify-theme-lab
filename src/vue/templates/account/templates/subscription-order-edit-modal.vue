<template>
  <div class="subscription-order-edit-modal-component">
    <b-modal
      v-model="showModalFlag"
      size="lg"
      body-class="edit-modal-content"
      footer-class="edit-modal-footer"
      no-close-on-esc
      no-close-on-backdrop
      scrollable
      centered
      hide-header
    >
      <div class="edit-modal-header">
        <span
          class="back-button"
          @click="hideModal"
        >
          <i 
            class="icon-squatch icon-size-xs icon-chevron-left"
          />
          Back
        </span>
        <div
          v-if="productOptions.length > 0"
          class="field-wrapper"
        >
          <label>Product</label>
          <b-form-select
            v-model="productSelected"
          :options="productOptions"
          class="select-input"
          />
        </div>
        <div class="field-wrapper">
          <label>Billed & Shipped</label>
          <div
            v-if="intervalOptions.length === 0"
            class="text-display"
          >
            {{ intervalSelectedTextDisplay }}
          </div>
          <div v-else>
            <b-form-select
              v-model="intervalSelected"
              :options="intervalOptions"
              class="select-input"
            />
          </div>
        </div>
        <div
          v-if="quantityOptions.length > 0"
          class="field-wrapper"
        >
          <label>
            {{ quantityLabel }}
          </label>
          <b-form-select
            v-model="quantitySelected"
          :options="quantityOptions"
          class="select-input"
          />
        </div>
      </div>
      <div class="edit-modal-body">
        <div
          v-if="selectionOptions.length > 0"
          class="field-wrapper"
        >
          <label>
            Selection
          </label>
          <div>
            <div
              v-for="(option, index) of selectionOptions"
              :key="option.id"
              class="option"
            >
              <div class="option-label">
                <img
                  :src="option.imageSrc"
                  :alt="`${option.title} image`"
                >
                <div>
                  {{ option.title }}
                </div>
              </div>
              <quantity-switch
                :quantity="option.quantity"
                :index="index"
                :decrease-disabled="option.quantity === 0"
                :increase-disabled="selectionComplete"
                @decrease="decreaseQuantity"
                @increase="increaseQuantity"
                class="qty-switch"
              />
            </div>
          </div>
        </div>
      </div>
      <template #modal-footer>
        <div class="label">
          Selected
          <span>
            ({{ selection.length }} of {{ quantitySelected }})
          </span>
        </div>
        <div class="selections">
          <div
            v-for="(option, index) of selection"
            :key="`selection-option-${index}`"
            class="selection"
          >
            <i 
              class="icon-squatch icon-cross"
              @click="removeOption(option)"
            />
            <img
              :src="option.imageSrc"
              :alt="`Selected option image for ${option.title}`"
            >
            <div class="option-name">
              {{ option.title }}
            </div>
          </div>
        </div>
        <squatch-button
          :disabled="!selectionUpdated || !selectionComplete"
          class="save-button"
          @clicked="save"
        >
          Save
        </squatch-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import ProductIdentifier from "@/vue/services/product-identifier";
import { mapGetters } from "vuex";

export default {
  name: "AccountSubscriptionOrderEditModal",
  props: {
    showModal: {
      type: Boolean,
      required: true,
      default: false
    },
    item: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      showModalFlag: false,
      productSelected: null,
      intervalSelected: null,
      quantitySelected: 1,
      optionsSelected: [],
      selectionOptions: [],
    };
  },
  computed: {
    ...mapGetters("products", ["collections", "subscriptionCollections"]),
    productIdentityTags() {
      return ProductIdentifier.identify(this.item, true);
    },
    productType() {
      return this.productIdentityTags[0] ? this.productIdentityTags[0] : "";
    },
    subscriptionCollection() {
      return this.subscriptionCollections[this.productType] ? this.subscriptionCollections[this.productType] : [];
    },
    collection() {
      return this.collections[this.productType] ? this.collections[this.productType] : [];
    },
    quantityLabel() {
      if (this.productType === "soap") {
        return "Number of Bars";
      }
      if (this.productType === "deodorant") {
        return "Number of Sticks";
      }
      return "Quantity";
    },
    productOptions() {
      if (this.productType === "haircare") {
        return this.subscriptionCollection.map(item => item.title);
      }
      return [];
    },
    intervalOptions() {
      if (this.productType === "soap") {
        return [{ text: "Quarterly", value: 3 }, { text: "Monthly", value: 1 }];
      }
      if (this.productType === "toothpaste") {
        return [{ text: "Every 3 months", value: 3 }, { text: "Every 6 months", value: 6 }];
      }
      return [];
    },
    intervalSelectedTextDisplay() {
      const num = Number(this.item.order_interval_frequency);
      const unit = num > 1 ? `${this.item.order_interval_unit}s` : this.item.order_interval_unit;
      return `Every ${num === 1 ? unit : num + " " + unit}`;
    },
    quantityOptions() {
      if (this.productType === "soap") {
        return this.intervalSelected === 1 ? [2, 3] : [3, 6, 9];
      }
      if (this.productType === "haircare" || this.productType === "toothpaste") {
        return [1, 2, 3, 4, 5];
      }
      if (this.productType === "deodorant") {
        return [1, 2, 3];
      }
      return [];
    },
    selection() {
      let arr = [];
      this.selectionOptions.forEach((option, index) => {
        option.selectionOptionIndex = index;
        const optionArr = Array(option.quantity).fill(option);
        arr.push(optionArr);
      });
      return arr.flat();
    },
    selectionUpdated() {
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
    showModal(val) {
      console.log("showModal?", val);
      this.showModalFlag = val;
    },
    item() {
      console.log("itemToEdit - type:", this.productType, this.productIdentityTags);
      console.log(this.item);
      console.log("subsCollections", this.subscriptionCollections);
      console.log("collections", this.collections);

      this.productSelected = this.getProductSelected();
      this.intervalSelected = this.getIntervalSelected();
      this.quantitySelected = this.getQuantitySelected();
      this.selectionOptions = this.getSelectionOptions();

      console.log("productSelected", this.productSelected);
      console.log(this.productOptions);
      console.log("intervalSelected", this.intervalSelected);
      console.log(this.intervalOptions);
      console.log("qtySelected", this.quantitySelected);
      console.log(this.quantityOptions);
      console.log("selectionOptions", this.selectionOptions);
    },
    intervalSelected(val) {
      if (this.productType === "soap") {
        this.quantitySelected = 3;
      }
    },
    quantitySelected(val) {
      console.log("watching qatySelected", val, this.selection.length);
      const optionsToRemove = val < this.selection.length ? this.selection.slice(val) : [];
      optionsToRemove.forEach(option => this.removeOption(option));
    }
  },
  methods: {
    hideModal() {
      this.$emit("hide");
      // reset
    },
    getProductSelected() {
      if (this.productType === "haircare") {
          const match = this.subscriptionCollection.filter(item => {
          return item.title === this.item.product_title;
        })[0];
        return match && match.title ? match.title : "";
      }
      return "";
    },
    getIntervalSelected() {
      return Number(this.item.order_interval_frequency);
    },
    getQuantitySelected() {
      if (["soap", "deodorant"].includes(this.productType)) {
        if (this.item.lineItems) {
          return this.item.lineItems.length;
        }
        const numFromTitle = this.item.product_title.split(" - ")[1];
        return numFromTitle ? numFromTitle[0] : 1;
      }
      return this.item.quantity;
    },
    getSelectionOptions() {
      if (this.productType === "soap") {
        return this.collection.filter(product => {
          return ProductIdentifier.identify(product)[0] === "soap"
        }).map(product => {
          const matches = this.item.lineItems.filter(item => {
            return item.handle === product.handle;
          });
          return {
            title: product.title,
            imageSrc: product.featured_image || product.images[0],
            handle: product.handle,
            sku: product.variants && product.variants[0] ? product.variants[0].sku : "",
            quantity: matches.length
          };
        });
      }
      if (this.productType === "haircare") {
        return [];
      }
      return this.collection;
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
    save() {
      console.log("Save");
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/main.scss";

.edit-modal-content {
  padding: 0; 

  .field-wrapper {
    @include font-style-body($color: $dark-brown);
    margin-bottom: 14px;

    label {
      display: block;
      margin-bottom: 5px;
      @include font-style-body-bold($color: $brown);
    }

    .text-display {
      padding: 3px 5px;
    }
    
    .select-input {
      width: 100%;
      padding: 3px 5px;
    }

    .option {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      
      .option-label {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        img {
          width: 40px;
          margin-right: 8px;
        }
      }
    }
  }

  .edit-modal-header {
    position: sticky;
    top: 0;
    padding: 15px 15px 10px 15px;
    background-color: $white;

    .back-button {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      cursor: pointer;
      margin-bottom: 15px;
      @include font-style-body-bold();

      .icon-squatch {
        font-size: 13px !important;
        margin-right: 3px;
        margin-bottom: 1px;
      }
    }
  }

  .edit-modal-body {
    padding: 0 15px;

    .qty-switch {
      @include font-style-body();
      @include layout-md {
        width: 80px;
      }

      .decrease-button, .increase-button {

        &.disabled {
          color: #dcdcdc;
        }
      }
    }
  }
}

.edit-modal-footer {
  display: block;
  border-top: none;

  .label {
    display: block;
    margin-bottom: 5px;
    @include font-style-body-bold($color: $brown);

    span {
      @include font-style-body($color: grey);
    }
  }

  .selections {
    display: flex;
    flex-flow: row wrap;
  
    .selection {
      position: relative;
      width: 75px;
      text-align: center;
      @include font-style-body($size: 12px);

      .icon-squatch {
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        font-size: 12px;
      }

      img {
        width: 50px;
        padding: 5px;
      }
    }
  }

  .save-button {
    margin: 5px 0 0 0;
  }
}

</style>