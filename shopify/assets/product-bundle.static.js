class BundlePicker extends HTMLElement {
  constructor() {
    super();

    this.bundleSelectors = Array.from(
      this.querySelectorAll(".bundle-selector")
    );
    this.bundleInputs = Array.from(
      this.querySelector(".add_to_cart_section").querySelectorAll("input")
    );
    this.mainPriceContainer = document.querySelector(".prodcut_price");
    this.productsJson = document.querySelector("[data-products-json]")
      ? document.querySelector("[data-products-json]")
      : null;
    this.productsData = JSON.parse(this.productsJson.innerHTML);

    this.load();
  }

  load() {
    this.addChangeEvent();
  }

  addChangeEvent() {
    this.bundleSelectors.forEach((bundleSelector) => {
      const selectorElement = bundleSelector.querySelector(
        ".product_select_selector"
      );

      selectorElement.addEventListener("change", () => {
        this.updateInputs(selectorElement, bundleSelector);
        this.updateMainPrice();
        this.updateSelectorImage(selectorElement, bundleSelector);
        this.updateSelectorTitle(selectorElement, bundleSelector);
        this.updateSelectorPrice(selectorElement, bundleSelector);
        this.updateSelectorQuantityContent(selectorElement, bundleSelector);
        this.updateSelectorUnitPrice(selectorElement, bundleSelector);
      });
    });
  }

  updateSelectorUnitPrice(selectorElement, bundleSelector) {
    const unitPriceContentElement = bundleSelector.querySelector(
      ".sle_price_pro-unit-price"
    );
    const changedItem = this.allInputProducts.find((inputProduct) => {
      return inputProduct.id === Number(selectorElement.value);
    });

    unitPriceContentElement.textContent =
      "€" +
      (changedItem.unitPrice / 100).toFixed(2).replace(".", ",") +
      " / " +
      changedItem.unitPriceMeasurement;
  }

  updateSelectorQuantityContent(selectorElement, bundleSelector) {
    const quantityContentElement = bundleSelector.querySelector(
      ".product-quantity-content"
    );
    const changedItem = this.allInputProducts.find((inputProduct) => {
      return inputProduct.id === Number(selectorElement.value);
    });

    quantityContentElement.textContent =
      changedItem.quantityContent + " Riegel";
  }

  updateSelectorPrice(selectorElement, bundleSelector) {
    const priceElement = bundleSelector.querySelector(".sle_price_pro-price");
    const changedItem = this.allInputProducts.find((inputProduct) => {
      return inputProduct.id === Number(selectorElement.value);
    });

    priceElement.textContent =
      "€" + (changedItem.price / 100).toFixed(2).replace(".", ",");
  }

  updateSelectorTitle(selectorElement, bundleSelector) {
    const titleElement = bundleSelector.querySelector(".selected_pro_title");
    const changedItem = this.allInputProducts.find((inputProduct) => {
      return inputProduct.id === Number(selectorElement.value);
    });

    titleElement.textContent = changedItem.title;
  }

  updateSelectorImage(selectorElement, bundleSelector) {
    const imageThumbnail = bundleSelector.querySelector(".image_thumbnail");
    const changedItem = this.allInputProducts.find((inputProduct) => {
      return inputProduct.id === Number(selectorElement.value);
    });

    let imageSource;

    if (typeof changedItem.bundleCustomProductImage === "object") {
      imageSource = changedItem.bundleCustomProductImage.src;
    } else {
      imageSource = changedItem.bundleCustomProductImage;
    }

    imageThumbnail.src = imageSource;
  }

  updateInputs(selectorElement, bundleSelector) {
    const selectorInput = this.bundleInputs.find((input) => {
      return input.id === bundleSelector.dataset.inputId;
    });
    selectorInput.value = selectorElement.value;

    this.allInputs = this.bundleInputs.map((input) => {
      return Number(input.value);
    });

    this.allInputProducts = this.allInputs.map((inputId) => {
      return this.productsData.products.find(
        (product) => product.id === inputId
      );
    });
  }

  updateMainPrice() {
    const combinedQuantityContents = this.allInputProducts.reduce(
      (accumulator, currentProduct) => {
        return accumulator + currentProduct.quantityContent;
      },
      0
    );

    const combinedPrice = this.allInputProducts.reduce(
      (accumulator, currentProduct) => {
        if (currentProduct.isFreeProduct === false) {
          return accumulator + currentProduct.price;
        }
        return accumulator;
      },
      0
    );

    const mainQuantity =
      this.mainPriceContainer.querySelector(".custom_varint");
    const mainPrice = this.mainPriceContainer.querySelector(".main_price");

    mainQuantity.textContent = combinedQuantityContents + " Riegel";
    mainPrice.textContent =
      "€" +
      (combinedPrice / 100 / combinedQuantityContents)
        .toFixed(2)
        .replace(".", ",") +
      " pro Riegel";
  }
}

customElements.define("bundle-picker", BundlePicker);
