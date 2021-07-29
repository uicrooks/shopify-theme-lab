<template>
  <div class="account-component">
    <div 
      v-if="view === 'overview'"
      class="view"
    >
      <h1>Overview</h1>
      <div class="liquid-snippet recent-orders">
        <slot name="recent-orders" />
      </div>
    </div>
    <div v-else-if="view === 'order-history'">
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
  },
  data() {
    return {
      view: "overview",
    };
  },
  computed: {
    ...mapGetters("account", ["userTags", "rechargeUser"]),
    isActiveSubscriber() {
      return this.userTags.includes("Active Subscriber");
      // return true;
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

    if (this.isActiveSubscriber) {
      // const email = this.user.email;
      const email = "will@drsquatch.com";
      console.log(email);
      const subscriber = await RechargeService.getUser(email);
      console.log(subscriber);
      this.$store.commit("account/setRechargeUser", subscriber);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.account-component {
  background-color: #f6f5f3;
  padding: 20px 10px;

  @include layout-sm {
    padding: 20px;
  }

  h1 {
    @include font-style-heading($size: 30px);
  }


  /** Styling for integrated Liquid snippets in slots */
  .liquid-snippet {

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