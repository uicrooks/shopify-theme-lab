import axios from "axios";
import qs from "qs";

const configHeader = {
  headers: {
    Accept: "*/*",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
  },
};

const URL = {
  objectJson: "/cart?view=object-json",
  add: "/cart/add.js",
  change: "/cart/change.js",
};

class CartItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.removeButton = this.querySelector(".cart-product__remove");
    this.addButton = this.querySelector(".cart-product__quantity-btn--plus");
    this.minusButton = this.querySelector(".cart-product__quantity-btn--minus");
    this.quantityChange = this.querySelector(".cart-product__quantity-input");
    this.itemKey = this.removeButton.dataset.itemKey;
    this.sectionId = this.closest("section").dataset.sectionId;
    this.cartCountContainer = document.querySelector(".js-header-cat-items");

    this.removeButton.addEventListener("click", () => {
      this.removeItem(this.itemKey);
    });

    this.addButton.addEventListener("click", () => {
      this.changeQuantity(this.itemKey, Number(this.quantityChange.value) + 1);
    });

    this.minusButton.addEventListener("click", () => {
      this.changeQuantity(this.itemKey, Number(this.quantityChange.value) - 1);
    });

    this.quantityChange.addEventListener("change", () => {
      this.changeQuantity(this.itemKey, Number(this.quantityChange.value));
    });
  }

  disconnectedCallback() {
    this.removeButton.removeEventListener("click", () => {
      this.removeItem(this.itemKey);
    });

    this.addButton.removeEventListener("click", () => {
      this.changeQuantity(this.itemKey, Number(this.quantityChange.value) + 1);
    });

    this.minusButton.removeEventListener("click", () => {
      this.changeQuantity(this.itemKey, Number(this.quantityChange.value) - 1);
    });

    this.quantityChange.removeEventListener("change", () => {
      this.changeQuantity(this.itemKey, Number(this.quantityChange.value));
    });
  }

  removeItem(itemKey) {
    this.changeQuantity(itemKey, 0);
  }

  changeQuantity(key, quantity) {
    this.changeItem({
      id: key,
      quantity,
      sections: "main-cart-mini,cart-count",
    });
  }

  changeItem(newItem) {
    fetch(`${window.Shopify.routes.root}cart/change.js`, {
      body: JSON.stringify(newItem),
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        document.dispatchEvent(
          new CustomEvent("cart:rerender", {
            detail: data,
            bubbles: true,
          })
        );
      })
      .catch((error) =>
        console.error("Error updating mini-cart section:", error)
      );
  }
}

customElements.define("cart-item", CartItem);
