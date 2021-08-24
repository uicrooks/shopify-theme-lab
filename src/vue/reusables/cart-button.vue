<template>
    <div class="cart-icon" @click="toggleCart">
        <i aria-controls="cart" :aria-expanded="isOpen" class="icon-squatch icon-cart" />
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
            console.log("here")
            this.$store.commit("cart/toggleIsOpen");
        },
    }
};
</script>

<style lang="scss" scoped>
@use "@/styles/main" as global;
.new-look-banner-component {
    background-color: #fbf6f0;
    padding: 8px 0;
    text-align: center;
    .new-packaging {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: center;
        img {
            height: 34px;
        }
        h6 {
            margin: 0 0 0 14px;
            @include global.font-style-heading($size: 14px);
        }
        p {
            display: none;
            margin: 0 0 0 7px;
            @include global.font-style-body();
            @include global.layout-md {
                display: inline-block;
            }
        }
    }
    .old-packaging {
        @include global.layout-md {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
        }
        h6 {
            margin: 0;
            padding: 8px 0 4px 0;
            @include global.font-style-heading($size: 14px);
        }
        p {
            margin: 0;
            min-width: 475px;
            @include global.font-style-body();
            @include global.layout-md {
                margin: 4px 0 0 8px;
            }
        }
    }
}
</style>