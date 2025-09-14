import { addToCartSubmit } from "../core/helpers/addToCartSubmit";

class AtcButton extends HTMLElement {
  constructor() {
    super();
    this.form = this.querySelector("form")
    this.init();
  }

  init() {
    this.addListeners()
  }

  addListeners() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      addToCartSubmit(event);
    })
  }
}

customElements.define("atc-button", AtcButton);
