<template>
  <section class="index-hero-component">
    <div class="branded-gradient-background">
      <img
        src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/homepage-hero-background-desktop.jpg?v=1623883927"
        class="background-image"
      >
      <div class="content">
        <h1 class="heading">
          Feel Like A Man,<br>
          Smell Like a Champion
        </h1>
        <p class="subheading">
          Natural Ingredients, Manly Scents, <br>
          100% Sudisfaction Guaranteed
        </p>
        <p class="subheading extended">
          Natural Ingredients, Manly Scents, 100% Sudisfaction Guaranteed
        </p>
        <squatch-button
          class="big-cta-button btn"
          path="/pages/subscription-flow"
        >
          Subscribe & Save 15%
        </squatch-button>
      </div>
    </div>
  </section>
</template>

<script>
import SquatchButton from "@/vue/reusables/squatch-button.vue";
export default {
  name: "IndexHero",
  components: {
    SquatchButton
  }
};
</script>

<style scoped lang="scss">
@use "@/styles/main" as global;

.index-hero-component {
  .branded-gradient-background {
    position: relative;
    height: 100vw;
    min-height: 490px;
    max-height: 100vh;
    background-image: url("https://cdn.shopify.com/s/files/1/0275/7784/3817/files/homepage-hero-background-mobile.png?v=1623883927");
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #1d1d1e;

    @media (min-width: $md) {
      background-image: none;
      height: unset;
      min-height: unset;
      overflow: hidden;
    }

    .background-image {
      display: none;

      @media (min-width: $md) {
        display: block;
        width: 100%;
      }
    }

    .content {
      position: absolute;
      bottom: 35px;
      width: 100%;
      color: white;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center top 58%;
      height: 600px;
      justify-content: flex-start;

      @include global.layout-md {
        padding-left: 50px;
        background-image: url("https://cdn.shopify.com/s/files/1/0275/7784/3817/files/PineTar_Hero.jpg?v=1616440671");
      }

      @media (min-width: $md) {
        right: 0;
        top: 12px;
        bottom: 0;
        width: 45%;
        display: flex;
        align-items: center;
        flex-flow: column wrap;
        bottom: 50px;
        text-align: center;
        position: absolute;
        font-family: global.$font-heading;

        @include global.layout-md {
          margin-left: 42%;
          align-items: flex-start;
          position: absolute;
          text-align: left;
          bottom: unset;
        }

        @media (min-width: $md) {
          width: 83%;
          font-size: calc(1.12188rem + 1.5vw);
          text-align: left;
          margin: 0 auto calc(1rem + 1vw) 0;
        }

        @media (min-width: $lg) {
          width: 95%;
        }
      }

      .subheading {
        display: none;
        font-size: 16px;
        font-weight: 400;
        line-height: 120%;
        margin-bottom: 1.3rem;
        @include font-style-body($color: $white, $lh: 1);

        &.extended {
          display: none;
          font-family: global.$font-body;

          @include global.layout-md {
            display: block;
          }
        }

        @media (min-width: 576px) {
          font-size: 18px;
          margin-bottom: 2.3vh;
        }

        @media (min-width: $md) {
          display: inline-block;
          font-size: calc(0.7rem + 0.7vw);
          text-align: left;
        }

        @media (min-width: 992px) {
          margin-bottom: 3.5vh;
        }

        @media (min-width: $lg) {
          display: none;
        }
      }

      .btn {
        width: 256px;

        @media (min-width: $md) {
          padding: 12px 0 9px 0;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>