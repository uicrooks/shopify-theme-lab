<template>
  <div class="footer-nav-component">
    <div class="footer-nav-section shop">
      <div class="footer-nav-section-title">
        Shop
      </div>
      <div
        v-for="(item, index) of shopMenu"
        :key="`shop-menu-${index}`"
        class="menu-item"
        :class="{'last': index === shopMenu.length - 1}"
        @click="navigateTo(item.path)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="footer-nav-section info">
      <div class="footer-nav-section-title">
        Info
      </div>
      <div
        v-for="(item, index) of infoMenu"
        :key="`info-menu-${index}`"
        class="menu-item"
        :class="{'last': index === infoMenu.length - 1}"
        @click="navigateTo(item.path)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="footer-nav-section help">
      <div class="footer-nav-section-title">
        Help
      </div>
      <div
        v-for="(item, index) of helpMenu"
        :key="`help-menu-${index}`"
        class="menu-item"
        :class="{'last': index === helpMenu.length - 1}"
        @click="navigateTo(item.path)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="footer-nav-section brand">
      <img
        id="drsquatch-logo"
        src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/DRS_FULLCOLOR_White_text.svg?v=1615332033"
        alt="Dr.Squatch logo"
      >
      <div class="social-links">
        <a href="/test">
          <b-icon
            icon="instagram"
          />
        </a>
        <a href="/test">
          <b-icon
            icon="youtube"
          />
        </a>
        <a href="/test">
          <b-icon
            icon="facebook"
          />
        </a>
        <a href="/test">
          <b-icon
            icon="twitter"
          />
        </a>
        <a href="/test">
          <b-icon
            icon="linkedin"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainFooterMenu",
  data() {
    return {
      shopMenu: [{
        name: "Bar Soaps",
        path: "/test"
      }, {
        name: "Deodorant",
        path: "/test"
      }, {
        name: "Toothpaste",
        path: "/test"
      }, {
        name: "Hair Care",
        path: "/test"
      }, {
        name: "Bundles",
        path: "/test"
      }, {
        name: "Subscription",
        path: "/test"
      }, {
        name: "Loyalty Rewards",
        path: "/test"
      }],
      infoMenu: [{
        name: "Ingredients",
        path: "/pages/glossary"
      }, {
        name: "Hero Discounts",
        path: "/test"
      }, {
        name: "About Us",
        path: "/test"
      }, {
        name: "Wholesale",
        path: "/test"
      }, {
        name: "Blog",
        path: "/test"
      }, {
        name: "Gift Card Balance",
        path: "/test"
      }],
      helpMenu: [{
        name: "FAQ",
        path: "/test"
      }, {
        name: "Shipping",
        path: "/pages/shipping"
      }, {
        name: "Returns & Refunds",
        path: "/test"
      }, {
        name: "Contact Us",
        path: "/test"
      }, {
        name: "Terms of Use",
        path: "/pages/terms-of-use"
      }, {
        name: "Privacy Policy",
        path: "/pages/privacy-policy"
      }],
    };
  },
  methods: {
    navigateTo(path) {
      console.log(path)
      window.location = path
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";
.footer-nav-component {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  background-color: $dark-brown;
  padding: 10px 20px 25px;

  @include layout-md {
    justify-content: center;
  }

  .footer-nav-section {
    min-width: 140px;

    @include layout-sm {
      min-width: 170px;
    }

    @include layout-md {
      min-width: 180px;
      max-width: 230px;
      flex: 1;
    }

    .footer-nav-section-title {
      margin: 14px 0;
      @include font-style-heading($size: 14px, $color: $sand);
    }

    .menu-item {
      cursor: pointer;
      @include font-style-body($color: $white, $lh: 17px);

      &.last {
        margin-bottom: 10px;
      }
    }
  }

  .shop {
    order: 1;

    @include layout-md {
      order: 2;
    }
  }

  .info {
    order: 2;

    @include layout-md {
      order: 3;
    }
  }

  .help {
    order: 3;

    @include layout-md {
      order: 4;
    }
  }

  .brand {
    order: 4;

    @include layout-md {
      order: 1;
    }

    #drsquatch-logo {
      width: 135px;
      margin-top: 8px;
    }

    .social-links {
      
      a, a:hover, a:visited {
        font-size: 22px;
        color: $white;
        text-decoration: none;
        margin: 1px;
      }
    }
  }

}
</style>