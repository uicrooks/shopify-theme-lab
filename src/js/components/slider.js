import Swiper from "swiper";

class SliderElement extends HTMLElement {
  constructor() {
    super();
    this.sliderConfig = this.dataset.swiperConfig
      ? JSON.parse(this.dataset.swiperConfig)
      : {};
    this.swiperInstance = null;
    this.mediaQuery = window.matchMedia("(max-width: 991px)");
    this.handleResize = this.handleResize.bind(this);
  }

  connectedCallback() {
    // Check if the element has data-only-mobile attribute
    if (this.hasAttribute("data-only-mobile")) {
      this.handleResize(this.mediaQuery); // Check initial screen size
      this.mediaQuery.addEventListener("change", this.handleResize); // Add listener for screen size changes
    } else {
      // Initialize slider immediately without mobile-only restriction
      this.swiperInstance = new Swiper(this, this.sliderConfig);
    }
  }

  disconnectedCallback() {
    if (this.hasAttribute("data-only-mobile")) {
      this.mediaQuery.removeEventListener("change", this.handleResize); // Remove listener when element is removed
    }
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true); // Destroy Swiper instance if it exists
    }
  }

  handleResize(e) {
    if (e.matches) {
      // Screen width is <= 991px
      if (!this.swiperInstance) {
        this.swiperInstance = new Swiper(this, this.sliderConfig);
      }
    } else {
      // Screen width is > 991px
      if (this.swiperInstance) {
        this.swiperInstance.destroy(true, true);
        this.swiperInstance = null;
      }
    }
  }
}

customElements.define("slider-element", SliderElement);
