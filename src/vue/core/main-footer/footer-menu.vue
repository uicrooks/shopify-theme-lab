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
        :class="{ last: index === shopMenu.length - 1 }"
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
        :class="{ last: index === infoMenu.length - 1 }"
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
        :class="{ last: index === helpMenu.length - 1 }"
        @click="navigateTo(item.path)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="footer-nav-section brand">
      <b-img-lazy
        id="drsquatch-logo"
        src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/DRS_FULLCOLOR_White_text.svg?v=1615332033"
        alt="Dr.Squatch logo"
      />
      <div class="social-links">
        <a href="/test">
          <b-icon icon="instagram" />
        </a>
        <a href="/test">
          <b-icon icon="youtube" />
        </a>
        <a href="/test">
          <b-icon icon="facebook" />
        </a>
        <a href="/test">
          <b-icon icon="twitter" />
        </a>
        <a href="/test">
          <b-icon icon="linkedin" />
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
      shopMenu: [
        {
          name: "Bar Soaps",
          path: "/collections/bar-soap",
        },
        {
          name: "Deodorant",
          path: "/collections/deodorant",
        },
        {
          name: "Toothpaste",
          path: "/collection/toothpaste",
        },
        {
          name: "Hair Care",
          path: "/collection/hair-care",
        },
        {
          name: "Bundles",
          path: "/pages/bundle-offers",
        },
        {
          name: "Subscription",
          path: "/pages/subscription-flow",
        },
        {
          name: "Loyalty Rewards",
          path: "/pages/loyalty-rewards",
        },
      ],
      infoMenu: [
        {
          name: "The Squatch Difference",
          path: "/pages/the-squatch-difference",
        },
        {
          name: "Why Natural Products",
          path: "/pages/the-squatch-difference-natural-ingredients",
        },
        {
          name: "No Harmful Ingredients",
          path: "/pages/the-squatch-difference-natural-ingredients",
        },
        {
          name: "Formulated For Men",
          path: "/pages/the-squatch-difference-for-men",
        },
        {
          name: "Our Ingredients",
          path: "/pages/the-squatch-difference-for-men",
        },
        {
          name: "Hero Discounts",
          path: "/pages/hero-discounts",
        },
        {
          name: "Blog",
          path: "https://blog.drsquatch.com",
        }
      ],
      helpMenu: [
        {
          name: "FAQ",
          path: "/test",
        },
        {
          name: "Shipping",
          path: "/pages/shipping",
        },
        {
          name: "Returns & Refunds",
          path: "/test",
        },
        {
          name: "Contact Us",
          path: "/test",
        },
        {
          name: "Wholesale",
          path: "/pages/wholesale",
        },
        {
          name: "Gift Card Balance",
          path: "/pages/check-gift-card-balance",
        },
        {
          name: "Careers",
          path: "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=a057621f-ae51-4a8d-940f-8f00ed64a510&ccId=19000101_000001&lang=en_US",
        }
      ],
    };
  },
  methods: {
    navigateTo(path) {
      console.log(path);
      window.location = path;
    },
  },
};
</script>

<style scoped lang="scss">
@use "@/styles/main" as global;

.footer-nav-component {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  background-color: global.$dark-brown;
  padding: 10px 20px 25px;

  @include global.layout-md {
    justify-content: center;
  }

  .footer-nav-section {
    min-width: 140px;

    @include global.layout-sm {
      min-width: 170px;
    }

    @include global.layout-md {
      min-width: 180px;
      max-width: 230px;
      flex: 1;
    }

    .footer-nav-section-title {
      margin: 14px 0;
      @include global.font-style-heading($size: 14px, $color: global.$sand);
    }

    .menu-item {
      cursor: pointer;
      @include global.font-style-body($color: global.$white, $lh: 17px);

      &.last {
        margin-bottom: 10px;
      }
    }
  }

  .shop {
    order: 1;

    @include global.layout-md {
      order: 2;
    }
  }

  .info {
    order: 2;

    @include global.layout-md {
      order: 3;
    }
  }

  .help {
    order: 3;

    @include global.layout-md {
      order: 4;
    }
  }

  .brand {
    order: 4;

    @include global.layout-md {
      order: 1;
    }

    #drsquatch-logo {
      width: 135px;
      margin-top: 8px;
    }

    .social-links {
      a,
      a:hover,
      a:visited {
        font-size: 22px;
        color: global.$white;
        text-decoration: none;
        margin: 1px;
      }
    }
  }
}
</style>