<template>
  <div class="jumbotron-component">
    <div class="left-col">
      <div
        :class="`wistia_embed wistia_async_${videoId} seo=false videoFoam=true`"
        allowtransparency="true"
        style="height:100%;width:100%"
      />
    </div>
    <div class="right-col">
      <div
        v-if="preHeader"
        class="pre-header"
      >
        {{ preHeader }}
      </div>
      <div class="header">
        {{ header }}
      </div>
      <p
        v-if="bodyText"
        class="body-text"
      >
        {{ bodyText }}
      </p>
      <squatch-button
        :text="ctaButton.text"
        :path="ctaButton.path"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Jumbotron",
  props: {
    videoId: {
      type: String,
      required: true
    },
    header: {
      type: String,
      required: true
    },
    preHeader: {
      type: String,
      default: ""
    },
    bodyText: {
      type: String,
      default: ""
    },
    ctaButton: {
      type: Object,
      default: () => {
        return {
          text: "",
          path: ""
        };
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.jumbotron-component {
  display: flex;
  flex-flow: row wrap;
  background-color: $dark-brown;
  background-image: url("https://cdn.shopify.com/s/files/1/0275/7784/3817/t/386/assets/layout.theme-prod_coll.css?v=6982525603883695669");
  background-size: 200%;
  background-repeat: repeat;
  text-align: center;
  padding: 42px 0;
  
  .left-col, .right-col {
    width: 100%;
    padding: 0 15px;

    @include layout-md {
      width: unset;
      flex: 1;
    }

    .pre-header {
      margin-bottom: 15px;
      @include font-style-body($size: 16px, $color: $white, $lh: 16px);
    }

    .header {
      margin-bottom: 30px;
      @include font-style-heading($size: 28px, $color: $white, $lh: 28px);
    }

    .body-text {
      margin-bottom: 30px;
      @include font-style-body($size: 16px, $color: $white, $lh: 20px);
    }
  }

  .right-col {
    padding: 0 30px;
  }
}
</style>