class ComparisonSlider extends HTMLElement {
  constructor() {
    super();

    // Element references
    this.slider = null;
    this.topImageWrapper = null;
    this.beforeImage = null;
  }

  connectedCallback() {
    this.slider = this.querySelector("#compare-slider-range");
    this.topImageWrapper = this.querySelector(".comparison-slider__image--top");
    this.beforeImage = this.querySelector(".comparison-slider__image img");

    // Wait for the images to load before calculating sizes
    this.beforeImage.onload = () => {
      this.setDynamicSliderValues();
    };

    // Add event listener to the slider
    this.addListeners();
  }

  disconnectedCallback() {
    // Clean up if necessary
  }

  // Add event listener to the slider
  addListeners() {
    this.slider.addEventListener("input", this.updateImageWidth.bind(this));
  }

  // Set the slider max value and default value (50%) based on the image width
  setDynamicSliderValues() {
    // Set the max value of the slider to 100 (representing 100%)
    this.slider.max = 100;

    // Set the value of the slider to 50% (starting at the middle)
    this.slider.value = 50;

    // Set the initial width of the top image wrapper to 50%
    this.topImageWrapper.style.width = "50%";
  }

  // Update the width of the top image wrapper based on the slider value
  updateImageWidth(e) {
    const sliderValue = e.target.value;
    this.topImageWrapper.style.width = `${sliderValue}%`;
  }
}

// Define the custom element
customElements.define("comparison-slider", ComparisonSlider);
