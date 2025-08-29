import { register } from "@shopify/theme-sections";

const selectors = {
	tooltipImg: "data-tooltip-img",
	tooltip: "[data-tooltip]"
};

register("about-us", {
	onLoad: function () {
		this.init();
	},
	init: function () {
		const tooltips = this.container.querySelectorAll(selectors.tooltip);

		if (!tooltips.length) {
			return;
		}

		tooltips.forEach((item) => {
			const number = item.dataset.tooltip;
			const img = this.container.querySelector(
				`[${selectors.tooltipImg}='${number}']`
			);
			if (item && img) {
				item.append(img);
			}
		});
	}
});
