/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */

import axios from "axios";
import { register } from "@shopify/theme-sections";
import { formatMoney } from "@shopify/theme-currency";
import { getUrlWithVariant } from "@shopify/theme-product-form";
import Swiper from "swiper";
import { Thumbs } from "swiper/modules"
import CustomProductForm from "../../js/core/ProductForm";
import { addToCartSubmit } from "../core/helpers/addToCartSubmit";
import objects from "../core/objects";

Swiper.use([Thumbs]);

const classes = {
	hide: "hide",
	product_price_new: "product-info__price--new"
};

const constants = {
	MAX_INPUT_VALUE: 99,
	MIN_INPUT_VALUE: 1,
	OPACITY_CLASS: "opacity-0",
	VISIBILITY_HIDDEN: "visibility-hidden",
	QUANTITY_INCREMENT: "increment",
	QUANTITY_DECREMENT: "decrement"
};

const selectors = {
	submitButton: "[data-submit-button]",
	submitButtonText: "[data-submit-button-text]",
	comparePrice: "[data-compare-price]",
	comparePriceText: "[data-compare-text]",
	priceWrapper: "[data-price-wrapper]",
	productForm: "[data-product-form]",
	productPrice: "[data-product-price]",
  productFormButtons: ".product-form__buttons",

	quantityWrapper: '[data-quantity="wrapper"]',
	quantityInput: '[data-quantity="input"]',
	quantityDecrement: '[data-quantity="decrement"]',
	quantityIncrement: '[data-quantity="increment"]',

	productGallery: '[data-product-gallery="gallery"]',
	productGalleryThumbnail: '[data-product-gallery="thumbnail"]',
	productGalleryWrapper: '[data-product-gallery="wrapper"]'
};

const { translations } = window;

register("product-page", {
	slider: null,
	sliderThumbnail: null,
	priceElements: null,
	comparePriceElements: null,
	quantityWrapperElement: null,
	quantityInputElement: null,
	quantityKeyupEvents: null,
	quantityButtonsElement: null,
	submitButtonElement: null,
	submitButtonTextElement: null,
	async onLoad() {
		const productFormElement = document.querySelector(selectors.productForm);
    const productFormButtons = document.querySelector(selectors.productFormButtons);

		this.product = await this.getProductJson(
			productFormElement.dataset.productHandle
		);

		this.container
			.querySelector(selectors.productGalleryWrapper)
			.classList.remove(constants.OPACITY_CLASS);

		this.priceWrapperElements = this.container.querySelectorAll(
			selectors.priceWrapper
		);

		this.priceElements = this.container.querySelectorAll(
			selectors.productPrice
		);

		this.comparePriceElements = this.container.querySelectorAll(
			selectors.comparePrice
		);

		this.quantityWrapperElement = this.container.querySelector(
			selectors.quantityWrapper
		);

		this.quantityInputElement = this.container.querySelector(
			selectors.quantityInput
		);

		this.submitButtonElement = this.container.querySelector(
			selectors.submitButton
		);

		this.submitButtonTextElement = this.container.querySelector(
			selectors.submitButtonText
		);

		this.productForm = new CustomProductForm(productFormElement, this.product, {
			onOptionChange: this.onFormOptionChange.bind(this),
			onQuantityChange: () => {},
			onPropertyChange: () => {},
			onFormSubmit: (event) => {
				event.preventDefault();

				event.dataset.variant = {
					...event.dataset.variant,
					product: this.product
				};

				event.detail = {
					// errorCallback: ({ data }) => {
					// 	console.log('errorCallback data', data);
					// }
				};

				addToCartSubmit(event);
			},
			selectors: {
				idInput: "[data-original-product-select]",
				quantityInput: '[data-quantity="input"]',
				propertyInput: "[data-product-property]"
			}
		});

		this.onQuantityChange = this.initQuantityClick.bind(this);
		this.quantityKeyupEvents = this.initQuantityKeyup.bind(this);

    window.addEventListener("scroll", function () {
      // Check if any atc-button element is visible in the viewport
      const atcButtons = document.querySelectorAll("atc-button");
      let isAtcButtonVisible = false;

      atcButtons.forEach((button) => {
        const rect = button.getBoundingClientRect();
        const isVisible =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= window.innerHeight &&
          rect.right <= window.innerWidth;

        if (isVisible) {
          isAtcButtonVisible = true;
        }
      });

      // Check the old logic - hide when near the bottom
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const threshold = 50; // Distance before reaching the bottom where the element should start to hide
      const isNearBottom = scrollPosition >= documentHeight - threshold;

      // Hide productFormButtons if either condition is true:
      // 1. atc-button is visible in viewport, OR
      // 2. user is near the bottom of the page
      if (isAtcButtonVisible || isNearBottom) {
        productFormButtons.classList.add("mobile-vanish");
      } else {
        productFormButtons.classList.remove("mobile-vanish");
      }
    });

		this.container.addEventListener("click", this.onQuantityChange);
		this.container
			.querySelector(selectors.quantityInput)
			.addEventListener("keyup", this.quantityKeyupEvents);

		this.initQuantityValidate();
		this.initSliders();
	},

	onUnload() {
		this.container.removeEventListener("click", this.onQuantityChange);
		this.container
			.querySelector(selectors.quantityInput)
			.removeEventListener("keyup", this.quantityKeyupEvents);

		this.productForm.destroy();
		this.destroySliders();
	},

	async getProductJson(handle) {
		const response = (await axios(`/products/${handle}?view=object-json`)).data;

		const html = document.createElement("div");
		html.innerHTML = response;
		return JSON.parse(html.querySelector("[data-json-response]").innerHTML);
	},

	onFormOptionChange(event) {
		const variant = event.dataset.variant;

		this.renderPrice(variant);
		this.renderComparePrice(variant);
		this.renderSubmitButton(variant);

		this.updateBrowserHistory(variant);
		this.updateQuantityWrapper(variant);
	},

	updateQuantityWrapper(variant) {
		if (!this.quantityWrapperElement) {
			return;
		}

		if (!variant) {
			this.quantityWrapperElement.classList.add(constants.VISIBILITY_HIDDEN);
			return;
		}

		if (!variant.available) {
			this.quantityWrapperElement.classList.add(constants.VISIBILITY_HIDDEN);
			return;
		}

		this.quantityWrapperElement.classList.remove(constants.VISIBILITY_HIDDEN);
	},

	quantityDecrement() {
		let value = parseInt(this.quantityInputElement.value);
		value--;
		if (!constants.MIN_INPUT_VALUE || value >= constants.MIN_INPUT_VALUE) {
			this.quantityInputElement.value = value;
		}
	},

	quantityIncrement() {
		let value = parseInt(this.quantityInputElement.value);

		value++;
		if (!constants.MAX_INPUT_VALUE || value <= constants.MAX_INPUT_VALUE) {
			this.quantityInputElement.value = value++;
		}
	},

	initQuantityValidate() {
		const value = parseInt(this.quantityInputElement.value);
		const buttonDecrement = this.container.querySelector(
			selectors.quantityDecrement
		);
		const buttonIncrement = this.container.querySelector(
			selectors.quantityIncrement
		);

		if (value >= constants.MAX_INPUT_VALUE) {
			buttonIncrement.setAttribute("disabled", "disabled");
		} else if (value <= constants.MIN_INPUT_VALUE) {
			buttonDecrement.setAttribute("disabled", "disabled");
		} else {
			buttonDecrement.removeAttribute("disabled");
			buttonIncrement.removeAttribute("disabled");
		}
	},

	initQuantityKeyup() {
		this.initQuantityValidate();
		const value = parseInt(this.quantityInputElement.value);
		if (value < constants.MIN_INPUT_VALUE || isNaN(value)) {
			this.quantityInputElement.value = constants.MIN_INPUT_VALUE;
		} else if (value > constants.MAX_INPUT_VALUE) {
			this.quantityInputElement.value = constants.MAX_INPUT_VALUE;
		} else {
			this.quantityInputElement.value = value;
		}
	},

	initQuantityClick(event) {
		const target = event.target;
		const dataSetQuantity = target.dataset.quantity;
		this.initQuantityValidate();

		if (dataSetQuantity === constants.QUANTITY_INCREMENT) {
			this.quantityIncrement();
		} else if (dataSetQuantity === constants.QUANTITY_DECREMENT) {
			this.quantityDecrement();
		}
	},

	renderSubmitButton(variant) {
    console.log('was geht ab')
		let buttonText = "";
		if (!this.submitButtonElement) {
			return;
		}

		if (!variant) {
			this.submitButtonElement.disabled = true;
			buttonText = translations.products.product.unavailable;
		} else if (variant.available) {
			this.submitButtonElement.disabled = false;
			buttonText = translations.products.product.add_to_cart;
		} else {
			this.submitButtonElement.disabled = true;
			buttonText = translations.products.product.sold_out;
		}

		this.submitButtonTextElement.innerHTML = buttonText;
	},

	renderPrice(variant) {
		if (this.priceWrapperElements.length) {
			this.priceWrapperElements.forEach((elem) => {
				elem.classList.toggle(classes.hide, !variant);
			});
		}

		if (variant && this.priceElements.length) {
			this.priceElements.forEach((price) => {
				price.textContent = formatMoney(
					variant.price,
					objects.get("shop.money_format")
				);
			});
		}
	},

	renderComparePrice(variant) {
		if (!variant) {
			return;
		}

		if (!this.comparePriceElements.length) {
			return;
		}

		if (variant.compare_at_price > variant.price) {
			this.comparePriceElements.forEach((element) => {
				element.innerText = formatMoney(
					variant.compare_at_price,
					objects.get("shop.money_format")
				);
			});

			this.priceElements.forEach((element) => {
				element.classList.add(classes.product_price_new);
			});
			this.comparePriceElements.forEach((element) => {
				element.classList.remove(classes.hide);
			});
		} else {
			this.comparePriceElements.forEach((element) => {
				element.textContent = "";
			});

			this.priceElements.forEach((element) => {
				element.classList.remove(classes.product_price_new);
			});
			this.comparePriceElements.forEach((element) => {
				element.classList.add(classes.hide);
			});
		}
	},

	initSliders() {
		const slider = this.container.querySelector(selectors.productGallery);
		const sliderThumbnail = this.container.querySelector(
			selectors.productGalleryThumbnail
		);

		if (slider && sliderThumbnail) {
			this.sliderThumbnail = new Swiper(sliderThumbnail, {
				slidesPerView: 'auto',
				direction: "vertical",
				breakpoints: {
					300: {
						direction: "horizontal",
					},
					576: {
						direction: "horizontal",
					},
					992: {
						direction: "vertical",
					}
				}
			});

			this.slider = new Swiper(slider, {
				direction: "horizontal",
				thumbs: {
					swiper: this.sliderThumbnail
				}
			});

			this.slider.on("slideChangeTransitionStart", () => {
				this.sliderThumbnail.slideTo(this.slider.activeIndex);
			});

			this.sliderThumbnail.on("transitionStart", () => {
				this.slider.slideTo(this.sliderThumbnail.activeIndex);
			});
		}
	},

	updateSliders() {},

	destroySliders() {
		if (this.slider && typeof this.slider.destroy === "function") {
			this.slider.destroy();
			this.slider = null;
		} else if (
			this.sliderThumbnail &&
			typeof this.sliderThumbnail.destroy === "function"
		) {
			this.sliderThumbnail.destroy();
			this.sliderThumbnail = null;
		}
	},

	updateBrowserHistory(variant) {
		const enableHistoryState =
			this.productForm.element.dataset.enableHistoryState;

		if (!variant || enableHistoryState !== "true") {
			return;
		}

		const url = getUrlWithVariant(window.location.href, variant.id);
		window.history.replaceState(
			{
				path: url
			},
			"",
			url
		);
	}
});
