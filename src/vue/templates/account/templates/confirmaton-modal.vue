<template>
  <div class="account-confirmation-modal-component">
    <b-modal
      v-model="showModalFlag"
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
            icon="question-circle"
            class="alert-icon"
          />
        </p>
        <p v-if="errored">
          Sorry, something went wrong. Try again after a few seconds. 
        </p>
        <p v-else>
          <slot />
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
      showModalFlag: false,
      inProgress: false,
      errored: false,
    };
  },
  computed: {
    ...mapGetters("account", ["rechargeUser", "currentGroupName"]),
  },
  watch: {
    item() {
      if (!this.item.id) {
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
    async runActionFunction() {
      this.inProgress = true;
      const result = await this.actionFunction(this.item.id, this.changes);
      if (!result.success) {
        this.inProgress = false;
        this.errored = true;
        return;
      }
      await this.onUpdateSuccessful();
    },
    async onUpdateSuccessful() {
      const squatchBoxGroups = await AccountHelpers.initializeSquatchBoxGroups(this.rechargeUser.id);
      this.$store.dispatch(
        "account/initializeSquatchBoxGroups",
        { squatchBoxGroups: squatchBoxGroups, groupName: this.currentGroupName }
      );

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
  @include font-style-body($size: 15px, $lh: 22px);

  .body {
    padding: 15px;

    .icon-wrapper {
      padding: 15px;
      font-size: 66px;
      color: $text-orange;
      text-align: center;
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

        &.disabled {
          color: $orange-lighten;
        }
      }
    }
  }
}
</style>