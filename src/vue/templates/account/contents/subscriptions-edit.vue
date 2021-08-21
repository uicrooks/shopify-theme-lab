<template>
  <div class="subscriptions-edit-component">
    <account-section-container-box>
      <account-section-tabs />
      <div class="tab-contents">
        <div class="box-header">
          <div class="date-info">
            <div class="date-row">
              <div class="label">
                Next Refill
              </div>
              <div class="date">
                {{ refillDate }}
              </div>
            </div>
            <a>
              <b-icon
                icon="calendar3"
              />
              Adjust Date
            </a>
            <squatch-button
              class="refill-button"
            >
              Refill Tonight
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
                  <squatch-button
                    class="skip-button"
                  >
                    Skip
                  </squatch-button>
                  <squatch-button
                    class="edit-button"
                    @clicked="openEditModal(item)"
                  >
                    Edit
                  </squatch-button>
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

export default {
  name: "AccountSubscriptionsEdit",
  data() {
    return {
      loading: true,
      ordersLoadedCounter: 0,
      showEdit: false,
      itemToEdit: {}
    };
  },
  computed: {
    ...mapGetters("account", ["rechargePaymentSource",  "currentGroupShippingAddress", "refillBoxDate", "refillBox"]),
    refillDate() {
      if (!this.refillBoxDate) return "";
      const format = !DatetimeHelpers.isSame(new Date(), this.refillBoxDate, "year") ? "MMM Do, YYYY" : "MMM Do";
      return DatetimeHelpers.format(this.refillBoxDate, format);
    },
  },
  watch: {
    refillBox() {
      this.loading = true;
      this.ordersLoadedCounter = 0;
    }
  },
  methods: {
    selectView(viewName) {
      this.$store.commit("account/setCurrentView", viewName);
    },
    onOrderItemLoaded() {
      this.ordersLoadedCounter++;
      if (this.ordersLoadedCounter == this.refillBox.length) {
        this.loading = false;
      }
    },
    openEditModal(item) {
      console.log(item);
      this.showEdit = true;
      this.itemToEdit = item;
    }
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

    .box-header {
      width: 100%;
      @include font-style-body($color: $brown);

      .date-info {
        margin-bottom: 20px;

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

        .refill-button {
          margin-top: 20px;
        }
      }

      .meta-info {

        .billing, .shipping {
          @include font-style-body($color: $brown);
          position: relative;

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
          min-width: 80px;

          @include layout-sm {
            padding: 3px 10px;
          }

          img {
            min-width: 60px;
            max-height: 80px;
          }
        }

        .box-item-details {
          flex: 3;
          padding-left: 15px;
          position: relative;

          @include layout-md {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
          }

          .heading {

            @include layout-md {
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

            @include layout-md {
              flex-flow: column nowrap;
              align-items: center;
              justify-content: center;
              width: 160px;
              margin-right: 20px;
            }

            .skip-button {
              width: 75px;
              height: 34px;
              padding: 12px 10px 10px;
              color: $text-orange;
              background-color: transparent;
              border: 1px solid transparent;
              margin-right: 10px;

              &.hover {
                color: $orange;
              }
              
              @include layout-md {
                height: unset;
                width: 100%;
                padding: 15px 15px 10px;
                margin-right: 0;
                margin-bottom: 10px;
              }
            }
            
            .edit-button {
              position: relative;
              width: 100px;
              height: 34px;
              padding: 12px 10px 10px;

              @include layout-md {
                height: unset;
                width: 100%;
                padding: 15px 15px 10px;
              }

              .icon-squatch {
                position: absolute;
                top: 11px;
                right: 20px;
                font-size: 13px !important;

                @include layout-md {
                  top: 14px;
                  right: 50px;
                }
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