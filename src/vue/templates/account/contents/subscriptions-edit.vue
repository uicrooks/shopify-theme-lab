<template>
  <div class="subscriptions-edit-component">
    <account-section-container>
      <account-section-tabs
        class="section-tabs"
      />
      <div class="tab-contents">
        <b-overlay
          :show="isLoading"
          variant="transparent"
          class="box-header-overlay"
        >
          <div class="box-header">
            <div class="date-info">
              <div
                v-if="isRefillDateUpdated"
                class="date-row"
              >
                <div class="label">
                  Will Now Refill
                </div>
                <div class="date">
                  {{ formatRefillDate(updatedRefillDate) }}
                </div>
              </div>
              <div
                v-else
                class="date-row"
              >
                <div class="label">
                  Next Refill
                </div>
                <div class="date">
                  {{ formatRefillDate(refillBoxDate) }}
                </div>
              </div>
              <div class="date-row">
                <date-picker
                  v-model="updatedRefillDate"
                  :min-date="new Date()"
                  :model-config="datepickerConfig"
                  color="orange"
                >
                  <template #default="{ showPopover, hidePopover }">
                    <a
                      @mouseenter="showPopover"
                      @mouseleave="hidePopover"
                    >
                      <b-icon
                        icon="calendar3"
                      />
                      Adjust Date
                    </a>
                  </template>
                </date-picker>
                <div
                  v-if="isRefillDateUpdated"
                  class="cancel-button"
                  @click="resetUpdatedRefillDate"
                >
                  <i class="icon-squatch icon-cross" />
                  Cancel
                </div>
              </div>
              <squatch-button
                class="refill-button"
                @clicked="updateRefillDate"
              >
                {{ isRefillDateUpdated ? "Update Date" : "Refill Tonight" }}
              </squatch-button>
            </div>
            <div class="meta-info">
              <div class="shipping">
                <h6>Ships To</h6>
                <a @click="selectView('Edit Box')">
                  Edit
                </a>
                <p>
                  <span
                    v-for="(line, lineIndex) of currentGroupShippingAddress"
                    :key="`shipping-address-line-${lineIndex}`"
                    class="address-line"
                  >
                    {{ line }}
                  </span>
                </p>
              </div>
              <div class="billing">
                <h6>Bills To</h6>
                <a @click="selectView('Edit Box')">
                  Edit
                </a>
                <account-billing-info />
              </div>
            </div>
          </div>
        </b-overlay>
        <div class="box-items-wrapper">
          <account-renderless-order-item
            v-for="(refillBoxItem, refillBoxItemIndex) of refillBox"
            :key="refillBoxItem.id"
            :item="refillBoxItem"
            :index="refillBoxItemIndex"
            class="box-item"
            :class="{'last': refillBoxItemIndex === refillBox.length - 1}"
            @loaded="onOrderItemLoaded"
          >
            <div slot-scope="{ loading, isOnetime, item, displayTitle, displayTitleWithQuantity, imageSrc, subscriptionInterval }">
              <div class="box-item-image">
                <b-spinner
                  v-if="loading"
                  variant="secondary"
                  type="grow"
                />
                <img
                  v-else
                  :src="imageSrc"
                  :alt="`${displayTitle} image`"
                >
              </div>
              <div class="box-item-details">
                <div class="heading">
                  <h5>
                    {{ displayTitleWithQuantity }}
                  </h5>
                  <div
                    v-if="isOnetime"
                    class="sub-heading"
                  >
                    Add-On
                  </div>
                  <div
                    v-else
                    class="sub-heading"
                  >
                    <i class="icon-custom icon-auto-renew icon" />
                    {{ subscriptionInterval }}
                  </div>
                </div>
                <div
                  v-if="isOnetime && !loading"
                  class="actions"
                >
                  <quantity-switch
                    class="qty-switch"
                    :quantity="item.quantity"
                    :index="refillBoxItemIndex"
                    @decrease="updateOnetimeQuantity($event, 'decrease')"
                    @increase="updateOnetimeQuantity($event, 'increase')"
                  />
                </div>
                <div
                  v-if="!isOnetime && !loading"
                  class="actions"
                >
                  <div class="button-wrapper">
                    <squatch-button
                      class="skip-button"
                      @clicked="skipSubscriptionItemInNextRefill(item)"
                    >
                      Skip
                    </squatch-button>
                  </div>
                  <div class="button-wrapper">
                    <squatch-button
                      class="edit-button"
                      @clicked="openEditModal(item)"
                    >
                      Edit
                    </squatch-button>
                  </div>
                </div>
              </div>
            </div>
          </account-renderless-order-item>
        </div>
        <div
          v-for="date of Object.keys(upcomingRefillBoxesByDate)"
          :key="`upcoming-refill-${date}`"
          class="box-items-wrapper upcoming"
        >
          <div class="refill-date">
            Upcoming Refill
            <span>
              {{ formatRefillDate(date) }}
            </span>
          </div>
          <account-renderless-order-item
            v-for="(upcomingBoxItem, upcomingBoxItemIndex) of upcomingRefillBoxesByDate[date]"
            :key="`${upcomingBoxItemIndex}-${upcomingBoxItem}`"
            :item="upcomingBoxItem"
            :index="upcomingBoxItemIndex"
            :fetch-and-update="false"
            class="box-item"
            :class="{'last': upcomingBoxItemIndex === upcomingRefillBoxesByDate[date].length - 1}"
          >
            <div slot-scope="{ loading, isOnetime, displayTitle, displayTitleWithQuantity, imageSrc, subscriptionInterval }">
              <div class="box-item-image">
                <b-spinner
                  v-if="loading"
                  variant="secondary"
                  type="grow"
                />
                <img
                  v-else
                  :src="imageSrc"
                  :alt="`${displayTitle} image`"
                >
              </div>
              <div class="box-item-details">
                <div class="heading">
                  <h5>
                    {{ displayTitleWithQuantity }}
                  </h5>
                  <div
                    v-if="isOnetime"
                    class="sub-heading"
                  >
                    Add-On
                  </div>
                  <div
                    v-else
                    class="sub-heading"
                  >
                    <i class="icon-custom icon-auto-renew icon" />
                    {{ subscriptionInterval }}
                  </div>
                </div>
                <div class="actions">
                  <div class="button-wrapper">
                    <squatch-button
                      class="edit-button"
                      @clicked="moveToNextRefill(upcomingBoxItem)"
                    >
                      Move to Next Refill
                    </squatch-button>
                  </div>
                </div>
              </div>
            </div>
          </account-renderless-order-item>
        </div>
      </div>
    </account-section-container>
    <account-subscription-edit-modal
      :show-modal="showEditModal"
      :item="itemToEdit"
      @hide="closeModal"
    />
    <account-confirmation-modal
      :show-modal="showConfirmModal"
      :item="itemToEdit"
      :action-function="actionFunction"
      :changes="changes"
      @hide="closeModal"
      @cancel="closeModal"
    >
      {{ confirmModalText }}
    </account-confirmation-modal>
    <account-refill-date-update-modal
      :show-modal="showRefillDateUpdateModal"
      :items="itemsForRefillDateUpdate"
      :new-refill-date="updatedRefillDateForModal"
      @hide="closeModal"
    />
  </div>
</template>

<script>
import RechargeService from "@/vue/services/recharge.service";
import DatetimeHelpers from "@/vue/services/datetime-helpers";
import { mapGetters } from "vuex";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import SquatchButton from "@/vue/reusables/squatch-button.vue";
import QuantitySwitch from "@/vue/reusables/quantity-switch.vue";
import AccountBillingInfo from "./billing-info.vue";
import AccountSectionContainer from "../templates/section-container.vue";
import AccountSectionTabs from "../templates/section-tabs.vue";
import AccountRefillDateUpdateModal from "../templates/modal-refill-date-change.vue";
import AccountConfirmationModal from "../templates/modal-confirmation.vue";
import AccountSubscriptionEditModal from "../templates/modal-subscription-editing.vue";
import AccountRenderlessOrderItem from "../renderless/renderless-order-item.vue";

export default {
  name: "AccountSubscriptionsEdit",
  components: { 
    DatePicker,
    SquatchButton,
    QuantitySwitch,
    AccountBillingInfo,
    AccountSectionContainer,
    AccountSectionTabs,
    AccountRenderlessOrderItem,
    AccountRefillDateUpdateModal,
    AccountConfirmationModal,
    AccountSubscriptionEditModal
  },
  data() {
    return {
      isLoading: true,
      ordersLoadedCounter: 0,
      updatedRefillDate: null,
      showConfirmModal: false,
      confirmModalText: "",
      changes: {},
      actionFunction: () => {},
      showEditModal: false,
      itemToEdit: {},
      showRefillDateUpdateModal: false,
      updatedRefillDateForModal: null,
      itemsForRefillDateUpdate: {},
      openCalendar: false,
      datepickerConfig: {
        type: "string",
        mask: "YYYY-MM-DD"
      }
    };
  },
  computed: {
    ...mapGetters("account", ["rechargePaymentSource", "currentGroup", "currentGroupShippingAddress", "refillBoxDate", "refillBox"]),
    isRefillDateUpdated() {
      return this.refillBoxDate !== this.updatedRefillDate;
    },
    upcomingRefillBoxesByDate() {
      let obj = {};
      Object.keys(this.currentGroup.upcomingRefillsByDate).forEach(date => {
        if (date !== this.refillBoxDate) {
          obj[date] = this.currentGroup.upcomingRefillsByDate[date];
        }
      });
      return obj;
    }
  },
  watch: {
    refillBox() {
      console.log("[SubsEdit] refillBox watched");
      this.updatedRefillDate = this.refillBoxDate;
      this.isLoading = true;
      this.ordersLoadedCounter = 0;
      this.closeModal();
    },
  },
  methods: {
    selectView(viewName) {
      this.$store.commit("account/setCurrentView", viewName);
    },
    formatRefillDate(date) {
      if (!this.refillBoxDate) return "";
      const format = !DatetimeHelpers.isSame(new Date(), date, "year") ? "MMM Do, YYYY" : "MMM Do";
      return DatetimeHelpers.format(date, format);
    },
    resetUpdatedRefillDate() {
      this.updatedRefillDate = this.refillBoxDate;
    },
    updateRefillDate() {
      let upcomingRefills = [];
      Object.keys(this.currentGroup.upcomingRefillsByDate).forEach(date => {
        if (date !== this.refillBoxDate) {
          upcomingRefills = [...upcomingRefills, ...this.currentGroup.upcomingRefillsByDate[date]];
        }
      });
      this.itemsForRefillDateUpdate = {
        nextRefill: this.refillBox,
        upcomingRefill: upcomingRefills
      };
      // If updatedRefillDate is not updated (same as refillBoxDate), update to today's date
      this.updatedRefillDateForModal = this.updatedRefillDate === this.refillBoxDate ? this.$moment().format("YYYY-MM-DD") : this.updatedRefillDate;
      this.showRefillDateUpdateModal = true;
    },
    updateOnetimeQuantity(index, updateDirection) {
      this.itemToEdit = this.refillBox[index];
      this.actionFunction = RechargeService.updateOnetime;
      this.changes = {
        quantity: updateDirection === "decrease" ? this.itemToEdit.quantity - 1 : this.itemToEdit.quantity + 1
      };
      this.confirmModalText = `Do you confirm to update the quantity for ${this.itemToEdit.product_title}?`;
      this.showConfirmModal = true;
    },
    skipSubscriptionItemInNextRefill(item) {
      this.itemToEdit = item;
      this.actionFunction = RechargeService.updateSubscription;
      const delayedRefillDate = this.$moment(item.next_charge_scheduled_at).add(Number(item.order_interval_frequency), "months").format("YYYY-MM-DD");
      this.changes = {
        next_charge_scheduled_at: delayedRefillDate
      };
      this.confirmModalText = `Do you confirm to skip ${this.itemToEdit.product_title} in your next refill? It will now ship on ${this.$moment(delayedRefillDate).format("dddd, MMM Do, YYYY")}`;
      this.showConfirmModal = true;
    },
    moveToNextRefill(item) {
      this.itemToEdit = item;
      this.actionFunction = item.status === "ONETIME" ? RechargeService.updateOnetime : RechargeService.updateSubscription;
      this.changes = {
        next_charge_scheduled_at: this.refillBoxDate
      };
      this.confirmModalText = `Do you confirm to move ${this.itemToEdit.product_title} to next refill of ${this.$moment(this.refillBoxDate).format("dddd, MMM Do, YYYY")}?`;
      this.showConfirmModal = true;
    },
    onOrderItemLoaded() {
      this.ordersLoadedCounter++;
      if (this.ordersLoadedCounter == this.refillBox.length) {
        this.isLoading = false;
        console.log("[SubsEdit] onOrderItemLoaded(), isLoading = false");
        this.$emit("ready");
      }
    },
    openEditModal(item) {
      this.itemToEdit = item;
      this.showEditModal = true;
    },
    closeModal() {
      console.log("[SubsEdit] closeModal()");
      this.confirmModalText = "";
      this.changes = {};
      this.actionFunction = () => {};
      this.itemToEdit = {};
      this.updatedRefillDateForModal = null;
      this.itemsForRefillDateUpdate = {};
      this.showEditModal = false;
      this.showConfirmModal = false;
      this.showRefillDateUpdateModal = false;
    }
  },
  mounted() {
    this.updatedRefillDate = this.refillBoxDate;
    this.closeModal();
  }
};
</script>

<style lang="scss">
@use "@/styles/main" as global;

.subscriptions-edit-component {

  .section-tabs {
    padding: 20px 15px;

    @include global.layout-sm {
      padding: 20px;
    }
  }

  .tab-contents {
    
    .box-header-overlay {
      width: 100%;
      padding: 15px 15px 0 15px;
      display: flex;
      flex-flow: row wrap;

      @include global.layout-sm {
        padding: 15px 20px 15px 20px;
      }

      .box-header {
        width: 100%;
        @include global.font-style-body($color: global.$brown);

        @include global.layout-md {
          display: flex;
          flex-flow: row wrap;
        }

        .date-info {
          margin-bottom: 20px;

          @include global.layout-md {
            flex: 1;
            margin-right: 20px;
          }

          .date-row {
            display: flex;
            flex-flow: row nowrap;
            margin-bottom: 3px;

            .label {
              margin-right: 10px;
              @include global.font-style-body($size: 16px, $weight: 600, $lh: 22px);
            }

            .date {
              @include global.font-style-body($size: 16px, $lh: 22px, $color: global.$brown);
            }
          }
        
          a {
            cursor: pointer;
            @include global.font-style-body($color: global.$text-orange);
          }

          .cancel-button {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            cursor: pointer;
            color: global.$dark-brown;
            margin-left: 18px;

            .icon-squatch {
              font-size: 12px;
              margin-top: -2px;
              margin-right: 3px;
            }
          }

          .refill-button {
            margin-top: 20px;
          }
        }

        .meta-info {
          @include global.layout-sm {
            display: flex;
            flex-flow: row wrap;
          }

          @include global.layout-md {
            flex: 2;
          }

          .billing, .shipping {
            @include global.font-style-body($color: global.$brown);
            position: relative;

            @include global.layout-sm {
              flex: 1;
            }

            h6 {
              margin-bottom: 8px;
              @include global.font-style-body($size: 14px, $weight: 600);

              @include global.layout-md {
                margin-bottom: 12px;
              }
            }

            a {
              position: absolute;
              right: 0;
              top: 0;
              text-decoration: underline;
              cursor: pointer;
              @include global.font-style-body($color: global.$text-orange);

              @include global.layout-sm {
                right: 30px;
              }
            }

            p {
              @include global.font-style-body($color: global.$brown);

              .address-line {
                display: block;
                margin-bottom: 4px;

                @include global.layout-md {
                  margin-bottom: 7px;
                }
              }
              
              .card-logo {
                width: 30px;
                margin-right: 3px;
              }

              .status-alert {
                color: global.$red;
                font-size: 12px;
              }
            }
          }
        }
      }
    }

    .box-items-wrapper {
      width: 100%;
      padding: 0 15px;
      @include global.font-style-body();

      @include global.layout-sm {
        padding: 0 20px;
      }

      @include global.layout-md {
        width: unset;
        flex: 3;
      }

      &.upcoming {
        background-color: #f6f5f3;
        padding: 15px;
        border-bottom: 2px solid global.$white;

        &.last {
          border-bottom: none;
        }

        @include global.layout-sm {
          padding: 15px 20px;
        }
      }
      
      .refill-date {
        @include global.font-style-body();

        span {
          @include global.font-style-body($color: grey, $weight: 500);
        }
      }

      .box-item {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: 20px 0;
        border-bottom: 1px solid #dcdcdc;
        @include global.font-style-body($size: 12px);

        &.last {
          border-bottom: none;
        }

        .box-item-image {
          flex: 1;
          text-align: center;

          @include global.layout-sm {
            padding: 3px 10px;
          }

          img {
            min-width: 40px;
            max-width: 80px;
            max-height: 60px;
          }
        }

        .box-item-details {
          flex: 4;
          position: relative;
          padding-left: 5px;

          @include global.layout-sm {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            padding-left: 15px;
          }

          .heading {

            @include global.layout-sm {
              flex: 2;
            }
  
            h5 {
              @include global.font-style-body($size: 14px, $weight: 600);
            }
  
            .sub-heading {
              display: flex;
              flex-flow: row wrap;
              align-items: center;
              margin-bottom: 12px;
              @include global.font-style-body($color: #a5937f);
              
              .icon-custom {
                color: global.$orange;
                margin-right: 4px;
              }
            }
          }

          .actions {
            display: flex;
            flex-flow: row nowrap;

            @include global.layout-sm {
              flex-flow: column nowrap;
              align-items: center;
              justify-content: center;
              width: 150px;
              margin-left: 20px;
            }

            @include global.layout-md {
              width: 180px;
            }

            .button-wrapper {
              flex: 1;

              @include global.layout-sm {
                width: 100%;
              }
            }

            .skip-button {
              width: 100%;
              height: 34px;
              padding: 12px 10px 10px;
              color: global.$orange;
              background-color: transparent;
              border: 1px solid global.$orange;
              margin-right: 10px;

              &:hover {
                color: global.$orange-lighten;
                border: 1px solid global.$orange-lighten;
              }
              
              @include global.layout-sm {
                height: unset;
                padding: 15px 15px 10px;
                margin-right: 0;
                margin-bottom: 10px;
              }
            }
            
            .edit-button {
              position: relative;
              height: 34px;
              padding: 12px 10px 10px;

              @include global.layout-sm {
                height: unset;
                padding: 15px 15px 10px;
              }
            }

            .qty-switch {
              @include global.font-style-body();

              @include global.layout-md {
                width: 80px;
              }

              .decrease-button, .increase-button {
                color: #91a24f;
              }
            }
          }
        }
      }
    }

  }
}
</style>