import * as bodyScrollLock from "body-scroll-lock";

class MiniCart extends HTMLElement {
  constructor() {
    super();
    this.isOpened = false;
    this.cartCountContainer = document.querySelector(".js-header-cat-items");
    this.basketIcon = document.querySelector(".basket");
    this.sectionId = "main-cart-mini";
    this.height = window.innerHeight;
    this.overlay = this.querySelector(".minicart__overlay");
    this.container = this.querySelector(".minicart__container");
    this.closeButton = this.querySelector(".minicart__close");
    this.continueShoppingButton = this.querySelector(".cart-order__link");
    // Bind methods to class instance
    this.closeCart = this.closeCart.bind(this);
    this.openCart = this.openCart.bind(this);
    this.updateMiniCartSection = this.updateMiniCartSection.bind(this);
    this.onProductAdd = this.onProductAdd.bind(this); // Ensure this method is bound to the class instance
    this.listenersAdded = false; // Flag to track if listeners have been added
  }

  // Lifecycle callback when the element is added to the document
  connectedCallback() {
    this.addListeners();
  }

  // Lifecycle callback when the element is removed from the document
  disconnectedCallback() {
    this.removeListeners();
  }

  async onProductAdd(event) {
    const detail = event.detail;

    if (!detail) {
      return null;
    }

    const items = detail.items;
    if (!items) {
      return null;
    }

    let formData = {
      items: [],
    };

    const totalQuantity = items.reduce((accumulator, item) => {
      return accumulator + parseInt(item.quantity);
    }, 0); // starting value for the accumulator is 0

    items.forEach((item) => {
      let formattedItem = {
        id: item.id,
        quantity: parseInt(item.quantity),
        properties: item.properties
      };

      formData.items.push(formattedItem);
    });

    fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((response) => {
        this.updateMiniCartSection(totalQuantity);
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
  }

  addListeners() {
    if (this.listenersAdded) return; // Check if listeners have already been added
    document.addEventListener("product:add", this.onProductAdd);
    this.overlay.addEventListener("click", this.closeCart);
    this.closeButton.addEventListener("click", this.closeCart);
    if (this.continueShoppingButton) {
      this.continueShoppingButton.addEventListener("click", this.closeCart);
    }
    this.basketIcon.addEventListener("click", this.openCart);
    this.listenersAdded = true; // Set flag to true
  }

  removeListeners() {
    document.removeEventListener("product:add", this.onProductAdd);
    this.overlay.removeEventListener("click", this.closeCart);
    this.closeButton.removeEventListener("click", this.closeCart);
    if (this.continueShoppingButton) {
      this.continueShoppingButton.removeEventListener("click", this.closeCart);
    }
    this.basketIcon.removeEventListener("click", this.openCart);
    this.listenersAdded = false; // Reset flag when listeners are removed
  }

  updateMiniCartSection(totalQuantity) {
    fetch(`${window.location.pathname}?sections=${this.sectionId}`)
      .then((res) => res.json())
      .then((data) => {
        const newHtml = data[this.sectionId];
        const newSection = document.querySelector(
          `#shopify-section-${this.sectionId}`
        );
        newSection.outerHTML = newHtml;
      })
      .then(() => {
        this.overlay = document.querySelector(".minicart__overlay");
        this.container = document.querySelector(".minicart__container");
        this.updateCartCount(totalQuantity);
        this.openCart();
      })
      .catch((error) =>
        console.error("Error updating mini-cart section:", error)
      );
  }

  updateCartCount(totalQuantity) {
    this.cartCountContainer.innerHTML =
      Number(this.cartCountContainer.innerHTML) + totalQuantity;
  }

  closeCart(e) {
    if (e) e.preventDefault();
    this.clearBodyScroll();
    this.container.classList.remove("minicart__container--open");
    this.overlay.classList.remove("minicart__overlay--shown");
  }

  openCart() {
    if (window.matchMedia("(min-width: 768px)").matches) {
      this.bodyScroll();
    }
    this.container.classList.add("minicart__container--open");
    this.overlay.classList.add("minicart__overlay--shown");
  }

  clearBodyScroll() {
    bodyScrollLock.clearAllBodyScrollLocks();
    this.querySelector(".js-minicart-items").scrollTo(0, 0);
  }

  bodyScroll() {
    bodyScrollLock.disableBodyScroll(this.querySelector(".js-minicart-items"));
  }
}

customElements.define("mini-cart", MiniCart);
