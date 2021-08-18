<template>
  <div class="subscription-order-edit-modal-component">
    <b-modal
      v-model="showModalFlag"
      size="lg"
      body-class="edit-form"
      hide-header
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
    >
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
      <div
        v-if="selection.length > 0"
        class="field-wrapper"
      >
        <label>
          Selection
        </label>
        <div>
          <div
            v-for="(option, index) of selection"
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
    </b-modal>
  </div>
</template>

<script>
import ProductIdentifier from "@/vue/services/product-identifier";
import { mapGetters } from "vuex";
import quantitySelector from '../../product/reusables/quantity-selector.vue';

export default {
  components: { quantitySelector },
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
      selection: [],
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
      if (this.productType === "barsoap") {
        return "Num of Bars";
      }
      if (this.productType === "deodorant") {
        return "Num of Sticks";
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
      if (this.productType === "barsoap") {
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
      if (this.productType === "barsoap") {
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
    selectionComplete() {
      const totalSelected = this.selection.reduce((total, option) => total += option.quantity, 0);
      return totalSelected === this.quantitySelected;
    }
  },
  watch: {
    showModal(val) {
      this.showModalFlag = val;
    },
    item() {
      console.log("watch item");
      console.log(this.item);
      console.log("subsCollections", this.subscriptionCollections);
      console.log("collections", this.collections);
      console.log(this.productType, this.productIdentityTags);

      this.productSelected = this.getProductSelected();
      this.intervalSelected = this.getIntervalSelected();
      this.quantitySelected = this.getQuantitySelected();
      this.selection = this.getSelectionWithOptionsSelected();
      console.log("selection", this.selection);
    },
  },
  methods: {
    hideModal() {
      this.$emit("hide");
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
      if (["haircare", "deodorant"].includes(this.productType)) {
        return 3;
      }
      return Number(this.item.order_interval_frequency);
    },
    getQuantitySelected() {
      if (["barsoap", "deodorant"].includes(this.productType)) {
        if (this.item.lineItems) {
          return this.item.lineItems.length;
        }
        const numFromTitle = this.item.product_title.split(" - ")[1];
        return numFromTitle ? numFromTitle[0] : 1;
      }
      return this.item.quantity;
    },
    getSelectionWithOptionsSelected() {
      if (this.productType === "barsoap") {
        return this.collection.filter(product => {
          return product.type.toLowerCase() === "barsoap";
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
    decreaseQauntity(index) {
      console.log("Decrase", index);
    },
    increaseQuantity(index) {
      console.log("Increase", index);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.edit-form {
  padding: 10px;

  .back-button {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    cursor: pointer;
    margin-bottom: 20px;
    @include font-style-body();

    .icon-squatch {
      font-size: 13px !important;
      margin-right: 3px;
      margin-bottom: 1px;
    }
  }

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
}
</style>

<style lang="scss">
@import "@/styles/main.scss";

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
</style>