import { register } from "@shopify/theme-sections";

const selectors = {
	tickerWrap: '[data-ticker="wrap"]',
	tickerItem: '[data-ticker="item"]',
	tickerList: '[data-ticker="list"]'
};

register("ticker", {
	tickersWrapper: null,
	onTickersAnimation: null,
	onLoad: function () {
		this.onTickersAnimation = this.tickersAnimation.bind(this);

		this.init();
	},
	onUnload() {
		window.removeEventListener("scroll", this.onTickersAnimation);
	},
	init: function () {
		this.tickersWrapper = this.container.querySelectorAll(selectors.tickerWrap);

		if (!this.tickersWrapper.length) {
			return;
		}

		this.tickersAnimation();
		window.addEventListener("scroll", this.onTickersAnimation);
	},
	tickersAnimation() {
		const position = Math.round((window.scrollY / window.innerHeight) * 100);
		const fromLeft = position - 360;
		const fromRight = position;
		let isMobile = false;

		if (window.innerWidth <= 767) {
			isMobile = true;
		}

		this.tickersWrapper.forEach((ticker, index) => {
			const item = ticker.querySelector(selectors.tickerItem);
			const number = index * 10; // for different start position of each line

			// / 100 * 25 making animations slower
			let currentLeftPosition = 0;
			let currentRightPosition = 0;

			if (isMobile) {
				currentLeftPosition = ((fromLeft) / 100) * 15; // Adjust the multiplier to control speed
        currentRightPosition = ((fromRight) / 100) * 15;  // Same here
			} else {
				currentLeftPosition = ((fromLeft - number) / 100) * 15;
				currentRightPosition = ((fromRight - number) / 100) * 15;
			}

			if (ticker.dataset.tickerRevert === "true") {
				item.style.transform = `translateX(${currentLeftPosition}%)`;
			} else {
				item.style.transform = `translateX(-${currentRightPosition}%)`;
			}
		});
	}
});
