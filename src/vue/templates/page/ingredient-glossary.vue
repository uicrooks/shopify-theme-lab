<template>
  <div class="ingredient-glossary-component">
    <div class="glossary-header">
      <div class="glossary-header-content">
        <h2 class="glossary-title">
          Ingredient Glossary
        </h2>
        <p class="header-sub">
          Changing the way men approach personal care by providing the finest
          ingredients nature has to offer.
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
      <div class="carousel-container-content">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="Search Ingredients..."
          @click="searchKeyword = ''"
        >
        <svg
          id="srch_icon"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
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

      <div class="vue-carousel">
        <carousel :per-page="2" :mouse-drag="true" :navigationEnabled="true" :perPageCustom="[[500,3],[768, 5]]" :paginationEnabled="false">
          <slide
            class="vue-carousel-slide"
            v-for="(category, index) of categories"
            :key="`category-${index}`"
          >
            <label
              class="item-label"
            >
              <input
                v-model="selected"
                type="radio"
                name="category"
                :value="category"
              >
              <div class="product-category-card">
                <img 
                  class="carousel-img" 
                  :src="category.imageSrc" 
                >
                <p class="carousel-item-name">
                  {{ category.label }}
                </p>
              </div>
            </label>
          </slide>
        </carousel>
      </div>
    </div>

    <!-- FILTER TITLE  -->
    <div 
      v-if="selected && !searchKeyword" 
      class="title-container"
    >
      <h2 class="selected-label">
        {{ selected.label }}
      </h2>
    </div>

    <!-- GLOSSARY GRID -->
    <div class="glossary-grid">
      <div
        v-for="ingredient in filteredIngredients"
        :key="ingredient.name"
        class="ingredient-container"
      >
        <div class="ingredient-card">
          <div class="card-preheader">
            <div class="preheader-content">
              <div class="ingredient-badge-container">
                <div 
                  class="ingredient-badge" 
                  :class="ingredient.source"
                >
                  <img 
                    class="icon_img" 
                    :src="ingredient.imageSrc" 
                  >
                  <p class="ingredient-source">
                    {{ ingredient.source }}
                  </p>
                </div>
                <a
                  v-if="ingredient.readMoreLink"
                  :href="ingredient.readMoreLink"
                  class="read-more-link"
                >
                  DIVE DEEPER
                </a>
              </div>
              <h3 class="ingredient-title">
                {{ ingredient.name }}
              </h3>
              <p 
                v-if="ingredient.nameOnLabel" 
                class="ingredient-label"
              >
                {{ ingredient.nameOnLabel }}
              </p>
              <p 
                v-else 
                class="ingredient-label blank"
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
                {{ ingredient.benefits }}
              </p>
            </div>
          </div>
          <p class="foundInTitle">
            Found in
          </p>
          <p class="foundIn">
            {{ ingredient.foundInTitles.join(", ") }}
          </p>
        </div>
      </div>
    </div>

    <div class="ingredient-disclaimer">
      <div class="disclaimer-text">
        Dr. Squatch uses natural ingredients in all of its products, but it's
        still possible to experience an adverse reaction to certain ingredients.
        Always check the ingredient list for each product before purchasing or
        using the product. You can also review this ingredient glossary to check
        for known allergens! We also recommend that you test any new product
        before regular usage. Apply the product to your wrist and wait 24 hours
        to see if you have a reaction; if any adverse reaction occurs,
        discontinue use and consult with a medical professional. Additionally,
        some soap bars contain exfoliants; exfoliants can be damaging to your
        skin if excessive force is used or if used too frequently, so Squatch
        says don't use on sensitive areas and don't over-exfoliate!
      </div>
    </div>
  </div>
</template>

<script>
import IngredientsList from "@/configs/page-ingredients";
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: "IngredientGlossary",
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      ingredients: IngredientsList,
      categories: [
        {
          label: "Bar Soap",
          value: "bar-soap",
          imageSrc:
            "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_soap.png?v=1616443457",
        },
        {
          label: "Hair Care",
          value: "haircare",
          imageSrc:
            "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_Haricare.png?v=1616443457",
        },
        {
          label: "Hand Soap",
          value: "liquid-soap",
          imageSrc:
            "https://cdn.shopify.com/s/files/1/0275/7784/3817/products/liquidSoap_2pack_large.png?v=1591741590",
        },
        {
          label: "Toothpaste",
          value: "toothpaste",
          imageSrc:
            "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_toothpaste.png?v=1616443457",
        },
        {
          label: "Deodorant",
          value: "deodorant",
          imageSrc:
            "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/NAV_Deo.png?v=1616443457",
        },
        {
          label: "Cologne & Beard Oil",
          value: "cologne",
          imageSrc:
            "https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Cologne_collections.png?v=1616615358",
        },
        {
          label: "Candle",
          value: "candle",
          imageSrc:
            "https://cdn.shopify.com/s/files/1/0275/7784/3817/products/Candle-BayRum_1.png?v=1616621024",
        },
        {
          label: "Hand Sanitizer",
          value: "sanitizer",
          imageSrc:
            "https://cdn.shopify.com/s/files/1/0275/7784/3817/products/mixed_sanitizer-2pack_7d2c96c5-6e15-45a4-86a1-3957bc975f9d.png?v=1594068473",
        },
      ],
      selected: {
        label: "",
        value: "",
        imageSrc: "",
      },
      searchKeyword: "",
    };
  },
  computed: {
    filteredIngredients() {
      if (this.searchKeyword === "") {
        return this.ingredients.filter((ingredient) => {
          return ingredient.foundInTags.includes(
            this.selected ? this.selected.value : "bar-soap"
          );
        });
      }
      return this.ingredients.filter((ingredeint) => {
        return ingredeint.name
          .toLowerCase()
          .includes(this.searchKeyword.toLowerCase());
      });
    },
  },
  methods: {
  },
  mounted() {
    console.log(this.ingredients)
    this.selected = this.categories[0];
    window.test = this;
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.ingredient-glossary-component {
  .glossary-header {
    background: linear-gradient(
        180deg,
        #473729 22.89%,
        rgba(71, 55, 41, 0) 161.44%
      ),
      #2d2d2d;
    height: 367px;
    color: $white;
    padding: 4rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    text-align: center;

    .glossary-header-content {
      max-width: 646px;
      padding: 0 19px;

      .glossary-title {
        @include font-style-heading($size: calc(1.10625rem + 2.69167vw), $color: white);

        @media(min-width: 1200px) {
          font-size: 3.125rem;
        }
      }

      .header-sub {
        @include font-style-body-bold($size: 16px, $color: white, $lh: 1.2);
        margin: auto;

        @media(min-width: 1200px) {
          font-size: 18px;
        }
      }
    }

    .img-btmright {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 75%;

      @media (max-width: 670px) {
        height: 35%;
      }
    }

    .img-topright {
      position: absolute;
      top: 0;
      right: 0;
      height: 60%;
    }

    .img-topleft {
      position: absolute;
      top: 0;
      left: 0;
      height: 80%;

      @media (max-width: 670px) {
        height: 47%;
      }
    }

    .img-btmleft {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 50%;

      @media (max-width: 670px) {
        height: 31%;
      }
    }
  }

  .vue-carousel {
    width: 80%;
    margin: 0 auto;

    @include layout-sm {
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

    .VueCarousel-slide {
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .item-label {
      height: 90px;
      position: relative;

      input[type="radio"] {
        position: absolute;
        opacity: 0;
      }

      .product-category-card {
        height: 100%;

        .carousel-img {
          height: 100%;
        }
      }
    }
  }


  .carousel-container {
    width: 100%;
    padding: 0 15px;
    margin: 0 auto;

    @include layout-sm {
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

    .carousel-container-content {
      position: relative;
    }

    .srch_icon {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      fill: #afafaf;
    }

    input {
      width: 100%;
      background: transparent;
      border-top: none;
      border-right: none;
      border-bottom: 1px solid gainsboro;
      border-left: none;
      border-image: initial;
      outline: none;
      padding: 0.6rem 0.75rem;
      padding-left: 40px !important;
      height: calc(1.3em + 1.2rem + 4px);
      margin: 20px 0;
    }

    .carousel-content {
      position: relative;
      overflow: auto;

      .arrow {
        opacity: 0.8;
        background: #3d332a;
        color: $white;
        padding: 6px 6px 5px;
        line-height: 1;
        z-index: 9;
        border-radius: 50%;
        cursor: pointer;
      }

      #scroll-indicator-right {
        position: absolute;
        top: 0;
        right: 10px;
        margin: auto;
        bottom: 0;
        display: flex;
        align-items: center;
      }

      #scroll-indicator-left {
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

      .noscrollbar {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        overflow-x: auto;
        padding: 0 10px 0 0;

        .item-label {
          position: relative;
          width: 100%;
          padding: 0 15px;
          display: inline-block;
          margin: 0 0 0.5rem 0;

          @include layout-md {
            flex: 0 0 16.6666666667%;
            max-width: 16.6666666667%;
          }

          .product-category-card {
            text-align: center;

            .carousel-img {
              height: 51px;
              margin: auto;

              @include layout-sm {
                height: 110px;
              }
            }

            .carousel-item-name {
              margin: 0.5rem 0 0 0;
            }
          }

          p {
            font-size: 12px;

            @include layout-sm {
              font-size: 16px;
            }
          }
        }
        input {
          height: 0;
        }
      }
    }
  }

  .title-container {
    display: flex;
    justify-content: center;
    align-items: center;

    &:after,
    &:before {
      background-color: #afafaf;
      content: "";
      display: inline-block;
      height: 1px;
      position: relative;
      vertical-align: middle;
      width: 25%;
    }

    .selected-label {
      margin: 0 5px;
    }
  }

  .glossary-grid {
    display: grid;
    max-width: 1300px;
    margin: auto;
    margin-bottom: 120px;
    min-height: 32vh;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: flex-start;

    @include layout-md {
      grid-template-columns: 1fr 1fr;
    }

    @include layout-xl {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .ingredient-container {
      padding: 0 19px;
      margin: 25px 0;
      width: 100%;
      height: 100%;

      .ingredient-card {
        padding: 30px;
        height: 100%;
        box-shadow: 0 0.5rem 1rem rgba(26, 17, 12, 0.15) !important;
        display: flex;
        flex-direction: column;

        .card-preheader {
          border-bottom: 2px solid rgba(53, 46, 46, 0.125);

          .preheader-content {
            padding-bottom: 20px;

            .ingredient-badge-container {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;

              .ingredient-badge {
                border-radius: 24px;
                color: white;
                font-weight: 500;
                margin: 0 0 10px 0;
                font-size: 13px;
                line-height: 0;
                display: flex;
                align-items: center;
                padding: 0 5px;

                img {
                  vertical-align: middle;
                  height: 13px;
                  margin: 4px;
                }

                .ingredient-source {
                  font-size: 13px !important;
                  margin: 0 5px 0;
                }
              }

              .Plant {
                background: #91a24f;
              }

              .Made {
                background: #771214;
              }

              .Water {
                background: #366db5;
              }

              .Vitamins {
                background: grey;
              }

              .Animal {
                background: #b36527;
              }

              .read-more-link {
                color: $orange;
                text-decoration: none;
                font-size: 12px;
                font-weight: 600;
                display: flex;
                align-items: center;

                &:hover {
                  cursor: pointer;
                }
              }
            }

            .ingredient-title {
              font-size: 18px;

              @include layout-sm {
                font-size: 20px;
              }
            }

            .ingredient-label {
              color: #a9a9a9;
              margin: 0;
              font-size: 14px;

              &.blank {
                visibility: hidden;
              }
            }
          }
        }

        .ingredient-content {
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          width: 100%;

          .ingredient-function {
            margin: 0 0 10px 0;
            @include font-style-body-bold($size: 14px);
          }

          .ingredient-benefits {
            color: $brown;
            margin: 0;
          }
        }

        .foundInTitle {
          margin: 0 0 10px 0;
          @include font-style-body-bold($size: 14px, $color: $brown);
        }

        .foundIn {
          color: $orange;
          font-size: 14px;
          margin: 0 0 7px 0;
        }
      }
    }
  }

  .ingredient-disclaimer {
    margin: auto;
    max-width: 1300px;
    margin-bottom: 90px;

    .disclaimer-text {
      width: 100%;
      padding: 0 19px;
      font-style: italic;
      white-space: pre-line;
      @include font-style-body($size: 12px);

      @media (min-width: 426px) {
        width: 80% !important;
        font-size: 14px !important;
      }

      @media (min-width: 1024px) {
        width: 60% !important;
        font-size: 16px !important;
      }
    }
  }
}
</style>
