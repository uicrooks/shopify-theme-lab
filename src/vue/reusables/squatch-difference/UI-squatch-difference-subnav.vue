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
@import "@/styles/main.scss";

.ui-squatch-difference-subnav-component {
  .ui-squatch-difference-subnav {
    padding: 12px 0 20px 0;
    background-color: $off-white;

    @media (min-width: $md) {
      padding: 10px 0 14px 0;
    }

    .header {
      color: $dark-brown;
      font-weight: 700;
      font-family: $font-body;
      font-size: 16px;
      line-height: 18px;
      text-align: center;
      margin: 10px 0 16px 0;

      @media (min-width: $md) {
        font-size: 18px;
      }    
    }

    .subnav-tabs {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      
      @media (min-width: $lg) {
        max-width: 900px;
        margin: auto;
      }

      .subnav-tab {
        width: 74px;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        
        @media (min-width: $lg) {
          width: 82px;
          max-width: 240px;
        }

        &.active {

          .icon {
            background-color: $orange;
          }

          .subnav-text {
            color: $orange;
          }
        }

        &:hover {

          .icon {
            background-color: $orange;
          }

          .subnav-text {
            color: $orange;
          }
        }

        .icon {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-bottom: 8px;
          background-color: $dark-brown;

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
          font-family: $font-body;
          font-weight: 600;
          font-size: 12px;
          line-height: 110%;
          color: $dark-brown;

          @media (min-width: $md) {
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
