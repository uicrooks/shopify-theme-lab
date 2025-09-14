class MiniCart extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.cartCountContainer = document.querySelector(".js-header-cat-items");
    this.container = document.querySelector(".minicart__container");
    this.overlay = document.querySelector(".minicart__overlay");
    this.openTrigger = document.querySelector("[data-open-minicart]");
    this.continueShoppingButton = this.querySelector(".cart-order__link");
    this.closeButton = this.querySelector(".minicart__close");

    this.closeCart = this.closeCart.bind(this);
    this.openCart = this.openCart.bind(this);
    this.updateMiniCartSection = this.updateMiniCartSection.bind(this);

    this.openTrigger.addEventListener("click", this.openCart);
    this.attachCloseButtonListener();
    this.overlay.addEventListener("click", this.closeCart);
    document.addEventListener("cart:rerender", this.updateMiniCartSection);

    // Add event delegation as backup for close button
    this.addEventListener("click", this.handleClick.bind(this));
  }

  // Lifecycle callback when the element is removed from the document
  disconnectedCallback() {
    this.openTrigger.removeEventListener("click", this.openCart);
    this.removeCloseButtonListener();
    this.overlay.removeEventListener("click", this.closeCart);
    document.removeEventListener("cart:rerender", this.updateMiniCartSection);
    this.removeEventListener("click", this.handleClick.bind(this));
  }

  // Event delegation handler for close button
  handleClick(e) {
    if (e.target.closest(".minicart__close")) {
      this.closeCart(e);
    }
  }

  // Helper method to attach close button listener
  attachCloseButtonListener() {
    this.closeButton = this.querySelector(".minicart__close");
    if (this.closeButton) {
      this.closeButton.addEventListener("click", this.closeCart);
    }
  }

  // Helper method to remove close button listener
  removeCloseButtonListener() {
    if (this.closeButton) {
      this.closeButton.removeEventListener("click", this.closeCart);
    }
  }

  updateMiniCartSection(event) {
    const tempDiv = document.createElement("div");
    const tempCarCount = document.createElement("div");

    tempDiv.innerHTML = event.detail.sections["main-cart-mini"];
    tempCarCount.innerHTML = event.detail.sections["cart-count"];

    // Remove the old close button listener before updating content
    this.removeCloseButtonListener();

    this.container.innerHTML = tempDiv.querySelector(
      ".minicart__container"
    ).innerHTML;
    this.cartCountContainer.innerHTML =
      tempCarCount.querySelector(".basket__count").innerHTML;

    // Re-attach the close button listener after content update
    this.attachCloseButtonListener();

    if (!this.container.classList.contains("minicart__container--open")) {
      this.openCart();
    }
  }

  closeCart(e) {
    if (e) e.preventDefault();
    this.container.classList.remove("minicart__container--open");
    this.overlay.classList.remove("minicart__overlay--shown");
    document.documentElement.classList.remove("no-scroll");
  }

  openCart() {
    this.container.classList.add("minicart__container--open");
    this.overlay.classList.add("minicart__overlay--shown");
    document.documentElement.classList.add("no-scroll");
  }
}

customElements.define("mini-cart", MiniCart);
