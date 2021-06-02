<template>
  <div class="banner-container woodgrain-bg">
    <div class="banner-title">
      <h1>{{ bannerText }} </h1>
    </div>
  </div>
</template>

<script>
  export default{
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
@import "@/styles/variables/fonts.scss";

  .banner-container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;

    @media(min-width:992px){
      height: 440px;
    }

    .banner-title{
      padding: 3rem 15px;
      
      @media(min-width:768px){
        padding: 4.7rem 15px;
      }
      .banner-text{
        font-size: calc(1.12188rem + 3.0875vw);
        margin-bottom:30px;
        text-align: center;

        @media(min-width: 1200px){
          font-size: 3.4375rem;
        }
      }
    }
  }
</style>