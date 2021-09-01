<template>
  <div class="gift-card-balance-component">
    <text-only-banner
      banner-text="Check Your Balance"
    />

    <div class="card-balance-container">
      <div id="GiftWizard-account__div" />
    </div>
  </div>
</template>

<script>
import TextOnlyBanner from "@/vue/reusables/text-only-banner";

export default {
  name: "GiftCardBalance",
  components: {
    TextOnlyBanner,
  },
};
</script>

<style scoped lang="scss">
.gift-card-balance-component {
  .card-balance-container {
    padding: 4rem 0 0 0;
    background-color: #f3f3f3;
  }
}
</style>
