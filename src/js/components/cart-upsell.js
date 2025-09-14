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
  }

  connectedCallback() {
    this.atcForms = Array.from(
      document.querySelectorAll("form[action='/cart/add']")
    );
    this.sliderElement = this.querySelector("[data-upsell-slider]");
    this.cartCountContainer = document.querySelector(".js-header-cat-items");
    this.sectionId = this.closest("section").dataset.sectionId;

    this.handleSubmit = this.handleSubmit.bind(this);

    this.atcForms.forEach((form) => {
      form.addEventListener("submit", this.handleSubmit);
    });

    this.initSlider();
  }

  disconnectedCallback() {
    this.atcForms.forEach((form) => {
      form.removeEventListener("submit", this.handleSubmit);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("sections", "main-cart-mini,cart-count");

    fetch(`${window.Shopify.routes.root}cart/add.js`, {
      body: formData,
      method: "POST",
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
      .then((response) => response.json())
      .then((data) => {
        document.dispatchEvent(new CustomEvent("cart:rerender", {
          detail: data,
          bubbles: true,
        }));
      })
      .catch((error) =>
        console.error("Error updating mini-cart section:", error)
      );
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
}

customElements.define("cart-upsell", CartUpsell);
