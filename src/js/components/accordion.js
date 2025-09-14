// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

class AccordionItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.accordionHeader = this.querySelector(".js-accordion__header");
    this.accordionBody = this.querySelector(".accordion__dsc");
    this.handleClickAccordionHeader =
      this.handleClickAccordionHeader.bind(this);
    this.setSize = this.setSize.bind(this);

    // Create debounced version of setSize for resize events
    this.debouncedSetSize = debounce(this.setSize, 100);

    this.setSize();

    this.accordionHeader.addEventListener(
      "click",
      this.handleClickAccordionHeader
    );
    window.addEventListener("resize", this.debouncedSetSize);
  }

  disconnectedCallback() {
    this.accordionHeader.removeEventListener(
      "click",
      this.handleClickAccordionHeader
    );
    window.removeEventListener("resize", this.debouncedSetSize);
  }

  handleClickAccordionHeader() {
    this.classList.toggle("active");
  }

  setSize() {
    this.setAttribute(
      "style",
      `--accordion-body-max-height: ${this.accordionBody.scrollHeight}px`
    );
  }
}

customElements.define("accordion-item", AccordionItem);
