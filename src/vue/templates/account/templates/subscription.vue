<template>
  <div class="account-subscription-component">
    <div class="subscription-summary">
      <div class="image-box">
        <img
          :src="subscription.shopifyProduct.imgSrc"
          :alt="`${subscription.product_title} image`"
        >
      </div>
      <div class="details-box">
        <h5>{{ subscriptionTitle }}</h5>
        <div class="sub-heading">
          <i class="icon-custom icon-auto-renew icon" />
          <span>
            {{ subscriptionInterval }}
          </span>
        </div>
        <div class="sub-heading">
          <b-icon-mailbox
            class="icon"
          />
          <span>
            {{ subscriptionAddress }}
          </span>
        </div>
      </div>
    </div>
    <div class="upcoming-summary">
      <div class="header-row">
        <div class="header-cell col-date">
          Next Refill
        </div>
        <div class="header-cell line-items">
          Includes
        </div>
      </div>
      <div class="content-row">
        <div class="content-cell col-date date">
          {{ upcomingDate }}
        </div>
        <div class="content-cell line-items">
          <div
            v-for="(item, index) of Object.keys(includedList)"
            :key="`subscription-${subscription.id}-line-${index}`"
            class="line-item"
          >
            {{ includedList[item] }} x {{ item }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import DatetimeHelpers from "@/vue/services/datetime-helpers";

export default {
  name: "AccountSubscription",
  props: {
    subscription: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    subscriptionTitle() {
      return this.subscription.product_title;
    },
    subscriptionInterval() {
      const intervalFrequency = this.subscription.order_interval_frequency > 1 ? `${this.subscription.order_interval_frequency} ` : "";
      const intervalUnit = this.subscription.order_interval_frequency > 1 ? `${this.subscription.order_interval_unit}s` : this.subscription.order_interval_unit;
      return `Every ${intervalFrequency}${intervalUnit}`;
    },
    subscriptionAddress() {
      return `${this.subscription.addressObj.address1}, ${this.subscription.addressObj.zip}`;
    },
    upcomingDate() {
      const sameYear = DatetimeHelpers.isSame(new Date(), this.subscription.next_charge_scheduled_at, "year");
      return DatetimeHelpers.format(this.subscription.next_charge_scheduled_at, sameYear ? "MMM D" : "MMM D YYYY");
    },
    includedList() {
      let list = {};
      this.subscription.lineItems.forEach(item => {
        if (list.hasOwnProperty(item.title)) {
          list[item.title] += 1;
        } else {
          list[item.title] = 1;
        }
      });
      return list;
    }
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.account-subscription-component {
  background-color: $white;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 10%);
  margin-bottom: 14px;
  padding: 0 10px;

  .subscription-summary {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding: 15px 0;

    .image-box {
      flex: 1;
      text-align: center;

      @include layout-sm {
        padding: 3px 10px;
      }

      img {
        width: 100%;
        min-width: 60px;
        max-width: 80px;
      }
    }

    .details-box {
      flex: 4;
      display: flex;
      flex-flow: column nowrap;
      padding-left: 10px;

      h5 {
        @include font-style-body($size: 14px, $weight: 600);
      }

      .sub-heading {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        margin-bottom: 3px;
        @include font-style-body($color: #a5937f);
        
        .icon {
          color: $orange;
          margin-right: 4px;
        }
      }

    }
  }

  .upcoming-summary {
    padding: 10px 0 15px 0;
    border-top: 1px solid #dcdcdc;

    .header-row, .content-row {
      display: flex;
      flex-flow: row wrap;
      margin-bottom: 5px;
      @include font-style-body($size: 12px, $color: $brown);

      .header-cell {
        @include font-style-body($size: 11px, $color: $dark-brown);
      }

      .col-date {
        flex: 1;
        text-align: center;
        min-width: 60px;
        max-width: 80px;

        @include layout-sm {
          padding: 3px 10px;
        }

        &.date {
          @include font-style-body($size: 13px, $color: $dark-brown);
        }
      }

      .line-items {
        flex: 4;
        padding-left: 10px;

        .line-item {
          margin-bottom: 4px;
        }
      }
    }
  }
}
</style>
