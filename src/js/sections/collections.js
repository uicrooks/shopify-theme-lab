import Swiper from "swiper";

if (!customElements.get("collection-slider")) {
  customElements.define(
    "collection-slider",
    class CollectionSlider extends HTMLElement {
      constructor() {
        super();
        this.slider = null;
        this.slides = this.dataset.slides > 4 ? 4 : this.dataset.slides;
        
      }

      connectedCallback() {
        this.init();
      }

      disconnectedCallback() {
        this.slider.destroy(true, true);
      }

      init() {
        this.slider = new Swiper(this, {
          loop: false,
          centerMode: false,
          slidesPerView: "auto",
          spaceBetween: 12,
          breakpoints: {
            769: {
              slidesPerView: this.slides,
              spaceBetween: 36,
            }
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      }
    }
  );
}
