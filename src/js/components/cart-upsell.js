import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import axios from "axios";
import qs from "qs";

Swiper.use([Navigation]);

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
};

class CartUpsell extends HTMLElement {
  constructor() {
    super();
    this.slider = null;
    this.atcButtons = Array.from(document.querySelectorAll(".cart-upsell__button"));
    this.sliderElement = this.querySelector("[data-upsell-slider]");
    this.cartCountContainer = document.querySelector(".js-header-cat-items");
    this.sectionId = this.closest("section").dataset.sectionId;
    this.listenersAdded = false; // Flag to track if listeners have been added
    this.init();
  }

  init() {
    this.addListeners();
    this.initSlider();
  }

  addListeners() {
    if (this.listenersAdded) return; // Check if listeners have already been added
    this.atcButtons.forEach((button) => {
      const itemKey = button.dataset.itemKey;
      button.addEventListener("click", () => {
        this.addItem({
          id: itemKey,
          quantity: 1,
        });
      });
    });
    this.listenersAdded = true; // Set flag to true
  }

  removeListeners() {
    this.listenersAdded = false; // Reset flag when listeners are removed
  }

  initSlider() {
    const slides = this.querySelectorAll(".swiper-slide").length;
    const slidesPerViewCount = slides < 2 ? 1 : 2.8;

    this.slider = new Swiper(this.sliderElement, {
      modules: [Navigation],
      loop: false,
      spaceBetween: 30,
      slidesPerView: slidesPerViewCount,
    });
  }

  addItem(newItem) {
    axios
      .post(URL.add, qs.stringify(newItem), configHeader)
      .then((res) => res.data)
      .then((res) => {
        this.updateMiniCartSection();
        this.updateCartCount(newItem.quantity);
      });
  }

  updateMiniCartSection() {
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
      .catch((error) =>
        console.error("Error updating mini-cart section:", error)
      );
  }

  updateCartCount(totalQuantity) {
    this.cartCountContainer.innerHTML =
      Number(this.cartCountContainer.innerHTML) + totalQuantity;
  }
}

customElements.define("cart-upsell", CartUpsell);
