<template>
  <section class="starter-bundles-component">
    <b-container class="starter-bundles-section">
      <b-row>
        <b-col
          v-for="(product) in cards"
          lg="3"
          md="6"
          cols="12"
        >
          <div
            class="customizable-product-group-card-component"
            :class="{'selected' : selectedLevel == product.title }"
            @click="setSelectedLevel(product.title)"
          >
            <div class="image-box">
              <div class="banners">
                <span class="discount">
                  {{ product.savings | money("$", 0) }} Off!
                </span>
                <span
                  v-if="product.price>4000"
                  class="free-shipping"
                >
                  Free Shipping!
                </span>
              </div>
              <img
                :src="product.image"
                :alt="`${product.title} image`"
              >
            </div>
            <div class="details-box">
              <div class="product-preheader">
                <span class="discount">
                  {{ product.savings | money("$", 0) }} Off!
                </span>
                <span
                  v-if="product.price>4000"
                  class="free-shipping"
                >
                  Free Shipping!
                </span>
              </div>
              <div class="product-header">
                <div class="card-title-group">
                  <h4>{{ product.title.split(" ")[0] }}</h4>
                  <div class="product-pricing">
                    {{ product.price | money("$", 0) }}
                    <span
                      v-if="product.compare_at_price"
                      class="compare-at-pricing"
                    >
                      {{ product.compare_at_price | money("$", 0) }}
                    </span>
                  </div>
                </div>
              </div>
              <p class="product-description">
                {{ product.description }}
              </p>
              <label
                class="sq-checkbox"
                @click.prevent="toggleBundleSubSelected(product.title)"
              >
                <input
                  id="checkbox_smooth"
                  type="checkbox"
                  name="radios"
                  :checked="checkIfSubSelected(product.title)"
                >
                <span class="outer"><span
                  class="inner"
                  :class="{ 'squatch-icon icon_checkmark' : checkIfSubSelected(product.title) }"
                /></span>
                <div class="sq-checkbox__content">
                  <h6>Subscribe &amp; Save {{product.price - product.subscriptionPrice | money("$", 0) }}</h6>
                  <p>Shipped every 3 months</p>
                </div>
              </label>
              <squatch-button
                v-show="selectedLevel == product.title"
                @clicked="setDrawerOpened(true)"
              >
                Select Scents
              </squatch-button>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <sidebar-content />
  </section>
</template>

<script>
import store from "./store.js";
import { mapMutations, mapGetters } from "vuex";
import SquatchButton from "@/vue/reusables/squatch-button.vue";
import SidebarContent from "./sidebar-content.vue";
import { money } from "@/vue/filters/money";

export default {
    name: "StarterBundlesSection",
    filters: {
        money
    },
    components: {
        SquatchButton,
        SidebarContent
    },
    props: {
        products: { required: true, type: Array },
        subdetails: {required: true, type: Object }
    },
    created() {
      this.$store.registerModule("starterBundles", store);
      this.$store.commit("starterBundles/setBundles",{
        "forest-bundle": this["forest-bundle"],
        "beach-bundle": this["beach-bundle"],
        "squatch-bundle": this["squatch-bundle"],
        "fresh-bundle": this["fresh-bundle"],
      });
      this.$store.commit("starterBundles/setCards",this.cards);
      this.$store.commit("starterBundles/setSubscriptionProducts",{
        BarSoap: JSON.parse(this.subdetails.BarSoap),
        HairCare: JSON.parse(this.subdetails.HairCare),
        Deodorant: JSON.parse(this.subdetails.Deodorant),
        Toothpaste: JSON.parse(this.subdetails.Toothpaste),
        SoapSaver: this.subdetails.SoapSaver
      });
    },
    computed: {
        ...mapGetters("starterBundles",["selectedLevel","selectedScent","starterBundleDrawerOpened","subscriptionProducts","subSelected_Clean","subSelected_Groomed","subSelected_Suave","subSelected_Smooth"]),
        "beach-bundle" () {
            return this.products.filter((bundle) => { return bundle.handle == "beach-bundle"; })[0] || {};
        },
        "squatch-bundle" () {
            return this.products.filter((bundle) => { return bundle.handle == "squatch-bundle"; })[0] || {};
        },
        "forest-bundle" () {
            return this.products.filter((bundle) => { return bundle.handle == "forest-bundle"; })[0] || {};
        },
        "fresh-bundle" () {
            return this.products.filter((bundle) => { return bundle.handle == "fresh-bundle"; })[0] || {};
        },
        cards() {
            return [{
                    title: "Clean",
                    description: "Bar Soaps (3) & Soap Saver",
                    price: this.levelsReference[0].price,
                    compare_at_price: this.levelsReference[0].compare_at_price,
                    savings: (this.levelsReference[0].compare_at_price - this.levelsReference[0].price),
                    subscriptionPrice: this.subscriptionProducts["BarSoap"].price + this.subscriptionProducts["SoapSaver"].price,
                    image: this["squatch-bundle"].variants[0].featured_image.src
                },
                {
                    title: "Suave",
                    description: "Bar Soaps (3), Soap Saver, Deodorant & Hair Care Kit",
                    price: this.levelsReference[4].price,
                    compare_at_price: this.levelsReference[4].compare_at_price,
                    savings: (this.levelsReference[4].compare_at_price - this.levelsReference[4].price),
                    subscriptionPrice: this.subscriptionProducts["BarSoap"].price + this.subscriptionProducts["Deodorant"].price + this.subscriptionProducts["HairCare"].price,
                    image: this["fresh-bundle"].variants[4].featured_image.src
                },
                {
                    title: "Groomed",
                    description: "Bar Soaps (3), Soap Saver & Hair Care Kit",
                    price: this.levelsReference[1].price,
                    compare_at_price: this.levelsReference[1].compare_at_price,
                    savings: (this.levelsReference[1].compare_at_price - this.levelsReference[1].price),
                    subscriptionPrice: this.subscriptionProducts["BarSoap"].price + this.subscriptionProducts["HairCare"].price + (0.33*this.subscriptionProducts["SoapSaver"].price),
                    image: this["forest-bundle"].variants[1].featured_image.src
                },
                {
                    title: "Smooth",
                    description: "Bar Soaps (3), Soap Saver, Deodorant, Hair Care Kit & Toothpaste Kit",
                    price: this.levelsReference[5].price,
                    compare_at_price: this.levelsReference[5].compare_at_price,
                    savings: (this.levelsReference[5].compare_at_price - this.levelsReference[5].price),
                    subscriptionPrice: this.subscriptionProducts["BarSoap"].price + this.subscriptionProducts["Deodorant"].price + this.subscriptionProducts["HairCare"].price + this.subscriptionProducts["Toothpaste"].price,
                    image: this["beach-bundle"].variants[5].featured_image.src
                },
            ];
        },
        levelsReference() {
            return this.products[0].variants;
        },
    },
    methods: {
      ...mapMutations("starterBundles", ["setSelectedLevel", "setDrawerOpened", "setPurchaseType","toggleBundleSubSelected"]),
      checkIfSubSelected(title) {
        return this[`subSelected_${title}`];
      }
    },
    mounted() {
        window.sb_test = this;
        this.$nextTick(() => {
          this.$store.commit("starterBundles/setCards",this.cards);
        });
    }
};
</script>

<style scoped lang="scss">
@use "@/styles/main" as global;
.starter-bundles-section {
    max-width: unset;
}

.customizable-product-group-card-component {
    display: flex;
    flex-flow: row wrap;
    border: 2px solid rgba(53, 46, 46, .125);
    border-radius: 4px;
    box-shadow: 0 .5rem 1rem rgba(26, 17, 12, .15);
    cursor: pointer;
    &.selected {
        border: 2px solid global.$orange;
    }
    .image-box {
        position: relative;
        width: 40%;
        padding: 10px 0;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        background-image: url(https://cdn.shopify.com/s/files/1/0275/7784/3817/files/woodgrain-default.svg?v=1615322353);
        background-size: 200%;
        background-repeat: repeat;
        background-color: global.$sand;
        text-align: center;
        @include global.layout-md {
            width: 100%;
        }
        .banners {
            display: none;
            position: absolute;
            left: 0;
            top: 15px;
            @include global.layout-md {
                display: inline-block;
            }
            .discount {
                margin-right: 7px;
                padding: 5px 10px;
                background-color: global.$maroon;
                @include global.font-style-body($size: 12px, $weight: 600, $color: global.$white);
            }
            .free-shipping {
                padding: 5px 10px;
                background-color: global.$orange;
                @include global.font-style-body($size: 12px, $weight: 600, $color: global.$white);
            }
        }
        img {
            max-width: 120px;
            width: calc(100% - 60px);
            height: auto;
            @include global.layout-md {
                max-width: unset;
                object-fit: contain;
                margin-top: 36px;
            }
        }
    }
    .details-box {
        width: 60%;
        padding: 10px 12px 15px 12px;
        @include global.layout-md {
            width: 100%;
            padding: 15px;
            text-align: center;
        }
        .product-preheader {
            margin-bottom: 12px;
            @include global.layout-md {
                display: none;
            }
            .discount {
                margin-right: 7px;
                padding: 5px 10px;
                background-color: global.$maroon;
                @include global.font-style-body($size: 12px, $weight: 600, $color: global.$white);
            }
            .free-shipping {
                padding: 5px 10px;
                background-color: global.$orange;
                @include global.font-style-body($size: 12px, $weight: 600, $color: global.$white);
            }
        }
        .product-header {
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            margin-bottom: 10px;
            .card-title-group {
              display: flex;
            }
            h4 {
                margin:0;
                @include global.font-style-heading($size: 21px);
                @include global.layout-md {
                    margin: 0 0 8px 0;
                    width: 100%;
                }
            }
            .product-pricing {
                @include global.font-style-body($weight: 800, $color: global.$green);
                @include global.layout-md {
                    width: 100%;
                    margin-left: 10px;
                    @include global.font-style-body($size: 16px, $weight: 800, $color: global.$green);
                }
                .compare-at-pricing {
                    text-decoration: line-through;
                    @include global.font-style-body($size: 12px, $color: #afafaf, $weight: 500);
                    @include global.layout-md {
                        @include global.font-style-body($size: 16px, $color: #afafaf);
                    }
                }
            }
        }
        .product-description {
            margin-bottom: 10px;
            text-align: left;
            @include global.font-style-body($lh: 17px, $color: global.$brown);
            @include global.layout-md {
                margin-bottom: 20px;
            }
        }
    }
}
.sq-checkbox {
	display: flex;
	width: 100%;
	font-size: 18px;
	margin-bottom: 15px;
	cursor: pointer;
	position: relative;
	background: #fbf6f0;
	padding: 8px 5px;
	border-radius: 6px;
	&:hover {
		.inner {
			transform: scale(0.5);
			opacity: 0.5;
		}
	}
	input {
		height: 1px;
		width: 1px;
		opacity: 0;
		&:checked {
			+ {
				.outer {
					.inner {
						transform: scale(1);
						opacity: 1;
					}
					border: 3px solid #cc6328;
				}
			}
		}
	}
	.outer {
		height: 24px;
		width: 24px;
		display: block;
		float: left;
		margin: 0 0px 0 0;
		border: 3px solid #e5d0bb;
		border-radius: 50%;
		background-color: #fff;
		position: relative;
	}
	.inner {
		transform: scale(0);
		display: block;
		margin: auto;
		border-radius: 50%;
		opacity: 0;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		color: #40a040;
		bottom: 0;
		font-size: 22px;
		margin: auto;
		padding-bottom: 2px;
		text-align: center;
		align-items: center;
		color: #40a040;
		background: #fff;
		display: flex;
	}
}
.sq-checkbox__content {
	display: block;
	width: calc(100% - 40px);
	margin-left: auto;
  text-align:left;
	h6 {
		margin-bottom: 2px;
		font-family: "adrianna";
		font-size: 15px;
		line-height: 1;
		font-weight: 800;
		color: #cc6328;
	}
	p {
		margin-bottom: 0;
		font-size: 12px;
		line-height: 1.2;
	}
}
@media (max-width: 767px) {
	.sq-checkbox {
		align-items: center;
		.outer {
			height: 20px;
			width: 20px;
		}
		.inner {
			height: 10px;
			width: 10px;
		}
	}
	.sq-checkbox__content {
		h6 {
			font-size: 12px;
		}
		p {
			font-size: 10px;
		}
		display: block;
		width: calc(100% - 30px);
		margin-left: auto;
	}
}

</style>