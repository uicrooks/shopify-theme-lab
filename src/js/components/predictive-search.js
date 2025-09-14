import ModalPopover from "./modal-popover";

class PredictiveSearch extends ModalPopover {
  constructor() {
    super();

    this.input = this.querySelector('input[type="search"]');
    this.predictiveSearchResults = this.querySelector(
      "#predictive-search-results"
    );
    this.recommendations = this.querySelector(
      ".predictive-search-container__recommendations"
    );
    this.removeSearchInput = this.querySelector(".remove-search-input");

    this.input.addEventListener(
      "input",
      this.debounce((event) => {
        this.onChange(event);
      }, 300).bind(this)
    );

    this.removeSearchInput.addEventListener("click", () => {
      this.input.value = "";
      this.handleButtons();
      this.onChange();
    });

    this.handleButtons();
  }

  onChange() {
    const searchTerm = this.input.value.trim();

    if (!searchTerm.length) {
      this.close();
      return;
    }

    this.handleButtons();
    this.getSearchResults(searchTerm);
  }

  getSearchResults(searchTerm) {
    fetch(
      `/search/suggest?q=${searchTerm}&resources[options][fields]=title,body,tag,product_type,vendor&section_id=predictive-search`
    )
      .then((response) => {
        if (!response.ok) {
          var error = new Error(response.status);
          this.close();
          throw error;
        }

        return response.text();
      })
      .then((text) => {
        const resultsMarkup = new DOMParser()
          .parseFromString(text, "text/html")
          .querySelector("#shopify-section-predictive-search").innerHTML;
        this.predictiveSearchResults.innerHTML = resultsMarkup;
        this.open();
      })
      .catch((error) => {
        this.close();
        throw error;
      });
  }

  open() {
    this.predictiveSearchResults.style.display = "block";
    if (this.recommendations) {
      this.recommendations.style.display = "none";
    }
  }

  close() {
    this.predictiveSearchResults.style.display = "none";
    if (this.recommendations) {
      this.recommendations.style.display = "block";
    }
  }

  handleButtons() {
    if (this.input.value.length > 0) {
      this.querySelector(".remove-search-input").style.display = "flex";
      this.querySelector(".popover__close-button").style.display = "none";
    } else {
      this.querySelector(".remove-search-input").style.display = "none";
      this.querySelector(".popover__close-button").style.display = "flex";
    }
  }

  debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }
}

customElements.define("predictive-search", PredictiveSearch);
