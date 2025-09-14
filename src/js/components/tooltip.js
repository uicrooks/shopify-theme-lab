class ToolTip extends HTMLElement {
  constructor() {
    super();
    this.tooltipId = this.dataset.id;
    this.tooltipElement = this.querySelector("[data-content");
    this.tooltipTrigger = document.querySelector(
      `[data-tooltip-trigger="${this.tooltipId}"]`
    );
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  connectedCallback() {
    this.tooltipTrigger.addEventListener("mouseenter", this.handleMouseEnter);
    this.tooltipTrigger.addEventListener("mouseleave", this.handleMouseLeave);
  }

  disconnectedCallback() {
    this.tooltipTrigger.removeEventListener(
      "mouseenter",
      this.handleMouseEnter
    );
    this.tooltipTrigger.removeEventListener(
      "mouseleave",
      this.handleMouseLeave
    );
  }

  handleMouseEnter() {
    this.setAttribute("visible", "");
  }

  handleMouseLeave() {
    this.removeAttribute("visible");
  }
}

customElements.define("tool-tip", ToolTip);