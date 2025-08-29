class PopoverContainer extends HTMLElement {
  constructor() {
    super();
    this.toggleButton = this.querySelector(".popover-button");
    this.currentSortElement = this.querySelector("#sort-by-selected-value");
    this.sortInputs = this.querySelectorAll('[name="sort_by"]');
    this.popoverContainer = this.querySelector(".popover");
    this.closeButton = this.querySelector(".popover__close-button");
    this.popoverOverlay = this.querySelector(".popover__overlay");
    this.sectionName = "collection";
    this.sectionId = document.querySelector(
      ".collection-template"
    ).dataset.sectionId;
  }

  connectedCallback() {
    this.toggleButton.addEventListener("click", () => {
      this.togglePopover();
    });

    this.sortInputs.forEach((element) => {
      element.addEventListener("change", this._onSortChanged.bind(this));
    });
    this.closeButton.addEventListener("click", () => {
      this.togglePopover();
    });
    this.popoverOverlay.addEventListener("click", () => {
      this.togglePopover();
    });

    document.addEventListener("click", this._onDocumentClick.bind(this));
  }

  _onSortChanged(event) {
    const target = event.target;
    const currentUrl = new URL(location.href);
    currentUrl.searchParams.set("sort_by", target.value);
    currentUrl.searchParams.delete("page");
    this.currentSortElement.textContent = target.title;
    this.sortInputs.forEach((element) => {
      element.removeAttribute("checked");
    });
    target.setAttribute("checked", "checked");
    this.togglePopover();
    history.pushState(null, "", currentUrl.toString());

    this.fetchSortedProducts(target.value);
  }

  fetchSortedProducts(sortBy) {
    const url = `${location.pathname}?sort_by=${sortBy}&view=ajax`; // Ensure the view parameter is set to 'ajax' in Shopify Liquid

    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const fakeDiv = document.createElement("div");
        fakeDiv.innerHTML = data;
        document.querySelector(".grid--view-items").innerHTML =
          fakeDiv.querySelector(".grid--view-items").innerHTML; // Replace the products container with new content
      })
      .catch((error) => console.error("Error:", error));
  }

  togglePopover() {
    if (this.popoverContainer.hasAttribute("open")) {
      this.popoverContainer.removeAttribute("open");
      this.toggleButton.setAttribute("aria-expanded", "false");
      document.body.classList.remove('lock-body');
    } else {
      this.popoverContainer.setAttribute("open", "");
      this.toggleButton.setAttribute("aria-expanded", "true");
      document.body.classList.add('lock-body');
    }
  }

  _onDocumentClick(event) {
    if (this.popoverContainer.hasAttribute("open")) {
      const isClickInside = this.contains(event.target);
      if (!isClickInside) {
        this.togglePopover();
      }
    }
  }
}

customElements.define("popover-container", PopoverContainer);
