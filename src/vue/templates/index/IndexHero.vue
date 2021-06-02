<template>
  <section class="index-hero">
    <div class="image-header-bg position-relative">
      <div class="ptext pimg1 flex-outer-center">
        <div class="brand-content offset-md-5 offset-xxl-6">
          <h1 class="image-bg_title text-white">
            FEEL LIKE A MAN,
          </h1>
          <h1 class="image-bg_title bottom-title text-white">
            SMELL LIKE A CHAMPION
          </h1>
          <p class="subheader text-white">
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
@import "@/styles/variables/fonts.scss";

  .brand-content {
    padding: 0 15px;
  }
  .bottom-title{
    margin-bottom:20px;
  }
  .index-hero {
    .pimg1 {
      background-image: url('https://cdn.shopify.com/s/files/1/0275/7784/3817/files/PineTar_Hero.jpg?v=1616440671');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center top 58%;
      height: 600px;
    }
    .flex-outer-center {
      justify-content: start;
      padding-left: 50px;
      display: flex;
      align-items: center;
    }
  }

  @media(max-width: 767px) {
    .index-hero {
      .image-header-bg {
        .pimg1 {
          padding-left: 15px;
          background-image:url('https://cdn.shopify.com/s/files/1/0275/7784/3817/files/PineTarHero_mobile_upped2x.jpg?v=1618269613');
          .brand-content {
            position: absolute;
            bottom: 50px;
            text-align: center;
            .subheader {
              display: none;
            }
          }
        }
      }
    }
  }
</style>