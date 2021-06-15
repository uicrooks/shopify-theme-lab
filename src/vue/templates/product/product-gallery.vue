<template>
  <div 
    v-if="product.images"
    class="product-gallery-component"
  >
    <div class="image-list">
      <li
        v-for="(image, index) of product.images"
        :key="`product-image-${index}`"
        :class="{'active': currentImageIndex === index}"
      >
        <img 
          :src="image"
          @click="selectImageIndex(index)" 
        >
      </li>
    </div>
    <div class="direction-wrapper">
      <b-icon
        icon="chevron-left"
        scale="1.5"
        class="direction-icon prev"
        @click="previous"
      />
    </div>
    <transition
      :name="back ? 'slideback': 'slide'"
      class="image-slider"
    >
      <img
        :src="product.images[currentImageIndex]"
        :alt="`${product.title} image`"
        :key="currentImageIndex"
        class="image"
      >
      <!-- <div
        v-for="i in [currentImageIndex]"
        :key="i"
      >
        <img
          :src="product.images[currentImageIndex]"
          :alt="`${product.title} image`"
        >
      </div> -->
    </transition>
    <div class="direction-wrapper">
      <b-icon
        icon="chevron-right"
        scale="1.5"
        class="direction-icon next"
        @click="next"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductGallery",
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      back: false,
      currentImageIndex: 0
    };
  },
  methods: {
    previous() {
      this.back = true;
      if (this.currentImageIndex === 0) {
        this.currentImageIndex = this.product.images.length - 1;
      } else {
        this.currentImageIndex--;
      }
    },
    next() {
      this.back = false;
      if (this.currentImageIndex === this.product.images.length - 1) {
        this.currentImageIndex = 0;
      } else {
        this.currentImageIndex++;
      }
    },
    selectImageIndex(index) {
      this.currentImageIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

.product-gallery-component {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-image: url("https://cdn.shopify.com/s/files/1/0275/7784/3817/files/woodgrain-default.svg?v=1615322353");
  background-size: 200%;
  background-repeat: repeat;
  background-color: $sand;
  border-radius: 5px;
  overflow: hidden;

  @include layout-md {
    padding: 20px 20px 20px 40px;
  }

  .image {
    width: 100%;
    padding: 40px;
    max-width: 600px;
    max-height: 600px;
    margin: auto;
  }

  .direction-wrapper {
    
    .direction-icon {
      position: absolute;
      top: 50%;
      color: $white;
      opacity: 0.8;
      cursor: pointer;

      @include layout-md {
        display: none;
      }

      &.prev {
        left: 8px;
      }

      &.next {
        right: 8px;
      }
    }
  }

  .image-list {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 35px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    @include layout-md {
      left: 0;
      bottom: unset;
      width: 70px;
      height: 100%;
      flex-flow: column nowrap;
    }

    li {
      list-style: none;
      border-radius: 50%;
      background-color: $white;
      width: 10px;
      height: 10px;
      margin: 6px;

      &.active {
        background-color: $tan;

        @include layout-md {
          background-color: $white;
        }
      }

      @include layout-md {
        width: 50px;
        height: 50px;
        padding: 10px;
      }

      img {
        display: none;

        @include layout-md {
          display: inline-block;
          width: 100%;
          object-fit: contain;
          opacity: .5;

          &.active, &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.slide-leave-active, .slideback-leave-active {
  transition: 0;
}
.slide-enter-active, .slideback-enter-active {
  transition: .5s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
.slideback-enter {
  transform: translate(-100%, 0);
}
.slideback-leave-to {
  transform: translate(100%, 0);
}
</style>