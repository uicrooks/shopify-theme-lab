<template>
  <div class="main-nav-component">
    <!-- Mobile sidebar navigation -->
    <div class="mobile-nav">
      <img
        id="drsquatch-logo-mobile"
        src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/DRS_horizontal_fullcolor.svg?v=1615332033"
        alt="Dr.Squatch logo"
      >
      <div class="buttons">
        <b-icon
          icon="cart"
          font-scale="2"
        />
        <b-icon
          v-b-toggle.main-nav-sidebar
          icon="list"
          font-scale="2"
          class="burger-icon"
        />
      </div>

      <b-sidebar
        id="main-nav-sidebar"
        aria-labelledby="main-nav-sidebar"
        shadow
        backdrop
      >
        <template #header>
          <div class="sidebar-header">
            <img
              id="drsquatch-logo-mobile-sidebar"
              src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/DRS_horizontal_fullcolor.svg?v=1615332033"
              alt="Dr.Squatch logo"   
            >
            <div class="account-icon-box">
              <b-icon
                icon="person-fill"
                font-scale="2.5"
                class="person-icon"
              />
              <span>Log In</span>
            </div>
          </div>
        </template>

        <template #default>
          <squatch-button
            text="The Subscription"
            sub-text="Save 15% on your favorite soap and get free shipping for life!"
            path="/test"
          />
          <squatch-button
            text="Starter Bundles"
            sub-text="Your choice of our curated best sellers"
            path="/test"
            color="maroon"
          />

          <grouped-menu-item
            :name="soapMenu.name"
            :is-open="soapMenu.isOpen"
            :sub-menu-items="soapMenu.subMenuItems"
            @toggle="soapMenu.isOpen = !soapMenu.isOpen"
          />
          <single-menu-item
            v-for="(item, index) of singleMenuItems"
            :key="`single-menu-item-${index}`"
            :name="item.name"
            :badge="item.badge"
            :path="item.path"
          />
          <grouped-menu-item
            :name="moreMenu.name"
            :is-open="moreMenu.isOpen"
            :sub-menu-items="moreMenu.subMenuItems"
            @toggle="moreMenu.isOpen = !moreMenu.isOpen"
          />
          <single-menu-item
            class="soap-quiz-menu"
            name="Take Soap Quiz"
            path="/quiz"
          />

          <div class="sidebar-footer">
            <grouped-menu-item
              :name="infoMenu.name"
              :is-open="infoMenu.isOpen"
              :sub-menu-items="infoMenu.subMenuItems"
              @toggle="infoMenu.isOpen = !infoMenu.isOpen"
            />
            <grouped-menu-item
              :name="aboutMenu.name"
              :is-open="aboutMenu.isOpen"
              :sub-menu-items="aboutMenu.subMenuItems"
              @toggle="aboutMenu.isOpen = !aboutMenu.isOpen"
            />
            <grouped-menu-item
              :name="helpMenu.name"
              :is-open="helpMenu.isOpen"
              :sub-menu-items="helpMenu.subMenuItems"
              @toggle="helpMenu.isOpen = !helpMenu.isOpen"
            />
          </div>
        </template>
      </b-sidebar>
    </div>
    <!-- Desktop Navigation -->
    <div class="desktop-nav">
      <div class="left-section">
        haha
      </div>
      <img
        id="drsquatch-logo-desktop"
        src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/DRS_horizontal_fullcolor.svg?v=1615332033"
        alt="Dr.Squatch logo"
      >
      <div class="right-section">
        hahaha
      </div>
    </div>
  </div>
</template>

<script>
import SquatchButton from "@vue/ui-elements/squatch-button";
import GroupedMenuItem from "@vue/core/main-nav/grouped-menu-item";
import SingleMenuItem from "@vue/core/main-nav/single-menu-item";

export default {
  name: "MainNav",
  components: {
    SquatchButton,
    GroupedMenuItem,
    SingleMenuItem
  },
  data() {
    return {
      soapMenu: {
        name: "Bar Soaps",
        isOpen: false,
        subMenuItems: [{ 
          name: "Subscribe & Save",
          path: "/test"
        }, {
          name: "Starter Bundles",
          path: "/test"
        }, {
          name: "Shop Bar Soaps",
          path: "/test"
        }]
      },
      moreMenu: {
        name: "Shop More Products",
        isOpen: false,
        subMenuItems: [{ 
          name: "Colonge",
          path: "/test"
        }, {
          name: "Beard Oil",
          path: "/test"
        }, {
          name: "Hand Sanitizer",
          path: "/test"
        }, {
          name: "Hand Soap",
          path: "/test"
        }, {
          name: "Gift Cards",
          badge: "New!",
          path: "/test"
        }, {
          name: "Candles",
          path: "/test"
        }, {
          name: "Gear",
          path: "/test"
        }]
      },
      infoMenu: {
        name: "Info",
        isOpen: false,
        subMenuItems: [{ 
          name: "Ingredients",
          path: "/test"
        }, {
          name: "Hero Discounts",
          path: "/test"
        }, {
          name: "Wholesale",
          path: "/test"
        }, {
          name: "Check Gift Card Balance",
          path: "/test"
        }]
      },
      aboutMenu: {
        name: "About Us",
        isOpen: false,
        subMenuItems: [{ 
          name: "About Us",
          path: "/test"
        }, {
          name: "Blog",
          path: "/test"
        }]
      },
      helpMenu: {
        name: "Help & Support",
        isOpen: false,
        subMenuItems: [{ 
          name: "FAQs",
          path: "/test"
        }, {
          name: "Shipping",
          path: "/test"
        }, {
          name: "Returns & Refunds",
          path: "/test"
        }, {
          name: "Contact Us",
          path: "/test"
        }, {
          name: "Terms of Use",
          path: "/test"
        }, {
          name: "Privacy Policy",
          path: "/test"
        }]
      },
      singleMenuItems: [
        {
          name: "Hair Care",
          path: "/"
        },
        {
          name: "Deodorant",
          path: "/",
          badge: "New!"
        },
        {
          name: "Toothpaste",
          path: "/"
        },
        {
          name: "Shower Boosters",
          path: "/"
        },
        {
          name: "Best Sellers",
          path: "/"
        }
      ]
    }
  },
  methods: {
    navigateTo(menu) {
      console.log(menu);
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.main-nav-component {
  font-size: 16px;

  .mobile-nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 15px;

    @include layout-md {
      display: none;
    }

    #drsquatch-logo-mobile {
      height: 45px;
    }

    .buttons {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;

      .burger-icon {
        margin-left: 8px;
      }
    }

    .sidebar-header {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      padding: 8px 0;

      #drsquatch-logo-mobile-sidebar {
        width: 120px;
      }

      .account-icon-box {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 40px;
        color: $orange;
        font-size: 11px;

        .person-icon {
          color: $orange;
        }

        span {
          position: absolute;
          bottom: -5px;
        }
      }
    }
    
    .soap-quiz-menu {
      border-top: 1px solid $off-white;
      font-weight: 400;
    }

    .sidebar-footer {
      background-color: $off-white;
    }
  }

  .desktop-nav {
    display: none;

    @include layout-md {
      display: flex;
      width: 100%;
    }

    #drsquatch-logo-desktop {
      width: 165px;
    }
  }
}
</style>

<style lang="scss">
.b-sidebar-body {
  overflow-y: hidden !important;
}

.squatch-button-component {
  .button-text {
    font-size: 16px;
    text-transform: uppercase;
  }
}
</style>