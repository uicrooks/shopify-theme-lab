<template>
  <div class="ui-squatch-difference-accordion-component">
    <div 
      v-for="(item, index) in toxic" 
      :key="index"
      class="accordion-ingredient"
    >
      <div 
        class="ingredient-title"
        @click="toggle(index)" 
      >
        <span>
          {{ item.name }}
        </span>
      </div>
      <div 
        class="ingredient-details"
        v-bind:class="{ active : `${actives[index]}` }"      
      >
      {{ actives[index] }}
        <div class="heading-section">
          <div class="detail-title">
            {{ item.name }}
          </div>
          <div class="detail-row">
            <span class="key">
              Function:
            </span>
            {{ item.function }}
          </div>
          <div class="detail-row">
            <span class="key">
              Relevant Product Types:
            </span>
            {{ item.productTypes }}
          </div>
          <div class="detail-multirow">
            {{ item.description }}
          </div>
        </div>
      </div>
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
        actives: [true]
      };
    },
    methods: {
      toggle: function (index) {
        this.actives[index] = !this.actives[index];
        console.log(this.actives)
      }
    },
    mounted() {
      console.log(this.toxic)
      for(let x; x < this.toxic.length-1; x++) {
        this.actives.push(false);
      }
      console.log(this.actives);
    },
  };
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

  .ui-squatch-difference-accordion-component {
    .accordion-ingredient {
      @include font-style-body;

      &.active {

        .ingredient-title {
          color: $orange;

          .open-icon {
            display: none;
          }

          .close-icon {
            display: inline-block;
          }
        }

        .ingredient-details {
          display: block;
        }
      }

      .ingredient-title {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        padding: 12px 4px 10px;
        font-size: 14px;
        font-weight: 700;
        line-height: 130%;
        border-bottom: 1px solid #BCA887;
        color: $dark-brown;
        cursor: pointer;

        .close-icon {
          display: none;
        }
      }

      .ingredient-details {
        position: relative;
        background-color: #FAF6F1;
        font-size: 14px;
        line-height: 130%;
        padding: 20px 10px;
        color: $brown;
        display: none;

        & .active {
          display: block;
        }

        .heading-section {

          @media (min-width: $md) {
            display: inline-block;
            width: 40%;
          }

          .detail-title {
            font-size: 18px;
            font-weight: 600;
            color: $dark-brown;
            margin-bottom: 15px;
          }
    
          .detail-row {
            padding-bottom: 4px;
    
            .key {
              font-weight: 600;
              margin-right: 5px;
            }
          }
        }

        .detail-multirow {
          padding-top: 10px;

          @media (min-width: $md) {
            display: inline-block;
            width: 50%;
            padding-top: 20px;
            margin-left: 30px;
            position: absolute;
            top: 14px;
          }
        }
      }
    }
  }
</style>