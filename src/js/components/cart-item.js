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
    this.removeButton = this.querySelector(".cart-product__remove");
    this.addButton = this.querySelector(".cart-product__quantity-btn--plus");
    this.minusButton = this.querySelector(".cart-product__quantity-btn--minus");
    this.quantityChange = this.querySelector(".cart-product__quantity-input");
    this.itemKey = this.removeButton.dataset.itemKey;
    this.cartCountContainer = document.querySelector(".js-header-cat-items");
    this.sectionId = this.closest('section').dataset.sectionId;
    this.init();
  }

  init() {
    this.addListeners();
  }

  addListeners() {
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

  removeItem(itemKey) {
    this.changeQuantity(itemKey, 0);
  }

  changeQuantity(key, quantity) {
    this.changeItem({
      id: key,
      quantity,
    });
  }

  changeItem(newItem) {
    axios
      .post(URL.change, qs.stringify(newItem), configHeader)
      .then((res) => res.data)
      .then((res) => {
        this.updateMiniCartSection(res.item_count);
      });
  }

  updateMiniCartSection(item_count) {
    fetch(`${window.location.pathname}?sections=${this.sectionId}`)
      .then((res) => res.json())
      .then((data) => {
        let newHtml = data[this.sectionId];
        const newSection = document.querySelector(
          `#shopify-section-${this.sectionId}`
        );
        newHtml = newHtml
          .replace(
            "minicart__overlay ",
            "minicart__overlay minicart__overlay--shown"
          )
          .replace(
            "minicart__container ",
            "minicart__container minicart__container--open"
          );
        newSection.outerHTML = newHtml;
      })
      .then(() => {
        this.cartCountContainer.innerHTML = item_count;
      })
      .catch((error) =>
        console.error("Error updating mini-cart section:", error)
      );
  }
}

customElements.define("cart-item", CartItem);
