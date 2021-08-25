<template>
  <div class="refill-schedule-component">
    <account-section-container-box
      class="section-container-box"
    >
      <account-section-tabs />
      <div class="tab-contents">
        <h3>Next Refill</h3>
        <div class="refill-group">
          <h4>{{ formatRefillMonthDisplay(refillBoxDate) }}</h4>
          <div class="refill-items-wrapper">
            <account-renderless-order-item
              v-for="(refillBoxItem, itemIndex) of nextRefill"
              :key="refillBoxItem.id"
              :item="refillBoxItem"
              :index="itemIndex"
              class="box-item"
              :class="{'last': itemIndex === refillBox.length - 1}"
            >
              <div slot-scope="{ isOnetime, item, displayTitle, imageSrc, price, compareAtPrice, subscriptionInterval, includedList }">
                <div class="box-item-image">
                  <img
                    :src="imageSrc"
                    :alt="`${displayTitle} image`"
                  >
                </div>
                <div class="box-item-details">
                  <div class="col-left">
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
                  <div class="col-right">
                    <div class="date">
                      {{ formatRefillDateDisplay(refillBoxDate) }}
                    </div>
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
                  </div>
                </div>
              </div>
            </account-renderless-order-item>
          </div>
        </div>
        <h3 class="padded">
          Upcoming Refills
        </h3>
        <div
          v-for="(date, index) of Object.keys(upcomingRefills)"
          :key="`refill-group-${index}`"
          class="refill-group"
        >
          <h4>{{ formatRefillMonthDisplay(date) }}</h4>
          <div class="refill-items-wrapper">
            <account-renderless-order-item
              v-for="(upcomingRefillItem, itemIndex) of upcomingRefills[date]"
              :key="upcomingRefillItem.id"
              :item="upcomingRefillItem"
              :index="itemIndex"
              :fetch-and-update="false"
              class="box-item"
              :class="{'last': itemIndex === upcomingRefills[date].length - 1}"
            >
              <div slot-scope="{ isOnetime, item, displayTitle, imageSrc, price, compareAtPrice, subscriptionInterval, includedList }">
                <div class="box-item-image">
                  <img
                    :src="imageSrc"
                    :alt="`${displayTitle} image`"
                  >
                </div>
                <div class="box-item-details">
                  <div class="col-left">
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
                      v-for="(includedItem, includedItemIndex) of Object.keys(includedList)"
                      :key="`refill-group-${itemIndex}-item-${item.id}-included-list-${includedItemIndex}`"
                      class="line-item"
                    >
                      {{ includedList[includedItem] }} x {{ includedItem }}
                    </div>
                  </div>
                  <div class="col-right">
                    <div class="date">
                      {{ formatRefillDateDisplay(date) }}
                    </div>
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
                  </div>
                </div>
              </div>
            </account-renderless-order-item>
          </div>
        </div>
      </div>
    </account-section-container-box>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "AccountRefillSchedule",
  data() {
    return {
      refillSchedule: {},
    };
  },
  computed: {
    ...mapGetters("account", ["currentGroup", "refillBoxDate", "refillBox"]),
    nextRefill() {
      return this.refillSchedule[this.refillBoxDate];
    },
    upcomingRefills() {
      let obj = {};
      Object.keys(this.refillSchedule).filter(date => {
        return date !== this.refillBoxDate;
      }).sort().forEach(date => {
        obj[date] = this.refillSchedule[date];
      });
      return obj;
    }
  },
  watch: {
    currentGroup() {
      this.refillSchedule = {};
      this.generateRefillSchedule();
    }
  },
  methods: {
    generateRefillSchedule() {
      let obj = {};
      this.refillBox.forEach(item => {
        const formattedDate = item.next_charge_scheduled_at && moment(item.next_charge_scheduled_at).format("YYYY-MM-DD");
        if (!obj[formattedDate]) {
          obj[formattedDate] = [item];
        } else {
          obj[formattedDate].push(item);
        }
        
        if (item.order_interval_unit === "month") {
          const endingDate = moment(item.next_charge_scheduled_at).add(6, "months").endOf("month");
          let counter = 1;
          let upcomingDate = moment(item.next_charge_scheduled_at).add(Number(item.order_interval_frequency) * counter, "months");
          while (upcomingDate.isSameOrBefore(endingDate)) {
            const formattedDate = upcomingDate.format("YYYY-MM-DD");
            if (!obj[formattedDate]) {
              obj[formattedDate] = [item];
            } else {
              obj[formattedDate].push(item);
            }
            counter++;
            upcomingDate = moment(item.next_charge_scheduled_at).add(Number(item.order_interval_frequency) * counter, "months");
          }
        }
      });
      Object.keys(this.currentGroup.upcomingRefillsByDate).forEach(date => {
        if (date === this.refillBoxDate) return;
        if (!obj[date]) {
          obj[date] = this.currentGroup.upcomingRefillsByDate[date];
        } else {
          obj[date] = [...obj[date], ...this.currentGroup.upcomingRefillsByDate[date]]; 
        }
      });
      this.refillSchedule = obj;
    },
    formatRefillMonthDisplay(date) {
      return moment(date).format("MMMM YYYY");
    },
    formatRefillDateDisplay(date) {
      return moment(date).format("MMM Do");
    },
  },
  mounted() {
    this.generateRefillSchedule();
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.refill-schedule-component {

  .section-container-box {
    padding: 20px 15px;
  
    @include layout-sm {
      padding: 20px;
    }
  }

  .tab-contents {
    padding-top: 15px;

    h3 {
      margin-bottom: 15px;
      text-align: center;
      @include font-style-heading($size: 20px);

      &.padded {
        margin-top: 30px;
      }
    }

    h4 {
      border-bottom: 1px solid grey;
      padding: 0 0 5px 5px;
      @include font-style-body-bold($size: 20px);
    }


    .refill-group {
      margin-bottom: 20px;

      .refill-items-wrapper {
        width: 100%;

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
            min-width: 60px;

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
            flex-flow: row nowrap;
            justify-content: space-between;
            padding-left: 5px;

            @include layout-sm {
              padding-left: 15px;
            }

            @include layout-md {
              flex: 3;
            }

            .col-left {
              flex: 1;

              h5 {
                @include font-style-body($size: 14px, $weight: 600);
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

            .col-right {
              min-width: 60px;
              margin-left: 5px;
              text-align: right;

              .date {
                margin-bottom: 8px;
                @include font-style-body-bold();
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
            }
          }
        }
      }
    }
  }
}
</style>