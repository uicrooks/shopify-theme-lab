<template>
  <div
    class="cart-icon"
    @click="toggleCart"
  >
    <b-icon
      aria-controls="cart"
      :aria-expanded="isOpen"
      icon="cart2"
    />
    <div class="item-total">
      <span>{{ numberOfItems == null ? "" : numberOfItems }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "CartButton",
    computed: {
        isOpen: {
            get() {
                return this.$store.state.cart.isOpen;
            },
            set(val) {
                this.$store.commit("cart/setIsOpen", val);
            },
        },
        ...mapGetters("cart", ["numberOfItems"]),
    },
    methods: {
        toggleCart() {
            console.log("here");
            this.$store.commit("cart/toggleIsOpen");
        },
    }
};
</script>

<style lang="scss" scoped>
@use "@/styles/main" as global;
.cart-icon {
    position:relative;
    cursor: pointer;
    .b-icon.bi {
        font-size: 30px;
        cursor: pointer;
        @include global.layout-md {
            font-size: 21px;
        }
    }
    .item-total {
        background: global.$orange;
            width: 22px;
    height: 22px;
    display: flex;
    position: absolute;
    right: -15px;
    top: -8px;
    color: #fff;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    padding: 2px;
    @include global.layout-md {
        font-size: 14px;
    }
    }
}
</style>