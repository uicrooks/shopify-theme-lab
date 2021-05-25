<template>
  <div>
    <div class="banner-display row-element outer-row">
      <div class="banner-content" :style="this.reversed ? 'padding-left:15px; order:2;' : 'padding-right:15px'" >
        <div style="display:flex; align-items:center;height:100%;" :style="this.reversed ? 'padding-left:2.5rem' : 'padding-right:2.5rem'" >
          <div class="brand-content">
            <div class="image-mobile">
              <img :src="this.imageSrc" v-if="this.imageSrc"/>
            </div>

            <p class="preheader">{{this.preheader}}</p>
            <h1 class="header">{{this.header}}</h1>
            <p class="subheader" v-if="this.subheader">{{this.subheader}}</p>

            <div class="cta-wrapper" v-if="this.path">
              <squatch-button
                class="big-cta-button"
                :text="this.cta"
                :path="this.path"
                v-if="this.cta"/>
              <a class="link" :href="this.path" v-else>
                Learn More
              </a>
            </div> 
          </div>
        </div>
      </div>

      <div class="banner-content banner-desktop" :class="this.reversed ? 'desktop-image reversed' : 'desktop-image'">
        <img class="desktop-image" :src="this.imageSrc" v-if="this.imageSrc"/>
        <!-- <div class="wistia_embed wistia_async_{{ videoId }} seo=false videoFoam=true" allowtransparency="true" style="height:100%;width:100%"  v-if="this.video">
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import SquatchButton from "@vue/ui-elements/squatch-button";

export default {
  components: {
    SquatchButton,
  },
  props: {
    preheader: {
      type: String, 
      required: false,
    },
    header: {
      type: String,
      required: true,
    },
    subheader: {
      type: String,
      required: false,
    },
    imageSrc:{
      type: String,
      required: false,
    },
    video:{
      type: String, 
      required: false
    },
    path:{
      type: String,
      required: false,
    },
    cta:{
      type: String,
      required: false,
    },
    reversed: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
    navigateTo() {
      console.log("navigateTo");
      if (this.path) {
        window.location = this.path;
      }
    }
  },
  mounted(){
    console.log(this.reversed)
  }
}
</script>

<style scoped lang="scss">

.image-mobile{
  @media(min-width:768px){
    display: none;
  }
}

.big-cta-button{
  width: 256px;
}

.preheader{
  margin-bottom: 15px;
  font-size: 16px;
  color: #1a110c;
}
.subheader{
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 20px;
}

.banner-desktop{
  @media(max-width:767px){
    display: none;
  }
}
.banner-display{
    max-width:1440px;
    width:100%;
    margin:auto;
}
.outer-row{
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    margin-bottom: 30px;

    @media(max-width:768px){
      flex-direction: column;
    }

    .brand-content{
      padding: 0 15px;
      width: 100%;
    }

    .banner-content{
        flex: 0 0 100%;
        max-width: 100%;
      @media(min-width:768px){
        flex: 0 0 50%;
        max-width: 50%;
      }

      .desktop-image{
        width: 100%;
        padding: 60px 0 60px 15px;
      }
    }
}

</style>