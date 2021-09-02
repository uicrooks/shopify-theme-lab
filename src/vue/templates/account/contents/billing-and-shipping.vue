<template>
  <div class="account-billing-shipping-component">
    <h4>Billing Info</h4>
    <account-section-container
      class="section-container top"
    >
      <div class="section first">
        <div class="section-title">
          <span>Payment Details</span>
          <span class="edit-link">
            Edit
          </span>
        </div>
        <div class="section-body">
          <account-billing-info 
            :show-details="true"
          />
        </div>
      </div>
      <div class="section last">
        <div class="section-title">
          <span>Billing Address</span>
          <span
            class="edit-link"
            @click="openAddressChangeModal()"
          >
            Edit
          </span>
        </div>
        <div class="section-body">
          <div
            v-for="(addressLine, index) of getAddressArray(rechargePaymentSource.billing_address)"
            :key="`address-line-${index}`"
            class="address-line"
          >
            {{ addressLine }}
          </div>
        </div>
      </div>
    </account-section-container>

    <h4>Shipping Addresses</h4>
    <account-section-container
      class="section-container"
    >
      <div class="shipping-info-row header">
        <span class="col-name">
          Name
        </span>
        <span class="col-address">
          Address
        </span>
        <span class="edit-link-placeholder" />
      </div>
      <div
        v-for="(groupName, groupIndex) of Object.keys(squatchBoxGroups)"
        :key="`shipping-address-for-${groupName}`"
        class="shipping-info-row address-row"
        :class="{last: Object.keys(squatchBoxGroups).length - 1 === groupIndex}"
      >
        <span class="col-name">
          {{ getFullName(squatchBoxGroups[groupName].fullAddress) }}
        </span>
        <span class="col-address">
          <div
            v-for="(addressLine, index) of getAddressArray(squatchBoxGroups[groupName].fullAddress)"
            :key="`${groupName}-address-line-${index}`"
            class="address-line"
          >
            {{ addressLine }}
          </div>
        </span>
        <span
          class="edit-link"
          @click="openAddressChangeModal(squatchBoxGroups[groupName])"
        >
          Edit
        </span>
      </div>
    </account-section-container>
    <account-address-change-modal
      :show-modal="showAddressChangeModal"
      :current-address="currentAddress"
      :address-ids="addressIds"
      :address-type="addressType"
      @hide="closeAddressChangeModal"
    />
  </div>
</template>

<script>
import FormOptions from "@/configs/form-options";
import { mapGetters } from "vuex";
import AccountSectionContainer from "../templates/section-container.vue";
import AccountAddressChangeModal from "../templates/modal-address-change.vue";
import AccountBillingInfo from "./billing-info.vue";

export default {
  name: "AccountBillingAndShipping",
  components: {
    AccountSectionContainer,
    AccountAddressChangeModal,
    AccountBillingInfo
  },
  data() {
    return {
      showAddressChangeModal: false,
      currentAddress: {},
      addressIds: [],
      addressType: "",
    };
  },
  computed: {
    ...mapGetters("account", ["rechargeUser", "rechargePaymentSource", "squatchBoxGroups"]),
    billingAddress() {
      const stateAbbrs = FormOptions.stateNameToAbbreviationMappings;
      return {
        first_name: this.rechargeUser.first_name,
        last_name: this.rechargeUser.last_name,
        address1: this.rechargeUser.billing_address1,
        address2: this.rechargeUser.billing_address2,
        city: this.rechargeUser.billing_city,
        province: stateAbbrs[this.rechargeUser.billing_province],
        country: this.rechargeUser.billing_country,
        zip: this.rechargeUser.billing_zip,
      };ß;
    }
  },
  methods: {
    getFullName(rechargeAddressObj) {
      return `${rechargeAddressObj.first_name} ${rechargeAddressObj.last_name}`;
    },
    getAddressArray(rechargeAddressObj) {
      const addressLine1 = rechargeAddressObj.address2 ? `${rechargeAddressObj.address1} ${rechargeAddressObj.address2}` : rechargeAddressObj.address1;
      const addressLine2 = `${rechargeAddressObj.city}, ${rechargeAddressObj.province}`;
      const addressLine3 = `${rechargeAddressObj.country} ${rechargeAddressObj.zip}`;
      return [addressLine1, addressLine2, addressLine3];
    },
    openAddressChangeModal(currentGroup) {
      console.log(this.rechargeUser);
      if (currentGroup) {
        console.log(currentGroup);
        this.currentAddress = currentGroup.fullAddress;
        this.addressIds = currentGroup.addresses.map(address => address.id);
        this.addressType = "shipping";
      } else {
        this.currentAddress = this.billingAddress;
        this.addressIds = [];
        this.addressType = "billing";
      }
      this.showAddressChangeModal = true;
    },
    closeAddressChangeModal() {
      this.currentAddress = {};
      this.addressIds = [];
      this.showAddressChangeModal = false;
    }
  },
};
</script>

<style lang="scss">
@use "@/styles/main" as global;

.account-billing-shipping-component {
  
  h4 {
    @include global.font-style-body-bold($size: 20px, $lh: 25px);
  }

  .section-container {
    display: flex;
    flex-flow: row wrap;
    padding: 20px;

    &.top {
      margin-bottom: 20px;
    }

    .edit-link {
      text-decoration: underline;
      cursor: pointer;
      @include global.font-style-body($color: global.$text-orange);
    }

    .section {
      width: 100%;

      @include global.layout-sm {
        width: unset;
        flex: 1;
      }


      &.first {
        margin-bottom: 20px;

        @include global.layout-sm {
          padding-right: 15px;
        }

        @include global.layout-md {
          padding-right: 0;
        }
      }

      &.last {

        @include global.layout-sm {
          padding-left: 15px;
        }

        @include global.layout-md {
          padding-left: 0;
        }
      }

      .section-title {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        @include global.font-style-body-bold($size: 14px, $lh: 18px);

        @include global.layout-md {
          display: block;
          position: relative;
          text-align: center;
        }

        .edit-link {

          @include global.layout-md {
            position: absolute;
            right: 0;
          }
        }
      }
  
      .section-body {
        @include global.font-style-body($color: global.$brown);

        @include global.layout-md {
          text-align: center;
        }

        .address-line {
          margin-bottom: 5px;
        }
  
        .card-logo {
          width: 30px;
          margin-right: 3px;
        }
  
        .status-alert {
          color: global.$red;
          font-size: 12px;
        }
      }
    }

    .shipping-info-row {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      @include global.font-style-body-bold();

      @include global.layout-md {
        text-align: center;
      }

      &.header {
        margin-bottom: 5px;
      }

      .col-name {
        min-width: 90px;
        flex: 1;
      }

      .col-address {
        min-width: 150px;
        padding-right: 20px;
        flex: 2;

        @include global.layout-md {
          flex: 3;
        }

        .address-line {
          margin-bottom: 5px;
        }
      }

      .edit-link-placeholder {
        width: 25px;

        @include global.layout-md {
          width: 125px;
        }
      }

      .edit-link {
        @include global.layout-md {
          padding: 0 50px;
        }
      }
    }

    .address-row {
      padding: 15px 0;
      border-bottom: 1px solid global.$off-white;
      @include global.font-style-body($color: global.$brown);

      &.last {
        padding: 15px 0 0 0;
        border-bottom: none;
      }
    }
  }
}
</style>