<template>
  <div class="subscriptions-edit-component">
    <account-section-container-box>
      <account-section-tabs />
      <div class="tab-contents">
        <b-overlay
          :show="loading" variant="transparent"
          class="box-header-overlay"
        >
          <div class="box-header">
            <div class="date-info">
              <div
                v-if="newRefillDateSelected"
                class="date-row"
              >
                <div class="label">
                  Will Now Refill
                </div>
                <div class="date">
                  {{ showRefillDate(newRefillDate) }}
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
                  {{ showRefillDate(refillBoxDate) }}
                </div>
              </div>
              <div class="date-row">
                <date-picker
                  v-model="newRefillDate"
                  :min-date="new Date()"
                  :model-config="datepickerConfig"
                  color="orange"
                >
                  <template v-slot="{ showPopover, hidePopover }">
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
                  v-if="newRefillDateSelected"
                  class="cancel-button"
                  @click="cancelDateChange"
                >
                  <i class="icon-squatch icon-cross" />
                  Cancel
                </div>

              </div>
              <squatch-button
                class="refill-button"
              >
                {{ newRefillDateSelected ? "Update Date" : "Refill Tonight" }}
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
                <p
                  v-if="rechargePaymentSource.cardImage"
                  class="billing-info"
                >
                  <img
                    :src="rechargePaymentSource.cardImage"
                    :alt="`${rechargePaymentSource.card_brand} logo`"
                    class="card-logo"
                  >
                  Ending in {{ rechargePaymentSource.card_last4 }}
                  <span
                    v-if="rechargePaymentSource.status !== 'active'"
                    class="status-alert"
                  >
                    Expired
                  </span>
                </p>
              </div>
            </div>
          </div>
        </b-overlay>
        <div class="box-items-wrapper">
          <account-renderless-order-item
            v-for="(item, itemIndex) of refillBox"
            :key="item.id"
            :item="item"
            :index="itemIndex"
            class="box-item"
            :class="{'last': itemIndex === refillBox.length - 1}"
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
                  v-if="isOnetime"
                  class="actions"
                >
                  <quantity-switch
                    class="qty-switch"
                    :quantity="item.quantity"
                  />
                </div>
                <div
                  v-else
                  class="actions"
                >
                  <div class="button-wrapper">
                    <squatch-button
                      class="skip-button"
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
      </div>
    </account-section-container-box>
    <account-subscription-edit-modal
      :showModal="showEdit"
      :item="itemToEdit"
      @hide="showEdit = false"
    />
  </div>
</template>

<script>
import DatetimeHelpers from "@/vue/services/datetime-helpers";
import { mapGetters } from "vuex";
import moment from "moment";
import Calendar from "v-calendar/lib/components/calendar.umd";
import DatePicker from "v-calendar/lib/components/date-picker.umd";

export default {
  name: "AccountSubscriptionsEdit",
  components: { 
    Calendar,
    DatePicker 
  },
  data() {
    return {
      loading: true,
      ordersLoadedCounter: 0,
      showEdit: false,
      itemToEdit: {},
      openCalendar: false,
      newRefillDate: null,
      datepickerConfig: {
        type: "string",
        mask: "YYYY-MM-DD"
      }
    };
  },
  computed: {
    ...mapGetters("account", ["rechargePaymentSource",  "currentGroupShippingAddress", "refillBoxDate", "refillBox"]),
    newRefillDateSelected() {
      return this.refillBoxDate.split("T")[0] !== this.newRefillDate;
    },
  },
  watch: {
    refillBox() {
      this.loading = true;
      this.ordersLoadedCounter = 0;
      this.newRefillDate = this.refillBoxDate.split("T")[0];
    },
    newRefillDate(val) {
      console.log("newRefillDate", val);
    }
  },
  methods: {
    showRefillDate(date) {
      if (!this.refillBoxDate) return "";
      const format = !DatetimeHelpers.isSame(new Date(), date, "year") ? "MMM Do, YYYY" : "MMM Do";
      return DatetimeHelpers.format(date, format);
    },
    cancelDateChange() {
      this.newRefillDate = this.refillBoxDate.split("T")[0];
    },
    selectView(viewName) {
      this.$store.commit("account/setCurrentView", viewName);
    },
    onOrderItemLoaded() {
      this.ordersLoadedCounter++;
      if (this.ordersLoadedCounter == this.refillBox.length) {
        this.loading = false;
        this.$emit("ready");
      }
    },
    openEditModal(item) {
      console.log(item);
      this.showEdit = true;
      this.itemToEdit = item;
    }
  },
  mounted() {
    this.newRefillDate = this.refillBoxDate.split("T")[0];
  }
};
</script>

<style lang="scss">
@import "@/styles/main.scss";

.subscriptions-edit-component {

  .tab-contents {
    display: flex;
    flex-flow: row wrap;
    padding-top: 15px;

    .box-header-overlay {
      width: 100%;
    }

    .box-header {
      width: 100%;
      @include font-style-body($color: $brown);

      @include layout-md {
        display: flex;
        flex-flow: row wrap;
      }

      .date-info {
        margin-bottom: 20px;

        @include layout-md {
          flex: 1;
          margin-right: 20px;
        }

        .date-row {
          display: flex;
          flex-flow: row nowrap;
          margin-bottom: 3px;

          .label {
            margin-right: 10px;
            @include font-style-body($size: 16px, $weight: 600, $lh: 22px);
          }

          .date {
            @include font-style-body($size: 16px, $lh: 22px, $color: $brown);
          }
        }
      
        a {
          cursor: pointer;
          @include font-style-body($color: $text-orange);
        }

        .cancel-button {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          cursor: pointer;
          color: $dark-brown;
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
        @include layout-sm {
          display: flex;
          flex-flow: row wrap;
        }

        @include layout-md {
          flex: 2;
        }

        .billing, .shipping {
          @include font-style-body($color: $brown);
          position: relative;

          @include layout-sm {
            flex: 1;
          }

          h6 {
            margin-bottom: 8px;
            @include font-style-body($size: 14px, $weight: 600);

            @include layout-md {
              margin-bottom: 12px;
            }
          }

          a {
            position: absolute;
            right: 0;
            top: 0;
            text-decoration: underline;
            cursor: pointer;
            @include font-style-body($color: $text-orange);

            @include layout-sm {
              right: 30px;
            }
          }

          p {
            @include font-style-body($color: $brown);

            &.billing-info {
              margin-bottom: 0;
            }
          
            .address-line {
              display: block;
              margin-bottom: 4px;

              @include layout-md {
                margin-bottom: 7px;
              }
            }
            
            .card-logo {
              width: 30px;
              margin-right: 3px;
            }

            .status-alert {
              color: $red;
              font-size: 12px;
            }
          }
        }
      }
    }

    .box-items-wrapper {
      width: 100%;
      margin-top: 25px;

      @include layout-md {
        width: unset;
        flex: 3;
      }

      .box-item {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: 20px 0;
        border-bottom: 1px solid #dcdcdc;
        @include font-style-body($size: 12px);

        &.last {
          border-bottom: none;
        }

        .box-item-image {
          flex: 1;
          text-align: center;

          @include layout-sm {
            padding: 3px 10px;
          }

          img {
            min-width: 40px;
            max-width: 80px;
            max-height: 60px;
          }
        }

        .box-item-details {
          flex: 3;
          position: relative;
          padding-left: 5px;

          @include layout-sm {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            padding-left: 15px;
          }

          .heading {

            @include layout-sm {
              flex: 2;
            }
  
            h5 {
              @include font-style-body($size: 14px, $weight: 600);
            }
  
            .sub-heading {
              display: flex;
              flex-flow: row wrap;
              align-items: center;
              margin-bottom: 12px;
              @include font-style-body($color: #a5937f);
              
              .icon-custom {
                color: $orange;
                margin-right: 4px;
              }
            }
          }

          .actions {
            display: flex;
            flex-flow: row nowrap;

            @include layout-sm {
              flex-flow: column nowrap;
              align-items: center;
              justify-content: center;
              min-width: 100px;
              margin-left: 20px;
            }

            .button-wrapper {
              flex: 1;

              @include layout-sm {
                width: 100%;
              }
            }

            .skip-button {
              width: 100%;
              height: 34px;
              padding: 12px 10px 10px;
              color: $text-orange;
              background-color: transparent;
              border: 1px solid transparent;
              margin-right: 10px;

              &.hover {
                color: $orange;
              }
              
              @include layout-sm {
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

              @include layout-sm {
                height: unset;
                padding: 15px 15px 10px;
              }
            }

            .qty-switch {
              @include font-style-body();

              @include layout-md {
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