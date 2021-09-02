<template>
  <div class="account-alert-modal">
    <b-modal
      v-model="showModalFlag"
      centered
      hide-header
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      body-class="account-alert-modal-body"
      @cancel="$emit('hide')"
    >
      <b-icon
        icon="exclamation-circle"
        scale="3"
        class="alert-icon"
      />
      <p v-if="genericError">
        Sorry, something went wrong. Please try again after a few seconds.
      </p>
      <div v-else>
        <slot />
      </div>
      <div class="buttons">
        <div class="button-wrapper">
          <squatch-button
            @clicked="$emit('hide')"
          >
            Ok
          </squatch-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "AccountAlertModal",
  props: {
    showModal: {
      type: Boolean,
      required: true,
      default: false
    },
    genericError: {
      type: Boolean,
      requiredL: false,
      default: true
    }
  },
  data() {
    return {
      showModalFlag: false,
    };
  },
  watch: {
    showModal(val) {
      this.showModalFlag = val;
    }
  }
};
</script>

<style lang="scss">
@use "@/styles/main" as global;

.account-alert-modal-body {
  padding: 20px;
  text-align: center;

  .alert-icon {
    color: global.$red;
    margin-top: 20px;
    margin-bottom: 25px;
  }

  p {
    text-align: left;
    @include global.font-style-body();
  }

  .buttons {
    margin-top: 20px;
  }
}
</style>