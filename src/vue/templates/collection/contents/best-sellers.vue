<template>
  <div class="collection-best-sellers-content-component">
    <div class="upsell-items">
      <div class="upsell-item-wrapper">
        <a href="/pages/subscription-flow">
          <img
            src="https://cdn.shopify.com/s/files/1/0275/7784/3817/products/6pack_1024x1024.png?v=1616623426"
            alt="Soap Subscription image"
            class="upsell-item-image"
          >
        </a>
        <a href="/pages/subscription-flow">
          <span class="upsell-item-title">
            Soap Subscription
          </span>
        </a>
        <div class="upsell-item-details">
          <div>
            Review Stuff here
          </div>
          <squatch-button
            path="/pages/subscription-flow"
            class="cta-button"
          >
            Subscribe & Save 15%
          </squatch-button>
          <p>
            Soap Delivered Automatically, Free Shipping
          </p>
        </div>
      </div>
      <div class="upsell-item-wrapper">
        <a href="/pages/bundle-offers">
          <img
            src="https://cdn.shopify.com/s/files/1/0275/7784/3817/products/FullEssentialsBundle_1024x1024.png?v=1616617707"
            alt="Starter Bundles image"
            class="upsell-item-image"
          >
        </a>
        <a href="/pages/bundle-offers">
          <h4 class="upsell-item-title">
            Starter Bundles
          </h4>
        </a>
        <div class="upsell-item-details">
          <div>
            Review Stuff here
          </div>
          <squatch-button
            path="/pages/bundle-offers"
            class="cta-button"
          >
            Shop Starter Bundles
          </squatch-button>
          <p>
            Your choice of our curated best sellers. Treat your skin right with three of our best-smelling, best-selling soaps - and our Soap Saver to keep them fresh.
          </p>
        </div>
      </div>
    </div>
    <collection-default-content
      :products="products"
    />
  </div>
</template>

<script>
export default {
  name: "CollectionBestSellersContent",
  props: {
    products: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.collection-best-sellers-content-component {

  .upsell-items {
    display: flex;
    flex-flow: row wrap;

    .upsell-item-wrapper {
      width: 100%;
      padding: 40px 20px 0 20px;
      text-align: center;

      @include layout-md {
        flex: 1;
        width: unset;
      }

      a, a:hover, a:active, a:visited {
        text-decoration: none;
      }
      
      .upsell-item-image {
        height: 200px;
        width: auto;

        &:hover {
          transform: scale(1.03);
        }
      }

      .upsell-item-title {
        display: block;
        width: 50%;
        margin: 25px auto;
        padding-bottom: 20px;
        border-bottom: 2px solid rgba(53, 46, 46, .1);
        @include font-style-body($weight: 500, $color: $orange);
      }

      .upsell-item-details {

        .cta-button {
          margin: 20px auto;
          width: 50%;
          min-width: 240px;
        }

        p {
          @include font-style-body($color: $brown, $lh: 16px);
        }
      }
    }
  }

}
</style>