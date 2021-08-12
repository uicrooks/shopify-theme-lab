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

    <!-- My Orders -->
    <div v-else-if="currentView === 'My Orders'">
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
    }
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
  created() {
    this.updateView();
  },
  async mounted() {
    window.addEventListener("hashchange", () => {
      this.updateView();
    });

    console.log(this.user);
    this.$store.commit("account/setUserTags", this.user.tagString.split("; "));
    console.log(this.userTags);

    if (this.isActiveSubscriber) {
      // const email = this.user.email;
      const email = "will@drsquatch.com";
      const subscriber = await RechargeService.getUser(email);
      console.log(subscriber);
      this.$store.commit("account/setRechargeUser", subscriber);
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/styles/main" as global;

.account-component {
  background-color: #f6f5f3;
  // padding: 20px 10px;

  // @include layout-sm {
  //   padding: 20px;
  // }

  h1 {
    @include global.font-style-heading($size: 26px);
  }

  .view {
    padding: 20px 10px;

    @include global.layout-md {
      padding: 20px;
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