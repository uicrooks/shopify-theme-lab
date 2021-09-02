import { Vue, store, mixins } from "../main";
console.log("layout-page");

const BundleOffersPage = () => import(
  /* webpackChunkName: "page-bundles-page" */
  /* webpackPreload: true */
  "../vue/templates/page/bundle-offers/index.vue");
const SquatchDifferenceMenPage = () => import(
  /* webpackChunkName: "page-squatch-difference-men" */
  /* webpackPreload: true */
  "../vue/templates/page/squatch-difference/squatch-difference-men.vue");
const SquatchDifferenceNaturalPage = () => import(
  /* webpackChunkName: "page-squatch-difference-natural" */
  /* webpackPreload: true */
  "../vue/templates/page/squatch-difference/squatch-difference-natural.vue");
const SquatchDifferenceNontoxicPage = () => import(
  /* webpackChunkName: "page-squatch-difference-nontoxic" */
  /* webpackPreload: true */
  "../vue/templates/page/squatch-difference/squatch-difference-nontoxic.vue");
const SquatchDifferencePage = () => import(
  /* webpackChunkName: "page-squatch-difference" */
  /* webpackPreload: true */
  "../vue/templates/page/squatch-difference/squatch-difference.vue");
const SubscriptionFlowPage = () => import(
  /* webpackChunkName: "page-subscription-flow" */
  /* webpackPreload: true */
  "../vue/templates/page/subscription-flow/index.vue");
const PrivacyPolicyPage = () => import(
  /* webpackChunkName: "page-privacy-policy" */
  /* webpackPreload: true */
  "../vue/templates/page/privacy-policy.vue");
const ReturnsPage = () => import(
  /* webpackChunkName: "page-returns" */
  /* webpackPreload: true */
  "../vue/templates/page/returns.vue");
const GeneralPagePage = () => import(
  /* webpackChunkName: "page-main" */
  /* webpackPreload: true */
  "../vue/templates/page/general-page.vue");
const GiftCardBalancePage = () => import(
  /* webpackChunkName: "page-gift-card-balance" */
  /* webpackPreload: true */
  "../vue/templates/page/gift-card-balance.vue");
const HeroDiscountsPage = () => import(
  /* webpackChunkName: "page-hero-discounts" */
  /* webpackPreload: true */
  "../vue/templates/page/hero-discount.vue");
const IngredientGlossaryPage = () => import(
  /* webpackChunkName: "page-ingredient-glossary" */
  /* webpackPreload: true */
  "../vue/templates/page/ingredient-glossary.vue");
const LoyaltyRewardsPage = () => import(
  /* webpackChunkName: "page-loyalty-rewards" */
  /* webpackPreload: true */
  "../vue/templates/page/loyalty-rewards.vue");
const QuizPage = () => import(
  /* webpackChunkName: "page-quiz-1" */
  /* webpackPreload: true */
  "../vue/templates/page/quiz.vue");
const ShippingPolicyPage = () => import(
  /* webpackChunkName: "page-shipping-policy" */
  /* webpackPreload: true */
  "../vue/templates/page/shipping-policy.vue");
const TermsOfUsePage = () => import(
  /* webpackChunkName: "page-terms" */
  /* webpackPreload: true */
  "../vue/templates/page/terms-of-use.vue");
const WholesalePage = () => import(
  /* webpackChunkName: "page-wholesale" */
  /* webpackPreload: true */
  "../vue/templates/page/wholesale.vue");
new Vue({
  el: "#app",
  components: {
    BundleOffersPage,
    PrivacyPolicyPage,
    SubscriptionFlowPage,
    SquatchDifferenceMenPage,
    SquatchDifferenceNaturalPage,
    SquatchDifferenceNontoxicPage,
    SquatchDifferencePage,
    ReturnsPage,
    GeneralPagePage,
    GiftCardBalancePage,
    HeroDiscountsPage,
    IngredientGlossaryPage,
    LoyaltyRewardsPage,
    QuizPage,
    ShippingPolicyPage,
    TermsOfUsePage,
    WholesalePage
  },
  mixins: [...mixins],
  store,
  mounted() {
    window.app = this;
  }
});
