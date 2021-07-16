<template>
  <div class="wholesale-component">
    <div class="banner-container woodgrain-bg-dark">
      <div class="banner-text-container">
        <h1 class="wholesale-banner-title">
          Wholesale Program
        </h1>
        <hr class="line-through">
        <p class="banner-subtext">
          Sell Squatch In Your Store
        </p>
      </div>
      <div class="button-container">
        <button 
          class="apply-button button"
          @click="scroll"
        >
          Apply
        </button>
        <button 
          class="login-button button"
          @click="loginRoute"
        >
          Log In
        </button>
      </div>
    </div>

    <div class="application-info-container">
      <div class="info-text container">
        <p class="text">
          Thank you for your interest in the Dr. Squatch Wholesale Program! For businesses located in the United States, please complete the following application. Once submitted, your information will be reviewed by a member of our team, and we will be in touch within 3-5 business days.
        </p>
        <p class="text">
          Please note we are not currently partnering with :
        </p>

        <ul>
          <li>
            Online/ecommerce retailer or third-party marketplaces
          </li>
          <li>
            International retailers and distributers
          </li>
        </ul>

        <p class="application-link">
          Fill out my 
          <a 
            href="https://dantestforms.wufoo.com/forms/mtpgldh1c0we1p" 
            class="link"
          >
            online form 
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Wholesale",
  methods: {
    scroll() {
      console.log('clicked on button')
    },
    loginRoute() {
      window.location.href = "https://wholesale.drsquatch.com/"
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.wholesale-component {
  margin: 75px 0 0 0;

  .banner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    height: 350px;

    .banner-text-container {
      padding: 0 5%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: $white;

      .wholesale-banner-title {
        font-family: $font-heading;
      }

      .line-through {
        width: 90%;
        border-top: 4px solid white;
        margin: 15px 0;
      }

      .banner-subtext {
        font-family: $font-body;
      }


    }

    .button-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column nowrap;

      @media(min-width: 426px) {
        flex-flow: row nowrap;
      }

      .button {
        padding: 16px 50px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        @include font-style-heading($size: 1rem, $color: $white);
        border: 2px solid transparent;

        @media(min-width: 426px) {
          padding: 16px 66px;
        }
      }

      .apply-button {
        background-color: #203620;
        margin: 0 0 10px 0;
        
        @media(min-width: 426px) {
          margin: 0 10px 0 0
        }
      }

      .login-button {
        background-color: $orange;
      }
    }

  }

  .application-info-container {
    padding: 70px 10px;

    .info-text {
      text-align: left;
      font-family: $font-body;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-flow: column nowrap;
      color: $brown;

      .text {
        margin: 0 0 5px 0;
      }

      .application-link {
        margin: 20px 0 0 0;

        .link {
          color: $orange;
        }
      }
    }
  }


}


</style>