import { register } from "@shopify/theme-sections";
import Swiper from "swiper";
import { debounce } from "../utils/helpers";

const constants = {
	MOBILE_BREAKPOINT: 767
};

const selectors = {
	slider: "[data-ingredients-slider]"
};

register("ingredients", {
	slider: null,
	onResizeSlider: null,
	onLoad() {
		this.init();
	},
	onUnload() {
		window.removeEventListener("resize", this.onResizeSlider);
		if (this.slider) {
			this.slider.destroy();
		}
	},
	init() {
		this.onResizeSlider = debounce(this.handleCallSlider, 200).bind(this);
		window.addEventListener("resize", this.onResizeSlider);
		this.renderSlider();
	},

	destroySlider() {
		if (this.slider && typeof this.slider.destroy === "function") {
			this.slider.destroy();
			this.slider = null;
		}
	},

	initSlider(selector) {
		this.slider = new Swiper(selector, {
			loop: true,
			slidesPerView: "auto",
			spaceBetween: 30,

			breakpoints: {
				// when window width is >= 320px
				300: {
					slidesPerView: 1.6
				},
				500: {
					slidesPerView: 2.5
				},
				768: {
					slidesPerView: 3
				}
			}
		});
	},

	renderSlider() {
		if (window.innerWidth <= constants.MOBILE_BREAKPOINT && !this.slider) {
			setTimeout(() => {
				this.initSlider(selectors.slider);
			}, 0);
		}
	},

	handleCallSlider() {
		this.destroySlider();
		this.renderSlider();
	}
});
