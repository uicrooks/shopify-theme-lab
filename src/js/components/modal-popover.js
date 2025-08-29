export default class ModalPopover extends HTMLElement {
  constructor() {
    super();
    // Select toggle buttons using a data attribute matching this modal's id
    this.toggleButtons = document.querySelectorAll(
      `[data-toggle="${this.id}"]`
    );
    this.closeButton = this.querySelector(".popover__close-button");
    this.popoverOverlay = this.querySelector(".popover__overlay");
  }

  connectedCallback() {
    this.toggleButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        this.togglePopover(event);
      });
    });
    this.closeButton.addEventListener("click", () => {
      this.togglePopover();
    });
    this.popoverOverlay.addEventListener("click", () => {
      this.togglePopover();
    });

    document.addEventListener("click", this._onDocumentClick.bind(this));
  }

  togglePopover(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.hasAttribute("open")) {
      this.removeAttribute("open");
      this.toggleButtons.forEach((button) => {
        button.setAttribute("aria-expanded", "false");
      });
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    } else {
      this.setAttribute("open", "");
      this.toggleButtons.forEach((button) => {
        button.setAttribute("aria-expanded", "true");
      });
      document.documentElement.classList.add("no-scroll");
      document.body.classList.add("no-scroll");
    }
  }

  _onDocumentClick(event) {
    if (this.hasAttribute("open")) {
      const isClickInside = this.contains(event.target);
      if (!isClickInside) {
        this.togglePopover();
      }
    }
  }
}

customElements.define("modal-popover", ModalPopover);
