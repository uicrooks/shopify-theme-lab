<template>
  <div class="new-sub-flow" :class="current_step">
    <section class="sub-flow-log"></section>

    <!-- SUMMARY SCREEN -->
    <!-- / SUMMARY SCREEN -->
  hi**
    <!-- FOOTER -->
    <!-- / FOOTER -->
  </div>
</template>


<script>
export default {
  name: "SubscriptionFlow",
  props: {
    soapSubDetails: {type: Array},
    deodorantSubDetails: {type: Array},
    haircareSubDetails: {type: Array},
    toothpasteSubDetails: {type: Array},
    productDetails: {type: Array},
  },
  mounted() {
    console.log('HHIHI')
  }
}
</script>