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
        <cart
          :currency-obj="currency"
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
            <div
              class="account-icon-box"
              @click="navigateTo('/account/login')"
            >
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

          <button
            class="big-cta-link"
            @click="navigateTo('/pages/subscription-flow')"
          >
            <span class="title">
              The Subscription
            </span>
            Save 15% on your favorite soap and get free shipping for life!
          </button>
          <button
            class="big-cta-link maroon"
            @click="navigateTo('/pages/bundle-offers')"
          >
            <span class="title">
              Starter Bundles
            </span>
            Your choice of our curated best sellers
          </button>

          <main-nav-grouped-menu-item
            :name="soapMenu.name"
            :is-open="soapMenu.isOpen"
            :sub-menu-items="soapMenu.subMenuItems"
            @toggle="soapMenu.isOpen = !soapMenu.isOpen"
          />
          <main-nav-single-menu-item
            v-for="(item, index) of singleMenuItems"
            :key="`single-menu-item-${index}`"
            :name="item.name"
            :badge="item.badge"
            :path="item.path"
          />
          <main-nav-grouped-menu-item
            :name="moreMenu.name"
            :is-open="moreMenu.isOpen"
            :sub-menu-items="moreMenu.subMenuItems"
            @toggle="moreMenu.isOpen = !moreMenu.isOpen"
          />
          <main-nav-single-menu-item
            class="soap-quiz-menu"
            name="Take Soap Quiz"
            path="/quiz"
          />

          <div class="sidebar-footer">
            <main-nav-grouped-menu-item
              :name="infoMenu.name"
              :is-open="infoMenu.isOpen"
              :sub-menu-items="infoMenu.subMenuItems"
              @toggle="infoMenu.isOpen = !infoMenu.isOpen"
            />
            <main-nav-grouped-menu-item
              :name="aboutMenu.name"
              :is-open="aboutMenu.isOpen"
              :sub-menu-items="aboutMenu.subMenuItems"
              @toggle="aboutMenu.isOpen = !aboutMenu.isOpen"
            />
            <main-nav-grouped-menu-item
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
        <squatch-button
          path="/pages/subscription-flow"
          class="subscribe-button"
        >
          Subscribe
        </squatch-button>
        <div
          class="menu-item"
          @click="navigateTo('/pages/bundle-offers')"
        >
          Bundles
        </div>
        <div
          v-b-toggle.products-menu  
          class="menu-item"
        >
          Products
          <b-icon
            :icon="productsSubMenuOpen ? 'x' : 'chevron-down'"
          />
        </div>
      </div>
      <img
        id="drsquatch-logo-desktop"
        src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/DRS_horizontal_fullcolor.svg?v=1615332033"
        alt="Dr.Squatch logo"
      >
      <div class="right-section">
        <div
          class="menu-item"
          @click="navigateTo('/test')"
        >
          Take Quiz
        </div>
        <div
          v-if="loggedIn"
          class="menu-item"
          @click="navigateTo('/account')"
        >
          Account
        </div>
        <div
          v-else
          class="menu-item"
          @click="navigateTo('/account/login')"
        >
          Log In
        </div>
        <div
          v-b-toggle.currency-options  
          class="menu-item"
        >
          USD
          <b-icon
            icon="caret-down-fill"
          />
        </div>
        <b-collapse id="curreny-options">
          CAD
        </b-collapse>
        <cart
          :currency-obj="currency"
        />
      </div>
    </div>
    <b-collapse
      id="products-menu"
      v-model="productsSubMenuOpen"
    >
      <h6 class="submenu-title">
        Essentials
      </h6>
      <div class="essentials">
        <div
          v-for="(item, index) of productsSubMenuItems.essentials"
          :key="`products-essential-item-${index}`"
          class="essential-item"
          @click="navigateTo(item.path)"
        >
          <span
            v-if="item.badge"
            class="badge"
          >{{ item.badge }}</span>
          <div class="item-image-wrapper">
            <img 
              :src="item.imageSrc"
              :alt="`${item.name} image`"
            >
          </div>
          <div class="item-name">
            {{ item.name }}
          </div>
        </div>
      </div>
      <h6 class="submenu-title">
        More Products
      </h6>
      <div class="more">
        <div class="more-col">
          <div
            v-for="(item, index) of moreMenu.subMenuItems"
            :key="`more-item-${index}`"
            class="more-item"
            @click="navigateTo(item.path)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="more-col">
          <div
            class="more-item more-item-shop-all"
            @click="navigateTo('/test')"
          >
            Shop All
            <b-icon
              icon="arrow-right"
            />
          </div>
          <div
            class="more-item"
            @click="navigateTo('/test')"
          >
            Take Soap Quiz
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "MainNav",
  props: {
    currency: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      soapMenu: {
        name: "Bar Soaps",
        isOpen: false,
        subMenuItems: [{ 
          name: "Subscribe & Save",
          path: "/pages/subscription-flow"
        }, {
          name: "Starter Bundles",
          path: "/pages/bundle-offers"
        }, {
          name: "Shop Bar Soaps",
          path: "/collections/bar-soaps"
        }]
      },
      moreMenu: {
        name: "Shop More Products",
        isOpen: false,
        subMenuItems: [{ 
          name: "Cologne",
          path: "/collections/colognes"
        }, {
          name: "Beard Oil",
          path: "/collections/beard"
        }, {
          name: "Hand Sanitizer",
          path: "/collections/hand-sanitizer"
        }, {
          name: "Hand Soap",
          path: "/collections/hand-soap"
        }, {
          name: "Gift Cards",
          badge: "New!",
          path: "/products/squatch-gift-card"
        }, {
          name: "Candles",
          path: "/products/bay-rum-candle"
        }, {
          name: "Gear",
          path: "/collections/gear"
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
          path: "/collections/hair-care"
        },
        {
          name: "Deodorant",
          path: "/collections/deodorant",
          badge: "New!"
        },
        {
          name: "Toothpaste",
          path: "/collections/toothpaste"
        },
        {
          name: "Shower Boosters",
          path: "/collections/shower-boosters"
        },
        {
          name: "Best Sellers",
          path: "/collections/best-sellers"
        }
      ],
      productsSubMenuOpen: false,
      productsSubMenuItems: {
        essentials: [{
          name: "Shop Bundles",
          path: "/test",
          imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_Bundles.png?v=1616443457"
        }, {
          name: "Bar Soaps",
          path: "/collections/bar-soaps",
          imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_soap.png?v=1616443457"
        }, {
          name: "Hair Care",
          path: "/collections/hair-care",
          imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_soap.png?v=1616443457"
        }, {
          name: "Deodorant",
          path: "/collections/deodorant",
          imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_soap.png?v=1616443457",
          badge: "New!"
        }, {
          name: "Toothpaste",
          path: "/collections/toothpaste",
          imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_soap.png?v=1616443457"
        }, {
          name: "Shower Boosters",
          path: "/collections/shower-boosters",
          imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_soap.png?v=1616443457"
        }, {
          name: "Best Sellers",
          path: "/collections/best-sellers",
          imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_soap.png?v=1616443457"
        }]
      }
    };
  },
  computed: {
    loggedIn() {
      return window.theme.customerLoggedIn;
    }
  },
  methods: {
    navigateTo(path) {
      console.log(path);
      if (path === "/test") return;
      window.location = path;
    },
    toggleCurrency() {
      console.log("toggleCurrency");
    }
  },
  async mounted() {
    console.log(window);
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.main-nav-component {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: $white;
  z-index: 10;
  font-size: 16px;

  .mobile-nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 15px;

    @include layout-lg {
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
        cursor: pointer;

        .person-icon {
          color: $orange;
        }

        span {
          position: absolute;
          bottom: -5px;
        }
      }
    }

    .big-cta-link  {
      padding: 20px 15px;
      margin: 10px 16px;
      background-color: $orange;
      border: none;
      border-radius: 5px;
      text-align: center;
      @include font-style-body($size: 15px, $color: $white);

      .title {
        display: block;
        margin-bottom: 4px;
        text-transform: uppercase;
        @include font-style-heading($size: 16px, $color: $white);
      }

      &:hover {
        background-color: $orange-darken;
        color: $white-darken;
      }

      &.maroon {
        background-color: $maroon;

        &:hover {
          background-color: $maroon-darken;
          color: $white-darken;
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
    width: 100%;
    padding: 9px 30px;

    @include layout-lg {
      display: flex;
    }

    .left-section {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      flex: 1;

      .subscribe-button {
        padding: 15px 22px;
        @include font-style-heading($size: 14px, $weight: 400, $color: $white);
      }
    }

    #drsquatch-logo-desktop {
      width: 165px;
    }

    .right-section {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: flex-end;
      flex: 1;
    }

    .menu-item {
      margin: 0 16px;
      cursor: pointer;
      @include font-style-body();

      &:hover {
        color: $orange;
      }
    }
  }

  #currency-options {
    position: absolute;
  }

  #products-menu {
    width: 100%;
    padding: 20px 15px;
    border-top: 2px solid $white-darken;
    background-color: $white;
    position: absolute;
    z-index: 9;

    .submenu-title {
      margin-bottom: 15px;
      padding-left: 15px;
      @include font-style-heading();
    }

    .essentials {
      display: flex;
      flex-flow: row nowrap;

      .essential-item {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        width: 138px;
        padding: 0 20px;
        position: relative;
        margin-bottom: 15px;
        cursor: pointer;

        .badge {
          position: absolute;
          top: -20px;
          left: 39px;
          font-size: 10px;
          font-weight: 400;
          background-color: $orange;
          border-radius: 11px;
          padding: 4px 7px; 
          text-transform: uppercase;
          margin-left: 8px;
        }
        
        .item-image-wrapper {
          border-radius: 100%;
          width: 80px;
          text-align: center;

          &:hover {
            background-color: $white-darken;
          }

          img {
            width: 80px;
            height: auto;
          }
        }

        .item-name {
          text-align: center;
          @include font-style-heading($size: 14px);
        }
      }
    }

    .more {
      display: flex;
      flex-flow: row nowrap;
      
      .more-col {
        height: 120px;
        display: flex;
        flex-flow: column wrap;
        align-content: flex-start;
        min-width: 320px;

        .more-item {
          width: 160px;
          margin: 0 0 14px 15px;
          @include font-style-body($weight: 600);
          cursor: pointer;

          &:hover {
            color: $orange;
          }
        }

        .more-item-shop-all {
          @include font-style-heading($size: 14px, $weight: 600);
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import "@/styles/main.scss";

.squatch-button-component.big-cta-link  {
  padding: 20px 15px;
  margin: 16px;
  background-color: $orange;
  text-align: center;
  @include font-style-heading($size: 16px, $color: $white);
}
</style>