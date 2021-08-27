<template>
  <div class="main-nav-component">
    <cart />
    <!-- Mobile sidebar navigation -->
    <div class="mobile-nav">
      <a href="/">
        <img
          id="drsquatch-logo-mobile"
          src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/DRS_horizontal_fullcolor.svg?v=1615332033"
          alt="Dr.Squatch logo"
        >
      </a>
      <div class="buttons">
        <cart-button />
        <b-icon
          v-show="!isOpen"
          v-b-toggle.main-nav-sidebar
          icon="list"
        />
        <b-icon
          v-show="isOpen"
          v-b-toggle.main-nav-sidebar
          icon="x"
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
            <b-img-lazy
              id="drsquatch-logo-mobile-sidebar"
              src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/DRS_horizontal_fullcolor.svg?v=1615332033"
              alt="Dr.Squatch logo"
            />
            <div 
              class="account-icon-box" 
              @click="logIn"
            >
              <b-icon icon="person" />
              <span>{{ loggedIn ? 'Account' : 'Log In' }}</span>
            </div>
          </div>
        </template>

        <template #default>
          <div class="sidebar-main-header">
            <div class="currency-display">
              <div
                class="menu-item"
                :class="currencyMobileSubMenuOpen ? null : 'collapsed'"
                :aria-expanded="currencyMobileSubMenuOpen ? 'true' : 'false'"
                aria-controls="currency-menu-in-sidebar"
                @click="currencyMobileSubMenuOpen = !currencyMobileSubMenuOpen"
              >
                <div class="currency-selected">
                  You're Shopping In:
                  <div class="currency-box">
                    <b-img-lazy
                      :src="currencySelected.imageSrc"
                      :alt="`${currencySelected.currency} image`"
                      class="currency-flag-image"
                    />
                    <span class="currency">
                      {{ currencySelected.currency }}
                    </span>
                  </div>
                </div>
                <b-icon 
                  icon="chevron-down"
                  :flip-v="currencyMobileSubMenuOpen"
                  style="margin-left:4px;"
                />
              </div>
              <b-collapse
                id="currency-menu-in-sidebar"
                v-model="currencyMobileSubMenuOpen"
              >
                <div class="megamenu-padding">
                  <div
                    v-for="(currencyOption, index) of currencyMenu"
                    :key="`currecny-option-${index}`"
                    class="currency-option"
                    @click="updateCurrencyOption(currencyOption)"
                  >
                    <b-img-lazy
                      :src="currencyOption.imageSrc"
                      :alt="`${currencyOption.currency} image`"
                      class="currency-flag-image"
                    />
                    <span class="currency">
                      {{ currencyOption.currency }}
                    </span>
                  </div>
                </div>
              </b-collapse>
            </div>
            <button
              class="big-cta-link"
              @click="navigateTo('/pages/subscription-flow')"
            >
              <span class="title"> The Subscription </span>
              Save 15% on your favorite soap and get free shipping for life!
            </button>
            <button
              class="big-cta-link maroon"
              @click="navigateTo('/pages/bundle-offers')"
            >
              <span class="title"> Starter Bundles </span>
              Your choice of our curated best sellers
            </button>
          </div>
    
          <div class="sidebar-main-content">
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
          </div>
    
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
          class="menu-item"
          :class="{active: productsSubMenuOpen}"
          @click="productsSubMenuOpen = !productsSubMenuOpen"
        >
          Products
          <b-icon 
            icon="chevron-down"
            :flip-v="productsSubMenuOpen"
            style="margin-left:4px;"
          />
        </div>
        <div 
          class="menu-item" 
          @click="navigateTo('/pages/referral-rewards')"
        >
          Rewards
        </div>
      </div>
      <a href="/">
        <img
          id="drsquatch-logo-desktop"
          src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/DRS_horizontal_fullcolor.svg?v=1615332033"
          alt="Dr.Squatch logo"
        >
      </a>
      <div class="right-section">
        <div 
          class="menu-item" 
          @click="navigateTo('/test')"
        >
          Take Quiz
        </div>
        <div
          v-if="loggedIn"
          v-b-toggle.account-menu
          class="menu-item account"
        >
          <b-icon icon="person" />
          <b-icon 
            icon="chevron-down"
            :flip-v="accountSubMenuOpen"
            style="margin-left:4px;"
          />
          <b-collapse
            id="account-menu"
            v-model="accountSubMenuOpen"
            class="sub-menu"
          >
            <div class="megamenu-padding">
              <div class="account-menu-option">
                <a href="/account">Account</a>
              </div>
              <div class="account-menu-option">
                <a href="/account/logout">Log Out</a>
              </div>
            </div>
          </b-collapse>
        </div>
        <div 
          v-else
          class="menu-item" 
          @click="logIn"
        >
          Log In
        </div>
  
        <div 
          v-b-toggle.currency-menu
          class="menu-item"
          :class="{'active': currencySubMenuOpen}"
        >
          <div class="currency-box">
            <b-img-lazy
              :src="currencySelected.imageSrc"
              :alt="`${currencySelected.currency} image`"
              class="currency-flag-image"
            />
            <span class="currency">
              {{ currencySelected.currency }}
            </span>
          </div>
          <b-icon 
            icon="chevron-down"
            :flip-v="currencySubMenuOpen"
            style="margin-left:4px;"
          />
          <b-collapse
            id="currency-menu"
            v-model="currencySubMenuOpen"
            class="sub-menu"
            is-nav
          >
            <div class="megamenu-padding">
              <div
                v-for="(currencyOption, index) of currencyMenu"
                :key="`currecny-option-${index}`"
                class="currency-option"
                @click="updateCurrencyOption(currencyOption)"
              >
                <b-img-lazy
                  :src="currencyOption.imageSrc"
                  :alt="`${currencyOption.currency} image`"
                  class="currency-flag-image"
                />
                <span class="currency">
                  {{ currencyOption.currency }}
                </span>
              </div>
            </div>
          </b-collapse>
        </div>
        <cart-button />
      </div>
    </div>
    <b-collapse 
      id="products-menu"
      v-model="productsSubMenuOpen"
    >
      <div class="megamenu-padding">
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
            >
              {{ item.badge }}
            </span>
            <div class="item-image-wrapper">
              <b-img-lazy
                :src="item.imageSrc" 
                :alt="`${item.name} image`" 
              />
            </div>
            <div class="item-name">
              {{ item.name }}
            </div>
          </div>
        </div>
        <h6 class="submenu-title second">
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
              <b-icon icon="arrow-right" />
            </div>
            <div 
              class="more-item" 
              @click="navigateTo('/test')"
            >
              Take Soap Quiz
            </div>
          </div>
        </div>
      </div>
    </b-collapse>
    <div
      v-if="subMenuBackdropOpen"
      class="navmenu-backdrop"
      @click="productsSubMenuOpen = false"
    />
  </div>
</template>

<script>
import CookieService from "@/vue/services/cookie.service";
import SquatchButton from "@/vue/reusables/squatch-button.vue";
import CartButton from "@/vue/reusables/cart-button.vue";
import Cart from "@/vue/core/cart/index.vue";
import GroupedMenuItem from "./grouped-menu-item.vue";
import SingleMenuItem from "./single-menu-item.vue";
import { mapGetters } from "vuex";

export default {
    name: "MainNav",
    components: {
        Cart,
        SquatchButton,
        CartButton,
        MainNavGroupedMenuItem: GroupedMenuItem,
        MainNavSingleMenuItem: SingleMenuItem
    },
    data() {
        return {
            soapMenu: {
                name: "Bar Soaps",
                isOpen: false,
                subMenuItems: [{
                        name: "Subscribe & Save",
                        path: "/pages/subscription-flow",
                    },
                    {
                        name: "Starter Bundles",
                        path: "/pages/bundle-offers",
                    },
                    {
                        name: "Shop Bar Soaps",
                        path: "/collections/bar-soaps",
                    },
                ],
            },
            moreMenu: {
                name: "Shop More Products",
                isOpen: false,
                subMenuItems: [{
                        name: "Cologne",
                        path: "/collections/colognes",
                    },
                    {
                        name: "Beard Oil",
                        path: "/collections/beard",
                    },
                    {
                        name: "Hand Sanitizer",
                        path: "/collections/hand-sanitizer",
                    },
                    {
                        name: "Hand Soap",
                        path: "/collections/hand-soap",
                    },
                    {
                        name: "Gift Cards",
                        badge: "New!",
                        path: "/products/squatch-gift-card",
                    },
                    {
                        name: "Candles",
                        path: "/products/bay-rum-candle",
                    },
                    {
                        name: "Gear",
                        path: "/collections/gear",
                    },
                ],
            },
            infoMenu: {
                name: "Info",
                isOpen: false,
                subMenuItems: [{
                        name: "Ingredients",
                        path: "/test",
                    },
                    {
                        name: "Hero Discounts",
                        path: "/test",
                    },
                    {
                        name: "Wholesale",
                        path: "/test",
                    },
                    {
                        name: "Check Gift Card Balance",
                        path: "/test",
                    },
                ],
            },
            aboutMenu: {
                name: "About Us",
                isOpen: false,
                subMenuItems: [{
                        name: "About Us",
                        path: "/test",
                    },
                    {
                        name: "Blog",
                        path: "/test",
                    },
                ],
            },
            helpMenu: {
                name: "Help & Support",
                isOpen: false,
                subMenuItems: [{
                        name: "FAQs",
                        path: "/test",
                    },
                    {
                        name: "Shipping",
                        path: "/test",
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
                        name: "Terms of Use",
                        path: "/test",
                    },
                    {
                        name: "Privacy Policy",
                        path: "/test",
                    },
                ],
            },
            singleMenuItems: [{
                    name: "Hair Care",
                    path: "/collections/hair-care",
                },
                {
                    name: "Deodorant",
                    path: "/collections/deodorant",
                    badge: "New!",
                },
                {
                    name: "Toothpaste",
                    path: "/collections/toothpaste",
                },
                {
                    name: "Shower Boosters",
                    path: "/collections/shower-boosters",
                },
                {
                    name: "Best Sellers",
                    path: "/collections/best-sellers",
                },
            ],
            productsSubMenuOpen: false,
            productsSubMenuItems: {
                essentials: [{
                        name: "Shop Bundles",
                        path: "/pages/bundle-offers",
                        imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_Bundles.png?v=1616443457",
                    },
                    {
                        name: "Bar Soaps",
                        path: "/collections/bar-soaps",
                        imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_soap.png?v=1616443457",
                    },
                    {
                        name: "Hair Care",
                        path: "/collections/hair-care",
                        imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_soap.png?v=1616443457",
                    },
                    {
                        name: "Deodorant",
                        path: "/collections/deodorant",
                        imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_soap.png?v=1616443457",
                        badge: "New!",
                    },
                    {
                        name: "Toothpaste",
                        path: "/collections/toothpaste",
                        imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_soap.png?v=1616443457",
                    },
                    {
                        name: "Shower Boosters",
                        path: "/collections/shower-boosters",
                        imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_soap.png?v=1616443457",
                    },
                    {
                        name: "Best Sellers",
                        path: "/collections/best-sellers",
                        imageSrc: "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_soap.png?v=1616443457",
                    },
                ],
            },
            accountSubMenuOpen: false,
            currencySubMenuOpen: false,
            currencyMobileSubMenuOpen: false,
            subMenuBackdropOpen: false,
        };
    },
    computed: {
        ...mapGetters("core", ["loggedIn", "defaultCurrencyOption", "currencyOptions"]),
        ...mapGetters("cart", ["isOpen"]),
        currencySelected() {
            return this.defaultCurrencyOption.currency ? this.defaultCurrencyOption : this.currencyOptions[0];
        },
        currencyMenu() {
            return this.currencyOptions.filter(option => {
                return this.currencySelected.country !== option.country;
            });
        }
    },
    watch: {
        productsSubMenuOpen(val) {
            this.subMenuBackdropOpen = val;
            if (val) {
                this.accountSubMenuOpen = false;
                this.currencySubMenuOpen = false;
            }
        },
        accountSubMenuOpen(val) {
            if (val) {
                this.productsSubMenuOpen = false;
                this.currencySubMenuOpen = false;
            }
        },
        currencySubMenuOpen(val) {
            if (val) {
                this.productsSubMenuOpen = false;
                this.accountSubMenuOpen = false;
            }
        }
    },
    methods: {
        logIn() {
            window.location = this.loggedIn ? "/account" : "/account/login";
        },
        navigateTo(path) {
            window.location = path;
        },
        updateCurrencyOption(currencyOption) {
            CookieService.set(
                "currency_option",
                currencyOption, { maxAge: 24 * 60 * 60, path: "/" }
            );
            location.reload();
        }
    }
};
</script>

<style scoped lang="scss">
@use "@/styles/main" as global;
.main-nav-component {
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 10;
    font-size: 16px;
    .mobile-nav {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        @include global.layout-lg {
            display: none;
        }
        #drsquatch-logo-mobile {
            height: 45px;
        }
        .buttons {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-end;
            align-items: center;
            .b-icon.bi {
              font-size: 36px;
              margin-left: 26px;
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
                color: global.$orange;
                font-size: 11px;
                cursor: pointer;
                .icon-user {
                    color: global.$orange;
                }
                span {
                    position: absolute;
                    bottom: -8px;
                }
            }
        }
        .sidebar-main-header {
            background-color: global.$white;
            @include global.font-style-body();
            .currency-display {
                position: relative;
                background-color: global.$off-white;
                .menu-item {
                    padding: 16px 16px 12px 16px;
                    cursor: pointer;
                    width: 100%;
                    border-bottom: 1px solid global.$dark-brown;
                    display: flex;
                    justify-content: space-between;
                    .currency-selected {
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: space-between;
                        align-items: center;
                        @include global.font-style-body-bold();
                        .currency-box {
                            display: flex;
                            flex-flow: row nowrap;
                            align-items: center;
                            margin-left: 12px;
                            .currency-flag-image {
                                width: 32px;
                                height: auto;
                                margin-right: 4px;
                            }
                        }
                    }
                    .arrow-icon {
                        position: absolute;
                        top: 16px;
                        right: 16px;
                    }
                }
                #currency-menu-in-sidebar {
                    .currency-option {
                        display: flex;
                        flex-flow: row nowrap;
                        align-items: center;
                        padding: 10px 20px;
                        cursor: pointer;
                        &:hover {
                            color: global.$orange;
                            background-color: rgba(204, 99, 40, .18039);
                        }
                        .currency-flag-image {
                            width: 32px;
                            height: auto;
                        }
                        .currency {
                            margin-left: 8px;
                            @include global.font-style-body($color: inherit);
                        }
                    }
                }
            }
            .big-cta-link {
                padding: 20px 15px;
                margin: 10px 16px;
                background-color: global.$orange;
                border: none;
                border-radius: 5px;
                text-align: center;
                @include global.font-style-body($size: 15px, $color: global.$white);
                .title {
                    display: block;
                    margin-bottom: 4px;
                    text-transform: uppercase;
                    @include global.font-style-heading($size: 16px, $color: global.$white);
                }
                &:hover {
                    background-color: global.$orange-darken;
                    color: global.$white-darken;
                }
                &.maroon {
                    background-color: global.$maroon;
                    &:hover {
                        background-color: global.$maroon-darken;
                        color: global.$white-darken;
                    }
                }
            }
        }
        .sidebar-main-content {
            background-color: global.$white;
            .soap-quiz-menu {
                border-top: 1px solid global.$off-white;
                font-weight: 400;
            }
        }
        .sidebar-footer {
            background-color: global.$off-white;
        }
    }
    .desktop-nav {
        display: none;
        width: 100%;
        padding: 9px 30px;
        @include global.layout-lg {
            display: flex;
        }
        .left-section {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            flex: 1;
            .subscribe-button {
                width: 124px;
                margin-right: 10px;
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
            position: relative;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            margin: 0 16px;
            cursor: pointer;
            @include global.font-style-body($weight: 600);
            &:hover {
                color: global.$orange;
            }
            &.active {
                color: global.$orange;
            }
            &.account {
                color: global.$orange;
                .icon-squatch {
                    font-size: 1.3rem;
                }
            }
            .icon-squatch {
                margin-left: 7px;
            }
            .currency-box {
                margin-right: 2px;
                .currency-flag-image {
                    width: 32px;
                    height: auto;
                }
                .currency {
                    text-align: center;
                    @include global.font-style-body($size: 11px, $color: inherit);
                }
            }
        }
    }
    .sub-menu {
        position: absolute;
        top: 28px;
        background-color: global.$off-white;
        &#account-menu {
            top: 30px;
            .megamenu-padding {
              padding: 7px 14px;
            }
            .currency-flag-image {
                width: 32px;
                height: auto;
            }
            .currency {
                margin-left: 3px;
                @include global.font-style-body($size: 12px);
                &:hover {
                    color: global.$orange;
                }
            }
        }
        &#currency-menu {
            top: 28px;
            .megamenu-padding {
              padding: 14px;
            }
            .currency-option {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                .currency-flag-image {
                    width: 32px;
                    height: auto;
                }
                .currency {
                    margin-left: 3px;
                    @include global.font-style-body($size: 12px);
                    &:hover {
                        color: global.$orange;
                    }
                }
            }
        }
    }
    #products-menu {
        width: 100%;
        border-top: 2px solid global.$white-darken;
        background-color: global.$white;
        position: absolute;
        z-index: 9;
        .megamenu-padding {
          padding: 20px 15px;
        }
        .submenu-title {
            margin-bottom: 20px;
            padding-left: 15px;
            @include global.font-style-heading();
        }
        .essentials {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            .essential-item {
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                width: 138px;
                position: relative;
                margin-bottom: 15px;
                cursor: pointer;
                .badge {
                    position: absolute;
                    top: -18px;
                    left: 39px;
                    font-size: 10px;
                    font-weight: 400;
                    background-color: global.$orange;
                    border-radius: 11px;
                    padding: 4px 7px;
                    text-transform: uppercase;
                    margin-left: 8px;
                }
                .item-image-wrapper {
                    border-radius: 100%;
                    width: 80px;
                    text-align: center;
                    margin-bottom: 15px;
                    &:hover {
                        background-color: global.$white-darken;
                    }
                    img {
                        width: 80px;
                        height: auto;
                    }
                }
                .item-name {
                    text-align: center;
                    @include global.font-style-heading($size: 14px);
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
                max-width: 30%;
                flex: 1;
                .more-item {
                    min-width: 160px;
                    margin: 0 0 14px 15px;
                    @include global.font-style-body($weight: 600);
                    cursor: pointer;
                    &:hover {
                        color: global.$orange;
                    }
                }
                .more-item-shop-all {
                    @include global.font-style-heading($size: 14px, $weight: 600);
                }
            }
        }
    }
}
</style>

<style lang="scss">
@use "@/styles/main" as global;
.navmenu-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.6;
}
#main-nav-sidebar {
  max-width: calc(100vw - 60px);
  .account-icon-box {
    .b-icon.bi {
      font-size: 36px;
    }
  }
}
.b-sidebar-header {
    background-color: global.$white;
}

.b-sidebar-body {
    background-color: global.$off-white;
}

.grouped-menu-item-component,
.single-menu-item-component {
    background-color: inherit;
}

.squatch-button-component.big-cta-link {
    padding: 20px 15px;
    margin: 16px;
    background-color: global.$orange;
    text-align: center;
    @include global.font-style-heading($size: 16px, $color: global.$white);
}

#shopify-section-header {
    position: sticky;
    top: -76px;
    transition: top 0.3s linear, box-shadow 0.2s linear;
    z-index: 99;
    box-shadow: 0 0.5rem 1rem rgb(26 17 12 / 15%);
}

body.scroll-up #shopify-section-header {
    top: 0px;
}
</style>