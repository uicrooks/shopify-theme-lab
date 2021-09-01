<template>
  <div class="ui-squatch-difference-accordion-component">
    <div class="accordion" role="tablist">
      <b-card 
        no-body 
        class="accordion-row"
        v-for="(ingredient, index) in toxic"
        :key="index"
      >
        <b-card-header 
          header-tag="header" 
          class="ingredient-name" 
          role="tab"
        >
          <b-button 
            block 
            v-b-toggle="'accordion-' + index" 
            variant="info"
            class="accordion-ingredient-button"
          >
            {{ ingredient.name }}

            <img
              class="open-icon"
              src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-icon-down-arrow.svg?v=1619047489"
            >
            <img 
              class="close-icon"
              src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-icon-up-arrow.svg?v=1619047489" 
            >
          </b-button>
        </b-card-header>
        <b-collapse 
          :id="'accordion-' + index"
          accordion="my-accordion" 
          role="tabpanel"
          class="my-accordion"
        >
          <b-card-body class="accordion-card">
            <b-card-text class="accordion-content">
              <div 
                class="ingredient-details"     
              >
                <div class="heading-section">
                  <div class="detail-title">
                    {{ ingredient.name }}
                  </div>
                  <div class="detail-row">
                    <span class="key">
                      Function:
                    </span>
                    {{ ingredient.function }}
                  </div>
                  <div class="detail-row">
                    <span class="key">
                      Relevant Product Types:
                    </span>
                    {{ ingredient.productTypes }}
                  </div>
                </div>

                <div class="detail-multirow">
                  {{ ingredient.description }}
                </div>
              </div>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import toxicIngredients from "@/configs/JS-squatch-difference-toxic-ingredients";

  export default {
    name: "UiSquatchDifferenceAccordian",
    data() {
      return {
        toxic: toxicIngredients,
        actives: []
      };
    },
  };
</script>

<style scoped lang="scss">
@use "@/styles/main" as global;

  .ui-squatch-difference-accordion-component {

    .accordion-row {
      @include font-style-body($size: 14px, $color: global.$orange);
      border: 0;
      
      .ingredient-name {
        @include global.font-style-body($color: black);
        background-color: white;
        border-bottom: 1px solid #bca887;
        padding: 12px 4px 10px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        width: 100%;

        .accordion-ingredient-button {
          @include global.font-style-body-bold($color: black, $size: 14px);
          width: 100%;
          text-align: left;
          background-color: white;
          border: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .open-icon {
            display: block;
          }

          .close-icon {
            display: none;
          }

          &[aria-expanded="true"]{
            color: global.$orange;

            .open-icon {
              display: none;
            }

            .close-icon {
              display: block;
            }
          }

          &:hover {
            color: global.$orange;
          }

          &:focus {
            box-shadow: none;
            outline: none !important;
          }

          &.active {
            box-shadow: none;
            outline: none !important;
          }
        }  
      }

      .my-accordion {
        @include global.font-style-body($color: black);

        .accordion-card {
          padding: 0;

          .accordion-content {

            .ingredient-details {
              display: flex;
              justify-content: center;
              align-items: flex-start;
              flex-flow: column nowrap;
              position: relative;
              background-color: #faf6f1;
              padding: 20px 10px;
              @include global.font-style-body($size: 14px, $lh: 130%, $color: #5a3714);

              @include global.layout-md {
                justify-content: unset;
                flex-flow: row;
              }

              .heading-section {
                .detail-title {
                  @include global.font-style-body($size: 18px, $weight: 600, $color: #1a110c);
                  margin-bottom: 15px;
                }

                .detail-row {
                  padding: 0 0 4px 0;
                  @include global.font-style-body($size: 14px, $color: global.$brown);

                  .key {
                    margin-right: 5px;
                    @include global.font-style-body-bold($size: 14px, $weight: 600, $color: global.$brown);
                  }
                }

                @include global.layout-md {
                  width: 40%;
                }
              }

              .detail-multirow {
                padding-top: 10px;

                @include global.layout-md {
                  width: 50%;
                  padding: 20px 0 0 0;
                  margin:0 0 0 30px;
                }
              }
            }
          }
        }
      }


    }
  }
</style>