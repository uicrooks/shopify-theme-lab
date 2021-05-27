<template>
  <div class="index-squatch-difference">
    <div class="image-container">
      placeholder until figure out how to embed videos
    </div>
    <div class="squatch-difference-container">
      <div class="squatch-difference-content">
        <div class="brand-content">
          <h3 class="mb-0">The</h3> 
          <img src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/DRS_wordmark_black.svg?v=1615332033" class="squatch-difference-logo"> 
          <h3 >Difference</h3> 
          <p> Dr. Squatch is changing the way men approach hygiene by providing natural, healthy products that make you feel like a man and smell like a champion.</p>
        </div>
        <div class="squatch-difference-border"></div>
        <div class="squatch-difference">
          <div class="icon-container">
            <i class="squatch-icon icon-SustainablySourced"></i> 
            <h6 class="subtext">We Make Natural Products</h6>
          </div>
          <div class="icon-container">
            <i class="squatch-icon icon-NoHarshChemicals"></i> 
            <h6 class="subtext">We Never Use Harmful Ingredients</h6>
          </div>
          <div class="icon-container">
            <i class="squatch-icon icon-ColdProcessSoap"></i> 
            <h6 class="subtext">We Create Products For Men</h6>
          </div>
          <div>
            <squatch-button
                class="big-cta-button"
                text="Learn More"
                path="/pages/about-us"
                />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SquatchButton from "@vue/ui-elements/squatch-button";
export default {
  name: "IndexSquatchDifference",
  components:{
    SquatchButton,
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables/fonts.scss";

  .index-squatch-difference{
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1440px;
    padding: 60px 0;

    @media(min-width:768px){
      flex-direction: row;
    }

    .image-container{
      width:100%;
    }

    .squatch-difference-container{
      padding: 0 15px;

      .squatch-difference-content{
        padding: 30px 0;
        text-align: center;
        display: flex;
        flex-direction: column;

        .brand-content{
          p{
            text-align: left !important;
          }
        }

        .squatch-difference-border{
          margin: 1.5rem 0;
          border-top: 2px solid #ddc1a5!important;
        }

        .squatch-difference{
          display: flex;
          justify-content: center;
          flex-wrap: wrap;

          .icon-container{
            width: 100%;
            padding:0 15px;
            flex: 0 0 33.3333333333%;
            max-width: 33.3333333333%;

            .subtext{
              font-family: "adrianna-bold";
              color:#1a110c;
            }
          }

          .big-cta-button{
            width: 256px;
          }
        }
      }
    }
  }
</style>