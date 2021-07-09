<template class="index-featured-products-component">
  <div class="index-featured-products-component">
    <div class="preheader-container">
      <div class="featured-products-preheader">
        <div>
          <h1 class="header">
            Our products
          </h1>
          <p class="subheader">
            Natural products to tame your inner Squatch.
          </p>
        </div>
      </div>
    </div>
    <div class="featured-products-container">
      <div class="featured-products-content">
        <div class="product-card">
          <div class="product-card-content">
            <a href="/collections/bar-soaps">
              <img
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Category_BarSoaps.jpg?v=1616455751"
                data-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Category_BarSoaps.jpg?v=1616455751"
                alt="Bar Soap"
                class="w-100 ls-is-cached lazyloaded"
              >
            </a>
            <div class="brand-content">
              <p class="preheader">
                Smell Like a Champion
              </p>
              <h3 class="product-type">
                Bar Soaps
              </h3>
              <div class="cta-btns">
                <a 
                  href="/collections/bar-soaps" 
                  class="link"
                >
                  Shop Bar Soap
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-card-content">
            <a href="/collections/hair-care">
              <img
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Category_HairCare.jpg?v=1616455752"
                data-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Category_HairCare.jpg?v=1616455752"
                alt="Hair Care"
                class="w-100 ls-is-cached lazyloaded"
              >
            </a>
            <div class="brand-content">
              <p class="preheader">
                Soothe Your Scalp
              </p>
              <h3 class="product-type">
                Hair Care
              </h3>
              <div class="cta-btns">
                <a 
                  href="/collections/hair-care" 
                  class="link"
                >
                  Shop Hair Care
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-card-content">
            <a href="/collections/deodorant-4-pack">
              <img
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Category_Deodorants.jpg?v=1616455751"
                data-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Category_Deodorants.jpg?v=1616455751"
                alt="Deodorant"
                class="w-100 ls-is-cached lazyloaded"
              >
            </a>
            <div class="brand-content">
              <p class="preheader">
                Give B.O. The Boot
              </p>
              <h3 class="product-type">
                Deodorant
              </h3>
              <div class="cta-btns">
                <a 
                  href="/collections/deodorant-4-pack" 
                  class="link"
                >
                  Shop Deodorant
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-card-content">
            <a href="/collections/toothpaste">
              <img
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Category_Toothpaste.jpg?v=1616455751"
                data-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Category_Toothpaste.jpg?v=1616455751"
                alt="Toothpaste"
                class="w-100 ls-is-cached lazyloaded"
              >
            </a>
            <div class="brand-content">
              <p class="preheader">
                Mens Morning + Night
              </p>
              <h3 class="product-type">
                Toothpaste
              </h3>
              <div class="cta-btns">
                <a 
                  href="/collections/toothpaste" 
                  class="link"
                >
                  Shop Toothpaste
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="woodgrain-bg position-absolute w-100 fp-bg"
        style="z-index: -1"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexFeaturedProducts",
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.index-featured-products-component {
  width: 100%;
  display: flex;
  flex-flow: column wrap;

  .preheader-container {
    width: 100%;
    padding: 0 15px;
    margin-right: auto;
    margin-left: auto;

    .featured-products-preheader {
      width: 100%;
      padding: 30px 15px 0;
      text-align: center;

      .header {
        font-family: $font-heading;
      }

      .subheader {
        color: $brown;
        font-family: $font-body-bold;
      }
    }
  }

  .featured-products-container {
    display: flex;
    position: relative;

    .featured-products-content {
      width: 100%;
      max-width: 1660px;
      display: flex;
      flex-flow: column wrap;
      padding: 30px 0 0 0;

      @include layout-md {
        flex-flow: row wrap;
        padding-top: 0;
        margin: auto;
      }

      .product-card {
        width: 100%;
        padding: 0 15px;
        margin: 0 0 30px 0;

        @include layout-md {
          flex: 0 0 50%;
          max-width: 50%;
        }

        @media (min-width: 1300px) {
          flex: 0 0 25%;
          max-width: 25%;
        }

        .product-card-content {
          height: 100%;
          width: 100%;
          display: flex;
          flex-flow: column wrap;
          border: none;
          border-radius: 5px;
          background-color: white;
          overflow: hidden;
          box-shadow: 0 0.5rem 1rem rgba(26, 17, 12, 0.15) !important;

          .brand-content {
            padding: 30px 15px 0;
            text-align: center;

            .preheader {
              font-family: $font-body, sans-serif;
            }

            .product-type {
              margin-bottom: 20px;
              font-family: $font-heading;
            }

            .cta-btns {
              margin-bottom: 15px;

              .link {
                color: #cc6328;
                text-decoration: none;
                font-family: $font-heading;
              }

              a:hover {
                cursor: pointer;
                transition: all 0.2s ease-in-out;
              }
            }
          }
        }
      }
    }

    .woodgrain-bg {
      height: 100%;
      bottom: 0;
      background-color: $tan;

      @include layout-md {
        height: 50%;
      }
    }
  }
}
</style>