import { register } from "@shopify/theme-sections";

const selectors = {
  tooltipImg: ".js-home-tooltip-img",
  tooltip: ".tooltip",
};

register("richtext", {
  onLoad: function () {
    this.init();
  },
  init: function () {
    const tooltipImg = this.container.querySelector(selectors.tooltipImg);
    const tooltip = this.container.querySelector(selectors.tooltip);

    if (tooltipImg && tooltip) {
      tooltip.append(tooltipImg);
    }
  },
});
