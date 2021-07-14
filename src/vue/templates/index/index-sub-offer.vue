<template>
  <section class="index-sub-offer-component">
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
              text="Subscribe & Save"
              path="/pages/subscription-flow#soap"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SquatchButton from "@/vue/ui-elements/squatch-button";

export default {
  name: "IndexSubOffer",
  components: {
    SquatchButton,
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.index-sub-offer-component {
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
          font-family: $font-heading;
          color: black;
        }

        .subheader {
          margin-bottom: 20px;
          @include font-style-body-bold($size: 20px);
        }

        .copy {
          line-height: 1.3;
          margin-bottom: 30px;
          @include font-style-body($size: 16px);
        }

        .image-container {
          color: $white;
        }
      }
    }
  }
}
</style>