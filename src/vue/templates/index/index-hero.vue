<template>
  <section class="index-hero-component">
    <div class="image-header-bg">
      <div class="banner-background">
        <div class="brand-content">
          <h1 class="image-bg-title">
            FEEL LIKE A MAN,
          </h1>
          <h1 class="bottom-title">
            SMELL LIKE A CHAMPION
          </h1>
          <p class="subheader">
            Better smell and better skin, without the harsh chemicals
          </p>
          <squatch-button
            class="big-cta-button"
            text="Subscribe & Save 15%"
            path="/pages/subscription-flow"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SquatchButton from "@vue/ui-elements/squatch-button";


export default {
  name: "IndexHero",
  components: {
    SquatchButton,
  }
};
</script>
<style scoped lang="scss">
@import "@/styles/main.scss";

.index-hero-component {

  .image-header-bg {

    position: relative;

    .banner-background {
      display: flex;
      align-items: center;
      padding-left: 15px;
      background-image: url('https://cdn.shopify.com/s/files/1/0275/7784/3817/files/PineTarHero_mobile_upped2x.jpg?v=1618269613');
      color: white;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center top 58%;
      height: 600px;
      justify-content: start;

      @include layout-md {
        padding-left: 50px;
        background-image: url('https://cdn.shopify.com/s/files/1/0275/7784/3817/files/PineTar_Hero.jpg?v=1616440671');
      }

      .brand-content {
        padding: 0 15px;
        display:flex;
        align-items: center;
        flex-flow: column wrap;
        bottom: 50px;
        text-align: center;
        position: absolute;
        font-family: $font-heading;

        @include layout-md {
          margin-left: 42%;
          align-items: flex-start;
          position: absolute;
          text-align: left;
          bottom: unset;
        }

        @media(min-width: 1400px) {
          margin-left: 50%;
        }
        
        .bottom-title {
          margin-bottom: 20px;
        }
        
        .subheader {
          display: none;
          font-family: $font-body;

          @include layout-md {
            display: block;
          }
        }
      }
    }
  }
}
</style>