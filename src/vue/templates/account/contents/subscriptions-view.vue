<template>
  <div class="subscriptions-view-component">
    <div class="header">
      <div class="refill-date">
        Next Refill
        <span>
          {{ refillDate }}
        </span>
      </div>
      <div class="edit-link">
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
            v-for="(item, itemIndex) of refillBox"
            :key="item.id"
            :item="item"
            class="box-item"
            :class="{'last': itemIndex === refillBox.length - 1}"
            @addToItem="addToOrderItem"
          >
            <div slot-scope="{ isOnetime, item, displayTitle, imageSrc, price, compareAtPrice, subscriptionInterval, includedList }">
              <div class="box-item-image">
                <img
                  :src="imageSrc"
                  :alt="`${displayTitle} image`"
                >
              </div>
              <div class="box-item-details">
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
                <h5>
                  {{ displayTitle }}
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
            <span>{{ subTotal | money("$", 0) }}</span>
          </div>
          <div class="line">
            <span>Savings</span>
            <span>- {{ savingsTotal | money("$", 0) }}</span>
          </div>
          <div class="line accentized">
            <span>Total</span>
            <span>{{ subTotal - savingsTotal | money("$", 0) }}</span>
          </div>
          <div class="separator" />
          <h6>Ships To</h6>
          <p>
            <span
              v-for="(line, lineIndex) of shippingAddressArray"
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
import RechargeService from "@/vue/services/recharge.service";
import StoreService from "@/vue/services/store.service";
import DatetimeHelpers from "@/vue/services/datetime-helpers";
import SkuToId from "@/configs/account-sku-to-id";
import { mapGetters } from "vuex";

export default {
  name: "AccountSubscriptionsView",
  computed: {
    ...mapGetters("account", ["rechargeUser", "rechargePaymentSource", "squatchBoxGroups", "currentGroupName", "currentGroup", "currentGroupNextRefillDate"]),
    refillDate() {
      if (this.currentGroupNextRefillDate) {
        const format = !DatetimeHelpers.isSame(new Date(), this.currentGroupNextRefillDate, "year") ? "MMM Do, YYYY" : "MMM Do";
        return DatetimeHelpers.format(this.currentGroupNextRefillDate, format);
      }
      return null;
    },
    refillBox() {
      return this.currentGroup && this.currentGroupNextRefillDate ? this.currentGroup.upcomingRefillsByDate[this.currentGroupNextRefillDate] : [];
    },
    subTotal() {
      if (!this.refillBox) return "";
      const subTotal = this.refillBox.reduce((total, item) => {
        const compareAtPrice = item.data.variants && item.data.variants[0].compareAtPrice ? parseInt(item.data.variants[0].compareAtPrice) : item.price;

        return total += compareAtPrice * item.quantity;
      }, 0);
      return subTotal;
    },
    savingsTotal() {
      if (!this.refillBox) return "";
      const subTotal = this.refillBox.reduce((total, item) => {
        const compareAtPrice = item.data.variants && item.data.variants[0].compareAtPrice ? parseInt(item.data.variants[0].compareAtPrice) : 0;
        let savings = compareAtPrice ? compareAtPrice - item.price : 0;
        return total += savings * item.quantity;
      }, 0);
      return subTotal;
    },
    shippingAddressArray() {
      return this.currentGroup && this.currentGroup.fullAddress ? [`${this.currentGroup.fullAddress.address1} ${this.currentGroup.fullAddress.address2}`, `${this.currentGroup.fullAddress.city}, ${this.currentGroup.fullAddress.province}`, this.currentGroup.fullAddress.zip] : [];
    }
  },
  methods: {
    selectView(viewName) {
      this.$store.commit("account/setCurrentView", viewName);
    },
    async processOrderData(items, addresses) {
      let obj = {};
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const addressMatch = addresses.filter(address => address.id === item.address_id)[0];
        if (!addressMatch) return;

        const itemData = await StoreService.getProductById(item.shopify_product_id);
        item.data = itemData;

        const addressLabel = addressMatch.address1.trim().toLowerCase();
        const discountId = addressMatch.discount_id;
        if (obj[addressLabel]) {
          if (obj[addressLabel].discountIds && discountId) {
            obj[addressLabel].discountIds.push(discountId);
          }
          if (obj[addressLabel].items) {
            obj[addressLabel].items.push(item);
          }
        } else {
          obj[addressLabel] = {
            fullAddress: addressMatch,
            items: [item],
            discountCodes: [discountId],
          };
        }
        
        let upcomingRefillDates = obj[addressLabel].items.filter(item => item.next_charge_scheduled_at).map(item => item.next_charge_scheduled_at);
        upcomingRefillDates = upcomingRefillDates.filter((item, index) => upcomingRefillDates.indexOf(item) === index);

        let refillsObj = {};
        upcomingRefillDates.forEach(date => {
          refillsObj[date] = obj[addressLabel].items.filter(item => item.next_charge_scheduled_at === date);
        });
        obj[addressLabel].upcomingRefillDates = upcomingRefillDates;
        obj[addressLabel].upcomingRefillsByDate = refillsObj;
      }
      return obj;
    },
    addToOrderItem(propName, propValue, item) {
      item[propName] = propValue;
    }
  },
  async mounted() {
    const orders = await RechargeService.getUserResource(this.rechargeUser.id, "subscriptions");
    const subscriptions = orders.subscriptions.filter(subs => !subs.cancelled_at);
    const addresses = await RechargeService.getUserResource(this.rechargeUser.id, "addresses");
    const squatchBoxGroups = await this.processOrderData([...subscriptions, ...orders.onetimes], addresses);

    this.$store.commit("account/setRechargeOrders", orders);
    this.$store.commit("account/setSquatchBoxGroups", squatchBoxGroups);
    this.$store.dispatch("account/initializeCurrentGroup", Object.keys(squatchBoxGroups)[0]);
    // console.log(addresses);

    console.log(orders);
    console.log(squatchBoxGroups);
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
        flex: 4;
        padding-left: 15px;
        position: relative;

        h5 {
          @include font-style-body($size: 14px, $weight: 600);
        }

        .pricing {
          position: absolute;
          top: 0;
          right: 0;
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