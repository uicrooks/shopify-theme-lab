<template>
  <div class="index-squatch-difference-component">
    <div class="image-container">
      placeholder until figure out how to embed videos
    </div>
    <div class="squatch-difference-container">
      <div class="squatch-difference-content">
        <div class="brand-content">
          <h3 class="squatch-difference-title">
            The
          </h3>
          <img
            src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/DRS_wordmark_black.svg?v=1615332033"
            class="squatch-difference-logo"
          >
          <h3 class="squatch-difference-title">
            Difference
          </h3>
          <p class="squatch-difference-copy">
            Dr. Squatch is changing the way men approach hygiene by providing
            natural, healthy products that make you feel like a man and smell
            like a champion.
          </p>
        </div>
        <div class="squatch-difference-border" />
        <div class="squatch-difference">
          <div class="icon-container">
            <i class="squatch-icon icon-SustainablySourced" />
            <h6 class="subtext">
              We Make Natural Products
            </h6>
          </div>
          <div class="icon-container">
            <i class="squatch-icon icon-NoHarshChemicals" />
            <h6 class="subtext">
              We Never Use Harmful Ingredients
            </h6>
          </div>
          <div class="icon-container">
            <i class="squatch-icon icon-ColdProcessSoap" />
            <h6 class="subtext">
              We Create Products For Men
            </h6>
          </div>
          <div class="button-container">
            <squatch-button
              class="big-cta-button"
              path="/pages/about-us"
            >
              Learn More
            </squatch-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SquatchButton from "@/vue/reusables/squatch-button";

export default {
  name: "IndexSquatchDifference",
  components: {
    SquatchButton,
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.index-squatch-difference-component {
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  max-width: 1440px;
  padding: 60px 0;
  margin: auto;

  @include layout-md {
    flex-flow: row nowrap !important;
  }

  .image-container {
    width: 100%;
  }

  .squatch-difference-container {
    padding: 0 15px;

    .squatch-difference-content {
      padding: 30px 0;
      text-align: center;
      display: flex;
      flex-flow: column wrap;

      .brand-content {
        .squatch-difference-title {
          font-family: $font-heading;
          margin: 0;
        }

        .squatch-difference-copy {
          text-align: left;
          margin: 5px 0 0 0;
          color: $brown;
        }
      }

      .squatch-difference-border {
        margin: 1.5rem 0;
        border-top: 2px solid #ddc1a5;
      }

      .squatch-difference {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        .icon-container {
          width: 100%;
          padding: 0 15px;
          flex: 0 0 33.3%;
          max-width: 33.3%;

          .subtext {
            @include font-style-body-bold($color: $dark-brown);
          }
        }

        .button-container {
          margin: 10px 0 0 0;

          .big-cta-button {
            width: 256px;
          }
        }
      }
    }
  }
}
</style>