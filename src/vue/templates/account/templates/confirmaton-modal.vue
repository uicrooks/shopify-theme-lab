<template>
  <div class="account-confirmation-modal-component">
    <b-modal
      v-model="showModal"
      hide-header
      hide-footer
      centered
      no-close-on-esc
      no-close-on-backdrop
      body-class="account-edit-confirm-modal"
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
            icon="exclamation-circle"
            class="alert-icon"
          />
        </p>
        <p v-if="errored">
          Sorry, something went wrong. Try again after a few seconds. 
        </p>
        <p v-else>
          Are you sure to {{ actionDescription }} {{ item.product_title }}?
        </p>
      </div>
      <div class="footer">
        <div class="button-wrapper">
          <squatch-button
            class="cancel-button"
            :disabled="inProgress"
            @clicked="$emit('hide')"
          >
            Cancel
          </squatch-button>
        </div>
        <div class="button-wrapper">
          <squatch-button
            class="confirm-button"
            :disabled="inProgress || errored"
            @clicked="runActionFunction"
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

export default {
  name: "AccountConfirmationModal",
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
    },
    actionDescription: {
      type: String,
      required: false,
      default: ""
    },
    actionFunction: {
      type: Function,
      required: true,
      default: () => {}
    },
    changes: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      inProgress: false,
      errored: false,
    };
  },
  computed: {
    ...mapGetters("account", ["rechargeUser", "currentGroupName"]),
    newRefillDateSelected() {
      return this.refillBoxDate.split("T")[0] !== this.newRefillDate;
    },
  },
  watch: {
    item(val) {
      console.log(val);
      console.log(this.actionDescription);
      console.log(this.actionFunction);
      console.log(this.changes);
      if (this.actionDescription === "") {
        this.inProgress = false;
        this.errored = false;
      }
    }
  },
  methods: {
    async runActionFunction() {
      this.inProgress = true;
      const result = await this.actionFunction(this.item.id, this.changes);
      console.log("result", result);
      if (!result.success) {
        this.inProgress = false;
        this.errored = true;
        return;
      }
      
      await this.onUpdateSuccessful();
    },
    async onUpdateSuccessful() {
      const squatchBoxGroups = await AccountHelpers.initializeOrderData(this.rechargeUser.id);
      this.$store.commit("account/setSquatchBoxGroups", squatchBoxGroups);
      this.$store.dispatch("account/initializeCurrentGroup", this.currentGroupName);

      this.inProgress = false;
      this.errored = false;
      this.$emit("hide");
    }
  },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";

.account-edit-confirm-modal {
  padding: 0;
  @include font-style-body($size: 15px, $lh: 18px);

  .body {
    padding: 15px;
    text-align: center;

    .icon-wrapper {
      padding: 15px;
      font-size: 66px;
      color: $text-orange;
    }

    p {
      width: 90%;
      margin: auto;

      &.errored {
        color: $red;
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
        color: $text-orange;
        background-color: transparent;
        border: 1px solid transparent;
      }
    }
  }
}
</style>