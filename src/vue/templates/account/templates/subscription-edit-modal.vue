<template>
  <div class="subscription-order-edit-modal-component">
    <account-renderless-subscription-edit
      :item="itemHolder"
      :subscription-products="subscriptionProducts"
      :subscription-option-source="subscriptionOptions"
      @save="save"
    >
      <div slot-scope="{ productOptionsWithIndexValue, productAttr, productEvents, intervalOptions, intervalText, intervalAttr, intervalEvents, quantityOptions, quantityAttr, quantityEvents, selectionOptions, selection, editComplete, editMade, decreaseQuantity, increaseQuantity, removeOption, saveChanges }">
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
          <div class="edit-modal-content-top">
            <div class="nav-row">
              <span
                class="back-button"
                @click="$emit('hide')"
              >
                <i 
                  class="icon-squatch icon-chevron-left"
                />
                Back
              </span>
              <span
                class="close-button"
                @click="$emit('hide')"
              >
                <i
                  class="icon-squatch icon-cross"
                  @click="$emit('hide')"
                />
              </span>
            </div>
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
          <div class="edit-modal-content-bottom">
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
                  :increase-disabled="option.isFull || editComplete"
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
              :disabled="!editMade || !editComplete"
              class="save-button"
              @clicked="saveChanges"
            >
              Save
            </squatch-button>
          </template>
        </b-modal>
      </div>
    </account-renderless-subscription-edit>
    <account-confirmation-modal
      :show-modal="showConfirmModal"
      :item="itemHolder"
      :action-function="actionFunction"
      :changes="changes"
      @hide="hideConfirmModal"
      @cancel="cancelConfirmModal"
    >
      {{ confirmModalText }}
    </account-confirmation-modal>
  </div>
</template>

<script>
import RechargeService from "@/vue/services/recharge.service";
import Helpers from "@/vue/services/general-helpers";
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
      showConfirmModal: false,
      confirmModalText: "",
      actionFunction: () => {},
      changes: {},
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
    itemHolder() {
      console.log("all subsProducs and subsOptions");
      console.log(this.subscriptionCollections);
      console.log(this.subscriptionOptionCollections);
    },
    showModal(val) {
      this.showModalFlag = val;
      this.itemHolder = val ? this.item : {};
    },
  },
  methods: {
    // next_charge_scheduled_at: "2021-08-25"
    // charge_interval_frequency: 3
    // order_interval_frequency: 3
    // order_interval_unit: "month"
    // properties: [{name: "shipping_interval_frequency", value: 3},…]
    // quantity: 2
    // ????? ------
    // shopify_variant_id: 32637027188841
    // sku_override: false
    // use_shopify_variant_defaults: "true"
    save(product, interval, quantity, selection) {
      console.log(product, interval, quantity, selection);
      
      this.actionFunction = RechargeService.updateSubscription;
      this.changes = {
        next_charge_scheduled_at: this.itemHolder.next_charge_scheduled_at,
      };
      this.confirmModalText = `Do you confirm to save the changes made to your ${this.itemHolder.product_title}? `;
      
      if (product !== null) {
        const variantId = product.variants && product.variants[0] && product.variants[0].id;
        this.changes.shopify_variant_id = 31305050259561;

        const additionalModalText = getConfirmModalTextWithIncreasedPrice(this.itemHolder, product, quantity);
        this.confirmModalText += additionalModalText ? additionalModalText : "";
      }
      if (interval !== null) {
        const newProperties = getUpdatedPropertiesWithNewInterval(this.itemHolder.properties, interval);
        this.changes.order_interval_unit = this.itemHolder.order_interval_unit;
        this.changes.order_interval_frequency = interval;
        this.changes.charge_interval_frequency = interval;
        this.changes.properties = newProperties;
      }
      if (quantity !== null) {
        this.changes.quantity = quantity;

        const additionalModalText = getConfirmModalTextWithIncreasedPrice(this.itemHolder, product, quantity);
        this.confirmModalText += additionalModalText ? additionalModalText : "";
      }
      if (selection !== null) {
        const newProperties = getUpdatedPropertiesWithNewSelection(this.itemHolder.properties, selection);
        this.changes.properties = newProperties;
      }
      console.log(this.changes);
      this.showConfirmModal = true;

      function getConfirmModalTextWithIncreasedPrice(currentItem, newProduct, newQty) {
        const currentPrice = getCurrentPrice(currentItem);
        const newPrice = getNewPrice(currentItem, newProduct, newQty);
        return newPrice > currentPrice ? `You will be billed $${newPrice} when this item renews.` : "";

        function getCurrentPrice(item) {
          return item.quantity * Helpers.convertPriceToWholeNumber(item.price);
        }

        function getNewPrice(currentItem, newProduct, newQty) {
          const price = newProduct !== null ?  Helpers.convertPriceToWholeNumber(newProduct.price) : Helpers.convertPriceToWholeNumber(currentItem.price);
          return newQty !== null ? price * newQty : price * currentItem.quantity;
        }
      } 

      function getUpdatedPropertiesWithNewInterval(props, interval) {
        return props.map(prop => {
          if ([
            "shipping_interval_frequency", 
            "charge_interval_frequency",
            "recurring_shipping_interval_frequency", "recurring_charge_interval_frequency",
            "_recurring_shipping_interval_frequency", "_recurring_charge_interval_frequency"
          ].includes(prop.name)) {
            return {
              name: prop.name,
              value: interval
            };
          }
          return prop;
        });
      }

      function getUpdatedPropertiesWithNewSelection(props, selection) {
        let newProps = [];
        props.forEach(prop => {
          if (!prop.name.includes("_fulfillment_Scent")) {
            newProps.push(prop);
          }
        });
        const selectionProps = selection.map((option, index) => {
          return { name: `_fulfillment_Scent${index + 1}`, value: option.sku };
        });
        return [...newProps, ...selectionProps];
      }
    },
    hideConfirmModal() {
      console.log("subsEditModal - hideConfirmModal");
      this.confirmModalText = "";
      this.changes = {};
      this.actionFunction = () => {};
      this.showConfirmModal = false;
      this.$emit("hide");
    },
    cancelConfirmModal() {
      console.log("subsEditModal - cancelConfirmModal");
      this.showConfirmModal = false;
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

  .edit-modal-content-top {
    position: sticky;
    top: 0;
    padding: 15px 15px 10px 15px;
    background-color: $white;

    .nav-row {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      margin-bottom: 20px;
      @include font-style-body-bold();

      .back-button {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        cursor: pointer;
        margin-bottom: 15px;

        .icon-squatch {
          font-size: 13px;
          margin-right: 3px;
          margin-bottom: 1px;
        }
      }

      .close-button {

        .icon-squatch {
          font-size: 14px;
        }
      }
    }

  }

  .edit-modal-content-bottom {
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