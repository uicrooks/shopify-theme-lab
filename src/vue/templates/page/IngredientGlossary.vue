<template>
  <div class="ingredient-glossary">
    <!-- GLOSSARY HEADER  -->
    <div class="glossary-header">
      <div 
        class="col-12 col-xl-6 m-auto text-center" 
        style="max-width:646px;padding:0 19px;"
      >
        <h2 class="text-white">
          Ingredient Glossary
        </h2>
        <p 
          class="header-sub" 
          style="margin: auto; line-height: 1.2;"
        >
          Changing the way men approach personal care by providing the finest ingredients nature has to offer.
        </p>
      </div>
      <img 
        class="img-btmright" 
        src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/bottomright_desktop.png?v=1594333445"
      >
      <img 
        class="img-topright" 
        src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/topright_desktop.png?v=1594333444"
      >
      <img 
        class="img-btmleft" 
        src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/bottomleft_desktop.png?v=1594361564"
      >
      <img 
        class="img-topleft" 
        src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/topleft_desktop.png?v=1594333445"
      >
    </div>

    <!-- INPUT FIELD -->
    <div class="carousel-container">
      <div style="position:relative">
        <input 
          v-model="filter" 
          type="text" 
          placeholder="Search Ingredients..."
          @click="inputEntry" 
          @blur="inputExit" 
        >
        <svg 
          id="srch_icon"
          xmlns="http://www.w3.org/2000/svg" 
          height="24" 
          viewBox="0 0 24 24" 
          width="24" 
          style="position: absolute; top: 0;left:0; bottom: 0; margin: auto; fill: #AFAFAF;"
        >
          <path 
            d="M0 0h24v24H0V0z" 
            fill="none" 
          />
          <path 
            d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </div>
      <div class="carousel-content">
        <div 
          id="scroll-indicator_right" 
          @click="scrollSlider('right')"
        >
          <span 
            style="opacity: .8; background: rgb(61 51 42); color: #fff; padding: 6px 6px 5px; line-height: 1; z-index: 9; border-radius: 50%;cursor:pointer;" 
            class="shadow"
          >
            →
          </span>
        </div>
        <div 
          id="scroll-indicator_left" 
          @click="scrollSlider('left')"
        >
          <span 
            style="opacity: .8; background: rgb(61 51 42); color: #fff; padding: 6px 6px 5px; line-height: 1; z-index: 9; border-radius: 50%;cursor:pointer;" 
            class="shadow"
          >
            &#8592;
          </span>
        </div>
        <div 
          class="noscrollbar" 
          style="overflow-x:auto;padding-top:10px;"
        >
          <label class="col-4 col-md-2">
            <input 
              v-model="selected"
              type="radio" 
              name="product_category"
              value="bar-soap" 
              checked 
            >
            <div class="product-category-card text-center">
              <img 
                style="height:110px;margin:auto;"
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_soap.png?v=1616443457"
              >
              <p class="mt-2 mb-0 line-height-normal prod_type-label">
                Bar Soap
              </p>
            </div>
          </label>
          <label class="col-4 col-md-2">
            <input 
              v-model="selected"
              type="radio" 
              name="product_category" 
              value="haircare" 
            >
            <div class="product-category-card text-center">
              <img 
                style="height:110px;margin:auto;"
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_Haricare.png?v=1616443457"
              >
              <p class="mt-2 mb-0 line-height-normal prod_type-label">
                Hair Care
              </p>
            </div>
          </label>
          <label class="col-4 col-md-2">
            <input 
              v-model="selected"
              type="radio" 
              name="product_category" 
              value="liquid-soap" 
            >
            <div class="product-category-card text-center">
              <img 
                style="height:110px;margin:auto;"
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/products/liquidSoap_2pack_large.png?v=1591741590"
              >
              <p class="mt-2 mb-0 line-height-normal prod_type-label">
                Hand Soap
              </p>
            </div>
          </label>
          <label class="col-4 col-md-2">
            <input 
              v-model="selected"
              type="radio" 
              name="product_category" 
              value="toothpaste" 
            >
            <div class="product-category-card text-center">
              <img 
                style="height:110px;margin:auto;"
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_toothpaste.png?v=1616443457"
              >
              <p class="mt-2 mb-0 line-height-normal prod_type-label">
                Toothpaste
              </p>
            </div>
          </label>
          <label class="col-4 col-md-2">
            <input 
              v-model="selected"
              type="radio" 
              name="product_category" 
              value="deodorant" 
            >
            <div class="product-category-card text-center">
              <img 
                style="height:110px;margin:auto;"
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_Deo.png?v=1616443457"
              >
              <p class="mt-2 mb-0 line-height-normal prod_type-label">
                Deodorant
              </p>
            </div>
          </label>
          <label class="col-4 col-md-2">
            <input 
              v-model="selected"
              type="radio" 
              name="product_category" 
              value="cologne" 
            >
            <div class="product-category-card text-center">
              <img 
                style="height:110px;margin:auto;"
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Cologne_collections.png?v=1616615358"
              >
              <p class="mt-2 mb-0 line-height-normal prod_type-label">
                Cologne &amp; Beard Oil
              </p>
            </div>
          </label>
          <label class="col-4 col-md-2">
            <input 
              v-model="selected"
              type="radio" 
              name="product_category" 
              value="candle" 
            >
            <div class="product-category-card text-center">
              <img 
                style="height:110px;margin:auto;"
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/products/Candle-BayRum_1.png?v=1616621024"
              >
              <p class="mt-2 mb-0 line-height-normal prod_type-label">
                Candle
              </p>
            </div>
          </label>
          <label class="col-4 col-md-2">
            <input 
              v-model="selected"
              type="radio" 
              name="product_category" 
              value="sanitizer" 
            >
            <div class="product-category-card text-center">
              <img 
                style="height:110px;margin:auto;"
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/products/mixed_sanitizer-2pack_7d2c96c5-6e15-45a4-86a1-3957bc975f9d.png?v=1594068473"
              >
              <p class="mt-2 mb-0 line-height-normal prod_type-label">
                Hand Sanitizer
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>


    <!-- FILTER TITLE  -->
    <div 
      v-if="filter_title"
      class="title-container"
    >
      <h2>
        {{ filter_title }}
      </h2>
    </div>


    <!-- GLOSSARY GRID -->
    <div class="glossary-grid">
      <div 
        v-for="ingredient in filtered_ingredients" 
        :key="ingredient.ingredient"
        class="ingredient-container" 
      >
        <div class="ingredient-card">
          <div class="card-preheader">
            <div class="preheader-content">
              <div class="ingredient-badge-container">
                <div 
                  class="ingredient-badge" 
                  :class="ingredient.ingredientSource"
                >
                  <img 
                    class="icon_img" 
                    :src="ingredient.icon1_img"
                  >
                  <p class="ingredient-source">
                    {{ ingredient.ingredientSource }}
                  </p>
                </div>
                <a 
                  v-if="ingredient.read_more_link"
                  :href="ingredient.read_more_link" 
                  class="read-more-link" 
                >
                  DIVE DEEPER
                </a>
              </div>
              <h3 class="ingredient-title">
                {{ ingredient.ingredient }}
              </h3>
              <p 
                v-if="ingredient.onLabel"
                class="ingredient-label" 
              >
                {{ ingredient.onLabel }}
              </p>
              <p 
                v-else
                style="visibility:hidden;" 
              >
                blank
              </p>
            </div>
          </div>
          <div class="ingredient-content">
            <div>
              <p class="ingredient-function">
                {{ ingredient.function }}
              </p>
            </div>
            <div class="ingredient-benefits">
              <p>
                {{ ingredient.additionalBenefits }}
              </p>
            </div>
          </div>  
          <p class="foundInTitle">
            Found in
          </p>
          <p class="foundIn">
            {{ ingredient.foundIn_titles.join(", ") }}
          </p>
        </div>
      </div>
    </div>

    <div class="ingredient-disclaimer">
      <div class="disclaimer-text"> 
        Dr. Squatch uses natural ingredients in all of its products, but it's still possible to experience an adverse reaction to certain ingredients. Always check the ingredient list for each product before purchasing or using the product. You can also review this ingredient glossary to check for known allergens!

        We also recommend that you test any new product before regular usage. Apply the product to your wrist and wait 24 hours to see if you have a reaction; if any adverse reaction occurs, discontinue use and consult with a medical professional.

        Additionally, some soap bars contain exfoliants; exfoliants can be damaging to your skin if excessive force is used or if used too frequently, so Squatch says don't use on sensitive areas and don't over-exfoliate!
      </div>
    </div>
  </div>
</template>

<script>

export default{
  name: "IngredientGlossary",
  data(){
    return{
      all_ingredients: [],
      filtered_ingredients: [],
      filter:"",
      filter_title:"bar soap",
      filter_select:"",
      selected:"bar-soap",
    }
  },
  watch:{
    filter(){
      console.log(this.filter)
      if(this.filter === ""){
        this.filtered_ingredients = this.all_ingredients.filter(element => element.foundIn_tags.includes("bar-soap"))
      }
      else{
        this.filtered_ingredients = this.all_ingredients.filter(element => element.ingredient.toLowerCase().includes(`${this.filter}`))
      }
    },
    selected(){
      console.log(this.selected)
      this.filtered_ingredients = this.all_ingredients.filter(element => element.foundIn_tags.includes(`${this.selected}`))
      console.log(this.filtered_ingredients)
      switch(this.selected){
        case "bar-soap":
          this.filter_title = "bar soap"
          break
        case "haircare":
          this.filter_title = "hair care"
          console.log(this.filter_title)
          break
        case "liquid-soap":
          this.filter_title = "hand soap"
          break
        case "toothpaste":
          this.filter_title = "toothpaste"
          break
        case "deodorant":
          this.filter_title = "deodorant"
          break
        case "cologne":
          this.filter_title = "cologne"
          break
        case "candle":
          this.filter_title = "candles"
          break
        case "sanitizer":
          this.filter_title = "hand sanitizer"
          break
      }
    }
  },
  mounted(){
    this.all_ingredients = JSON.parse(document.getElementById("glossary-data").innerHTML);
    this.filtered_ingredients = this.all_ingredients.filter(element => element.foundIn_tags.includes("bar-soap"))
  },
  methods:{
    inputEntry(){
      this.filter_title = ""
    },
    inputExit(){
      if(this.filter === ""){
        this.filter_title = "Bar Soap"
        this.filtered_ingredients = this.all_ingredients.filter(element => element.foundIn_tags.includes("bar-soap"))
      }
    },
    scrollSlider(direction) {
      console.log(direction)
        // if (direction == "left") {
        //         $(".prod_scroller").animate({
        //         scrollLeft: "-=150px",
        //         });
        // } else if (direction == "right") {
        //         $(".prod_scroller").animate({
        //         scrollLeft: "+=150px",
        //     });
        // }
    },
  }

};
</script>

<style scoped lang="scss">
@import "@/styles/variables/fonts.scss";
@import "@/styles/variables/colors.scss";

  .ingredient-glossary{

    .glossary-header{
      background: linear-gradient(180deg,#473729 22.89%,rgba(71,55,41,0) 161.44%),#2d2d2d;
      height: 367px;
      color: #fff;
      padding: 4rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .img-btmright{
        position: absolute;
        bottom:0;
        right:0;
        height: 75%;

        @media(max-width: 670px){
          height:35%;
        }
      }

      .img-topright{
        position: absolute;
        top: 0;
        right: 0;
        height: 60%;
      }

      .img-topleft{
        position: absolute;
        top: 0;
        left: 0;
        height: 80%;
        @media(max-width: 670px){
          height:47%;
        }
      }

      .img-btmleft{
        position: absolute;
        bottom: 0;
        left: 0;
        height: 50%;
        @media(max-width: 670px){
          height:31%;
        }
      }
    }

    .carousel-container{
      width: 100%;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;

      @media(min-width: 576){
        max-width: 540px;
      }

      @media (min-width: 768px){
        max-width: 720px;
      }

      @media (min-width: 992px){
        max-width: 960px;
      }

      @media (min-width: 1336px){
        max-width: 1024px;
      }

      input{
        width: 100%;
        background: transparent;
        border-top: none;
        border-right: none;
        border-bottom: 1px solid gainsboro;
        border-left: none;
        border-image: initial;
        outline: none;
        padding: .6rem .75rem;
        padding-left: 40px !important;
        height: calc(1.3em + 1.2rem + 4px);
        margin: 20px 0;
      }


      .carousel-content{
        position: relative;
        overflow: auto;

        #scroll-indicator_right{
          position: absolute; 
          top: 0; 
          right: 10px; 
          margin: auto; 
          bottom: 0; 
          display: flex;
          align-items: center;
        }

        #scroll-indicator_left{
          position: absolute; 
          top: 0; 
          left: 10px; 
          margin: auto; 
          bottom: 0; 
          align-items: center;
          display: flex;
        }

        .noscrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .noscrollbar{
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */

          label{
            flex: 0 0 33.3333333333%;
            max-width: 33.3333333333%;
            position: relative;
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            display: inline-block;
            margin-bottom: .5rem;

            @media (min-width: 768px){
              flex: 0 0 16.6666666667%;
              max-width: 16.6666666667%;
            }

            img{
              height: 51px !important;
              margin: auto!important;
              @media (min-width: 660px){
                height: 110px !important;
              }
            }

            p{
              font-size: 12px;
              @media (min-width: 660px){
                font-size: 16px;
              }
            }
          }
          input{
            height:0;
          }
        }
      }
    }

    .title-container{
      display:flex;
      justify-content: center;
      align-items: center;

      &:after, &:before{
        background-color: #afafaf;
        content: "";
        display: inline-block;
        height: 1px;
        position: relative;
        vertical-align: middle;
        width: 25%;
      }

      h2{
        margin:0 5px;
      }
    }

    .glossary-grid{
      display:grid;
      max-width: 1300px;
      margin: auto;
      margin-bottom: 120px;
      min-height: 32vh;
      grid-template-columns: 1fr;
      
      justify-items: center;
      align-items: flex-start;

      @media(min-width:768px){
        grid-template-columns: 1fr 1fr;
      }

      @media(min-width:1336px){
        grid-template-columns: 1fr 1fr 1fr;
      }

      .ingredient-container{
        padding: 0 19px;
        margin: 25px 0;
        width:100%;
        height:100%;

        .ingredient-card{
          padding: 30px;
          height:100%;
          box-shadow: 0 .5rem 1rem rgba(26,17,12,.15)!important;
          display:flex;
          flex-direction: column;

          .card-preheader{
            border-bottom: 2px solid rgba(53,46,46,.125);

            .preheader-content{
              padding-bottom: 20px;

              .ingredient-badge-container{
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;

                .ingredient-badge{
                  border-radius: 24px;
                  color: rgb(255, 255, 255);
                  font-weight: 500;
                  margin-bottom: 10px;
                  font-size: 13px;
                  line-height: 0;
                  display: flex;
                  align-items: center;
                  padding: 0 5px;

                  img{
                    vertical-align: middle;
                    height: 13px;
                    margin: 4px;
                  }

                  .ingredient-source{
                    font-size: 13px !important;
                    margin: 0 5px 0;
                  }
                }

                .Plant{
                  background: #91a24f;
                }
                .Made{
                  background: #771214;
                }
                .Water{
                  background: #366db5;
                }
                .Vitamins{
                  background: grey;
                }
                .Animal{
                  background: #b36527;
                }

                .read-more-link{
                  color: $orange;
                  text-decoration: none;
                  font-size: 12px;
                  font-weight: 600;
                  display: flex;
                  align-items: center;

                  &:hover{
                    cursor: pointer;
                  }
                }

              }
              .ingredient-title{
                font-size: 18px;

                @media(min-width: 768px){
                  font-size: 20px !important;
                }
              }
              .ingredient-label{
                color: #a9a9a9!important;
                margin: 0;
                font-size:14px !important;
              }
            }
          }

          .ingredient-content{
            padding: 20px 0;
            display: flex;
            flex-direction: column;
            width: 100%;

            .ingredient-function{
              margin-bottom: 10px;
              font-family: "adrianna-bold", sans-serif;
              font-size: 14px;
            }
            .ingredient-benefits{
              color: $brown;
              margin:0;
            }
          }

          .foundInTitle{
              margin-bottom: 10px;
              font-family: "adrianna-bold", sans-serif;
              font-size: 14px;
              color:$brown;
          }
          .foundIn{
            color: $orange;
            font-size: 14px;
            margin-bottom:7px;
          }

        }
      }
    }

    .ingredient-disclaimer{
      margin: auto;
      max-width: 1300px;
      margin-bottom: 90px;
      
      
      .disclaimer-text{
        width: 100%;
        font-size: 12px;
        padding: 0 19px;
        color: #352E2E;
        font-family: "adrianna", sans-serif;
        font-style: italic;
        white-space: pre-wrap;

        @media(min-width: 426px){
          width: 80% !important;
          font-size: 14px !important;
        }

        @media(min-width: 1024px){
          width: 60% !important;
          font-size: 16px !important;
        }
      }
    }
  }
</style>
