<template>
    <div class="ingredient-glossary">
      <div class="glossary-header">
        <div class="col-12 col-xl-6 m-auto text-center" style="max-width:646px;padding:0 19px;">
          <h2 class="text-white">Ingredient Glossary</h2>
          <p class="header-sub" style="margin: auto; line-height: 1.2;">Changing the way men approach personal care by providing the finest ingredients nature has to offer.</p>
        </div>
        <img class="img-btmright" src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/bottomright_desktop.png?v=1594333445"/>
        <img class="img-topright" src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/topright_desktop.png?v=1594333444"/>
        <img class="img-btmleft" src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/bottomleft_desktop.png?v=1594361564"/>
        <img class="img-topleft" src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/topleft_desktop.png?v=1594333445"/>
      </div>


      <input type="text" v-model="filter"  placeholder="Search Ingredients..."/>
      <div class="glossary-grid">
        <div class="ingredient-container" v-for="ingredient in filtered_ingredients" :key="ingredient.ingredient">
          <div class="ingredient-card">
            <div class="card-preheader">
              <div class="preheader-content">
                <div class="ingredient-badge">
                  {{ingredient.ingredientSource}}
                  <a class="read-more-link" :href="ingredient.read_more_link" v-if="ingredient.read_more_link">DIVE DEEPER</a>
                </div>
                <h3>{{ingredient.ingredient}}</h3>
                <p v-if="ingredient.onLabel">{{ingredient.onLabel}}</p>
                <p style="visibility:hidden;" v-else>blank</p>
              </div>
            </div>
            <div class="ingredient-content">
              <div>
                <p class="ingredient-function">{{ingredient.function}}</p>
              </div>
              <div class="ingredient-benefits">
                <p>{{ingredient.additionalBenefits}}</p>
              </div>
            </div>  
            <p class="foundInTitle">Found in</p>
            <p class="foundIn">{{ingredient.foundIn_titles.join(", ")}}</p>
          </div>
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
      filter:'',
      filter_title:'bar soap',
    }
  },
  mounted(){
    this.all_ingredients = JSON.parse(document.getElementById('glossary-data').innerHTML);
    this.filtered_ingredients = this.all_ingredients.filter(element => element.foundIn_tags.includes("bar-soap"))
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
    }
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

    .glossary-grid{
      display:grid;
      max-width: 1300px;
      margin: auto;
      margin-bottom: 120px;
      min-height: 32vh;
      grid-template-columns: 1fr 1fr 1fr;
      justify-items: center;
      align-items: center;

      @media(max-width:767px){
        grid-template-columns: 1fr;
      }

      .ingredient-container{
        padding: 0 19px;
        margin: 25px 0;
        width:100%;

        .ingredient-card{
          padding: 30px;
          box-shadow: 0 .5rem 1rem rgba(26,17,12,.15)!important;
          display:flex;
          flex-direction: column;

          .card-preheader{
            border-bottom: 2px solid rgba(53,46,46,.125);

            .preheader-content{
              padding-bottom: 20px;

              .ingredient-badge{
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;

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
            }
          }

          .ingredient-content{
            padding: 20px 0;
            display: flex;
            flex-direction: column;
            width: 100%;

            .ingredient-function{
              margin-bottom: 10px;
              font-family: "adrianna-bold";
              font-size: 14px;
            }
            .ingredient-benefits{
              color: $brown;
              margin:0;
            }
          }

          .foundInTitle{
              margin-bottom: 10px;
              font-family: "adrianna-bold";
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
  }
</style>
