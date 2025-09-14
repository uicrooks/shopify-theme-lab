import { register } from "@shopify/theme-sections";
import Swiper from "swiper";
import { debounce } from "../utils/helpers";

const constants = {
	MOBILE_BREAKPOINT: 767
};

const selectors = {
	advantagesSlider: "[data-advantages-slider]"
};

register("advantages", {
	slider: null,
	onResizeGallery: null,
	onLoad() {
		this.init();
	},
	onUnload() {
		window.removeEventListener("resize", this.onResizeGallery);
		if (this.slider) {
			this.slider.destroy();
		}
	},
	init() {
		this.onResizeGallery = debounce(this.handleCallGallery, 200).bind(this);
		window.addEventListener("resize", this.onResizeGallery);
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
      centeredSlides: true,
			breakpoints: {
				300: {
					slidesPerView: 2.2
				},
				400: {
					slidesPerView: 2.2
				},
				500: {
					slidesPerView: 3.5
				},
				768: {
					slidesPerView: 8
				}
			}
		});
	},

	renderSlider() {
		if (window.innerWidth <= constants.MOBILE_BREAKPOINT && !this.slider) {
			setTimeout(() => {
				this.initSlider(selectors.advantagesSlider);
			}, 0);
		}
	},

	handleCallGallery() {
		this.destroySlider();
		this.renderSlider();
	}
});
