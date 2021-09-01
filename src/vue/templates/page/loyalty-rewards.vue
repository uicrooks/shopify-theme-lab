<template>
  <div class="loyalty-rewards-component">
    <div 
      class="yotpo-widget-instance" 
      data-yotpo-instance-id="25655" 
    />
  </div>
</template>

<script>

export default {
  name: "LoyaltyRewards",
  mounted() {
    let testScript = document.createElement("script");
    testScript.setAttribute("src", "https://cdn-widgetsrepository.yotpo.com/v1/loader/aVmUCojw7M4SVKvRhQWlyw");
    document.head.appendChild(testScript);

    window.addEventListener("load", function() {
      jQuery172(".yotpo-customer-logged-out-buttons button").on("click", function() {
          var current_url = window.location.href;
          window.location.href=`https://drsquatch.com/account/login?checkout_url=${current_url}`;
      });
    });
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";


#loyalty-rewards .inner-container {
    overflow-x: hidden;
}
.yotpo-widget-campaign-widget .yotpo-logged-out-tile .yotpo-action-button-widget .yotpo-button-style {
    margin-top: 0;
    width: initial !important;
}
.yotpo-widget-loyalty-page {
  
  .yotpo-vip-tiers-container {
    button {
      width: initial !important;
      height: initial !important;
      font-size: initial;
      padding: 4px 8px !important;

      span {
        font-family: initial !important;
      }
    }
  }

  button {
    width: 100% !important;
    height: unset !important;
    padding: 12px 30px 8px !important;
    
    span {
      @include font-style-heading;
    }
  }

  .yotpo-submit-form, .yotpo-logged-in-view {
      button {
          width: auto !important;
      }
  }
}

.yotpo-redemption-option-reward {
  font-size: 14px!important;
  position: absolute !important;
  top: 47px;
  left: 0;
  right: 0;
}
.yotpo-coupons-redemption-widget .yotpo-redemption-coupon-background .yotpo-action-button-widget .yotpo-button-style { 
  width: initial !important;
  margin-top: 12px;
}

</style>
