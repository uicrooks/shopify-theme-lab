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
    <account-view-section-box>
      <div class="tabs-wrapper">
        <div
          v-for="addressLabel of Object.keys(squatchBoxes)"
          :key="addressLabel"
          class="tab"
          :class="{'active': addressLabel === currentBoxName}"
          @click="selectBox(addressLabel)"
        >
          {{ getTabLabel(squatchBoxes[addressLabel]) }}
        </div>
      </div>
      <div
        v-if="currentBox && currentBox.upcomingRefillsByDate && currentBoxNextRefillDate"
        class="box-items-wrapper"
      >
        <account-renderless-item
          v-for="item of currentBox.upcomingRefillsByDate[currentBoxNextRefillDate]"
          :key="item.id"
          :item="item"
          class="box-item"
        >
          <div slot-scope="{ item, itemTitle, itemImageSrc, subscriptionInterval, isOnetime, includedList, lineItems }">
            <div class="box-item-image">
              <img
                :src="itemImageSrc"
                :alt="`${itemTitle} image`"
              >
            </div>
            <div class="box-item-details">
              <h5>
                {{ itemTitle }}
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
        </account-renderless-item>
      </div>
    </account-view-section-box>
  </div>
</template>

<script>
import RechargeService from "@/vue/services/recharge.service";
import DatetimeHelpers from "@/vue/services/datetime-helpers";
import SkuToId from "@/configs/account-sku-to-id";
import { mapGetters } from "vuex";

export default {
  name: "AccountSubscriptionsView",
  computed: {
    ...mapGetters("account", ["rechargeUser", "squatchBoxes", "currentBoxName", "currentBox", "currentBoxNextRefillDate"]),
    refillDate() {
      if (this.currentBoxNextRefillDate) {
        const format = !DatetimeHelpers.isSame(new Date(), this.currentBoxNextRefillDate, "year") ? "MMM Do, YYYY" : "MMM Do";
        return DatetimeHelpers.format(this.currentBoxNextRefillDate, format);
      }
      return null;
    }
  },
  methods: {
    selectView(viewName) {
      this.$store.commit("account/setCurrentView", viewName);
    },
    selectBox(boxName) {
      if (boxName !== this.currentBoxName) {
        this.$store.dispatch("account/initializeCurrentBox", boxName);
      }
    },
    getTabLabel(box) {
      return box.fullAddress && box.fullAddress.address1 ? `${box.fullAddress.address1}${box.fullAddress.zip ? ", " + box.fullAddress.zip : ""}` : "";
    },
    processOrderData(items, addresses) {
      let obj = {};
      items.forEach(item => {
        const addressMatch = addresses.filter(address => address.id === item.address_id)[0];
        if (!addressMatch) return;
        
        const addressLabel = addressMatch.address1.trim().toLowerCase();
        if (obj[addressLabel] && obj[addressLabel].items) {
          obj[addressLabel].items.push(item);
        } else {
          obj[addressLabel] = {
            fullAddress: addressMatch,
            items: [item]
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
      });
      return obj;
    }
  },
  async mounted() {
    const orders = await RechargeService.getUserResource(this.rechargeUser.id, "subscriptions");
    const subscriptions = orders.subscriptions.filter(subs => !subs.cancelled_at);
    const addresses = await RechargeService.getUserResource(this.rechargeUser.id, "addresses");
    const squatchBoxes = this.processOrderData([...subscriptions, ...orders.onetimes], addresses);

    this.$store.commit("account/setSquatchBoxes", squatchBoxes);
    this.$store.dispatch("account/initializeCurrentBox", Object.keys(squatchBoxes)[0]);

    console.log(orders);
    console.log(squatchBoxes);
  }
};
</script>


<style lang="scss">
@use "@/styles/main" as global;

.subscriptions-view-component {

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 12px;
    @include global.font-style-body();

    .refill-date {
      span {
        @include globalfont-style-body($color: grey, $weight: 500);
      }
    }

    .edit-link {
      a {
        text-decoration: underline;
        cursor: pointer;
        @include global.font-style-body($color: global.$text-orange);
      }
    }
  }

  .tabs-wrapper {
    display: flex;
    flex-flow: row nowrap;

    .tab {
      flex: 1;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 5px 5px 12px 5px;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      @include global.font-style-body($size: 12px, $color: grey);

      &.active {
        border-bottom: 2px solid $text-orange;
        @include global.font-style-body($size: 12px, $color: global.$text-orange);
      }
    }
  }

  .box-items-wrapper {
    .box-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding: 15px 0;

      .box-item-image {
        flex: 1;
        text-align: center;

        @include global.layout-sm {
          padding: 3px 10px;
        }

        img {
          width: 100%;
          min-width: 60px;
          max-width: 80px;
        }
      }

      .box-item-details {
        flex: 4;

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

        .line-item {
          margin-bottom: 4px;
          @include font-style-body($color: $brown, $size: 13px);
        }
      }
    }
  }
}
</style>