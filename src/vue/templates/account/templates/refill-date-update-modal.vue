<template>
  <div class="account-refill-date-update-modal-component">
    <b-modal
      v-model="showModalFlag"
      hide-header
      hide-footer
      centered
      no-close-on-esc
      no-close-on-backdrop
      body-class="account-refill-date-update-modal"
      @cancel="$emit('hide')"
    >
      <div class="body">
        <p
          class="icon-wrapper"
          :class="{errored: errored}"
        >
          <b-spinner
            v-if="inProgress"
          />
          <b-icon
            v-else
            icon="question-circle"
            class="alert-icon"
          />
        </p>
        <p v-if="errored">
          Sorry, something went wrong. We weren't able to update the refill date on all of your items. Try again after a few seconds. 
        </p>
        <p v-else-if="inProgress">
          We are updating the refill schedule for all of your items. Thank you for your patience.
          <b-progress
            :value="numOfItemsUpdated"
            :max="processedItemsWithPayload.length"
          />
        </p>
        <p v-else>
          Do you confirm to update your next refill date to {{ refillDateDisplay }}? This will automatically update your future refill schedule.
        </p>
      </div>
      <div class="footer">
        <div class="button-wrapper">
          <squatch-button
            class="cancel-button"
            :disabled="inProgress"
            @clicked="$emit('hide')"
          >
            {{ errored ? 'OK' : 'Cancel' }}
          </squatch-button>
        </div>
        <div
          v-if="!errored"
          class="button-wrapper"
        >
          <squatch-button
            class="confirm-button"
            :disabled="inProgress || errored"
            @clicked="confirm"
          >
            Yes, Confirm
          </squatch-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import RechargeService from "@/vue/services/recharge.service";
import AccountHelpers from "@/vue/services/account-helpers";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "AccountRefillDateUpdateModal",
  props: {
    showModal: {
      type: Boolean,
      required: true,
      default: false
    },
    items: {
      type: Object,
      required: true,
      default: () => { return { nextRefill: [], upcomingRefill: [] } }
    },
    newRefillDate: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      showModalFlag: false,
      inProgress: false,
      errored: false,
      numOfItemsUpdated: 0,
    };
  },
  computed: {
    ...mapGetters("account", ["rechargeUser", "currentGroupName"]),
    refillDateDisplay() {
      return moment(this.newRefillDate).format("dddd, MMM Do, YYYY");
    },
    processedItemsWithPayload() {
      let nextRefillWithPayload = this.items.nextRefill.map(item => {
        return {
          isOnetime: item.status === "ONETIME",
          id: item.id,
          payload: item.status === "ONETIME" ? {
            next_charge_scheduled_at: this.newRefillDate
          } : {
            next_charge_scheduled_at: this.newRefillDate,
            commit_update: false
          }
        };
      });
      let upcomingRefillWithPayload = this.items.upcomingRefill
        .filter(item => item.order_interval_frequency)
        .map(item => {
          const delayedRefillDate = moment(this.newRefillDate).add(Number(item.order_interval_frequency), "months").format("YYYY-MM-DD");
          return {
            isOnetime: false,
            id: item.id,
            payload: {
              next_charge_scheduled_at: delayedRefillDate,
              commit_update: false
            }
          };
        });
      return [...nextRefillWithPayload, ...upcomingRefillWithPayload];
    },
  },
  watch: {
    items(val) {
      console.log(val);
      console.log(this.newRefillDate);
  
      if (Object.keys(val).length === 0) {
        // reset
        this.inProgress = false;
        this.errored = false;
      }
    },
    showModal(val) {
      this.showModalFlag = val;
    },
  },
  methods: {
    async confirm() {
      this.inProgress = true;
      this.numOfItemsUpdated = 0;

      let failedRequests = await this.runUpdateAndReturnFailedRequests(this.processedItemsWithPayload);
      if (!failedRequests.length) {
        return await this.onUpdateComplete();
      }

      let attemptsMade = 0;
      const retryInterval = setInterval(async () => {
        failedRequests = await this.runUpdateAndReturnFailedRequests(failedRequests, this.newRefillDate);
        attemptsMade++;
        if (!failedRequests.length) {
          clearInterval(retryInterval);
          return await this.onUpdateComplete();
        }
        if (attemptsMade === 4) {
          clearInterval(retryInterval);
          this.inProgress = false;
          this.errored = true;
          return await this.onUpdateComplete();
        }
      }, 2000);
    },
    async runUpdateAndReturnFailedRequests(items) {
      let failed = [];
      for (let i = 0; i < items.length; i++) {
        let result;
        if (items[i].isOnetime) {
          result = await RechargeService.updateOnetime(
            items[i].id,
            items[i].payload,
          );
        } else {
          result = await RechargeService.updateSubscription(
            items[i].id,
            items[i].payload,
          );
        }
        result.success ? this.numOfItemsUpdated++ : failed.push(items[i]);
      }
      return failed;
    },
    async onUpdateComplete() {
      const squatchBoxGroups = await AccountHelpers.initializeSquatchBoxGroups(this.rechargeUser.id);
      this.$store.dispatch(
        "account/initializeSquatchBoxGroups",
        { squatchBoxGroups: squatchBoxGroups, groupName: this.currentGroupName }
      );
      if (!this.errored) {
        this.$emit("hide");
      }
    },
  },
};
</script>

<style lang="scss">
@use "@/styles/main" as global;

.account-refill-date-update-modal {
  padding: 0;
  @include global.font-style-body($size: 15px, $lh: 22px);

  .body {
    padding: 15px 20px;

    .icon-wrapper {
      padding: 15px;
      font-size: 66px;
      color: global.$text-orange;
      text-align: center;
    }

    p {

      &.errored {
        color: global.$red;
      }

      .progress {
        margin-top: 15px;

        .progress-bar {
          background-color: global.$orange;
        }
      }
    }
  }

  .footer {
    display: flex;
    flex-flow: row wrap;
    
    .button-wrapper {
      flex: 1;
      padding: 14px;

      .cancel-button {
        color: global.$text-orange;
        background-color: transparent;
        border: 1px solid transparent;
        
        &.disabled {
          color: global.$orange-lighten;
        }
      }
    }
  }
}
</style>