<template>
  <div id="layout-index">
    <index-hero></index-hero>
    <index-starter-bundle></index-starter-bundle>
    <index-featured-products></index-featured-products>
    <index-subscription-offer></index-subscription-offer>
    <index-quiz></index-quiz>
    <index-reviews></index-reviews>
    <index-squatch-difference></index-squatch-difference>
  </div>
</template>

<script>
import IndexHero from "./index-hero.vue";
import IndexStarterBundle from "./index-starter-bundle.vue";
import IndexFeaturedProducts from "./index-featured-products.vue";
import IndexSubscriptionOffer from "./index-subscription-offer.vue";
import IndexQuiz from "./index-quiz.vue";
import IndexReviews from "./index-reviews.vue";
import IndexSquatchDifference from "./index-squatch-difference.vue";
export default {
  name: "IndexTemplate",
  components: {
    IndexHero,
    IndexStarterBundle,
    IndexFeaturedProducts,
    IndexSubscriptionOffer,
    IndexQuiz,
    IndexReviews,
    IndexSquatchDifference
  }
};
</script>