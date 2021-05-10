<template>
  <div class="main-nav-component">
    <div class="mobile-nav">
      <img
        src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/DRS_horizontal_fullcolor.svg?v=1615332033"
        alt="Dr.Squatch logo"
        id="logo"
      />
      <div class="buttons">
        <b-icon
          icon="cart"
          font-scale="2"
        ></b-icon>
        <b-icon
          v-b-toggle.main-nav-sidebar
          icon="list"
          font-scale="2"
          class="burger-icon"
        ></b-icon>
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
              src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/DRS_horizontal_fullcolor.svg?v=1615332033"
              alt="Dr.Squatch logo"
              id="sidebar-logo"
            />
            <div class="account-icon-box">
              <b-icon
                icon="person-fill"
                font-scale="2.5"
                class="person-icon"
              ></b-icon>
              <span>Log In</span>
            </div>
          </div>
        </template>
        <template #default="{ hide }">
          <div
            router-link="/"
            class="big-cta-button subscription"
          >
            <span class="cta-button-title">The Subscription</span>
            Save 15% on your favorite soap and get free shipping for life!
          </div>
            <div
            router-link="/"
            class="big-cta-button bundles"
          >
            <span class="cta-button-title">Starter Bundles</span>
            Your choice of our curated best sellers.
          </div>

          <div  
            class="menu-item collapsable"
            :class="openSoapSubMenu ? null : 'collapsed'"
            :aria-expanded="openSoapSubMenu ? 'true' : 'false'"
            aria-controls="sub-menu-soaps"
            @click="openSoapSubMenu = !openSoapSubMenu"
          >
            <div class="menu-item-name">
              Bar Soaps
            </div>
            <b-icon :icon="openSoapSubMenu ? 'chevron-up' : 'chevron-down'"></b-icon>  
          </div>
          <b-collapse
            id="sub-menu-soaps"
            v-model="openSoapSubMenu"
          >
            <div class="menu-item sub" router-link="/">
              Subscribe & Save
            </div>
            <div class="menu-item sub" router-link="/">
              Starter Bundles
            </div>
            <div class="menu-item sub" router-link="/">
              Shop Bar Soaps
            </div>
          </b-collapse>
          <div
            class="menu-item single"
            v-for="(item, index) of singleMenuItems"
            :key="`menu-item-${index}`"
          >
            <div
              class="menu-item-name"
              @click="navigateTo(item)"
            >
              {{ item.name }}
              <span
                class="badge"
                v-if="item.badgeText"
              >{{ item.badgeText }}</span>
            </div>
            <b-icon icon="chevron-right"></b-icon>
          </div>
          <div  
            class="menu-item collapsable"
            :class="openMoreSubMenu ? null : 'collapsed'"
            :aria-expanded="openMoreSubMenu ? 'true' : 'false'"
            aria-controls="sub-menu-more"
            @click="openMoreSubMenu = !openMoreSubMenu"
          >
            <div class="menu-item-name">
              Shop More Products
            </div>
            <b-icon :icon="openMoreSubMenu ? 'chevron-up' : 'chevron-down'"></b-icon>  
          </div>
          <b-collapse
            id="sub-menu-more"
            v-model="openMoreSubMenu"
          >
            <div class="menu-item sub" router-link="/">
              Colonge
            </div>
            <div class="menu-item sub" router-link="/">
              Beard Oil
            </div>
            <div class="menu-item sub" router-link="/">
              Hand Sanitizer
            </div>
            <div class="menu-item sub" router-link="/">
              Hand Soap
            </div>
            <div class="menu-item sub" router-link="/">
              Gift Cards
              <span class="badge">New!</span>
            </div>
            <div class="menu-item sub" router-link="/">
              Candles
            </div>
            <div class="menu-item sub" router-link="/">
              Gear
            </div>
          </b-collapse>
          <div class="menu-item single last-item">
            <div class="menu-item-name">
              Take Soap Quiz
            </div>
            <b-icon icon="chevron-right"></b-icon>
          </div>
          <div class="sidebar-footer">
            <div  
              class="menu-item collapsable"
              :class="openInfoSubMenu ? null : 'collapsed'"
              :aria-expanded="openInfoSubMenu ? 'true' : 'false'"
              aria-controls="sub-menu-info"
              @click="openInfoSubMenu = !openInfoSubMenu"
            >
              <div class="menu-item-name">
                Info
              </div>
              <b-icon :icon="openInfoSubMenu ? 'chevron-up' : 'chevron-down'"></b-icon>  
            </div>
            <b-collapse
              id="sub-menu-info"
              v-model="openInfoSubMenu"
            >
              <div class="menu-item sub" router-link="/">
                Ingredients
              </div>
              <div class="menu-item sub" router-link="/">
                Hero Discounts
              </div>
              <div class="menu-item sub" router-link="/">
                Wholesale
              </div>
              <div class="menu-item sub" router-link="/">
                Check Gift Card Balance
              </div>
            </b-collapse>
            <div  
              class="menu-item collapsable"
              :class="openAboutSubMenu ? null : 'collapsed'"
              :aria-expanded="openAboutSubMenu ? 'true' : 'false'"
              aria-controls="sub-menu-about"
              @click="openAboutSubMenu = !openAboutSubMenu"
            >
              <div class="menu-item-name">
                About Us
              </div>
              <b-icon :icon="openAboutSubMenu ? 'chevron-up' : 'chevron-down'"></b-icon>  
            </div>
            <b-collapse
              id="sub-menu-about"
              v-model="openAboutSubMenu"
            >
              <div class="menu-item sub" router-link="/">
                About Us
              </div>
              <div class="menu-item sub" router-link="/">
                Blog
              </div>
            </b-collapse>
            <div  
              class="menu-item collapsable"
              :class="openHelpSubMenu ? null : 'collapsed'"
              :aria-expanded="openHelpSubMenu ? 'true' : 'false'"
              aria-controls="sub-menu-help"
              @click="openHelpSubMenu = !openHelpSubMenu"
            >
              <div class="menu-item-name">
                Help & Support
              </div>
              <b-icon :icon="openHelpSubMenu ? 'chevron-up' : 'chevron-down'"></b-icon>  
            </div>
            <b-collapse
              id="sub-menu-help"
              v-model="openHelpSubMenu"
            >
              <div class="menu-item sub" router-link="/">
                FAQs
              </div>
              <div class="menu-item sub" router-link="/">
                Shipping
              </div>
              <div class="menu-item sub" router-link="/">
                Returns & Refunds
              </div>
              <div class="menu-item sub" router-link="/">
                Contact Us
              </div>
              <div class="menu-item sub" router-link="/">
                Terms of Use
              </div>
              <div class="menu-item sub" router-link="/">
                Privacy Policy
              </div>
            </b-collapse>
          </div>
        </template>
      </b-sidebar>
    </div>
    <!-- <div class="desktop-nav"></div> -->
  </div>
</template>

<script>
import MainNavMenuItem from './main-nav-menu-item';

export default {
  name: "main-nav",
  components: {
    MainNavMenuItem
  },
  data() {
    return {
      openSoapSubMenu: false,
      openMoreSubMenu: false,
      openInfoSubMenu: false,
      openAboutSubMenu: false,
      openHelpSubMenu: false,
      singleMenuItems: [
        {
          name: "Hair Care",
          path: "/",
          badgeText: ""
        },
        {
          name: "Deodorant",
          path: "/",
          badgeText: "New!"
        },
        {
          name: "Toothpaste",
          path: "/",
          badgeText: ""
        },
        {
          name: "Shower Boosters",
          path: "/",
          badgeText: ""
        },
        {
          name: "Best Sellers",
          path: "/",
          badgeText: ""
        }
      ]
    }
  },
  methods: {
    navigateTo(menu) {
      console.log(menu);
      // this.$router.push(menu.path);
    }
  },
  mounted() {
    console.log("Header!");
  }
}
</script>

<style scoped lang="scss">
@import "../../../css/variables.scss";

.main-nav-component {
  font-size: 16px;

  .mobile-nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 15px;

    #logo {
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

      #sidebar-logo {
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

    .big-cta-button {
      margin: 16px;
      padding: 20px 15px;
      border-radius: 5px;
      color: $white;
      font-size: 15px;
      text-align: center;

      .cta-button-title {
        display: block;
        text-transform: uppercase;
        margin-bottom: 3.5px;
        font-weight: 500;
        font-size: 16px;
      }

      &.subscription {
        background-color: $maroon;
      }

      &.bundles {
        background-color: $orange;
      }
    }

    .menu-item {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 11px 16px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 700;

      &.single {
        &:hover {
          color: $orange;
          background-color: rgba(204, 99, 40, .1);
        }
      }

      &.collapsable {
        &:hover {
          color: $orange;
        }
      }

      &.sub {
        justify-content: flex-start;
        background-color: #F2F2F2;

        &:hover {
          color: $orange;
          background-color: rgba(204, 99, 40, .1);
        }
      }

      &.last-item {
        border-top: 1px solid $off-white;
        font-weight: 400;
      }

      .badge {
        font-size: 10px;
        font-weight: 400;
        background-color: $orange;
        border-radius: 11px;
        padding: 4px 7px; 
        text-transform: uppercase;
        margin-left: 8px;
      }

      .menu-item-name {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
      }
    }
    
    .sidebar-footer {
      background-color: $off-white;
    }
  }
}
</style>