<template>
  <div class="subscription-order-edit-modal-component">
    <account-renderless-subscription-edit
      :item="itemHolder"
      :subscription-products="subscriptionProducts"
      :subscription-option-source="subscriptionOptions"
    >
      <div slot-scope="{ productOptionsWithIndexValue, productAttr, productEvents, intervalOptions, intervalText, intervalAttr, intervalEvents, quantityOptions, quantityAttr, quantityEvents, selectionOptions, selection, selectionComplete, selectionUpdated, decreaseQuantity, increaseQuantity, removeOption }">
        <b-modal
          v-model="showModalFlag"
          size="lg"
          body-class="edit-modal-content"
          footer-class="edit-modal-footer"
          hide-header
          scrollable
          centered
          no-close-on-esc
          no-close-on-backdrop
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
              v-if="productOptionsWithIndexValue.length > 0"
              class="field-wrapper"
            >
              <label>Product</label>
              <b-form-select
                :options="productOptionsWithIndexValue"
                class="select-input"
                v-bind="productAttr"
                v-on="productEvents"
              />
            </div>
            <div class="field-wrapper">
              <label>Billed & Shipped</label>
              <div
                v-if="intervalOptions.length === 0"
                class="text-display"
              >
                {{ intervalText }}
              </div>
              <div v-else>
                <b-form-select
                  :options="intervalOptions"
                  class="select-input"
                  v-bind="intervalAttr"
                  v-on="intervalEvents"
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
                :options="quantityOptions"
                class="select-input"
                v-bind="quantityAttr"
                v-on="quantityEvents"
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
              <div
                v-for="(option, index) of selectionOptions"
                :key="option.id"
                class="option"
                :class="{hidden: option.hidden}"
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
                  class="qty-switch"
                  :quantity="option.quantity"
                  :index="index"
                  :decrease-disabled="option.quantity === 0"
                  :increase-disabled="option.isFull || selectionComplete"
                  @decrease="decreaseQuantity"
                  @increase="increaseQuantity"
                />
              </div>
            </div>
          </div>
          <template #modal-footer>
            <div v-if="['barsoap', 'deodorant'].includes(productType)">
              <div class="label">
                Selected
                <span
                  v-if="quantityAttr.value"
                >
                  ({{ selection.length }} of {{ quantityAttr.value }})
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
    </account-renderless-subscription-edit>
  </div>
</template>

<script>
import ProductIdentifier from "@/vue/services/product-identifier";
import { mapGetters } from "vuex";

export default {
  name: "AccountSubscriptionEditModal",
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
      itemHolder: {},
    };
  },
  computed: {
    ...mapGetters("products", ["subscriptionCollections", "subscriptionOptionCollections"]),
    productType() {
      if (!this.item.productData) return "";
      const productIdentityTags = ProductIdentifier.identify(this.item.productData);
      return productIdentityTags[0] ? productIdentityTags[0] : "";
    },
    productSubType() {
      if (!this.item.productData) return "";
      const productIdentityTags = ProductIdentifier.identify(this.item.productData);
      return productIdentityTags[1] ? productIdentityTags[1] : "";
    },
    subscriptionProducts() {
      return this.subscriptionCollections[this.productType] ? this.subscriptionCollections[this.productType] : [];
    },
    subscriptionOptions() {
      return this.subscriptionOptionCollections[this.productType] ? this.subscriptionOptionCollections[this.productType] : [];
    },
    quantityLabel() {
      if (this.productType === "barsoap") {
        return "Number of Bars";
      }
      if (this.productType === "deodorant") {
        return "Number of Sticks";
      }
      return "Quantity";
    },
  },
  watch: {
    showModal(val) {
      this.showModalFlag = val;
      this.itemHolder = val ? this.item : {};
    },
    itemHolder() {
      console.log("all subsProducs and subsOptions");
      console.log(this.subscriptionCollections);
      console.log(this.subscriptionOptionCollections);
    },
  },
  methods: {
    hideModal() {
      this.$emit("hide");
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

      &.hidden {
        display: none;
      }
      
      .option-label {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        img {
          width: 40px;
          margin-right: 8px;
        }
      }

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