<template>
  <section 
    id="shipping" 
    class="shipping-container"
  >
    <text-only-banner 
      banner-text="Dr.Squatch Shipping Policies" 
    />
    <div class="text-container">
      <div class="text-content">
        <div class="shipping-text-container">
          <h3 class="shipping-title">
            1. Domestic Shipping
          </h3>
          <p class="shipping-description">
            Once your order ships, it will arrive in 3-7 business days with
            standard ground shipping. Within that window, please note that
            Pitney Bowes will pass off your order to your local USPS office.
            <br>
            <br>
            If shipped with expedited shipping, your order will arrive in a 3-4
            business days delivery window with USPS Priority, and 2 business
            days delivery window with FedEx 2-Day.
            <br>
            <br>
            Large orders may be shipped through UPS Ground. You will receive a
            shipping confirmation email to track your package in 1-3 business
            days.
          </p>
        </div>
        <div class="shipping-text-container">
          <h3 class="shipping-title">
            2. Order Processing
          </h3>
          <p class="shipping-description">
            Orders placed through our website normally ship within 1-3 business
            days. In rare occasions or during exceptionally busy times, we do
            experience stockouts, which can cause a longer delay in an order. If
            this happens we will do our best to contact you promptly.
          </p>
        </div>
        <div class="shipping-text-container">
          <h3 class="shipping-title">
            3. International Shipping
          </h3>
          <p class="shipping-description">
            International shipping is done through USPS Priority Mail and
            shipping rates are calculated at checkout based on your country and
            order size. We currently ship to Canada, Mexico, the United Kingdom,
            Germany, Australia, New Zealand, Hong Kong, Japan, and Korea.
            <br>
            <br>
            For orders shipping to Canada, Dr. Squatch handles duties & taxes
            for the customer. Your shipping costs will include an international
            processing fee that is included in the shipping line-item on your
            receipt. If your order is held at customs and you are required to
            pay for duties and taxes, please contact us.
            <br>
            <br>
            For other international orders, please note we are not responsible
            for any additional duties or tariffs that may be accumulated upon
            arrival to the destination country.
            <br>
            <br>
            In addition, please note that our free shipping handling policies
            <strong class="bolded-text">
              do not apply to orders shipping to international countries other
              than Canada.
            </strong>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TextOnlyBanner from "@/vue/reusables/text-only-banner";

export default {
  name: "ShippingPolicy",
  components: {
    TextOnlyBanner,
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.shipping-container {
  .text-container {
    padding: 2.5rem 0;

    @media (min-width: $md) {
      padding: 5rem 0;
    }

    @media (min-width: $xl) {
      padding: 5rem 2rem;
    }

    .text-content {
      padding: 0 15px;
      margin: auto;
      max-width: 1024px;

      .shipping-text-container {
        text-align: center;
        margin-bottom: 28px;

        @include layout-md {
          text-align: left;
        }

        .shipping-title {
          font-weight: 400;
          font-size: calc(1.04375rem + 1.10833vw);
          font-family: $font-heading;

          @media (min-width: 1200px) {
            font-size: 1.875rem;
          }
        }
        .shipping-description {
          font-size: 14px;
          color: $brown;
          font-family: $font-body;

          .bolded-text {
            @include font-style-body-bold;
          }
        }
      }
    }
  }
}
</style>