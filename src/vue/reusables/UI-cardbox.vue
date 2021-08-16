<template>
  <div class="UI-cardbox-component">
    <a
      class="link-box"
      :href="linkUrl"
    >
      <div class="cardbox">
        <div class="logo">
          <img 
            :src="iconSrc"
          >
        </div>
        <div class="heading">
          {{ heading }}
        </div>
        <p class="text">
          {{ text }}
        </p>
        <div class="cta-link">
          Learn More
          <img 
            class="arrow-icon" 
            src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-icon-right-arrow.svg?v=1619041166"
          >
        </div>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: "DifferenceCardbox",
    props: {
      linkUrl: {
        type: String,
        required: true
      },
      iconSrc: {
        type: String,
        required: true
      },
      heading: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";

  $orange: #CC6328;
  $darker-brown: #1A110C;
  $dark-brown: #473729;
  $brown: #5A3714;
  $sand: #E5D0BB;
  $off-white: #F0EEEB;


  .link-box {
    text-decoration: none;
  }

  .cardbox {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 25px 8px 10px 8px;
  background: #FFFFFF;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  cursor: pointer;

  @media(min-width: $md) {
    min-height: 430px;
  }

  .logo {
    width: 102px;
    height: 102px;

    @media (min-width: $lg) {
      width: 106px;
      height: 106px;
    }

    img {
      width: 100%;
    }
  }

  .heading {
    width: 90%;
    line-height: 100%;
    text-align: center;
    @include font-style-heading($size: 25px, $color: $darker-brown);
    margin: 20px 0 8px;

    @media (min-width: $md) {
      margin: 25px 0 12px;
    }

    @media (min-width: $lg) {
      font-size: 30px;
    }
  }

  .text {
    min-height: 50px;
    width: 90%;
    font-size: 14px;
    line-height: 130%;
    font-family: $font-body;
    text-align: center;
    color: $brown;
    margin-bottom: 16px;

    @media (min-width: $md) {
      min-height: 120px;
      width: 96%;
    }

    @media (min-width: $lg) {
      font-size: 16px;
    }
  }

  .cta-link {
    width: 90%;
    border-top: 1px solid #BCA887;
    padding: 18px 0 12px 0;
    text-decoration: none;
    text-align: center;
    font-family: $font-heading;
    font-size: 14px;
    color: $orange;

    .arrow-icon {
      width: 20px;
      margin-left: 4px;
    }
  }
  }
</style>