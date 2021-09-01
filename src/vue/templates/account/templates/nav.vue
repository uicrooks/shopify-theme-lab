<template>
  <div class="account-nav-component">
    <!-- Mobile -->
    <b-button
      :aria-expanded="navOpen ? 'true' : 'false'"
      aria-controls="account-nav"
      block
      squared
      class="account-nav-button"
      :class="navOpen ? null : 'collapsed'"
      @click="navOpen = !navOpen"
    >
      Navigate Account
      <i 
        class="icon-squatch"
        :class="[navOpen ? 'icon-chevron-up' : 'icon-chevron-down']"
      />
    </b-button>
    <b-collapse
      v-model="navOpen"
      class="account-nav mobile"
    >
      <div
        v-for="(item, index) of navMenuItems"
        :key="`account-nav-item-${index}`"
        class="nav-item-wrapper"
        :class="{
          'last': index === navMenuItems.length - 1,
        }"
      >
        <div
          class="nav-item"
          :class="{
            'active': currentView === item.label 
          }"
          @click="selectView(item.label)"
        >
          <b-icon
            v-if="index === 0"
            icon="house-fill"
            class="overview-icon"
          />
          <i 
            v-else
            :class="item.icon"
          />
          {{ item.label }}
        </div>
        <div
          v-if="item.subMenuItems"
          class="sub-menu"
        >
          <div
            v-for="(subItem, subIndex) of item.subMenuItems"
            :key="`account-nav-item-${subIndex}`"
            class="sub-nav-item"
            :class="{
              'last': index === item.subMenuItems.length - 1,
              'active': currentView === subItem.label   
            }"
            @click="selectView(subItem.label)"
          >
            {{ subItem.label }}
          </div>
        </div>
      </div>
    </b-collapse>

    <!-- Desktop -->
    <div class="account-nav desktop">
      <div
        v-if="user.firstName"
        class="profile"
      >
        <img
          src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/DRS_MARK.svg?v=1615332033"
          alt="Dr.Squatch logo"
        >
        <span>Welcome,</span>
        <h4>{{ user.firstName }}</h4>
      </div>
      <div
        v-for="(item, index) of navMenuItems"
        :key="`account-nav-item-${index}`"
        class="nav-item-wrapper"
        :class="{
          'last': index === navMenuItems.length - 1,
        }"
      >
        <div
          class="nav-item"
          :class="{
            'active': currentView === item.label 
          }"
          @click="selectView(item.label)"
        >
          <b-icon
            v-if="index === 0"
            icon="house-fill"
            class="overview-icon"
          />
          <i 
            v-else
            :class="item.icon"
          />
          {{ item.label }}
        </div>
        <div
          v-if="item.subMenuItems"
          class="sub-menu"
        >
          <div
            v-for="(subItem, subIndex) of item.subMenuItems"
            :key="`account-nav-item-${subIndex}`"
            class="sub-nav-item"
            :class="{
              'last': index === item.subMenuItems.length - 1,
              'active': currentView === subItem.label   
            }"
            @click="selectView(subItem.label)"
          >
            {{ subItem.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AccountNav",
  data() {
    return {
      navOpen: false,
      navMenuItems: [
        { 
          label: "Overview",
          icon: ""
        },
        { 
          label: "Squatch Box",
          icon: "icon-custom icon-auto-renew", 
          subMenuItems: [
            { label: "Edit Box" },
            { label: "Refill Schedule" }
          ]
        },
        {
          label: "My Orders",
          icon: "icon-custom icon-box"
        },
        {
          label: "Billing & Shipping",
          icon: "icon-custom icon-credit-card"
        },
        {
          label: "Account Settings",
          icon: "icon-squatch icon-user"
        },
        {
          label: "Loyalty Rewards",
          icon: "icon-custom icon-gift-card"
        },
        {
          label: "Log Out",
          icon: "icon-custom icon-exit"
        },
      ]
    };
  },
  computed: {
    ...mapGetters("account", ["currentView", "user"]),
  },
  methods: {
    selectView(viewName) {
      this.$store.commit("account/setCurrentView", viewName === "Squatch Box" ? "Edit Box" : viewName);
      this.navOpen = false;
    }
  }
};
</script>


<style scoped lang="scss">
@import "@/styles/main.scss";
$account-brown: #473729;

.account-nav-component {
  
  .account-nav-button {
    position: relative;
    padding: 12px 16px;
    width: 100%;
    text-align: left;
    border: none;
    background-color: $account-brown;
    @include font-style-body($color: $white, $size: 16px);

    @include layout-lg {
      display: none;
    }

    .icon-squatch {
      position: absolute;
      top: 13px;
      right: 10px;
      font-size: 12px;
    }
  }

  .account-nav {
    padding: 0 16px;
    background-color: $account-brown;
    @include font-style-body($color: $white);

    &.mobile {
      @include layout-lg {
        display: none;
      }
    }

    &.desktop {
      display: none;
      width: 100%;
      height: 100%;
      

      @include layout-lg {
        display: inline-block;
      }
    }

    .profile {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      padding: 30px;
      text-align: center;

      img {
        width: 60px;
        margin-bottom: 8px;
      }

      h4 {
        @include font-style-body-bold($color: inherit, $size: 16px);
      }
    }

    .nav-item-wrapper {
      padding: 12px 0;
      border-bottom: 1px solid hsla(0, 0%, 100%, .14118);
      @include font-style-body($color: $white);

      &.last {
        border-bottom: none;
      }

      .nav-item {
        cursor: pointer;

        &.active, :hover {
          @include font-style-body($color: $text-orange)
          ;
        }

        .overview-icon, .icon-squatch, .icon-custom {
          margin-right: 5px;
          font-size: 15px;
        }
      }


      .sub-menu {
        padding-left: 24px;

        .sub-nav-item {
          cursor: pointer;
          padding: 15px 0 0 0;

          &.active {
            @include font-style-body($color: $text-orange);
          }
        }
      }
    }

  }

}
</style>