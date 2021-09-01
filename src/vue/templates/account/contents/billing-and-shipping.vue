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
            @click="openAddressChangeModal(squatchBoxGroups[groupName])"
            class="edit-link"
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
        <span class="edit-link-placeholder">
        </span>
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
          @click="openAddressChangeModal(squatchBoxGroups[groupName])"
          class="edit-link"
        >
          Edit
        </span>
      </div>
    </account-section-container>
    <account-address-change-modal
      :show-modal="showAddressChangeModal"
      :current-address="currentAddress"
      :address-ids="addressIds"
      @hide="closeAddressChangeModal"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AccountBillingAndShipping",
  data() {
    return {
      showAddressChangeModal: false,
      currentAddress: {},
      addressIds: [],
    };
  },
  computed: {
    ...mapGetters("account", ["rechargePaymentSource", "squatchBoxGroups"]),
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
      console.log(currentGroup);
      this.currentAddress = currentGroup.fullAddress;
      this.addressIds = currentGroup.addresses.map(address => address.id);
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
@import "@/styles/main.scss";

.account-billing-shipping-component {
  
  h4 {
    @include font-style-body-bold($size: 20px, $lh: 25px);
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
      @include font-style-body($color: $text-orange);
    }

    .section {
      width: 100%;

      @include layout-sm {
        width: unset;
        flex: 1;
      }


      &.first {
        margin-bottom: 20px;

        @include layout-sm {
          padding-right: 15px;
        }

        @include layout-md {
          padding-right: 0;
        }
      }

      &.last {

        @include layout-sm {
          padding-left: 15px;
        }

        @include layout-md {
          padding-left: 0;
        }
      }

      .section-title {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        @include font-style-body-bold($size: 14px, $lh: 18px);

        @include layout-md {
          display: block;
          position: relative;
          text-align: center;
        }

        .edit-link {

          @include layout-md {
            position: absolute;
            right: 0;
          }
        }
      }
  
      .section-body {
        @include font-style-body($color: $brown);

        @include layout-md {
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
          color: $red;
          font-size: 12px;
        }
      }
    }

    .shipping-info-row {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      @include font-style-body-bold();

      @include layout-md {
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

        @include layout-md {
          flex: 3;
        }

        .address-line {
          margin-bottom: 5px;
        }
      }

      .edit-link-placeholder {
        width: 25px;

        @include layout-md {
          width: 125px;
        }
      }

      .edit-link {
        @include layout-md {
          padding: 0 50px;
        }
      }
    }

    .address-row {
      padding: 15px 0;
      border-bottom: 1px solid $off-white;
      @include font-style-body($color: $brown);

      &.last {
        padding: 15px 0 0 0;
        border-bottom: none;
      }
    }
  }
}
</style>