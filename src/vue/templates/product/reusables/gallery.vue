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
          :class="{'active' : index == currentImageIndex}"
          @click="selectImageIndex(index)"
        >
      </li>
    </div>
    <b-carousel
      v-model="currentImageIndex"
      class="product-gallery"
      indicators
      controls
    >
      <b-carousel-slide
        v-for="(image, index) of product.images"
        :key="`product-image-${index}`"
        img-height="400"
        img-width="400"
        :img-src="image"
      />
    </b-carousel>
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
    },
    mounted() {
        console.log("ProductGaller", this);
    }
};
</script>

<style lang="scss">
@use "@/styles/main" as global;
.product-gallery-component {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background-image: url("https://cdn.shopify.com/s/files/1/0275/7784/3817/files/woodgrain-default.svg?v=1615322353");
    background-size: 200%;
    background-repeat: repeat;
    background-color: global.$sand;
    border-radius: 5px;
    overflow: hidden;
    @include global.layout-md {
        padding: 20px 20px 20px 40px;
    }
    @include global.layout-md {
        .carousel-control-next,
        .carousel-control-prev {
            display: none
        }
    }
    .product-carousel {
        max-width: 400px;
    }
    .carousel-item {
        img {
            padding: 40px;
            @include global.layout-md {
                padding: 80px;
            }
        }
    }
    .image-list {
        position: absolute;
        bottom: 0;
        width: 100%;
        z-index: 4;
        height: 35px;
        display: none;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        @include global.layout-md {
            left: 0;
            bottom: unset;
            display: flex;
            width: 70px;
            height: 100%;
            flex-flow: column nowrap;
        }
        li {
            list-style: none;
            border-radius: 50%;
            background-color: global.$white;
            width: 10px;
            height: 10px;
            margin: 6px;
            &.active {
                background-color: global.$tan;
                @include global.layout-md {
                    background-color: global.$white;
                }
            }
            @include global.layout-md {
                width: 50px;
                height: 50px;
                padding: 10px;
            }
            img {
                display: none;
                @include global.layout-md {
                    display: inline-block;
                    width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    opacity: .5;
                    cursor: pointer;
                    &.active,
                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }
    }
}
</style>