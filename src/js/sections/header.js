import { register } from "@shopify/theme-sections";

const selectors = {
	burgerButton: ".js-header-burger",
	navWrapper: ".js-header-nav",
	cartItems: ".js-header-cat-items",
	classNavOpen: "header-nav__wrap--open",
	classBurgerActive: "is-active",
	classMenuOpen: "mobile-menu-open",
	classNoScroll: "no-scroll"
};

register("header", {
	onLoad: function () {
		this.init();
	},
	init: function () {
		this.initMobileMenu();

		this.updateCartQuantity();
	},
	initMobileMenu: function () {
		const burgerButton = this.container.querySelector(selectors.burgerButton);
		const nav = this.container.querySelector(selectors.navWrapper);
		const body = document.body;

		burgerButton.addEventListener("click", () => {
			body.classList.toggle(selectors.classMenuOpen);
			burgerButton.classList.toggle(selectors.classBurgerActive);
			nav.classList.toggle(selectors.classNavOpen);

			if (body.classList.contains(selectors.classMenuOpen)) {
				document.documentElement.classList.add('no-scroll');
			} else {
				document.documentElement.classList.remove('no-scroll');
			}
		});
	},
	updateCartQuantity: function () {
		document.addEventListener("cart:item_count", function (event) {
			const number = event?.detail?.item_count;
			const cartItem = document.querySelector(selectors.cartItems);

			if (cartItem) {
				cartItem.textContent = number;
			}
		});
	}
});
