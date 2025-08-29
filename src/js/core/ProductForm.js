import Listeners from "@shopify/theme-product-form/listeners";
import { getVariantFromSerializedArray } from "@shopify/theme-product";

let selectors = {
	idInput: '[name="id"]',
	optionInput: '[name^="options"]',
	quantityInput: '[name="quantity"]',
	propertyInput: '[name^="properties"]'
};

// Public Methods
// -----------------------------------------------------------------------------

/**
 * Returns a URL with a variant ID query parameter. Useful for updating window.history
 * with a new URL based on the currently select product variant.
 * @param {string} url - The URL you wish to append the variant ID to
 * @param {number} id  - The variant ID you wish to append to the URL
 * @returns {string} - The new url which includes the variant ID query parameter
 */

export function getUrlWithVariant(url, id) {
	if (/variant=/.test(url)) {
		return url.replace(/(variant=)[^&]+/, "$1" + id);
	} else if (/\?/.test(url)) {
		return url.concat("&variant=").concat(id);
	}

	return url.concat("?variant=").concat(id);
}

/**
 * Constructor class that creates a new instance of a product form controller.
 *
 * @param {Element} element - DOM element which is equal to the <form> node wrapping product form inputs
 * @param {Object} product - A product object
 * @param {Object} options - Optional options object
 * @param {Function} options.onOptionChange - Callback for whenever an option input changes
 * @param {Function} options.onQuantityChange - Callback for whenever an quantity input changes
 * @param {Function} options.onPropertyChange - Callback for whenever a property input changes
 * @param {Function} options.onFormSubmit - Callback for whenever the product form is submitted
 */
export function ProductForm(element, product, options) {
	this.element = element;
	this.product = _validateProductObject(product);

	options = options || {};

	if (options.selectors) {
		selectors = {
			...selectors,
			...options.selectors
		};
	}

	this._listeners = new Listeners();
	this._listeners.add(
		this.element,
		"submit",
		this._onSubmit.bind(this, options)
	);

	this.optionInputs = this._initInputs(
		selectors.optionInput,
		this._onOptionChange.bind(this, options)
	);

	if (options.onQuantityChange) {
		this.quantityInputs = this._initInputs(
			selectors.quantityInput,
			options.onQuantityChange
		);
	}

	if (options.onPropertyChange) {
		this.propertyInputs = this._initInputs(
			selectors.propertyInput,
			options.onPropertyChange
		);
	}
}

/**
 * Cleans up all event handlers that were assigned when the Product Form was constructed.
 * Useful for use when a section needs to be reloaded in the theme editor.
 */
ProductForm.prototype.init = function () {
	this._listeners.removeAll();
};

/**
 * Cleans up all event handlers that were assigned when the Product Form was constructed.
 * Useful for use when a section needs to be reloaded in the theme editor.
 */
ProductForm.prototype.destroy = function () {
	this._listeners.removeAll();
};

/**
 * Getter method which returns the array of currently selected option values
 *
 * @returns {Array} An array of option values
 */
ProductForm.prototype.options = function () {
	return _serializeOptionValues(this.optionInputs, function (item) {
		let regex = /(?:^(options\[))(.*?)(?:\])/;
		item.name = regex.exec(item.name)[2]; // Use just the value between 'options[' and ']'
		return item;
	});
};

/**
 * Getter method which returns the currently selected variant, or `null` if variant
 * doesn't exist.
 *
 * @returns {Object|null} Variant object
 */
ProductForm.prototype.variant = function () {
	return getVariantFromSerializedArray(this.product, this.options());
};

/**
 * Getter method which returns a collection of objects containing name and values
 * of property inputs
 *
 * @returns {Array} Collection of objects with name and value keys
 */
ProductForm.prototype.properties = function () {
	let properties = _serializePropertyValues(
		this.propertyInputs,
		function (propertyName) {
			let regex = /(?:^(properties\[))(.*?)(?:\])/;
			let name = regex.exec(propertyName)[2]; // Use just the value between 'properties[' and ']'
			return name;
		}
	);

	return Object.entries(properties).length === 0 ? null : properties;
};

/**
 * Getter method which returns the current quantity or 1 if no quantity input is
 * included in the form
 *
 * @returns {Array} Collection of objects with name and value keys
 */
ProductForm.prototype.quantity = function () {
	return this.quantityInputs[0]
		? Number.parseInt(this.quantityInputs[0].value, 10)
		: 1;
};

// Private Methods
// -----------------------------------------------------------------------------
ProductForm.prototype._setIdInputValue = function (value) {
	let idInputElement = this.element.querySelector(selectors.idInput);

	if (!idInputElement) {
		idInputElement = document.createElement("input");
		idInputElement.type = "hidden";
		idInputElement.name = "id";
		this.element.appendChild(idInputElement);
	}

	idInputElement.value = value.toString();
};

ProductForm.prototype._onOptionChange = function (options, event) {
	event.dataset = this._getProductFormEventData();

	if (event.dataset.variant) {
		this._setIdInputValue(event.dataset.variant.id);
	}

	if (options.onOptionChange) {
		options.onOptionChange(event);
	}
};

ProductForm.prototype._onSubmit = function (options, event) {
	event.dataset = this._getProductFormEventData();

	if (event.dataset.variant) {
		this._setIdInputValue(event.dataset.variant.id);
	}

	if (options.onFormSubmit) {
		options.onFormSubmit(event);
	}
};

ProductForm.prototype._onFormEvent = function (cb) {
	if (typeof cb === "undefined") {
		return Function.prototype;
	}

	return function (event) {
		event.dataset = this._getProductFormEventData();
		cb(event);
	}.bind(this);
};

ProductForm.prototype._initInputs = function (selector, cb) {
	let elements = Array.prototype.slice.call(
		this.element.querySelectorAll(selector)
	);

	return elements.map(
		function (element) {
			this._listeners.add(element, "change", this._onFormEvent(cb));
			return element;
		}.bind(this)
	);
};

ProductForm.prototype._getProductFormEventData = function () {
	return {
		options: this.options(),
		variant: this.variant(),
		properties: this.properties(),
		quantity: this.quantity()
	};
};

function _serializeOptionValues(inputs, transform) {
	return inputs.reduce(function (options, input) {
		if (
			input.checked || // If input is a checked (means type radio or checkbox)
			(input.type !== "radio" && input.type !== "checkbox") // Or if its any other type of input
		) {
			options.push(transform({ name: input.name, value: input.value }));
		}

		return options;
	}, []);
}

function _serializePropertyValues(inputs, transform) {
	return inputs.reduce(function (properties, input) {
		if (
			input.checked || // If input is a checked (means type radio or checkbox)
			(input.type !== "radio" && input.type !== "checkbox") // Or if its any other type of input
		) {
			properties[transform(input.name)] = input.value;
		}

		return properties;
	}, {});
}

function _validateProductObject(product) {
	if (typeof product !== "object") {
		throw new TypeError(product + " is not an object.");
	}

	if (typeof product.variants[0].options === "undefined") {
		throw new TypeError(
			"Product object is invalid. Make sure you use the product object that is output from {{ product | json }} or from the http://[your-product-url].js route"
		);
	}

	return product;
}

export default ProductForm;
