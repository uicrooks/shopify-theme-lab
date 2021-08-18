<template>
  <section class="index-subscription-offer-component">
    <div class="subscribe-container">
      <div class="subscribe-content">
        <div class="brand-content">
          <h2 class="header">
            Subscribe &amp; Save 15%
          </h2>
          <p class="subheader">
            How It Works
          </p>
          <p class="copy">
            Give our natural products a try! Sudisfaction guaranteed, cancel
            anytime.
          </p>
          <div class="image-container">
            <squatch-button
              class="big-cta-button"
              path="/pages/subscription-flow#soap"
            >
              Subscribe & Save
            </squatch-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SquatchButton from "@/vue/reusables/squatch-button";

export default {
  name: "IndexSubscriptionOffer",
  components: {
    SquatchButton,
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.index-subscription-offer-component {
  width: 100%;
  max-width: 1400px;
  margin: 90px auto 45px;

  .subscribe-container {
    width: 100%;

    .subscribe-content {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      .brand-content {
        padding: 0 15px;
        align-items: center;
        color: $brown;
        text-align: center;
        display: flex;
        flex-direction: column;

        .header {
          @include font-style-heading($color: black, $size: 24px);
          @include layout-md{
            font-size: 48px;
          }
        }

        .subheader {
          margin-bottom: 20px;
          @include font-style-body-bold($size: 20px, $color: $brown);
        }

        .copy {
          line-height: 1.3;
          margin-bottom: 30px;
          @include font-style-body($size: 16px, $color: $brown);
        }

        .image-container {
          color: $white;
        }
      }
    }
  }
}
</style>