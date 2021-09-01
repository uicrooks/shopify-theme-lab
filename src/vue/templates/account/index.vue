<template>
  <div class="account-component">
    <account-nav
      v-if="!loading"
      class="account-nav"
    />
    <!-- Overview -->
    <div 
      v-if="currentView === 'Overview'"
      class="view"
    >
      <h1>Overview</h1>
      <div class="liquid-snippet recent-orders">
        <slot name="recent-orders" />
      </div>
      <div
        v-if="rechargeUser.id"
        class="view-section"
      >
        <h4>Squatch Box</h4>
        <account-subscriptions-view
          @ready="loading = false"
        />
      </div>
      <div class="view-section">
        <h4>Get More Squatch</h4>
      </div>
    </div>
    <!-- End of Overview -->

    <!-- Edit Box -->
    <div
      v-else-if="currentView === 'Edit Box'"
      class="view"
    >
      <h1>Edit Box</h1>
      <account-subscriptions-edit 
        @ready="loading = false"
      />
    </div>
    <!-- End of Edit Box -->

    <!-- Refill Schedule -->
    <div
      v-else-if="currentView === 'Refill Schedule'"
      class="view"
    >
      <h1>Refill Schedule</h1>
      <account-refill-schedule />
    </div>
    <!-- End of Edit Box -->

    <!-- My Orders -->
    <div
      v-else-if="currentView === 'My Orders'"
      class="view"
    >
      <h1>My Orders</h1>
      <div class="liquid-snippet order-history">
        <slot name="order-history" />
      </div>
    </div>
    <!-- <account-subscriptions
      v-if="rechargeUser.id"
    /> -->
  </div>
</template>

<script>
import RechargeService from "@/vue/services/recharge.service";
import AccountHelpers from "@/vue/services/account-helpers";
import { mapGetters } from "vuex";

export default {
  name: "Account",
  props: {
    user: {
      type: Object,
      required: true,
      default: () => {},
    },
    subscriptionProducts: {
      type: Array,
      required: true,
      default: () => []
    },
    subscriptionOptions: {
      type: Array,
      required: true,
      default: () => []
    },
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapGetters("account", ["currentView", "rechargeUser"]),
    isActiveSubscriber() {
      // return this.user.tags.includes("Active Subscriber");
      return true;
    },
  },
  watch: {
    currentView(val) {
      console.log("view updated to:", val);
      if (["Overview", "Edit Box"].includes(val)) {
        this.loading = true;
      }
    }
  },
  methods: {
    updateView() {
      const hash = window.location.hash;
      this.view = hash === "" ? "overview" : hash.slice(1);
    },
    async initializeRechargeUserData(email) {
      const subscriber = await RechargeService.getUser(email);
      const paymentSources = await RechargeService.getUserResource(subscriber.id, "payment_sources");
      this.$store.commit("account/setRechargeUser", subscriber);
      this.$store.commit("account/setRechargePaymentSource",paymentSources[0]); 
    },
    async initializeSubscriptionData(rechargeUserId) {
      const squatchBoxGroups = await AccountHelpers.initializeSquatchBoxGroups(rechargeUserId);
      // this.$store.commit("account/setRechargeOrders", orders);
      this.$store.dispatch(
        "account/initializeSquatchBoxGroups",
        { squatchBoxGroups: squatchBoxGroups, groupName: Object.keys(squatchBoxGroups)[0] }
      );
    }
  },
  async created() {
    this.updateView();
    this.$store.commit("account/setUser", this.user);

    const subProducts = AccountHelpers.organizeProductsByType(this.subscriptionProducts);
    const subOptions = AccountHelpers.organizeProductsByType(this.subscriptionOptions);
    this.$store.commit("products/setSubscriptionCollections", subProducts);
    this.$store.commit("products/setSubscriptionOptionCollections", subOptions);

    console.log("user", this.user);

    if (this.isActiveSubscriber) {
      // const email = this.user.email;
      const email = "will@drsquatch.com";
      await this.initializeRechargeUserData(email);
      await this.initializeSubscriptionData(this.rechargeUser.id);
    }
  },
  async mounted() {
    window.addEventListener("hashchange", () => {
      this.updateView();
    });  
  }
};
</script>

<style lang="scss" scoped>
@use "@/styles/main" as global;

.account-component {
  background-color: #f6f5f3;

  @include layout-lg {
    display: flex;
    flex-flow: row wrap;
  }

  .account-nav {
    position: sticky;
    top: 75px;
    z-index: 1;

    @include layout-lg {
      width: 230px;
    }
  }

  .view {
    padding: 20px 10px;

    @include layout-sm {
      padding: 20px;
    }

    @include layout-lg {
      flex: 1;
    }
  
    h1 {
      @include font-style-heading($size: 26px);
    }

    h4 {
      margin-bottom: 15px;
      @include global.font-style-body($weight: 600, $size: 20px);
    }

    .view-section {
      padding: 15px 0 30px 0;
    }

  }


  /** Styling for integrated Liquid snippets in slots */
  .liquid-snippet {
    padding: 15px 0 30px 0;

    h4 {
      @include global.font-style-body($weight: 600, $size: 20px);
    }

    .no-orders-alert {
      text-align: center;

      .liquid-squatch-button {
        background-color: global.$orange;
        padding: 12px 25px 8px;
        @include global.font-style-heading($color: global.$white, $size: 15px);
      }
    }

    &.recent-orders {
  
      .view-all-wrapper {
        margin-bottom: 5px;
  
        a, a:hover, a:visited {
          text-decoration: underline;
          color: #de7c00;
          font-size: 13px;
        }
      }
  
      .account-recent-orders-table-wrapper {
        padding: 20px 15px;
        background-color: global.$white;
        border-radius: 5px;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 10%);
        @include global.font-style-body();
  
        table {
          width: 100%;
  
          thead {
            @include global.font-style-body($weight: 600);
          }
  
          tbody {
  
            td {
              padding: 10px 0;
  
              a, a:hover, a:visited {
                text-decoration: underline;
              }
            }
  
            .account-order-tracking-link {
              color: #de7c00;
            }
  
            .account-order-tracking-link-green {
              color: #203620;
            }
            
          }
        }
      }
    }

    &.order-history {
    }
  }

}

</style>