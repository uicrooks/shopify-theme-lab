<template>
  <div class="ui-squatch-difference-subnav-component">
    <div class="ui-squatch-difference-subnav">
      <div class="header">
        Learn more about the Squatch Difference
      </div>
      <div class="subnav-tabs">
        <div 
          :class="tab == 'landing' ? 'active subnav-tab' : 'subnav-tab'"
        >
          <div class="icon">
            <a href="/pages/the-squatch-difference">
              <img 
                class="landing" 
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-icon-landing.svg?v=1619189246"
              >
            </a>
          </div>
          <div class="subnav-text">
            <a href="/pages/the-squatch-difference">
              Our Story
            </a>
          </div>
        </div>
        <div 
          :class="tab == 'natural' ? 'active subnav-tab' : 'subnav-tab'"
        >
          <div class="icon">
            <a href="/pages/the-squatch-difference-natural-ingredients">
              <img 
                class="natural" 
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-icon-natural.svg?v=1619189246"
              >
            </a>
          </div>
          <div class="subnav-text">
            <a href="/pages/the-squatch-difference-natural-ingredients">
              Natural Products
            </a>
          </div>
        </div>
        <div 
          :class="tab == 'nontoxic' ? 'active subnav-tab' : 'subnav-tab'"
        >
          <div class="icon">
            <a href="/pages/the-squatch-difference-no-toxic-ingredients">
              <img 
                class="nontoxic" 
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-icon-non-toxic.svg?v=1619189246" 
              >
            </a>
          </div>
          <div class="subnav-text">
            <a href="/pages/the-squatch-difference-no-toxic-ingredients">
              No Harmful Ingredients
            </a>
          </div>
        </div>
        <div 
          :class="tab == 'men' ? 'active subnav-tab' : 'subnav-tab'"
        >
          <div class="icon">
            <a href="/pages/the-squatch-difference-for-men">
              <img 
                class="men" 
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/assets-squatch-difference-icon-male.svg?v=1619189246" 
              >
            </a>
          </div>
          <div class="subnav-text">
            <a href="/pages/the-squatch-difference-for-men">
              Formulated for Men
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "SquatchDifferenceSubnav",
    props: {
      tab: {
        type: String,
        required: true
      }
    }
  };
</script>

<style scoped lang="scss">
@use "@/styles/main" as global;

.ui-squatch-difference-subnav-component {
  .ui-squatch-difference-subnav {
    padding: 12px 0 20px 0;
    background-color: global.$off-white;

    @media (min-width: global.$md) {
      padding: 10px 0 14px 0;
    }

    .header {
      @include global.font-style-body($size: 16px, $weight: 700, $color: global.$dark-brown);
      line-height: 18px;
      text-align: center;
      margin: 10px 0 16px 0;

      @media (min-width: global.$md) {
        font-size: 18px;
      }    
    }

    .subnav-tabs {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      
      @media (min-width: global.$lg) {
        max-width: 900px;
        margin: auto;
      }

      .subnav-tab {
        width: 74px;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        
        @media (min-width: global.$lg) {
          width: 82px;
          max-width: 240px;
        }

        &.active {

          .icon {
            background-color: global.$orange;
          }

          .subnav-text {
            color: global.$orange;
          }
        }

        &:hover {

          .icon {
            background-color: global.$orange;
          }

          .subnav-text {
            color: global.$orange;
          }
        }

        .icon {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-bottom: 8px;
          background-color: global.$dark-brown;

          img {
            position: absolute;
            
            &.landing {
              top: 6px;
              left: 7px;
            }

            &.natural {
              top: 6px;
              left: 10px;
            }

            &.nontoxic {
              top: 6px;
              left: 11px;
            }

            &.men {
              top: 1px;
              left: -1px;
            }
          }
        }

        .subnav-text {
          text-align: center;
          @include global.font-style-body($weight: 600, $size: 12px, $color: global.$dark-brown);
          line-height: 110%;

          @media (min-width: global.$md) {
            font-size: 14px;
          }

          a, a:hover, a:visited {
            text-decoration: none;
            color: inherit;
          }
        }
      }
    }
  }
}

</style>
