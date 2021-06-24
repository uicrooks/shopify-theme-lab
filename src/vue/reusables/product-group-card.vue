<template>
  <div class="product-group-card-component">
    <div class="image-box">
      <div
        v-if="isFreeShipping"
        class="free-shipping"
      >
        Free Shipping!
      </div>
      <img
        :src="product.featured_image"
        :alt="`${product.title} image`"
      >
      <div
        v-if="discountAmount"
        class="discount"
      >
        <span class="discount-amount">
          {{ discountAmount | money("$", 0) }}
          <br>
          Off!
        </span>
        <div class="discount-bubble" />
      </div>
    </div>
    <div
      v-if="includedList"
      :class="{'hidden': !showIncludedBox}"
      class="included-box"
    >
      <h3>What's Inside</h3>
      <div class="included-list">
        <div
          v-for="(category, index) of Object.keys(includedList)"
          :key="`included-list-category-${index}`"
          class="category"
        > 
          <div class="category-name">
            {{ category }}
          </div>
          <div class="category-values">
            {{ includedList[category].join(", ") }}
          </div>
        </div>
      </div>
    </div>
    <div class="details-box">
      <div class="product-title">
        {{ product.title }}
      </div>
      <div class="product-pricing">
        {{ product.price | money("$", 0) }}
        <span
          v-if="product.compare_at_price"
          class="compare-at-pricing"
        >
          {{ product.compare_at_price | money("$", 0) }}
        </span>
      </div>
      <p class="product-description">
        {{ product.description }}
      </p>
      <div
        class="see-included-link"
        @click="toggleIncludedBox"
      >
        <b-icon
          icon="search"
        />
        See what's included
      </div>
      <div class="add-button">
        <squatch-button
          @clicked="addToCart"
        >
          {{ added ? 'Add More' : '+ Add To Cart' }}
        </squatch-button>
      </div>
    </div>
  </div>
</template>

<script>
import CartService from "@/vue/services/cart.service";
import IncludedList from "@/configs/product-group-card-included-list";

export default {
  name: "ProductGroupCard",
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      added: false,
      showIncludedBox: false,
      includedList: IncludedList[this.product.handle]
    };
  },
  computed: {
    isFreeShipping() {
      return this.product.price >= 3900;
    },
    // TODO: add new label
    isNew() {
      return this.product.tags.includes("new");
    },
    discountAmount() {
      return this.product.compare_at_price - this.product.price;
    },
  },
  methods: {
    async addToCart() {
      const added = await CartService.addItem(this.product);
      if (added) {
        this.added = true;
        const cart = await CartService.initCart();
        if (cart) {
          this.$store.commit("cart/setCart", cart);
          this.$store.commit("cart/toggleIsOpen");
        } else {
          // error handling
        }
      }
    },
    toggleIncludedBox() {
      this.showIncludedBox = !this.showIncludedBox;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";

.product-group-card-component {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  // margin-bottom: 25px;

  // @include layout-lg {
  //   margin-bottom: 35px;
  // }

  &:hover {
    box-shadow: 0 4px 15px 5px rgba(0, 0, 0, .1);
  }

  .image-box {
    width: 100%;
    background-image: url(https://cdn.shopify.com/s/files/1/0275/7784/3817/files/woodgrain-default.svg?v=1615322353);
    background-size: 200%;
    background-repeat: repeat;
    background-color: $sand;
    padding: 25px;
    text-align: center;
    position: relative;

    .free-shipping {
      position: absolute;
      top: 15px;
      left: 0;
      padding: 6px 13px;
      background-color: $orange;
      @include font-style-body($color: $white, $weight: 700);
    }

    img {
      width: 100%;
      height: 295px;
      object-fit: contain;
    }

    .discount {
      position: absolute;
      top: 10px;
      right: 30px;
      width: 60px;
      height: 60px;
      padding: 12px 0;
      border-radius: 50%;
      background-color: $maroon;
      text-align: center;
      @include font-style-heading($size: 14px, $weight: 400, $color: $white);

      .discount-bubble {
        position: absolute;
        top: 0;
        width: 84px;
        height: 120px;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='84' height='105' fill='none' xmlns='http://www.w3.org/2000/svg' class='bubble-tag'%3E%3Cpath d='M26.793 105h1.683c7.294 0 14.027-5.642 14.588-13.542 1.122-8.464-5.05-15.799-13.466-16.363h-1.683c-7.294 0-14.027 5.642-14.588 13.542-.562 7.9 5.61 15.235 13.466 16.363zm-.561-7.335c.56 0 1.122.564 1.683.564h1.122c3.928 0 6.733-2.257 7.855-6.207h1.683c-1.122 4.514-5.05 7.9-9.538 7.9h-1.122c-.561 0-1.122 0-1.683-.564v-1.693zM62.96 35.221h-.558C60.73 47.157 52.36 56.82 41.202 60.798c1.674 9.662 9.484 17.051 19.527 17.62 2.231 0 3.905 0 6.136-.569 8.927-2.273 15.622-10.23 16.18-19.893.557-11.936-8.369-22.166-20.085-22.735zm2.232 38.081c-.558 0-.558 0 0 0-1.674.569-3.348.569-5.021.569-1.116 0-1.674 0-2.79-.569v-1.705c1.116 0 1.674.568 2.79.568 1.673 0 3.347 0 4.463-.568 6.137-1.705 11.158-6.82 12.274-13.072h1.673c-1.115 7.388-6.695 13.072-13.39 14.777z' fill='%23911A1D'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
  }

  .included-box {
    position: absolute;
    top: 0;
    width: 100%;
    height: 345px;
    padding: 25px;
    background-color: #203620;
    text-align: center;
    opacity: 1;
    transition: opacity 0.8s;

    &.hidden {
      opacity: 0;
    }

    img {
      width: 100%;
      height: 295px;
      object-fit: contain;
    }

    h3 {
      margin: 8px 0 24px;
      @include font-style-heading($size: 25px, $color: $white, $weight: 400);
    }

    .included-list {
      height: 88%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
    }

    .category {
      margin-bottom: 20px;

      .category-name {
        margin-bottom: 13px;
        @include font-style-body($size: 18px, $color: $white, $weight: 700);
      }

      .category-values {
        @include font-style-body($size: 14px, $color: #bc9887, $lh: 21px);
      }
    }
}

  .details-box {
    padding: 16px 16px 25px 16px;
    background-color: $white;

    .product-title {
      min-height: 42px;
      @include font-style-heading($size: 20px);
    }

    .product-description {
      min-height: 32px;
      @include font-style-heading($size: 16px, $color: $brown);
    }

    .product-pricing {
      margin-bottom: 20px;
      @include font-style-heading($size: 16px, $color: $green, $weight: 700);

      .compare-at-pricing {
        text-decoration: line-through;
        @include font-style-heading($size: 14px, $color: $gray, $weight: 700);
      }
    }

    .see-included-link {
      margin-bottom: 15px;
      cursor: pointer;
      @include font-style-heading($size: 12px, $color: $brown);
    }
  }
}
</style>