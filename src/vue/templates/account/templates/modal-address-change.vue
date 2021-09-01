<template>
  <div class="account-modal-address-change-component">
    <b-modal
      v-model="showModalFlag"
      novalidate
      validated
      centered
      no-close-on-esc
      no-close-on-backdrop
      header-class="account-address-change-modal-header"
      body-class="account-address-change-modal-body"
      footer-class="account-address-change-modal-footer"
      @cancel="$emit('hide')"
    >
      <template #modal-header>
        <div class="header-wrapper">
          <h2>Update Shipping Address</h2>
          <span
            v-if="!inProgress"
            class="close-button"
            @click="$emit('hide')"
          >
            <i
              class="icon-squatch icon-cross"
            />
          </span>
        </div>
      </template>

      <b-overlay :show="inProgress">
        <b-form>
          <b-form-group
            label="First Name"
            label-for="input-first-name"
          >
            <b-form-input
              id="input-first-name"
              type="text"
              v-model="formData.first_name"
              :state="checkIfValid('first_name')"
              required
            />
            <b-form-invalid-feedback
              :state="checkIfValid('first_name')"
            >
              Required
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            label="Last Name"
            label-for="input-last-name"
          >
            <b-form-input
              id="input-last-name"
              type="text"
              v-model="formData.last_name"
              :state="checkIfValid('last_name')"
              required
            />
            <b-form-invalid-feedback
              :state="checkIfValid('last_name')"
            >
              Required
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            label="Address 1"
            label-for="input-address-1"
          >
            <b-form-input
              id="input-address-1"
              type="text"
              v-model="formData.address1"
              :state="checkIfValid('address1')"
              required
            />
            <b-form-invalid-feedback
              :state="checkIfValid('address1')"
            >
              Required
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            label="Address 2"
            label-for="input-address-2"
          >
            <b-form-input
              id="input-address-2"
              type="text"
              v-model="formData.address2"
              :state="checkIfValid('address2')"
            />
          </b-form-group>
          <b-form-group
            label="City"
            label-for="input-city"
          >
            <b-form-input
              id="input-city"
              type="text"
              v-model="formData.city"
              :state="checkIfValid('city')"
              required
            />
            <b-form-invalid-feedback
              :state="checkIfValid('city')"
            >
              Required
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            v-if="formData.country === 'United States'"
            label="State"
            label-for="input-state"
          >
            <b-form-select
              id="input-state"
              v-model="formData.province"
              :options="stateList"
              :state="checkIfValid('province')"
              required
            />
            <b-form-invalid-feedback
              :state="checkIfValid('province')"
            >
              Required
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            v-else
            label="Province"
            label-for="input-province"
          >
            <b-form-input
              id="input-province"
              type="text"
              v-model="formData.province"
              :state="checkIfValid('province')"
              required
            />
            <b-form-invalid-feedback
              :state="checkIfValid('province')"
            >
              Required
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            label="Country"
            label-for="input-country"
          >
            <b-form-select
              id="input-country"
              v-model="formData.country"
              :options="countryList"
              :state="checkIfValid('country')"
              required
            />
            <b-form-invalid-feedback
              :state="checkIfValid('country')"
            >
              Required
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            label="Zip Code"
            label-for="input-zip"
          >
            <b-form-input
              id="input-zip"
              type="text"
              v-model="formData.zip"
              :state="checkIfValid('zip')"
              required
            />
            <b-form-invalid-feedback
              v-if="formData.zip === ''"
              :state="checkIfValid('zip')"
            >
              Required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback
              v-else
              :state="checkIfValid('zip')"
            >
              Invalid format
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form>
      </b-overlay>

      <template #modal-footer>
        <div class="button-wrapper">
          <squatch-button
            class="reset-button"
            :disabled="inProgress"
            @clicked="resetForm"
          >
            Reset
          </squatch-button>
        </div>
        <div class="button-wrapper">
          <squatch-button
            :disabled="!isFormReady || inProgress"
            @clicked="submit"
          >
            Submit
          </squatch-button>
        </div>
      </template>
    </b-modal>
    <account-alert-modal
      :show-modal="errored"
      :generic-error="true"
      @hide="errored = false; inProgress = false"
    />

  </div>
</template>

<script>
import RechargeService from "@/vue/services/recharge.service";
import AccountHelpers from "@/vue/services/account-helpers";
import FormOptions from "@/configs/form-options";
import { mapGetters } from "vuex";

export default {
  name: "AccountAddressChangeModal",
  props: {
    showModal: {
      type: Boolean,
      required: true,
      default: false
    },
    currentAddress: {
      type: Object,
      required: true,
      default: () => {}
    },
    addressIds: {
      type: Array,
      required: false,
      default: () => []
    },
  },
  data() {
    return {
      showModalFlag: false,
      inProgress: false,
      errored: false,
      formData: {
        first_name: "",
        last_name: "",
        address1: "",
        address2: "",
        city: "",
        province: "",
        country: "",
        zip: ""
      },
      stateList: FormOptions.stateListByAbbreviation,
      countryList: FormOptions.supportedCountryList,
    };
  },
  computed: {
    ...mapGetters("account", ["rechargeUser", "rechargeOrders", "rechargeAddresses", "currentGroupName"]),
    isFormReady() {
      let hasUpdatedField = false;
      if (!this.currentAddress) return false;
      const fields = Object.keys(this.formData);
      for (let i = 0; i < fields.length; i++) {
        // U.S. zip code validation
        if (this.formData.country === "United States" && fields[i] === "zip" && !/^\d{5}(-\d{4})?$/.test(this.formData[fields[i]])) {
          return false;
        }
        // Required field validation
        if (fields[i] !== "address2" && this.formData[fields[i]] === "") {
          return false;
        }
        // Check if updated
        if (this.formData[fields[i]] !== this.currentAddress[fields[i]]) {
          hasUpdatedField = true;
        }
      }
      return hasUpdatedField;
    }
  },
  watch: {
    showModal(val) {
      this.showModalFlag = val;
    },
    currentAddress(val) {
      if (!val.id) {
        this.inProgress = false;
        this.errored = false;
        this.resetForm();
        return;
      }
      this.formData = {
        first_name: val.first_name,
        last_name: val.last_name,
        address1: val.address1,
        address2: val.address2,
        city: val.city,
        province: val.province,
        country: val.country,
        zip: val.zip
      };
    }
  },
  methods: {
    checkIfValid(field) {
      if (!this.currentAddress.id) return false;
      // U.S. zip code format validation
      if (this.formData.country === "United States" && field === "zip" && !/^\d{5}(-\d{4})?$/.test(this.formData[field])) {
        return false;
      }
      // Required field validation
      if (field !== "address2" && this.formData[field] === "") {
        return false;
      } 
      // Value change validation (if not updated, return null for neutral state)
      if (this.formData[field] === this.currentAddress[field]) {
        return null;
      }
      return true;
    },
    resetForm() {
      this.formData = {
        first_name: "",
        last_name: "",
        address1: "",
        address2: "",
        city: "",
        province: "",
        country: "",
        zip: ""
      };
    },
    async submit() {
      this.inProgress = true;

      let failedRequests = await this.runUpdateAndReturnFailedRequests(this.addressIds, this.formData);
      if (!failedRequests.length) {
        return await this.onUpdateComplete();
      }

      let attemptsMade = 0;
      const retryInterval = setInterval(async () => {
        failedRequests = await this.runUpdateAndReturnFailedRequests(failedRequests, this.formData);
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
    async runUpdateAndReturnFailedRequests(addressIds, newAddress) {
      let failed = [];
      for (let i = 0; i < addressIds.length; i++) {
        const result = await RechargeService.updateAddress(
          addressIds[i],
          newAddress
        );
        if (!result.success) {
          failed.push(addressIds[i]);
        }
      }
      return failed;
    },
    async onUpdateComplete() {
      const addresses = await RechargeService.getUserResource(this.rechargeUser.id, "addresses");
      this.$store.commit("account/setRechargeAddresses", addresses);

      const squatchBoxGroups = await AccountHelpers.generateSquatchBoxGroups(this.rechargeOrders, addresses);
      this.$store.dispatch(
        "account/initializeSquatchBoxGroups",
        { squatchBoxGroups: squatchBoxGroups, groupName: this.formData.address1.toLowerCase() }
      );

      if (!this.errored) {
        this.$emit("hide");
      }
    },
  }
};
</script>

<style lang="scss">
@import "@/styles/main.scss";

.account-address-change-modal-header {

  .header-wrapper {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    h2 {
      margin-bottom: 0;
      @include font-style-body-bold($size: 20px);
    }

    .close-button {
      position: absolute;
      top: 11px;
      right: 19px;
      cursor: pointer;

      .icon-squatch {
        font-size: 14px;
      }
    }
  }
}

.account-address-change-modal-body {
  padding: 20px 20px 10px 20px;

  .errored {
    @include font-style-body($color: $red);
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    margin-bottom: 5px;
    @include font-style-body-bold();
  }
}

.account-address-change-modal-footer {
  display: flex;
  flex-flow: row nowrap;
  
  .button-wrapper {
    flex: 1;
    padding: 0 10px;

    .reset-button {
      border: 1px solid $orange;
      background-color: transparent;
      color: $orange;

      &.disabled, :hover {
        border: 1px solid $orange-lighten;
        color: $orange-lighten;
      }
    }
  }
}
  
</style>