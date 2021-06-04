<template>
  <div class="banner-container woodgrain-bg-dark">
    <div class="banner-title">
      <h1 class="banner-text">
        {{ bannerText }} 
      </h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TextOnlyBanner",
    props: {
      bannerText: {
        type: String,
        required: true
      },
    },
  }
</script>

<style lang="scss">
@import "@/styles/main.scss";
@import "@/styles/partials/brand.scss";

.banner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  background-color: #1a110c!important;

  @media(min-width:992px) {
    height: 440px;
  }

  .banner-title {
    padding: 0 15px;
    margin: auto;
    
    @media(min-width: $sm) {
      max-width: 540px;
    }
    @media(min-width: $md) {
      max-width: 720px;
    }
    @media(min-width: $lg) {
      max-width: 960px;
    }
    @media(min-width: $xl) {
      max-width: 1024px;
    }
    .banner-text {
      font-size: calc(1.12188rem + 3.0875vw);
      margin-bottom:30px;
      text-align: center;
      color:white;

      @media(min-width: 1200px) {
        font-size: 3.4375rem;
      }
    }
  }
}
</style>