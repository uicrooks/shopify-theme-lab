<template>
  <div class="account-component">
    <account-nav />
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
        <account-subscriptions-view />
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
      <account-subscriptions-edit />
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
import { mapGetters } from "vuex";

export default {
  name: "Account",
  props: {
    user: {
      type: Object,
      required: true,
      default: () => {},
    },
    subscriptionCollections: {
      type: Object,
      required: true,
      default: () => {}
    },
    subscriptionOptionsData: {
      type: Object,
      required: true,
      default: () => {}
    },
  },
  computed: {
    ...mapGetters("account", ["currentView", "userTags", "rechargeUser"]),
    isActiveSubscriber() {
      // return this.userTags.includes("Active Subscriber");
      return true;
    },
  },
  methods: {
    updateView() {
      const hash = window.location.hash;
      this.view = hash === "" ? "overview" : hash.slice(1);
    }
  },
  async created() {
    this.updateView();
    
    this.$store.commit("account/setUserTags", this.user.tagString.split("; "));
    this.$store.commit("products/setSubscriptionCollections", this.subscriptionCollections);

    let obj = {};
    Object.keys(this.subscriptionOptionsData).forEach(key => {
     obj[key] = JSON.parse(this.subscriptionOptionsData[key]);
    });
    this.$store.commit("products/setCollections", obj);

    if (this.isActiveSubscriber) {
      console.log("active subscriber");
      // const email = this.user.email;
      const email = "will@drsquatch.com";
      const subscriber = await RechargeService.getUser(email);
      this.$store.commit("account/setRechargeUser", subscriber);

      const paymentSources = await RechargeService.getUserResource(subscriber.id, "payment_sources");
      this.$store.commit("account/setRechargePaymentSource",paymentSources[0]); 
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
@import "@/styles/main.scss";

.account-component {
  background-color: #f6f5f3;
  // padding: 20px 10px;

  // @include layout-sm {
  //   padding: 20px;
  // }

  h1 {
    @include font-style-heading($size: 26px);
  }

  .view {
    padding: 20px 10px;

    @include layout-md {
      padding: 20px;
    }

    h4 {
      margin-bottom: 15px;
      @include font-style-body($weight: 600, $size: 20px);
    }

    .view-section {
      padding: 15px 0 30px 0;
    }

  }


  /** Styling for integrated Liquid snippets in slots */
  .liquid-snippet {
    padding: 15px 0 30px 0;

    h4 {
      @include font-style-body($weight: 600, $size: 20px);
    }

    .no-orders-alert {
      text-align: center;

      .liquid-squatch-button {
        background-color: $orange;
        padding: 12px 25px 8px;
        @include font-style-heading($color: $white, $size: 15px);
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
        background-color: $white;
        border-radius: 5px;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 10%);
        @include font-style-body();
  
        table {
          width: 100%;
  
          thead {
            @include font-style-body($weight: 600);
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