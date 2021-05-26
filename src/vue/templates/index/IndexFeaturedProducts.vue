<template>
  <div class="featured-products">
    <div class="preheader-container">
      <div class="featured-products-preheader">
        <div>
          <h1 class="mb-0">Our Products</h1> 
          <p class="subheader">Natural products to tame your inner Squatch.</p>
        </div>
      </div>
    </div>
    <div class="featured-products-container">
      <div class="featured-products-content">
        <div class="product-card">
          <div class="product-card-content">
            <a href="/collections/bar-soaps">
              <img src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Category_BarSoaps.jpg?v=1616455751" data-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Category_BarSoaps.jpg?v=1616455751" alt="Bar Soap" class="w-100 ls-is-cached lazyloaded">
            </a>
            <div class="brand-content">
              <p class="preheader">Smell Like a Champion</p> 
              <h3>Bar Soaps</h3> 
              <div class="cta-btns mt-auto" style="margin-bottom: 15px;">
                <a href="/collections/bar-soaps" class="link">Shop Bar Soap</a>
              </div>
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-card-content">
            <a href="/collections/hair-care">
              <img src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Category_HairCare.jpg?v=1616455752" data-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Category_HairCare.jpg?v=1616455752" alt="Hair Care" class="w-100 ls-is-cached lazyloaded">
            </a>
            <div class="brand-content">
              <p class="preheader">Soothe Your Scalp</p> 
              <h3>Hair Care</h3> 
              <div class="cta-btns mt-auto" style="margin-bottom: 15px;">
                <a href="/collections/hair-care" class="link">Shop Hair Care</a>
              </div>
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-card-content">
            <a href="/collections/deodorant-4-pack">
              <img src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Category_Deodorants.jpg?v=1616455751" data-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Category_Deodorants.jpg?v=1616455751" alt="Deodorant" class="w-100 ls-is-cached lazyloaded">
            </a>
            <div class="brand-content">
              <p class="preheader">Give B.O. The Boot</p> 
              <h3>Deodorant</h3> 
              <div class="cta-btns mt-auto" style="margin-bottom: 15px;">
                <a href="/collections/deodorant-4-pack" class="link">Shop Deodorant</a>
              </div>
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-card-content">
            <a href="/collections/toothpaste">
              <img src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Category_Toothpaste.jpg?v=1616455751" data-src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Category_Toothpaste.jpg?v=1616455751" alt="Toothpaste" class="w-100 ls-is-cached lazyloaded">
            </a>
            <div class="brand-content">
              <p class="preheader">Mens Morning + Night</p> 
              <h3>Toothpaste</h3> 
              <div class="cta-btns mt-auto" style="margin-bottom: 15px;">
                <a href="/collections/toothpaste" class="link">Shop Toothpaste</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="woodgrain-bg position-absolute w-100 fp-bg" style="z-index: -1;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexFeaturedProducts",
  components: {

  }
};
</script>

<style scoped lang="scss">
@import "@/styles/partials/brand.scss";
@import "@/styles/variables/colors.scss";

  .featured-products{
    width: 100%;
    display: flex;
    flex-direction: column;

    .preheader-container{
      width: 100%;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;

      .featured-products-preheader{
        width: 100%;
        padding: 30px 15px 0;
        text-align: center;
      }
    }

    .featured-products-container{
      padding-top:30px;
      display:flex;
      position: relative;

      .featured-products-content{
        width: 100%;
        max-width: 1660px;
        display: flex;
        flex-direction: column;


        @media(min-width :768px){
          flex-direction: row;
        }

        .product-card{
          width: 100%;
          padding-right: 15px;
          padding-left: 15px;
          margin-bottom: 30px;

          .product-card-content{
            width:100%;
            display: flex;
            flex-direction: column;
            border: none;
            border-radius: 5px;
            background-color: white;
            overflow: hidden;

            .brand-content {
              padding: 30px 15px 0;
              text-align: center;
              h3 {
                  margin-bottom: 20px;
              }
            }
          }
        }
      }
      .woodgrain-bg{
        height: 100%;
        bottom:0;
        background-color: $tan;

        @media(min-width: 768px){
          height: 50%;
        }
      }

    }
  }
</style>