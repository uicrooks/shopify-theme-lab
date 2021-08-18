<template>
  <div class="hero-discount-component">
    <div class="hero-banner-container">
      <div class="banner-text">
        <h1 class="banner-header">
          Thank You To Our Heros!
        </h1>
        <h3 class="banner-subtext">
          Enjoy 10% Off Every Order
        </h3>
      </div>
    </div>

    <div class="content-container">
      <div class="text-container">
        <h1 class="header">
          Not All Heroes Wear Capes
        </h1>
        <p class="text">
          At Dr. Squatch, we’re proud that our natural products are made right here in the USA. We want to honor the brave heroes who work tirelessly on the frontlines to keep us and our great country safe. 
        </p>
        <p class="text">
          As a token of our appreciation, we’re offering <strong class="bold-text">10% off all products for all military personnel, first responders and medical professionals</strong>. Follow the steps below to receive a discount on all one-time purchases, first-time subscription orders and all subscription renewals.
        </p>
      </div>

      <div class="icon-container">
        <div class="header-container">
          <h1 class="icon-text">
            How It Works
          </h1>
        </div>
        <div class="icon-content">
          <div class="card">
            <div class="card-body">
              <img
                class="card-image"
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/noun_verified_739208_6bb10297-ef40-4245-864a-36a993eb789a.svg?v=1601620433"
              >
              <p class="card-description">
                Verify your status below. Click “Get Code” to get started.
              </p>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <img
                class="card-image"
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/noun_Coupon_2482330_2a19133f-b0f2-4830-8e8a-128dde8644eb.svg?v=1601620433"
              >
              <p class="card-description">
                Copy your discount code and start shopping!
              </p>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <img
                class="card-image"
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/noun_checkout_61437_22f0dfe4-5d6c-4c7e-83ef-37dc1274d3b4.svg?v=1601620433"
              >
              <p class="card-description">
                Apply your code at checkout to get 10% off your order!
              </p>
            </div>
          </div>
        </div>

        <div class="bottom-card-container">
          <div class="bottom-card">
            <div class="bottom-card-body">
              <div
                class="card-image"
                style="background-image: url('https://cdn.shopify.com/s/files/1/0275/7784/3817/files/military.jpg?v=1601620020')"
              />
              <h3 class="card-title">
                Military
              </h3>
              <p class="card-description">
                Active Duty Personnel, Veterans & Dependents 
              </p>
              <button class="code-btn">
                Get Code
              </button>
            </div>
          </div>

          <div class="bottom-card">
            <div class="bottom-card-body">
              <div
                class="card-image"
                style="background-image: url('https://cdn.shopify.com/s/files/1/0275/7784/3817/files/firefighter.jpg?v=1601620020')"
              />
              <h3 class="card-title">
                First Responder
              </h3>
              <p class="card-description">
                Law Enforcement, Firefighters, EMTs & EMS
              </p>
              <button class="code-btn">
                Get Code
              </button>
            </div>
          </div>

          <div class="bottom-card">
            <div class="bottom-card-body">
              <div
                class="card-image"
                style="background-image: url('https://cdn.shopify.com/s/files/1/0275/7784/3817/files/medical.png?v=1589310169')"
              />
              <h3 class="card-title">
                Medical
              </h3>
              <p class="card-description">
                Doctors, Nurses, PAs & Hospital Staff
              </p>
              <button class="code-btn">
                Get Code
              </button>
            </div>
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "HeroDiscount"
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";


.hero-discount-component {

  .hero-banner-container {
    position: relative;
    height: 380px;
    background: url(https://i.imgur.com/iG6f3X4.jpg);
    background-position: center right;
    background-size: cover;
    background-repeat: no-repeat;
    max-width: 1440px;
    margin: auto;
    @include layout-md {
      height: 450px;
      background-position: top 28% center;
    }

    .banner-text {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      color: $white;
      text-align: center;
      height: 100%;

      @include layout-md {
        width: 50%;
      }

      .banner-header {
        @include font-style-heading($color: $white);
      }
      .banner-subtext {
        @include font-style-heading($color: $white);
      }
    }
  }

  .content-container {
    text-align: center;
    margin: auto;

    @media (min-width: 576px){
      max-width: 540px;
    }

    @include layout-md {
      max-width: 720px;
    }
      
    @include layout-lg {
      max-width: 960px;
    }

    @include layout-xl {
      max-width: 1024px;
    }

    .text-container {
      padding: 0 15px;
      width: 100%;
      margin: 20px 0 0 0;


      .header {
        @include font-style-heading;
      }
      
      .text {
        @include font-style-body($color: $brown);

        .bold-text {
          @include font-style-body-bold($color: $brown);
        }
      }
    }

    .icon-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column nowrap;
      margin: 30px 0 0 0;

      .header-container {
        .icon-text {
          @include font-style-heading;
        }
      }

      .icon-content {
        width: 100%;
        display:flex;
        flex-flow: row wrap;
        justify-content: center;

        .card {
          width: 50%;
          background-color: #fff;
          background-clip: border-box;
          height: 172px;
          border: transparent;

          @include layout-md {
            width: 33%;
          }

          .card-body {
            padding: 1.25rem .25rem;

            .card-image {
              height: 80px;
            }

            .card-description {
              max-width: 200px;
              margin: auto;
              height: 43px;
              @include font-style-body;
            }
          }
        }
      }

      .bottom-card-container {
        display: flex;
        flex-flow: column nowrap;
        width: 100%;
        margin: 0 0 30px 0;

        @include layout-md {
          flex-flow: row nowrap;
        }
        .bottom-card {
          width: 100%;
          background-color: #fff;
          background-clip: border-box;
          height: 371px;
          border: transparent;

          @include layout-md {
            width: 33%;
          }

          .bottom-card-body {
            padding: 1.25rem .25rem;

            .card-image {
              margin: auto;
              height: 200px;
              max-width: 200px;
              border-radius: 5px;
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center;
            }

            .card-title {
              max-width: 200px;
              margin: 18px auto 10px;
              @include font-style-heading($size: 16px);
            }

            .card-description {
              max-width: 200px;
              margin: auto;
              height: 43px;
              @include font-style-body($size: 15px, $color: $brown);
            }

            .code-btn {
              text-align: center;
              padding: 0px;
              height: 54px;
              width: 121px;
              cursor: pointer;
              background-color: $orange;
              border: 2px solid transparent;
              border-radius: 5px;
              @include font-style-heading($size: 1rem, $color: $white);
            }
          }
        }
      }
    }
  }
}
</style>

