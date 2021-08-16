<template>
  <div class="index-social-proof-component woodgrain-bg">
    <div class="container">
      <div class="container-content">
        <div class="header">
          AS SEEN IN
        </div>
        <div class="icon-container">
          <div class="icon">
            <div class="seen-brand-logo">
              <img 
                class="seen-icon" 
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/men-s-health-svg.svg?v=1590787809"
              >
            </div>
          </div>
          <div class="icon">
            <div class="seen-brand-logo">
              <img 
                class="seen-icon" 
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/birchbox-logo-vector-svg.svg?v=1590787810"
              >
            </div>
          </div>
          <div class="icon">
            <div class="seen-brand-logo">
              <img 
                class="seen-icon" 
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/mensjournal-svg.svg?v=1590787809"
              >
            </div>
          </div>
          <div class="icon">
            <div class="seen-brand-logo">
              <img 
                class="seen-icon" 
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/gq-tan.svg?v=1616537875"
              >
            </div>
          </div>
          <div class="icon">
            <div class="seen-brand-logo">
              <img 
                class="seen-icon" 
                src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/BroBible.svg?v=1612974708"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexSocialProof"
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.index-social-proof-component {
  background-color: $tan;
  padding: 1rem 0 .5rem 0;


  .container {
    .container-content {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column nowrap;

      .header {
        padding: 0 15px .5rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        @include font-style-body;
      }

      .icon-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: row wrap;


        @media(min-width: $md) {
          margin: 0;
          flex-flow: row nowrap;
        }

        .icon {
          display: flex;
          max-height: 50px;
          justify-content: center;
          align-items: center;
          margin: .5rem 0;
          padding: 0 15px;
          flex: 0 0 33%;
          max-width: 33%;

          @media(min-width: $md) {
            flex: 33%;
          }

          .seen-brand-logo {

            .seen-icon {
              max-height: 33px;
              width: 100%;
            }
          }
        }

      }
    }
    
  }
}

</style>
