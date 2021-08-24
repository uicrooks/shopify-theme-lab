<template>
  <div class="subscriptions-view-component">
    <div class="header">
      <div class="refill-date">
        Next Refill
        <span>
          {{ refillDate }}
        </span>
      </div>
      <div
        v-if="!isLoading"
        class="edit-link"
      >
        <a @click="selectView('Edit Box')">
          Edit Box
        </a>
      </div>
    </div>
    <account-section-container-box>
      <account-section-tabs />
      <div class="tab-contents">
        <div
          v-if="refillBox"
          class="box-items-wrapper"
        >
          <account-renderless-order-item
            v-for="(refillBoxItem, itemIndex) of refillBox"
            :key="refillBoxItem.id"
            :item="refillBoxItem"
            :index="itemIndex"
            class="box-item"
            :class="{'last': itemIndex === refillBox.length - 1}"
            @loaded="onOrderItemLoaded"
          >
            <div slot-scope="{ loading, isOnetime, item, displayTitle, imageSrc, price, compareAtPrice, subscriptionInterval, includedList }">
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
                <h5>
                  {{ displayTitle }}
                </h5>
                <div class="pricing">
                  <span
                    v-if="compareAtPrice"
                    class="compare-at-price"
                  >
                    {{ compareAtPrice | money("$", 0) }}
                  </span>
                  <span
                    :class="{'accentized': compareAtPrice}"
                  >
                    {{ price | money("$", 0) }}
                  </span>
                </div>
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
                <div
                  v-for="(includedItem, index) of Object.keys(includedList)"
                  :key="`item-${item.id}-included-list-${index}`"
                  class="line-item"
                >
                  {{ includedList[includedItem] }} x {{ includedItem }}
                </div>
              </div>
            </div>
          </account-renderless-order-item>
        </div>
        <div class="invoice-wrapper">
          <div class="line">
            <span>Subtotal</span>
            <b-spinner
              v-if="isLoading"
              variant="secondary"
              type="grow"
              small
            />
            <span v-else>
              {{ subTotal | money("$", 0) }}
            </span>
          </div>
          <div class="line">
            <span>Savings</span>
            <b-spinner
              v-if="isLoading"
              variant="secondary"
              type="grow"
              small
            />
            <span v-else>
              - {{ savingsTotal | money("$", 0) }}
            </span>
          </div>
          <div class="line accentized">
            <span>Total</span>
            <b-spinner
              v-if="isLoading"
              variant="secondary"
              type="grow"
              small
            />
            <span v-else>
              {{ subTotal - savingsTotal | money("$", 0) }}
            </span>
          </div>
          <div class="separator" />
          <h6>Ships To</h6>
          <p>
            <span
              v-for="(line, lineIndex) of currentGroupShippingAddress"
              :key="`shipping-address-line-${lineIndex}`"
              class="address-line"
            >
              {{ line }}
            </span>
          </p>
          <h6>Bills To</h6>
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
    </account-section-container-box>
  </div>
</template>

<script>
import DatetimeHelpers from "@/vue/services/datetime-helpers";
import { mapGetters } from "vuex";

export default {
  name: "AccountSubscriptionsView",
  data() {
    return {
      isLoading: true,
      ordersLoadedCounter: 0
    };
  },
  computed: {
    ...mapGetters("account", ["rechargePaymentSource",  "currentGroupShippingAddress", "refillBoxDate", "refillBox", "refillBoxSubTotal", "refillBoxSavingsTotal"]),
    refillDate() {
      if (!this.refillBoxDate) return "";
      const format = !DatetimeHelpers.isSame(new Date(), this.refillBoxDate, "year") ? "MMM Do, YYYY" : "MMM Do";
      return DatetimeHelpers.format(this.refillBoxDate, format);
    },
    subTotal() {
      return this.isLoading ? "" : this.refillBoxSubTotal;
    },
    savingsTotal() {
      return this.isLoading ? "" : this.refillBoxSavingsTotal;
    }
  },
  watch: {
    refillBox() {
      console.log("refillBox", this.refillBox);
      this.isLoading = true;
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
        this.isLoading = false;
        this.$emit("ready");
      }
    }
  }
};
</script>


<style lang="scss">
@import "@/styles/main.scss";

.subscriptions-view-component {

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 12px;
    @include font-style-body();

    .refill-date {
      span {
        @include font-style-body($color: grey, $weight: 500);
      }
    }

    .edit-link {
      a {
        text-decoration: underline;
        cursor: pointer;
        @include font-style-body($color: $text-orange);
      }
    }
  }

  .tab-contents {
    display: flex;
    flex-flow: row wrap;
  }

  .box-items-wrapper {
    width: 100%;

    @include layout-md {
      width: unset;
      flex: 3;
    }

    .box-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #dcdcdc;
      @include font-style-body($size: 12px);

      &.last {
        border-bottom: none;
      }

      .box-item-image {
        flex: 1;
        text-align: center;
        min-width: 55px;

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
        flex: 4;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        padding-left: 5px;

        @include layout-sm {
          padding-left: 15px;
        }

        @include layout-md {
          flex: 3;
        }

        h5 {
          @include font-style-body($size: 14px, $weight: 600);
        }

        .pricing {
          margin-bottom: 8px;
          @include font-style-body($color: $dark-brown);

          .accentized {
            @include font-style-body($color: $text-green, $weight: 600);
          }

          .compare-at-price {
            text-decoration: line-through;
            margin-right: 2px;
          }
        }

        .sub-heading {
          width: 100%;
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

        .line-item {
          width: 100%;
          margin-bottom: 4px;
          @include font-style-body($color: $brown, $size: 13px);
        }
      }
    }
  }

  .invoice-wrapper {
    width: 100%;
    padding: 15px;
    background-color: #f6f5f3;
    @include font-style-body($color: $brown);

    @include layout-md {
      padding: 20px;
    }

    @include layout-md {
      width: unset;
      flex: 1;
      padding: 20px 15px;
      margin-left: 15px;
    }

    .line {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      margin-bottom: 7px;

      &.accentized {
        @include font-style-body($color: $text-green, $weight: 600);
      }

      @include layout-md {
        margin-bottom: 10px;
      }
    }

    .separator {
      width: 95%;
      margin: 20px auto 20px auto;
      border-bottom: 1px solid #dcdcdc;
    }

    h6 {
      @include font-style-body($size: 14px, $weight: 600);

      @include layout-md {
        margin-bottom: 12px;
      }
    }

    p {
      margin-bottom: 25px;
    }

    .address-line {
      display: block;
      margin-bottom: 4px;

      @include layout-md {
        margin-bottom: 7px;
      }
    }

    .billing-info {
      margin-bottom: 0;

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
</style>