<template>
  <div class="returns-component">
    <text-only-banner
      banner-text="Dr.Squatch Return Policies"
    />

    <sudisfaction-guarantee />

    <div class="container">
      <div class="guarantee-box">
        <p class="text">
          We understand that everyone is different — we're happy to help you find a replacement scent that you absolutely love. If we're not a great match, no hard feelings! We'll refund your order!
        </p>
        <p class="text">
          If you aren't 100% satisfied with your Dr. Squatch products, please 
          <a 
            class="link" 
            href="https://help.drsquatch.com/"
          >
            <strong>contact us</strong>
          </a> 
          within 30 days of your order delivery date!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import TextOnlyBanner from "@/vue/reusables/text-only-banner";
import SudisfactionGuarantee from "@/vue/reusables/sudisfaction-guarantee"


export default {
  name: "Returns",
  components: {
    TextOnlyBanner,
    SudisfactionGuarantee
  },
}
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.returns-component {
  .container {
    margin-top: 1.5rem;
    margin-bottom: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .guarantee-box {
      width: 100%;
      max-width: 575px;
      padding: 30px 15px;
      background-color: #f9f6f1;
      text-align: center;

      .text {
        @include font-style-body($color: $brown);

        .link {
          text-decoration: none;
          color: $orange;
        }
      }
    }
  }
}
</style>
