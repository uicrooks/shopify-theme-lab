window.theme = window.theme || {};

/* ================ SLATE ================ */
window.theme = window.theme || {};

theme.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  document.addEventListener(
    'shopify:section:load',
    this._onSectionLoad.bind(this)
  );
  document.addEventListener(
    'shopify:section:unload',
    this._onSectionUnload.bind(this)
  );
  document.addEventListener(
    'shopify:section:select',
    this._onSelect.bind(this)
  );
  document.addEventListener(
    'shopify:section:deselect',
    this._onDeselect.bind(this)
  );
  document.addEventListener(
    'shopify:block:select',
    this._onBlockSelect.bind(this)
  );
  document.addEventListener(
    'shopify:block:deselect',
    this._onBlockDeselect.bind(this)
  );
};

theme.Sections.prototype = Object.assign({}, theme.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var id = container.getAttribute('data-section-id');
    var type = container.getAttribute('data-section-type');

    constructor = constructor || this.constructors[type];

    if (typeof constructor === 'undefined') {
      return;
    }

    var instance = Object.assign(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = document.querySelector(
      '[data-section-id="' + evt.detail.sectionId + '"]'
    );

    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    this.instances = this.instances.filter(function(instance) {
      var isEventInstance = instance.id === evt.detail.sectionId;

      if (isEventInstance) {
        if (typeof instance.onUnload === 'function') {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });
  },

  _onSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = this.instances.find(function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (
      typeof instance !== 'undefined' &&
      typeof instance.onSelect === 'function'
    ) {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = this.instances.find(function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (
      typeof instance !== 'undefined' &&
      typeof instance.onDeselect === 'function'
    ) {
      instance.onDeselect(evt);
    }
  },

  _onBlockSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = this.instances.find(function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (
      typeof instance !== 'undefined' &&
      typeof instance.onBlockSelect === 'function'
    ) {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = this.instances.find(function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (
      typeof instance !== 'undefined' &&
      typeof instance.onBlockDeselect === 'function'
    ) {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    this.constructors[type] = constructor;

    document.querySelectorAll('[data-section-type="' + type + '"]').forEach(
      function(container) {
        this._createInstance(container, constructor);
      }.bind(this)
    );
  }
});

window.slate = window.slate || {};

/**
 * Slate utilities
 * -----------------------------------------------------------------------------
 * A collection of useful utilities to help build your theme
 *
 *
 * @namespace utils
 */

slate.utils = {
  /**
   * Get the query params in a Url
   * Ex
   * https://mysite.com/search?q=noodles&b
   * getParameterByName('q') = "noodles"
   * getParameterByName('b') = "" (empty value)
   * getParameterByName('test') = null (absent)
   */
  getParameterByName: function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },

  resizeSelects: function(selects) {
    selects.forEach(function(select) {
      var arrowWidth = 55;

      var test = document.createElement('span');
      test.innerHTML = select.selectedOptions[0].label;

      document.querySelector('.site-footer').appendChild(test);

      var width = test.offsetWidth + arrowWidth;
      test.remove();

      select.style.width = width + 'px';
    });
  },

  keyboardKeys: {
    TAB: 9,
    ENTER: 13,
    ESCAPE: 27,
    LEFTARROW: 37,
    RIGHTARROW: 39
  }
};

window.slate = window.slate || {};

/**
 * iFrames
 * -----------------------------------------------------------------------------
 * Wrap videos in div to force responsive layout.
 *
 * @namespace iframes
 */

slate.rte = {
  /**
   * Wrap tables in a container div to make them scrollable when needed
   *
   * @param {object} options - Options to be used
   * @param {NodeList} options.tables - Elements of the table(s) to wrap
   * @param {string} options.tableWrapperClass - table wrapper class name
   */
  wrapTable: function(options) {
    options.tables.forEach(function(table) {
      var wrapper = document.createElement('div');
      wrapper.classList.add(options.tableWrapperClass);

      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  },

  /**
   * Wrap iframes in a container div to make them responsive
   *
   * @param {object} options - Options to be used
   * @param {NodeList} options.iframes - Elements of the iframe(s) to wrap
   * @param {string} options.iframeWrapperClass - class name used on the wrapping div
   */
  wrapIframe: function(options) {
    options.iframes.forEach(function(iframe) {
      var wrapper = document.createElement('div');
      wrapper.classList.add(options.iframeWrapperClass);

      iframe.parentNode.insertBefore(wrapper, iframe);
      wrapper.appendChild(iframe);

      iframe.src = iframe.src;
    });
  }
};

window.slate = window.slate || {};

/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 *
 *
 * @namespace a11y
 */

slate.a11y = {
  state: {
    firstFocusable: null,
    lastFocusable: null
  },
  /**
   * For use when focus shifts to a container rather than a link
   * eg for In-page links, after scroll, focus shifts to content area so that
   * next `tab` is where user expects
   *
   * @param {HTMLElement} element - The element to be acted upon
   */
  pageLinkFocus: function(element) {
    if (!element) return;
    var focusClass = 'js-focus-hidden';

    element.setAttribute('tabIndex', '-1');
    element.focus();
    element.classList.add(focusClass);
    element.addEventListener('blur', callback, { once: true });

    function callback() {
      element.classList.remove(focusClass);
      element.removeAttribute('tabindex');
    }
  },

  /**
   * Traps the focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {HTMLElement} options.container - Container to trap focus within
   * @param {HTMLElement} options.elementToFocus - Element to be focused when focus leaves container
   */
  trapFocus: function(options) {
    var focusableElements = Array.from(
      options.container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex^="-"])'
      )
    ).filter(function(element) {
      var width = element.offsetWidth;
      var height = element.offsetHeight;

      return (
        width !== 0 &&
        height !== 0 &&
        getComputedStyle(element).getPropertyValue('display') !== 'none'
      );
    });

    this.state.firstFocusable = focusableElements[0];
    this.state.lastFocusable = focusableElements[focusableElements.length - 1];

    if (!options.elementToFocus) {
      options.elementToFocus = options.container;
    }

    options.container.setAttribute('tabindex', '-1');
    options.elementToFocus.focus();

    this._setupHandlers();

    document.addEventListener('focusin', this._onFocusInHandler);
    document.addEventListener('focusout', this._onFocusOutHandler);
  },

  _setupHandlers: function() {
    if (!this._onFocusInHandler) {
      this._onFocusInHandler = this._onFocusIn.bind(this);
    }

    if (!this._onFocusOutHandler) {
      this._onFocusOutHandler = this._onFocusIn.bind(this);
    }

    if (!this._manageFocusHandler) {
      this._manageFocusHandler = this._manageFocus.bind(this);
    }
  },

  _onFocusOut: function() {
    document.removeEventListener('keydown', this._manageFocusHandler);
  },

  _onFocusIn: function(evt) {
    if (
      evt.target !== this.state.lastFocusable &&
      evt.target !== this.state.firstFocusable
    )
      return;

    document.addEventListener('keydown', this._manageFocusHandler);
  },

  _manageFocus: function(evt) {
    if (evt.keyCode !== slate.utils.keyboardKeys.TAB) return;

    /**
     * On the last focusable element and tab forward,
     * focus the first element.
     */
    if (evt.target === this.state.lastFocusable && !evt.shiftKey) {
      evt.preventDefault();
      this.state.firstFocusable.focus();
    }
    /**
     * On the first focusable element and tab backward,
     * focus the last element.
     */
    if (evt.target === this.state.firstFocusable && evt.shiftKey) {
      evt.preventDefault();
      this.state.lastFocusable.focus();
    }
  },

  /**
   * Removes the trap of focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {HTMLElement} options.container - Container to trap focus within
   */
  removeTrapFocus: function(options) {
    if (options.container) {
      options.container.removeAttribute('tabindex');
    }
    document.removeEventListener('focusin', this._onFocusInHandler);
  },

  /**
   * Add aria-describedby attribute to external and new window links
   *
   * @param {object} options - Options to be used
   * @param {object} options.messages - Custom messages to be used
   * @param {HTMLElement} options.links - Specific links to be targeted
   */
  accessibleLinks: function(options) {
    var body = document.querySelector('body');

    var idSelectors = {
      newWindow: 'a11y-new-window-message',
      external: 'a11y-external-message',
      newWindowExternal: 'a11y-new-window-external-message'
    };

    if (options.links === undefined || !options.links.length) {
      options.links = document.querySelectorAll(
        'a[href]:not([aria-describedby])'
      );
    }

    function generateHTML(customMessages) {
      if (typeof customMessages !== 'object') {
        customMessages = {};
      }

      var messages = Object.assign(
        {
          newWindow: 'Opens in a new window.',
          external: 'Opens external website.',
          newWindowExternal: 'Opens external website in a new window.'
        },
        customMessages
      );

      var container = document.createElement('ul');
      var htmlMessages = '';

      for (var message in messages) {
        htmlMessages +=
          '<li id=' + idSelectors[message] + '>' + messages[message] + '</li>';
      }

      container.setAttribute('hidden', true);
      container.innerHTML = htmlMessages;

      body.appendChild(container);
    }

    function _externalSite(link) {
      var hostname = window.location.hostname;

      return link.hostname !== hostname;
    }

    options.links.forEach(function(link) {
      var target = link.getAttribute('target');
      var rel = link.getAttribute('rel');
      var isExternal = _externalSite(link);
      var isTargetBlank = target === '_blank';

      if (isExternal) {
        link.setAttribute('aria-describedby', idSelectors.external);
      }

      if (isTargetBlank) {
        if (!rel || rel.indexOf('noopener') === -1) {
          var relValue = rel === undefined ? '' : rel + ' ';
          relValue = relValue + 'noopener';
          link.setAttribute('rel', relValue);
        }

        link.setAttribute('aria-describedby', idSelectors.newWindow);
      }

      if (isExternal && isTargetBlank) {
        link.setAttribute('aria-describedby', idSelectors.newWindowExternal);
      }
    });

    generateHTML(options.messages);
  }
};

/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

theme.Images = (function() {
  /**
   * Preloads an image in memory and uses the browsers cache to store it until needed.
   *
   * @param {Array} images - A list of image urls
   * @param {String} size - A shopify image size attribute
   */

  function preload(images, size) {
    if (typeof images === 'string') {
      images = [images];
    }

    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      this.loadImage(this.getSizedImageUrl(image, size));
    }
  }

  /**
   * Loads and caches an image in the browsers cache.
   * @param {string} path - An image url
   */
  function loadImage(path) {
    new Image().src = path;
  }

  /**
   * Swaps the src of an image for another OR returns the imageURL to the callback function
   * @param image
   * @param element
   * @param callback
   */
  function switchImage(image, element, callback) {
    var size = this.imageSize(element.src);
    var imageUrl = this.getSizedImageUrl(image.src, size);

    if (callback) {
      callback(imageUrl, image, element); // eslint-disable-line callback-return
    } else {
      element.src = imageUrl;
    }
  }

  /**
   * +++ Useful
   * Find the Shopify image attribute size
   *
   * @param {string} src
   * @returns {null}
   */
  function imageSize(src) {
    var match = src.match(
      /.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\\.@]/
    );

    if (match !== null) {
      if (match[2] !== undefined) {
        return match[1] + match[2];
      } else {
        return match[1];
      }
    } else {
      return null;
    }
  }

  /**
   * +++ Useful
   * Adds a Shopify size attribute to a URL
   *
   * @param src
   * @param size
   * @returns {*}
   */
  function getSizedImageUrl(src, size) {
    if (size === null) {
      return src;
    }

    if (size === 'master') {
      return this.removeProtocol(src);
    }

    var match = src.match(
      /\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i
    );

    if (match !== null) {
      var prefix = src.split(match[0]);
      var suffix = match[0];

      return this.removeProtocol(prefix[0] + '_' + size + suffix);
    }

    return null;
  }

  function removeProtocol(path) {
    return path.replace(/http(s)?:/, '');
  }

  return {
    preload: preload,
    loadImage: loadImage,
    switchImage: switchImage,
    imageSize: imageSize,
    getSizedImageUrl: getSizedImageUrl,
    removeProtocol: removeProtocol
  };
})();

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 * Alternatives
 * - Accounting.js - http://openexchangerates.github.io/accounting.js/
 *
 */

theme.Currency = (function() {
  var moneyFormat = '${{amount}}'; // eslint-disable-line camelcase

  function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = format || moneyFormat;

    function formatWithDelimiters(number, precision, thousands, decimal) {
      thousands = thousands || ',';
      decimal = decimal || '.';

      if (isNaN(number) || number === null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        '$1' + thousands
      );
      var centsAmount = parts[1] ? decimal + parts[1] : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
      case 'amount_with_apostrophe_separator':
        value = formatWithDelimiters(cents, 2, "'");
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  return {
    formatMoney: formatMoney
  };
})();

/**
 * Variant Selection scripts
 * ------------------------------------------------------------------------------
 *
 * Handles change events from the variant inputs in any `cart/add` forms that may
 * exist.  Also updates the master select and triggers updates when the variants
 * price or image changes.
 *
 * @namespace variants
 */

slate.Variants = (function() {
  /**
   * Variant constructor
   *
   * @param {object} options - Settings from `product.js`
   */
  function Variants(options) {
    this.container = options.container;
    this.product = options.product;
    this.originalSelectorId = options.originalSelectorId;
    this.enableHistoryState = options.enableHistoryState;
    this.singleOptions = this.container.querySelectorAll(
      options.singleOptionSelector
    );
    this.currentVariant = this._getVariantFromOptions();

    this.singleOptions.forEach(
      function(option) {
        option.addEventListener('change', this._onSelectChange.bind(this));
      }.bind(this)
    );
  }

  Variants.prototype = Object.assign({}, Variants.prototype, {
    /**
     * Get the currently selected options from add-to-cart form. Works with all
     * form input elements.
     *
     * @return {array} options - Values of currently selected variants
     */
    _getCurrentOptions: function() {
      var result = [];

      this.singleOptions.forEach(function(option) {
        var type = option.getAttribute('type');
        var isRadioOrCheckbox = type === 'radio' || type === 'checkbox';

        if (!isRadioOrCheckbox || option.checked) {
          result.push({
            value: option.value,
            index: option.getAttribute('data-index')
          });
        }
      });

      return result;
    },

    /**
     * Find variant based on selected values.
     *
     * @param  {array} selectedValues - Values of variant inputs
     * @return {object || undefined} found - Variant object from product.variants
     */
    _getVariantFromOptions: function() {
      var selectedValues = this._getCurrentOptions();
      var variants = this.product.variants;

      var found = variants.find(function(variant) {
        return selectedValues.every(function(values) {
          return variant[values.index] === values.value;
        });
      });

      return found;
    },

    /**
     * Event handler for when a variant input changes.
     */
    _onSelectChange: function() {
      var variant = this._getVariantFromOptions();

      this.container.dispatchEvent(
        new CustomEvent('variantChange', {
          detail: {
            variant: variant
          },
          bubbles: true,
          cancelable: true
        })
      );

      if (!variant) {
        return;
      }

      this._updateMasterSelect(variant);
      this._updateImages(variant);
      this._updatePrice(variant);
      this._updateSKU(variant);
      this.currentVariant = variant;

      if (this.enableHistoryState) {
        this._updateHistoryState(variant);
      }
    },

    /**
     * Trigger event when variant image changes
     *
     * @param  {object} variant - Currently selected variant
     * @return {event}  variantImageChange
     */
    _updateImages: function(variant) {
      var variantImage = variant.featured_image || {};
      var currentVariantImage = this.currentVariant.featured_image || {};

      if (
        !variant.featured_image ||
        variantImage.src === currentVariantImage.src
      ) {
        return;
      }

      this.container.dispatchEvent(
        new CustomEvent('variantImageChange', {
          detail: {
            variant: variant
          },
          bubbles: true,
          cancelable: true
        })
      );
    },

    /**
     * Trigger event when variant price changes.
     *
     * @param  {object} variant - Currently selected variant
     * @return {event} variantPriceChange
     */
    _updatePrice: function(variant) {
      if (
        variant.price === this.currentVariant.price &&
        variant.compare_at_price === this.currentVariant.compare_at_price &&
        variant.unit_price === this.currentVariant.unit_price
      ) {
        return;
      }

      this.container.dispatchEvent(
        new CustomEvent('variantPriceChange', {
          detail: {
            variant: variant
          },
          bubbles: true,
          cancelable: true
        })
      );
    },

    /**
     * Trigger event when variant sku changes.
     *
     * @param  {object} variant - Currently selected variant
     * @return {event} variantSKUChange
     */
    _updateSKU: function(variant) {
      if (variant.sku === this.currentVariant.sku) {
        return;
      }

      this.container.dispatchEvent(
        new CustomEvent('variantSKUChange', {
          detail: {
            variant: variant
          },
          bubbles: true,
          cancelable: true
        })
      );
    },

    /**
     * Update history state for product deeplinking
     *
     * @param  {variant} variant - Currently selected variant
     * @return {k}         [description]
     */
    _updateHistoryState: function(variant) {
      if (!history.replaceState || !variant) {
        return;
      }

      var newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?variant=' +
        variant.id;
      window.history.replaceState({ path: newurl }, '', newurl);
    },

    /**
     * Update hidden master select of variant change
     *
     * @param  {variant} variant - Currently selected variant
     */
    _updateMasterSelect: function(variant) {
      var masterSelect = this.container.querySelector(this.originalSelectorId);

      if (!masterSelect) return;
      masterSelect.value = variant.id;
    }
  });

  return Variants;
})();

this.Shopify = this.Shopify || {};
this.Shopify.theme = this.Shopify.theme || {};
this.Shopify.theme.PredictiveSearch = (function() {
  'use strict';

  function validateQuery(query) {
    var error;

    if (query === null || query === undefined) {
      error = new TypeError("'query' is missing");
      error.type = 'argument';
      throw error;
    }

    if (typeof query !== 'string') {
      error = new TypeError("'query' is not a string");
      error.type = 'argument';
      throw error;
    }
  }

  function GenericError() {
    var error = Error.call(this);

    error.name = 'Server error';
    error.message = 'Something went wrong on the server';
    error.status = 500;

    return error;
  }

  function NotFoundError(status) {
    var error = Error.call(this);

    error.name = 'Not found';
    error.message = 'Not found';
    error.status = status;

    return error;
  }

  function ServerError() {
    var error = Error.call(this);

    error.name = 'Server error';
    error.message = 'Something went wrong on the server';
    error.status = 500;

    return error;
  }

  function ContentTypeError(status) {
    var error = Error.call(this);

    error.name = 'Content-Type error';
    error.message = 'Content-Type was not provided or is of wrong type';
    error.status = status;

    return error;
  }

  function JsonParseError(status) {
    var error = Error.call(this);

    error.name = 'JSON parse error';
    error.message = 'JSON syntax error';
    error.status = status;

    return error;
  }

  function ThrottledError(status, name, message, retryAfter) {
    var error = Error.call(this);

    error.name = name;
    error.message = message;
    error.status = status;
    error.retryAfter = retryAfter;

    return error;
  }

  function InvalidParameterError(status, name, message) {
    var error = Error.call(this);

    error.name = name;
    error.message = message;
    error.status = status;

    return error;
  }

  function ExpectationFailedError(status, name, message) {
    var error = Error.call(this);

    error.name = name;
    error.message = message;
    error.status = status;

    return error;
  }

  function request(searchUrl, queryParams, query, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var route = searchUrl + '/suggest.json';

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }

      var contentType = xhr.getResponseHeader('Content-Type');

      if (xhr.status >= 500) {
        onError(new ServerError());

        return;
      }

      if (xhr.status === 404) {
        onError(new NotFoundError(xhr.status));

        return;
      }

      if (
        typeof contentType !== 'string' ||
        contentType.toLowerCase().match('application/json') === null
      ) {
        onError(new ContentTypeError(xhr.status));

        return;
      }

      if (xhr.status === 417) {
        try {
          var invalidParameterJson = JSON.parse(xhr.responseText);

          onError(
            new InvalidParameterError(
              xhr.status,
              invalidParameterJson.message,
              invalidParameterJson.description
            )
          );
        } catch (error) {
          onError(new JsonParseError(xhr.status));
        }

        return;
      }

      if (xhr.status === 422) {
        try {
          var expectationFailedJson = JSON.parse(xhr.responseText);

          onError(
            new ExpectationFailedError(
              xhr.status,
              expectationFailedJson.message,
              expectationFailedJson.description
            )
          );
        } catch (error) {
          onError(new JsonParseError(xhr.status));
        }

        return;
      }

      if (xhr.status === 429) {
        try {
          var throttledJson = JSON.parse(xhr.responseText);

          onError(
            new ThrottledError(
              xhr.status,
              throttledJson.message,
              throttledJson.description,
              xhr.getResponseHeader('Retry-After')
            )
          );
        } catch (error) {
          onError(new JsonParseError(xhr.status));
        }

        return;
      }

      if (xhr.status === 200) {
        try {
          var res = JSON.parse(xhr.responseText);
          res.query = query;
          onSuccess(res);
        } catch (error) {
          onError(new JsonParseError(xhr.status));
        }

        return;
      }

      try {
        var genericErrorJson = JSON.parse(xhr.responseText);
        onError(
          new GenericError(
            xhr.status,
            genericErrorJson.message,
            genericErrorJson.description
          )
        );
      } catch (error) {
        onError(new JsonParseError(xhr.status));
      }

      return;
    };

    xhr.open(
      'get',
      route + '?q=' + encodeURIComponent(query) + '&' + queryParams
    );

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();
  }

  function Cache(config) {
    this._store = {};
    this._keys = [];
    if (config && config.bucketSize) {
      this.bucketSize = config.bucketSize;
    } else {
      this.bucketSize = 20;
    }
  }

  Cache.prototype.set = function(key, value) {
    if (this.count() >= this.bucketSize) {
      var deleteKey = this._keys.splice(0, 1);
      this.delete(deleteKey);
    }

    this._keys.push(key);
    this._store[key] = value;

    return this._store;
  };

  Cache.prototype.get = function(key) {
    return this._store[key];
  };

  Cache.prototype.has = function(key) {
    return Boolean(this._store[key]);
  };

  Cache.prototype.count = function() {
    return Object.keys(this._store).length;
  };

  Cache.prototype.delete = function(key) {
    var exists = Boolean(this._store[key]);
    delete this._store[key];
    return exists && !this._store[key];
  };

  function Dispatcher() {
    this.events = {};
  }

  Dispatcher.prototype.on = function(eventName, callback) {
    var event = this.events[eventName];
    if (!event) {
      event = new DispatcherEvent(eventName);
      this.events[eventName] = event;
    }
    event.registerCallback(callback);
  };

  Dispatcher.prototype.off = function(eventName, callback) {
    var event = this.events[eventName];
    if (event && event.callbacks.indexOf(callback) > -1) {
      event.unregisterCallback(callback);
      if (event.callbacks.length === 0) {
        delete this.events[eventName];
      }
    }
  };

  Dispatcher.prototype.dispatch = function(eventName, payload) {
    var event = this.events[eventName];
    if (event) {
      event.fire(payload);
    }
  };

  function DispatcherEvent(eventName) {
    this.eventName = eventName;
    this.callbacks = [];
  }

  DispatcherEvent.prototype.registerCallback = function(callback) {
    this.callbacks.push(callback);
  };

  DispatcherEvent.prototype.unregisterCallback = function(callback) {
    var index = this.callbacks.indexOf(callback);
    if (index > -1) {
      this.callbacks.splice(index, 1);
    }
  };

  DispatcherEvent.prototype.fire = function(payload) {
    var callbacks = this.callbacks.slice(0);
    callbacks.forEach(function(callback) {
      callback(payload);
    });
  };

  function debounce(func, wait) {
    var timeout = null;
    return function() {
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        func.apply(context, args);
      }, wait || 0);
    };
  }

  function objectToQueryParams(obj, parentKey) {
    var output = '';
    parentKey = parentKey || null;

    Object.keys(obj).forEach(function(key) {
      var outputKey = key + '=';
      if (parentKey) {
        outputKey = parentKey + '[' + key + ']';
      }

      switch (trueTypeOf(obj[key])) {
        case 'object':
          output += objectToQueryParams(obj[key], parentKey ? outputKey : key);
          break;
        case 'array':
          output += outputKey + '=' + obj[key].join(',') + '&';
          break;
        default:
          if (parentKey) {
            outputKey += '=';
          }
          output += outputKey + encodeURIComponent(obj[key]) + '&';
          break;
      }
    });

    return output;
  }

  function trueTypeOf(obj) {
    return Object.prototype.toString
      .call(obj)
      .slice(8, -1)
      .toLowerCase();
  }

  var DEBOUNCE_RATE = 10;
  var requestDebounced = debounce(request, DEBOUNCE_RATE);

  function PredictiveSearch(params, searchUrl) {
    if (!params) {
      throw new TypeError('No params object was specified');
    }

    this.searchUrl = searchUrl;

    this._retryAfter = null;
    this._currentQuery = null;

    this.dispatcher = new Dispatcher();
    this.cache = new Cache({ bucketSize: 40 });

    this.queryParams = objectToQueryParams(params);
  }

  PredictiveSearch.TYPES = {
    PRODUCT: 'product',
    PAGE: 'page',
    ARTICLE: 'article'
  };

  PredictiveSearch.FIELDS = {
    AUTHOR: 'author',
    BODY: 'body',
    PRODUCT_TYPE: 'product_type',
    TAG: 'tag',
    TITLE: 'title',
    VARIANTS_BARCODE: 'variants.barcode',
    VARIANTS_SKU: 'variants.sku',
    VARIANTS_TITLE: 'variants.title',
    VENDOR: 'vendor'
  };

  PredictiveSearch.UNAVAILABLE_PRODUCTS = {
    SHOW: 'show',
    HIDE: 'hide',
    LAST: 'last'
  };

  PredictiveSearch.prototype.query = function query(query) {
    try {
      validateQuery(query);
    } catch (error) {
      this.dispatcher.dispatch('error', error);
      return;
    }

    if (query === '') {
      return this;
    }

    this._currentQuery = normalizeQuery(query);
    var cacheResult = this.cache.get(this._currentQuery);
    if (cacheResult) {
      this.dispatcher.dispatch('success', cacheResult);
      return this;
    }

    requestDebounced(
      this.searchUrl,
      this.queryParams,
      query,
      function(result) {
        this.cache.set(normalizeQuery(result.query), result);
        if (normalizeQuery(result.query) === this._currentQuery) {
          this._retryAfter = null;
          this.dispatcher.dispatch('success', result);
        }
      }.bind(this),
      function(error) {
        if (error.retryAfter) {
          this._retryAfter = error.retryAfter;
        }
        this.dispatcher.dispatch('error', error);
      }.bind(this)
    );

    return this;
  };

  PredictiveSearch.prototype.on = function on(eventName, callback) {
    this.dispatcher.on(eventName, callback);

    return this;
  };

  PredictiveSearch.prototype.off = function on(eventName, callback) {
    this.dispatcher.off(eventName, callback);

    return this;
  };

  function normalizeQuery(query) {
    if (typeof query !== 'string') {
      return null;
    }

    return query
      .trim()
      .replace(' ', '-')
      .toLowerCase();
  }

  return PredictiveSearch;
})();

this.Shopify = this.Shopify || {};
this.Shopify.theme = this.Shopify.theme || {};
this.Shopify.theme.PredictiveSearchComponent = (function(PredictiveSearch) {
  'use strict';

  PredictiveSearch =
    PredictiveSearch && PredictiveSearch.hasOwnProperty('default')
      ? PredictiveSearch['default']
      : PredictiveSearch;

  var DEFAULT_PREDICTIVE_SEARCH_API_CONFIG = {
    resources: {
      type: [PredictiveSearch.TYPES.PRODUCT],
      options: {
        unavailable_products: PredictiveSearch.UNAVAILABLE_PRODUCTS.LAST,
        fields: [
          PredictiveSearch.FIELDS.TITLE,
          PredictiveSearch.FIELDS.VENDOR,
          PredictiveSearch.FIELDS.PRODUCT_TYPE,
          PredictiveSearch.FIELDS.VARIANTS_TITLE
        ]
      }
    }
  };

  function PredictiveSearchComponent(config) {
    // validate config
    if (
      !config ||
      !config.selectors ||
      !config.selectors.input ||
      !isString(config.selectors.input) ||
      !config.selectors.result ||
      !isString(config.selectors.result) ||
      !config.resultTemplateFct ||
      !isFunction(config.resultTemplateFct) ||
      !config.numberOfResultsTemplateFct ||
      !isFunction(config.numberOfResultsTemplateFct) ||
      !config.loadingResultsMessageTemplateFct ||
      !isFunction(config.loadingResultsMessageTemplateFct)
    ) {
      var error = new TypeError(
        'PredictiveSearchComponent config is not valid'
      );
      error.type = 'argument';
      throw error;
    }

    // Find nodes
    this.nodes = findNodes(config.selectors);

    // Validate nodes
    if (!isValidNodes(this.nodes)) {
      // eslint-disable-next-line no-console
      console.warn('Could not find valid nodes');
      return;
    }

    this.searchUrl = config.searchUrl || '/search';

    // Store the keyword that was used for the search
    this._searchKeyword = '';

    // Assign result template
    this.resultTemplateFct = config.resultTemplateFct;

    // Assign number of results template
    this.numberOfResultsTemplateFct = config.numberOfResultsTemplateFct;

    // Assign loading state template function
    this.loadingResultsMessageTemplateFct =
      config.loadingResultsMessageTemplateFct;

    // Assign number of search results
    this.numberOfResults = config.numberOfResults || 4;

    // Set classes
    this.classes = {
      visibleVariant: config.visibleVariant
        ? config.visibleVariant
        : 'predictive-search-wrapper--visible',
      itemSelected: config.itemSelectedClass
        ? config.itemSelectedClass
        : 'predictive-search-item--selected',
      clearButtonVisible: config.clearButtonVisibleClass
        ? config.clearButtonVisibleClass
        : 'predictive-search__clear-button--visible'
    };

    this.selectors = {
      searchResult: config.searchResult
        ? config.searchResult
        : '[data-search-result]'
    };

    // Assign callbacks
    this.callbacks = assignCallbacks(config);

    // Add input attributes
    addInputAttributes(this.nodes.input);

    // Add input event listeners
    this._addInputEventListeners();

    // Add body listener
    this._addBodyEventListener();

    // Add accessibility announcer
    this._addAccessibilityAnnouncer();

    // Display the reset button if the input is not empty
    this._toggleClearButtonVisibility();

    // Instantiate Predictive Search API
    this.predictiveSearch = new PredictiveSearch(
      config.PredictiveSearchAPIConfig
        ? config.PredictiveSearchAPIConfig
        : DEFAULT_PREDICTIVE_SEARCH_API_CONFIG,
      this.searchUrl
    );

    // Add predictive search success event listener
    this.predictiveSearch.on(
      'success',
      this._handlePredictiveSearchSuccess.bind(this)
    );

    // Add predictive search error event listener
    this.predictiveSearch.on(
      'error',
      this._handlePredictiveSearchError.bind(this)
    );
  }

  /**
   * Private methods
   */
  function findNodes(selectors) {
    return {
      input: document.querySelector(selectors.input),
      reset: document.querySelector(selectors.reset),
      result: document.querySelector(selectors.result)
    };
  }

  function isValidNodes(nodes) {
    if (
      !nodes ||
      !nodes.input ||
      !nodes.result ||
      nodes.input.tagName !== 'INPUT'
    ) {
      return false;
    }

    return true;
  }

  function assignCallbacks(config) {
    return {
      onBodyMousedown: config.onBodyMousedown,
      onBeforeOpen: config.onBeforeOpen,
      onOpen: config.onOpen,
      onBeforeClose: config.onBeforeClose,
      onClose: config.onClose,
      onInputFocus: config.onInputFocus,
      onInputKeyup: config.onInputKeyup,
      onInputBlur: config.onInputBlur,
      onInputReset: config.onInputReset,
      onBeforeDestroy: config.onBeforeDestroy,
      onDestroy: config.onDestroy
    };
  }

  function addInputAttributes(input) {
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('spellcheck', 'false');
  }

  function removeInputAttributes(input) {
    input.removeAttribute('autocorrect', 'off');
    input.removeAttribute('autocomplete', 'off');
    input.removeAttribute('autocapitalize', 'off');
    input.removeAttribute('spellcheck', 'false');
  }

  /**
   * Public variables
   */
  PredictiveSearchComponent.prototype.isResultVisible = false;
  PredictiveSearchComponent.prototype.results = {};

  /**
   * "Private" variables
   */
  PredictiveSearchComponent.prototype._latencyTimer = null;
  PredictiveSearchComponent.prototype._resultNodeClicked = false;

  /**
   * "Private" instance methods
   */
  PredictiveSearchComponent.prototype._addInputEventListeners = function() {
    var input = this.nodes.input;
    var reset = this.nodes.reset;

    if (!input) {
      return;
    }

    this._handleInputFocus = this._handleInputFocus.bind(this);
    this._handleInputBlur = this._handleInputBlur.bind(this);
    this._handleInputKeyup = this._handleInputKeyup.bind(this);
    this._handleInputKeydown = this._handleInputKeydown.bind(this);

    input.addEventListener('focus', this._handleInputFocus);
    input.addEventListener('blur', this._handleInputBlur);
    input.addEventListener('keyup', this._handleInputKeyup);
    input.addEventListener('keydown', this._handleInputKeydown);

    if (reset) {
      this._handleInputReset = this._handleInputReset.bind(this);
      reset.addEventListener('click', this._handleInputReset);
    }
  };

  PredictiveSearchComponent.prototype._removeInputEventListeners = function() {
    var input = this.nodes.input;

    input.removeEventListener('focus', this._handleInputFocus);
    input.removeEventListener('blur', this._handleInputBlur);
    input.removeEventListener('keyup', this._handleInputKeyup);
    input.removeEventListener('keydown', this._handleInputKeydown);
  };

  PredictiveSearchComponent.prototype._addBodyEventListener = function() {
    this._handleBodyMousedown = this._handleBodyMousedown.bind(this);

    document
      .querySelector('body')
      .addEventListener('mousedown', this._handleBodyMousedown);
  };

  PredictiveSearchComponent.prototype._removeBodyEventListener = function() {
    document
      .querySelector('body')
      .removeEventListener('mousedown', this._handleBodyMousedown);
  };

  PredictiveSearchComponent.prototype._removeClearButtonEventListener = function() {
    var reset = this.nodes.reset;

    if (!reset) {
      return;
    }

    reset.removeEventListener('click', this._handleInputReset);
  };

  /**
   * Event handlers
   */
  PredictiveSearchComponent.prototype._handleBodyMousedown = function(evt) {
    if (this.isResultVisible && this.nodes !== null) {
      if (
        evt.target.isEqualNode(this.nodes.input) ||
        this.nodes.input.contains(evt.target) ||
        evt.target.isEqualNode(this.nodes.result) ||
        this.nodes.result.contains(evt.target)
      ) {
        this._resultNodeClicked = true;
      } else {
        if (isFunction(this.callbacks.onBodyMousedown)) {
          var returnedValue = this.callbacks.onBodyMousedown(this.nodes);
          if (isBoolean(returnedValue) && returnedValue) {
            this.close();
          }
        } else {
          this.close();
        }
      }
    }
  };

  PredictiveSearchComponent.prototype._handleInputFocus = function(evt) {
    if (isFunction(this.callbacks.onInputFocus)) {
      var returnedValue = this.callbacks.onInputFocus(this.nodes);
      if (isBoolean(returnedValue) && !returnedValue) {
        return false;
      }
    }

    if (evt.target.value.length > 0) {
      this._search();
    }

    return true;
  };

  PredictiveSearchComponent.prototype._handleInputBlur = function() {
    // This has to be done async, to wait for the focus to be on the next
    // element and avoid closing the results.
    // Example: Going from the input to the reset button.
    setTimeout(
      function() {
        if (isFunction(this.callbacks.onInputBlur)) {
          var returnedValue = this.callbacks.onInputBlur(this.nodes);
          if (isBoolean(returnedValue) && !returnedValue) {
            return false;
          }
        }

        if (document.activeElement.isEqualNode(this.nodes.reset)) {
          return false;
        }

        if (this._resultNodeClicked) {
          this._resultNodeClicked = false;
          return false;
        }

        this.close();
      }.bind(this)
    );

    return true;
  };

  PredictiveSearchComponent.prototype._addAccessibilityAnnouncer = function() {
    this._accessibilityAnnouncerDiv = window.document.createElement('div');

    this._accessibilityAnnouncerDiv.setAttribute(
      'style',
      'position: absolute !important; overflow: hidden; clip: rect(0 0 0 0); height: 1px; width: 1px; margin: -1px; padding: 0; border: 0;'
    );

    this._accessibilityAnnouncerDiv.setAttribute('data-search-announcer', '');
    this._accessibilityAnnouncerDiv.setAttribute('aria-live', 'polite');
    this._accessibilityAnnouncerDiv.setAttribute('aria-atomic', 'true');

    this.nodes.result.parentElement.appendChild(
      this._accessibilityAnnouncerDiv
    );
  };

  PredictiveSearchComponent.prototype._removeAccessibilityAnnouncer = function() {
    this.nodes.result.parentElement.removeChild(
      this._accessibilityAnnouncerDiv
    );
  };

  PredictiveSearchComponent.prototype._updateAccessibilityAttributesAfterSelectingElement = function(
    previousSelectedElement,
    currentSelectedElement
  ) {
    // Update the active descendant on the search input
    this.nodes.input.setAttribute(
      'aria-activedescendant',
      currentSelectedElement.id
    );

    // Unmark the previousSelected elemented as selected
    if (previousSelectedElement) {
      previousSelectedElement.removeAttribute('aria-selected');
    }

    // Mark the element as selected
    currentSelectedElement.setAttribute('aria-selected', true);
  };

  PredictiveSearchComponent.prototype._clearAriaActiveDescendant = function() {
    this.nodes.input.setAttribute('aria-activedescendant', '');
  };

  PredictiveSearchComponent.prototype._announceNumberOfResultsFound = function(
    results
  ) {
    var currentAnnouncedMessage = this._accessibilityAnnouncerDiv.innerHTML;
    var newMessage = this.numberOfResultsTemplateFct(results);

    // If the messages are the same, they won't get announced
    // add white space so it gets announced
    if (currentAnnouncedMessage === newMessage) {
      newMessage = newMessage + '&nbsp;';
    }

    this._accessibilityAnnouncerDiv.innerHTML = newMessage;
  };

  PredictiveSearchComponent.prototype._announceLoadingState = function() {
    this._accessibilityAnnouncerDiv.innerHTML = this.loadingResultsMessageTemplateFct();
  };

  PredictiveSearchComponent.prototype._handleInputKeyup = function(evt) {
    var UP_ARROW_KEY_CODE = 38;
    var DOWN_ARROW_KEY_CODE = 40;
    var RETURN_KEY_CODE = 13;
    var ESCAPE_KEY_CODE = 27;

    if (isFunction(this.callbacks.onInputKeyup)) {
      var returnedValue = this.callbacks.onInputKeyup(this.nodes);
      if (isBoolean(returnedValue) && !returnedValue) {
        return false;
      }
    }

    this._toggleClearButtonVisibility();

    if (this.isResultVisible && this.nodes !== null) {
      if (evt.keyCode === UP_ARROW_KEY_CODE) {
        this._navigateOption(evt, 'UP');
        return true;
      }

      if (evt.keyCode === DOWN_ARROW_KEY_CODE) {
        this._navigateOption(evt, 'DOWN');
        return true;
      }

      if (evt.keyCode === RETURN_KEY_CODE) {
        this._selectOption();
        return true;
      }

      if (evt.keyCode === ESCAPE_KEY_CODE) {
        this.close();
      }
    }

    if (evt.target.value.length <= 0) {
      this.close();
      this._setKeyword('');
    } else if (evt.target.value.length > 0) {
      this._search();
    }

    return true;
  };

  PredictiveSearchComponent.prototype._handleInputKeydown = function(evt) {
    var RETURN_KEY_CODE = 13;
    var UP_ARROW_KEY_CODE = 38;
    var DOWN_ARROW_KEY_CODE = 40;

    // Prevent the form default submission if there is a selected option
    if (evt.keyCode === RETURN_KEY_CODE && this._getSelectedOption() !== null) {
      evt.preventDefault();
    }

    // Prevent the cursor from moving in the input when using the up and down arrow keys
    if (
      evt.keyCode === UP_ARROW_KEY_CODE ||
      evt.keyCode === DOWN_ARROW_KEY_CODE
    ) {
      evt.preventDefault();
    }
  };

  PredictiveSearchComponent.prototype._handleInputReset = function(evt) {
    evt.preventDefault();

    if (isFunction(this.callbacks.onInputReset)) {
      var returnedValue = this.callbacks.onInputReset(this.nodes);
      if (isBoolean(returnedValue) && !returnedValue) {
        return false;
      }
    }

    this.nodes.input.value = '';
    this.nodes.input.focus();
    this._toggleClearButtonVisibility();
    this.close();

    return true;
  };

  PredictiveSearchComponent.prototype._navigateOption = function(
    evt,
    direction
  ) {
    var currentOption = this._getSelectedOption();

    if (!currentOption) {
      var firstOption = this.nodes.result.querySelector(
        this.selectors.searchResult
      );
      firstOption.classList.add(this.classes.itemSelected);
      this._updateAccessibilityAttributesAfterSelectingElement(
        null,
        firstOption
      );
    } else {
      if (direction === 'DOWN') {
        var nextOption = currentOption.nextElementSibling;
        if (nextOption) {
          currentOption.classList.remove(this.classes.itemSelected);
          nextOption.classList.add(this.classes.itemSelected);
          this._updateAccessibilityAttributesAfterSelectingElement(
            currentOption,
            nextOption
          );
        }
      } else {
        var previousOption = currentOption.previousElementSibling;
        if (previousOption) {
          currentOption.classList.remove(this.classes.itemSelected);
          previousOption.classList.add(this.classes.itemSelected);
          this._updateAccessibilityAttributesAfterSelectingElement(
            currentOption,
            previousOption
          );
        }
      }
    }
  };

  PredictiveSearchComponent.prototype._getSelectedOption = function() {
    return this.nodes.result.querySelector('.' + this.classes.itemSelected);
  };

  PredictiveSearchComponent.prototype._selectOption = function() {
    var selectedOption = this._getSelectedOption();

    if (selectedOption) {
      selectedOption.querySelector('a, button').click();
    }
  };

  PredictiveSearchComponent.prototype._search = function() {
    var newSearchKeyword = this.nodes.input.value;

    if (this._searchKeyword === newSearchKeyword) {
      return;
    }

    clearTimeout(this._latencyTimer);
    this._latencyTimer = setTimeout(
      function() {
        this.results.isLoading = true;

        // Annonuce that we're loading the results
        this._announceLoadingState();

        this.nodes.result.classList.add(this.classes.visibleVariant);
        // NOTE: We could benifit in using DOMPurify.
        // https://github.com/cure53/DOMPurify
        this.nodes.result.innerHTML = this.resultTemplateFct(this.results);
      }.bind(this),
      500
    );

    this.predictiveSearch.query(newSearchKeyword);
    this._setKeyword(newSearchKeyword);
  };

  PredictiveSearchComponent.prototype._handlePredictiveSearchSuccess = function(
    json
  ) {
    clearTimeout(this._latencyTimer);
    this.results = json.resources.results;

    this.results.isLoading = false;
    this.results.products = this.results.products.slice(
      0,
      this.numberOfResults
    );
    this.results.canLoadMore =
      this.numberOfResults <= this.results.products.length;
    this.results.searchQuery = this.nodes.input.value;

    if (this.results.products.length > 0 || this.results.searchQuery) {
      this.nodes.result.innerHTML = this.resultTemplateFct(this.results);
      this._announceNumberOfResultsFound(this.results);
      this.open();
    } else {
      this.nodes.result.innerHTML = '';

      this._closeOnNoResults();
    }
  };

  PredictiveSearchComponent.prototype._handlePredictiveSearchError = function() {
    clearTimeout(this._latencyTimer);
    this.nodes.result.innerHTML = '';

    this._closeOnNoResults();
  };

  PredictiveSearchComponent.prototype._closeOnNoResults = function() {
    if (this.nodes) {
      this.nodes.result.classList.remove(this.classes.visibleVariant);
    }

    this.isResultVisible = false;
  };

  PredictiveSearchComponent.prototype._setKeyword = function(keyword) {
    this._searchKeyword = keyword;
  };

  PredictiveSearchComponent.prototype._toggleClearButtonVisibility = function() {
    if (!this.nodes.reset) {
      return;
    }

    if (this.nodes.input.value.length > 0) {
      this.nodes.reset.classList.add(this.classes.clearButtonVisible);
    } else {
      this.nodes.reset.classList.remove(this.classes.clearButtonVisible);
    }
  };

  /**
   * Public methods
   */
  PredictiveSearchComponent.prototype.open = function() {
    if (this.isResultVisible) {
      return;
    }

    if (isFunction(this.callbacks.onBeforeOpen)) {
      var returnedValue = this.callbacks.onBeforeOpen(this.nodes);
      if (isBoolean(returnedValue) && !returnedValue) {
        return false;
      }
    }

    this.nodes.result.classList.add(this.classes.visibleVariant);
    this.nodes.input.setAttribute('aria-expanded', true);
    this.isResultVisible = true;

    if (isFunction(this.callbacks.onOpen)) {
      return this.callbacks.onOpen(this.nodes) || true;
    }

    return true;
  };

  PredictiveSearchComponent.prototype.close = function() {
    if (!this.isResultVisible) {
      return true;
    }

    if (isFunction(this.callbacks.onBeforeClose)) {
      var returnedValue = this.callbacks.onBeforeClose(this.nodes);
      if (isBoolean(returnedValue) && !returnedValue) {
        return false;
      }
    }

    if (this.nodes) {
      this.nodes.result.classList.remove(this.classes.visibleVariant);
    }

    this.nodes.input.setAttribute('aria-expanded', false);
    this._clearAriaActiveDescendant();
    this._setKeyword('');

    if (isFunction(this.callbacks.onClose)) {
      this.callbacks.onClose(this.nodes);
    }

    this.isResultVisible = false;
    this.results = {};

    return true;
  };

  PredictiveSearchComponent.prototype.destroy = function() {
    this.close();

    if (isFunction(this.callbacks.onBeforeDestroy)) {
      var returnedValue = this.callbacks.onBeforeDestroy(this.nodes);
      if (isBoolean(returnedValue) && !returnedValue) {
        return false;
      }
    }

    this.nodes.result.classList.remove(this.classes.visibleVariant);
    removeInputAttributes(this.nodes.input);
    this._removeInputEventListeners();
    this._removeBodyEventListener();
    this._removeAccessibilityAnnouncer();
    this._removeClearButtonEventListener();

    if (isFunction(this.callbacks.onDestroy)) {
      this.callbacks.onDestroy(this.nodes);
    }

    return true;
  };

  PredictiveSearchComponent.prototype.clearAndClose = function() {
    this.nodes.input.value = '';
    this.close();
  };

  /**
   * Utilities
   */
  function getTypeOf(value) {
    return Object.prototype.toString.call(value);
  }

  function isString(value) {
    return getTypeOf(value) === '[object String]';
  }

  function isBoolean(value) {
    return getTypeOf(value) === '[object Boolean]';
  }

  function isFunction(value) {
    return getTypeOf(value) === '[object Function]';
  }

  return PredictiveSearchComponent;
})(Shopify.theme.PredictiveSearch);

window.theme = window.theme || {};

theme.TouchEvents = function TouchEvents(element, options) {
  this.axis;
  this.checkEvents = [];
  this.eventHandlers = {};
  this.eventModel = {};
  this.events = [
    ['touchstart', 'touchmove', 'touchend', 'touchcancel'],
    ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'],
    ['mousedown', 'mousemove', 'mouseup']
  ];
  this.eventType;
  this.difference = {};
  this.direction;
  this.start = {};

  this.element = element;
  this.options = Object.assign(
    {},
    {
      dragThreshold: 10,
      start: function() {}, // eslint-disable-line
      move: function() {}, // eslint-disable-line
      end: function() {} // eslint-disable-line
    },
    options
  );

  this.checkEvents = this._getCheckEvents();
  this.eventModel = this._getEventModel();

  this._setupEventHandlers();
};

theme.TouchEvents.prototype = Object.assign({}, theme.TouchEvents.prototype, {
  destroy: function() {
    this.element.removeEventListener(
      'dragstart',
      this.eventHandlers.preventDefault
    );

    this.element.removeEventListener(
      this.events[this.eventModel][0],
      this.eventHandlers.touchStart
    );

    if (!this.eventModel) {
      this.element.removeEventListener(
        this.events[2][0],
        this.eventHandlers.touchStart
      );
    }

    this.element.removeEventListener('click', this.eventHandlers.preventClick);
  },

  _setupEventHandlers: function() {
    this.eventHandlers.preventDefault = this._preventDefault.bind(this);
    this.eventHandlers.preventClick = this._preventClick.bind(this);
    this.eventHandlers.touchStart = this._touchStart.bind(this);
    this.eventHandlers.touchMove = this._touchMove.bind(this);
    this.eventHandlers.touchEnd = this._touchEnd.bind(this);

    // Prevent element from dragging when using mouse
    this.element.addEventListener(
      'dragstart',
      this.eventHandlers.preventDefault
    );

    // Bind the touchstart/pointerdown event
    this.element.addEventListener(
      this.events[this.eventModel][0],
      this.eventHandlers.touchStart
    );

    // Bind mousedown if necessary
    if (!this.eventModel) {
      this.element.addEventListener(
        this.events[2][0],
        this.eventHandlers.touchStart
      );
    }

    // No clicking during touch
    this.element.addEventListener('click', this.eventHandlers.preventClick);
  },

  _touchStart: function(event) {
    this.eventType = this.eventModel;

    if (event.type === 'mousedown' && !this.eventModel) {
      this.eventType = 2;
    }

    if (this.checkEvents[this.eventType](event)) return;
    if (this.eventType) this._preventDefault(event);

    document.addEventListener(
      this.events[this.eventType][1],
      this.eventHandlers.touchMove
    );

    document.addEventListener(
      this.events[this.eventType][2],
      this.eventHandlers.touchEnd
    );

    if (this.eventType < 2) {
      document.addEventListener(
        this.events[this.eventType][3],
        this.eventHandlers.touchEnd
      );
    }

    this.start = {
      xPosition: this.eventType ? event.clientX : event.touches[0].clientX,
      yPosition: this.eventType ? event.clientY : event.touches[0].clientY,
      time: new Date().getTime()
    };

    // Ensure we empty out the this.difference object
    Object.keys(this.difference).forEach(
      function(key) {
        delete this.difference[key];
      }.bind(this)
    );

    this.options.start(event);
  },

  _touchMove: function(event) {
    this.difference = this._getDifference(event);

    // Prevent document from scrolling during swipe gesture
    document['on' + this.events[this.eventType][1]] = function(event) {
      this._preventDefault(event);
    }.bind(this);

    // Get the direction user is dragging
    if (!this.axis) {
      if (this.options.dragThreshold < Math.abs(this.difference.xPosition)) {
        this.axis = 'xPosition';
      } else if (
        this.options.dragThreshold < Math.abs(this.difference.yPosition)
      ) {
        this.axis = 'yPosition';
      } else {
        this.axis = false;
      }
    } else if (this.axis === 'xPosition') {
      this.direction = this.difference.xPosition < 0 ? 'left' : 'right';
    } else if (this.axis === 'yPosition') {
      this.direction = this.difference.yPosition < 0 ? 'up' : 'down';
    }

    this.options.move(event, this.direction, this.difference);
  },

  _touchEnd: function(event) {
    document.removeEventListener(
      this.events[this.eventType][1],
      this.eventHandlers.touchMove
    );

    document.removeEventListener(
      this.events[this.eventType][2],
      this.eventHandlers.touchEnd
    );

    if (this.eventType < 2) {
      document.removeEventListener(
        this.events[this.eventType][3],
        this.eventHandlers.touchEnd
      );
    }

    // Re-enable document scrolling
    document['on' + this.events[this.eventType][1]] = function() {
      return true;
    };

    this.options.end(event, this.direction, this.difference);
    this.axis = false;
  },

  _getDifference: function(event) {
    return {
      xPosition:
        (this.eventType ? event.clientX : event.touches[0].clientX) -
        this.start.xPosition,
      yPosition:
        (this.eventType ? event.clientY : event.touches[0].clientY) -
        this.start.yPosition,
      time: new Date().getTime() - this.start.time
    };
  },

  _getCheckEvents: function() {
    return [
      // Touch events
      function(event) {
        // Skip the event if it's a multi-touch or pinch move
        return (
          (event.touches && event.touches.length > 1) ||
          (event.scale && event.scale !== 1)
        );
      },
      // Pointer events
      function(event) {
        // Skip it, if:
        // 1. The event is not primary (other pointers during multi-touch),
        // 2. Left mouse button is not pressed,
        // 3. Event is not a touch event
        return (
          !event.isPrimary ||
          (event.buttons && event.buttons !== 1) ||
          (event.pointerType !== 'touch' && event.pointerType !== 'pen')
        );
      },
      // Mouse events
      function(event) {
        // Skip the event if left mouse button is not pressed
        return event.buttons && event.buttons !== 1;
      }
    ];
  },

  _getEventModel: function() {
    return window.navigator.pointerEnabled ? 1 : 0;
  },

  _preventDefault: function(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
  },

  _preventClick: function(event) {
    if (Math.abs(this.difference.xPosition) > this.options.dragThreshold) {
      this._preventDefault(event);
    }
  }
});


/* ================ GLOBAL ================ */
/*============================================================================
  Drawer modules
==============================================================================*/
theme.Drawers = (function() {
  function Drawer(id, position, options) {
    var DEFAULT_OPEN_CLASS = 'js-drawer-open';
    var DEFAULT_CLOSE_CLASS = 'js-drawer-close';

    var defaults = {
      selectors: {
        openVariant: '.' + DEFAULT_OPEN_CLASS + '-' + position,
        close: '.' + DEFAULT_CLOSE_CLASS
      },
      classes: {
        open: DEFAULT_OPEN_CLASS,
        openVariant: DEFAULT_OPEN_CLASS + '-' + position
      },
      withPredictiveSearch: false
    };

    this.nodes = {
      parents: [document.documentElement, document.body],
      page: document.getElementById('PageContainer')
    };

    this.eventHandlers = {};

    this.config = Object.assign({}, defaults, options);
    this.position = position;
    this.drawer = document.getElementById(id);

    if (!this.drawer) {
      return false;
    }

    this.drawerIsOpen = false;
    this.init();
  }

  Drawer.prototype.init = function() {
    document
      .querySelector(this.config.selectors.openVariant)
      .addEventListener('click', this.open.bind(this));
    this.drawer
      .querySelector(this.config.selectors.close)
      .addEventListener('click', this.close.bind(this));
  };

  Drawer.prototype.open = function(evt) {
    // Keep track if drawer was opened from a click, or called by another function
    var externalCall = false;

    // Prevent following href if link is clicked
    if (evt) {
      evt.preventDefault();
    } else {
      externalCall = true;
    }

    // Without this, the drawer opens, the click event bubbles up to nodes.page
    // which closes the drawer.
    if (evt && evt.stopPropagation) {
      evt.stopPropagation();
      // save the source of the click, we'll focus to this on close
      this.activeSource = evt.currentTarget;
    }

    if (this.drawerIsOpen && !externalCall) {
      return this.close();
    }

    // Add is-transitioning class to moved elements on open so drawer can have
    // transition for close animation
    if (!this.config.withPredictiveSearch) {
      theme.Helpers.prepareTransition(this.drawer);
    }

    this.nodes.parents.forEach(
      function(parent) {
        parent.classList.add(
          this.config.classes.open,
          this.config.classes.openVariant
        );
      }.bind(this)
    );

    this.drawerIsOpen = true;

    // Run function when draw opens if set
    if (
      this.config.onDrawerOpen &&
      typeof this.config.onDrawerOpen === 'function'
    ) {
      if (!externalCall) {
        this.config.onDrawerOpen();
      }
    }

    if (this.activeSource && this.activeSource.hasAttribute('aria-expanded')) {
      this.activeSource.setAttribute('aria-expanded', 'true');
    }

    // Set focus on drawer
    var trapFocusConfig = {
      container: this.drawer
    };

    if (this.config.elementToFocusOnOpen) {
      trapFocusConfig.elementToFocus = this.config.elementToFocusOnOpen;
    }

    slate.a11y.trapFocus(trapFocusConfig);

    this.bindEvents();

    return this;
  };

  Drawer.prototype.close = function() {
    if (!this.drawerIsOpen) {
      // don't close a closed drawer
      return;
    }

    // deselect any focused form elements
    document.activeElement.dispatchEvent(
      new CustomEvent('blur', { bubbles: true, cancelable: true })
    );

    // Ensure closing transition is applied to moved elements, like the nav
    if (!this.config.withPredictiveSearch) {
      theme.Helpers.prepareTransition(this.drawer);
    }

    this.nodes.parents.forEach(
      function(parent) {
        parent.classList.remove(
          this.config.classes.open,
          this.config.classes.openVariant
        );
      }.bind(this)
    );

    if (this.activeSource && this.activeSource.hasAttribute('aria-expanded')) {
      this.activeSource.setAttribute('aria-expanded', 'false');
    }

    this.drawerIsOpen = false;

    // Remove focus on drawer
    slate.a11y.removeTrapFocus({
      container: this.drawer
    });

    this.unbindEvents();

    // Run function when draw closes if set
    if (
      this.config.onDrawerClose &&
      typeof this.config.onDrawerClose === 'function'
    ) {
      this.config.onDrawerClose();
    }
  };

  Drawer.prototype.bindEvents = function() {
    this.eventHandlers.drawerKeyupHandler = function(evt) {
      // close on 'esc' keypress
      if (evt.keyCode === 27) {
        this.close();
        return false;
      } else {
        return true;
      }
    }.bind(this);

    this.eventHandlers.drawerTouchmoveHandler = function() {
      return false;
    };

    this.eventHandlers.drawerClickHandler = function() {
      this.close();
      return false;
    }.bind(this);

    // Add event listener to document body
    document.body.addEventListener(
      'keyup',
      this.eventHandlers.drawerKeyupHandler
    );

    // Lock scrolling on mobile
    this.nodes.page.addEventListener(
      'touchmove',
      this.eventHandlers.drawerTouchmoveHandler
    );

    this.nodes.page.addEventListener(
      'click',
      this.eventHandlers.drawerClickHandler
    );
  };

  Drawer.prototype.unbindEvents = function() {
    this.nodes.page.removeEventListener(
      'touchmove',
      this.eventHandlers.drawerTouchmoveHandler
    );
    this.nodes.page.removeEventListener(
      'click',
      this.eventHandlers.drawerClickHandler
    );
    document.body.removeEventListener(
      'keyup',
      this.eventHandlers.drawerKeyupHandler
    );
  };

  return Drawer;
})();

theme.Helpers = (function() {
  var touchDevice = false;

  var classes = {
    preventScrolling: 'prevent-scrolling'
  };

  var scrollPosition = window.pageYOffset;

  function setTouch() {
    touchDevice = true;
  }

  function isTouch() {
    return touchDevice;
  }

  function enableScrollLock() {
    scrollPosition = window.pageYOffset;
    document.body.style.top = '-' + scrollPosition + 'px';
    document.body.classList.add(classes.preventScrolling);
  }

  function disableScrollLock() {
    document.body.classList.remove(classes.preventScrolling);
    document.body.style.removeProperty('top');
    window.scrollTo(0, scrollPosition);
  }

  function debounce(func, wait, immediate) {
    var timeout;

    return function() {
      var context = this,
        args = arguments;

      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function getScript(source, beforeEl) {
    return new Promise(function(resolve, reject) {
      var script = document.createElement('script');
      var prior = beforeEl || document.getElementsByTagName('script')[0];

      script.async = true;
      script.defer = true;

      // eslint-disable-next-line shopify/prefer-early-return
      function onloadHander(_, isAbort) {
        if (
          isAbort ||
          !script.readyState ||
          /loaded|complete/.test(script.readyState)
        ) {
          script.onload = null;
          script.onreadystatechange = null;
          script = undefined;

          if (isAbort) {
            reject();
          } else {
            resolve();
          }
        }
      }

      script.onload = onloadHander;
      script.onreadystatechange = onloadHander;

      script.src = source;
      prior.parentNode.insertBefore(script, prior);
    });
  }

  /* Based on the prepareTransition by Jonathan Snook */
  /* Jonathan Snook - MIT License - https://github.com/snookca/prepareTransition */
  function prepareTransition(element) {
    element.addEventListener(
      'transitionend',
      function(event) {
        event.currentTarget.classList.remove('is-transitioning');
      },
      { once: true }
    );

    var properties = [
      'transition-duration',
      '-moz-transition-duration',
      '-webkit-transition-duration',
      '-o-transition-duration'
    ];

    var duration = 0;

    properties.forEach(function(property) {
      var computedValue = getComputedStyle(element)[property];

      if (computedValue) {
        computedValue.replace(/\D/g, '');
        duration || (duration = parseFloat(computedValue));
      }
    });

    if (duration !== 0) {
      element.classList.add('is-transitioning');
      element.offsetWidth;
    }
  }

  /*!
   * Serialize all form data into a SearchParams string
   * (c) 2020 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {Node}   form The form to serialize
   * @return {String}      The serialized form data
   */
  function serialize(form) {
    var arr = [];
    Array.prototype.slice.call(form.elements).forEach(function(field) {
      if (
        !field.name ||
        field.disabled ||
        ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1
      )
        return;
      if (field.type === 'select-multiple') {
        Array.prototype.slice.call(field.options).forEach(function(option) {
          if (!option.selected) return;
          arr.push(
            encodeURIComponent(field.name) +
              '=' +
              encodeURIComponent(option.value)
          );
        });
        return;
      }
      if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked)
        return;
      arr.push(
        encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value)
      );
    });
    return arr.join('&');
  }
  function cookiesEnabled() {
    var cookieEnabled = navigator.cookieEnabled;

    if (!cookieEnabled) {
      document.cookie = 'testcookie';
      cookieEnabled = document.cookie.indexOf('testcookie') !== -1;
    }

    return cookieEnabled;
  }

  function promiseStylesheet(stylesheet) {
    var stylesheetUrl = stylesheet || theme.stylesheet;

    if (typeof this.stylesheetPromise === 'undefined') {
      this.stylesheetPromise = new Promise(function(resolve) {
        var link = document.querySelector('link[href="' + stylesheetUrl + '"]');

        if (link.loaded) resolve();

        link.addEventListener('load', function() {
          setTimeout(resolve, 0);
        });
      });
    }

    return this.stylesheetPromise;
  }

  return {
    setTouch: setTouch,
    isTouch: isTouch,
    enableScrollLock: enableScrollLock,
    disableScrollLock: disableScrollLock,
    debounce: debounce,
    getScript: getScript,
    prepareTransition: prepareTransition,
    serialize: serialize,
    cookiesEnabled: cookiesEnabled,
    promiseStylesheet: promiseStylesheet
  };
})();

theme.LibraryLoader = (function() {
  var types = {
    link: 'link',
    script: 'script'
  };

  var status = {
    requested: 'requested',
    loaded: 'loaded'
  };

  var cloudCdn = 'https://cdn.shopify.com/shopifycloud/';

  var libraries = {
    plyrShopifyStyles: {
      tagId: 'plyr-shopify-styles',
      src: cloudCdn + 'plyr/v2.0/shopify-plyr.css',
      type: types.link
    },
    modelViewerUiStyles: {
      tagId: 'shopify-model-viewer-ui-styles',
      src: cloudCdn + 'model-viewer-ui/assets/v1.0/model-viewer-ui.css',
      type: types.link
    }
  };

  function load(libraryName, callback) {
    var library = libraries[libraryName];

    if (!library) return;
    if (library.status === status.requested) return;

    callback = callback || function() {};
    if (library.status === status.loaded) {
      callback();
      return;
    }

    library.status = status.requested;

    var tag;

    switch (library.type) {
      case types.script:
        tag = createScriptTag(library, callback);
        break;
      case types.link:
        tag = createLinkTag(library, callback);
        break;
    }

    tag.id = library.tagId;
    library.element = tag;

    var firstScriptTag = document.getElementsByTagName(library.type)[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  function createScriptTag(library, callback) {
    var tag = document.createElement('script');
    tag.src = library.src;
    tag.addEventListener('load', function() {
      library.status = status.loaded;
      callback();
    });
    return tag;
  }

  function createLinkTag(library, callback) {
    var tag = document.createElement('link');
    tag.href = library.src;
    tag.rel = 'stylesheet';
    tag.type = 'text/css';
    tag.addEventListener('load', function() {
      library.status = status.loaded;
      callback();
    });
    return tag;
  }

  return {
    load: load
  };
})();


/* ================ MODULES ================ */
window.theme = window.theme || {};

theme.Header = (function() {
  var selectors = {
    body: 'body',
    navigation: '#AccessibleNav',
    siteNavHasDropdown: '[data-has-dropdowns]',
    siteNavChildLinks: '.site-nav__child-link',
    siteNavActiveDropdown: '.site-nav--active-dropdown',
    siteNavHasCenteredDropdown: '.site-nav--has-centered-dropdown',
    siteNavCenteredDropdown: '.site-nav__dropdown--centered',
    siteNavLinkMain: '.site-nav__link--main',
    siteNavChildLink: '.site-nav__link--last',
    siteNavDropdown: '.site-nav__dropdown',
    siteHeader: '.site-header'
  };

  var config = {
    activeClass: 'site-nav--active-dropdown',
    childLinkClass: 'site-nav__child-link',
    rightDropdownClass: 'site-nav__dropdown--right',
    leftDropdownClass: 'site-nav__dropdown--left'
  };

  var cache = {};

  function init() {
    cacheSelectors();
    styleDropdowns(document.querySelectorAll(selectors.siteNavHasDropdown));
    positionFullWidthDropdowns();

    cache.parents.forEach(function(element) {
      element.addEventListener('click', submenuParentClickHandler);
    });

    // check when we're leaving a dropdown and close the active dropdown
    cache.siteNavChildLink.forEach(function(element) {
      element.addEventListener('focusout', submenuFocusoutHandler);
    });

    cache.topLevel.forEach(function(element) {
      element.addEventListener('focus', hideDropdown);
    });

    cache.subMenuLinks.forEach(function(element) {
      element.addEventListener('click', stopImmediatePropagation);
    });

    window.addEventListener('resize', resizeHandler);
  }

  function stopImmediatePropagation(event) {
    event.stopImmediatePropagation();
  }

  function cacheSelectors() {
    var navigation = document.querySelector(selectors.navigation);

    cache = {
      nav: navigation,
      topLevel: document.querySelectorAll(selectors.siteNavLinkMain),
      parents: navigation.querySelectorAll(selectors.siteNavHasDropdown),
      subMenuLinks: document.querySelectorAll(selectors.siteNavChildLinks),
      activeDropdown: document.querySelector(selectors.siteNavActiveDropdown),
      siteHeader: document.querySelector(selectors.siteHeader),
      siteNavChildLink: document.querySelectorAll(selectors.siteNavChildLink)
    };
  }

  function showDropdown(element) {
    element.classList.add(config.activeClass);

    if (cache.activeDropdown) hideDropdown();

    cache.activeDropdown = element;

    element
      .querySelector(selectors.siteNavLinkMain)
      .setAttribute('aria-expanded', 'true');

    setTimeout(function() {
      window.addEventListener('keyup', keyUpHandler);
      document.body.addEventListener('click', hideDropdown);
    }, 250);
  }

  function hideDropdown() {
    if (!cache.activeDropdown) return;

    cache.activeDropdown
      .querySelector(selectors.siteNavLinkMain)
      .setAttribute('aria-expanded', 'false');
    cache.activeDropdown.classList.remove(config.activeClass);

    cache.activeDropdown = document.querySelector(
      selectors.siteNavActiveDropdown
    );

    window.removeEventListener('keyup', keyUpHandler);
    document.body.removeEventListener('click', hideDropdown);
  }

  function styleDropdowns(dropdownListItems) {
    dropdownListItems.forEach(function(item) {
      var dropdownLi = item.querySelector(selectors.siteNavDropdown);

      if (!dropdownLi) return;

      if (isRightOfLogo(item)) {
        dropdownLi.classList.remove(config.leftDropdownClass);
        dropdownLi.classList.add(config.rightDropdownClass);
      } else {
        dropdownLi.classList.remove(config.rightDropdownClass);
        dropdownLi.classList.add(config.leftDropdownClass);
      }
    });
  }

  function isRightOfLogo(item) {
    var rect = item.getBoundingClientRect();
    var win = item.ownerDocument.defaultView;
    var leftOffset = rect.left + win.pageXOffset;

    var headerWidth = Math.floor(cache.siteHeader.offsetWidth) / 2;
    return leftOffset > headerWidth;
  }

  function positionFullWidthDropdowns() {
    document
      .querySelectorAll(selectors.siteNavHasCenteredDropdown)
      .forEach(function(el) {
        var fullWidthDropdown = el.querySelector(
          selectors.siteNavCenteredDropdown
        );

        var fullWidthDropdownOffset = el.offsetTop + 41;
        fullWidthDropdown.style.top = fullWidthDropdownOffset + 'px';
      });
  }

  function keyUpHandler(event) {
    if (event.keyCode === 27) hideDropdown();
  }

  function resizeHandler() {
    adjustStyleAndPosition();
  }

  function submenuParentClickHandler(event) {
    var element = event.currentTarget;

    element.classList.contains(config.activeClass)
      ? hideDropdown()
      : showDropdown(element);
  }

  function submenuFocusoutHandler() {
    setTimeout(function() {
      if (
        document.activeElement.classList.contains(config.childLinkClass) ||
        !cache.activeDropdown
      ) {
        return;
      }

      hideDropdown();
    });
  }

  var adjustStyleAndPosition = theme.Helpers.debounce(function() {
    styleDropdowns(document.querySelectorAll(selectors.siteNavHasDropdown));
    positionFullWidthDropdowns();
  }, 50);

  function unload() {
    cache.topLevel.forEach(function(element) {
      element.removeEventListener('focus', hideDropdown);
    });

    cache.subMenuLinks.forEach(function(element) {
      element.removeEventListener('click', stopImmediatePropagation);
    });

    cache.parents.forEach(function(element) {
      element.removeEventListener('click', submenuParentClickHandler);
    });

    cache.siteNavChildLink.forEach(function(element) {
      element.removeEventListener('focusout', submenuFocusoutHandler);
    });

    window.removeEventListener('resize', resizeHandler);
    window.removeEventListener('keyup', keyUpHandler);
    document.body.removeEventListener('click', hideDropdown);
  }

  return {
    init: init,
    unload: unload
  };
})();

window.theme = window.theme || {};

theme.MobileNav = (function() {
  var classes = {
    mobileNavOpenIcon: 'mobile-nav--open',
    mobileNavCloseIcon: 'mobile-nav--close',
    navLinkWrapper: 'mobile-nav__item',
    navLink: 'mobile-nav__link',
    subNavLink: 'mobile-nav__sublist-link',
    return: 'mobile-nav__return-btn',
    subNavActive: 'is-active',
    subNavClosing: 'is-closing',
    navOpen: 'js-menu--is-open',
    subNavShowing: 'sub-nav--is-open',
    thirdNavShowing: 'third-nav--is-open',
    subNavToggleBtn: 'js-toggle-submenu'
  };

  var cache = {};
  var isTransitioning;
  var activeSubNav;
  var activeTrigger;
  var menuLevel = 1;
  var mediumUpQuery = '(min-width: ' + theme.breakpoints.medium + 'px)';
  var mql = window.matchMedia(mediumUpQuery);

  function init() {
    cacheSelectors();

    if (cache.mobileNavToggle) {
      cache.mobileNavToggle.addEventListener('click', toggleMobileNav);
    }

    cache.subNavToggleBtns.forEach(function(element) {
      element.addEventListener('click', toggleSubNav);
    });

    mql.addListener(initBreakpoints);
  }

  function initBreakpoints() {
    if (
      mql.matches &&
      cache.mobileNavContainer.classList.contains(classes.navOpen)
    ) {
      closeMobileNav();
    }
  }

  function toggleMobileNav() {
    var mobileNavIsOpen = cache.mobileNavToggle.classList.contains(
      classes.mobileNavCloseIcon
    );

    if (mobileNavIsOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  function cacheSelectors() {
    cache = {
      pageContainer: document.querySelector('#PageContainer'),
      siteHeader: document.querySelector('.site-header'),
      mobileNavToggle: document.querySelector('.js-mobile-nav-toggle'),
      mobileNavContainer: document.querySelector('.mobile-nav-wrapper'),
      mobileNav: document.querySelector('#MobileNav'),
      sectionHeader: document.querySelector('#shopify-section-header'),
      subNavToggleBtns: document.querySelectorAll('.' + classes.subNavToggleBtn)
    };
  }

  function openMobileNav() {
    var translateHeaderHeight = cache.siteHeader.offsetHeight;

    theme.Helpers.prepareTransition(cache.mobileNavContainer);
    cache.mobileNavContainer.classList.add(classes.navOpen);

    cache.mobileNavContainer.style.transform =
      'translateY(' + translateHeaderHeight + 'px)';

    cache.pageContainer.style.transform =
      'translate3d(0, ' + cache.mobileNavContainer.scrollHeight + 'px, 0)';

    slate.a11y.trapFocus({
      container: cache.sectionHeader,
      elementToFocus: cache.mobileNavToggle
    });

    cache.mobileNavToggle.classList.add(classes.mobileNavCloseIcon);
    cache.mobileNavToggle.classList.remove(classes.mobileNavOpenIcon);
    cache.mobileNavToggle.setAttribute('aria-expanded', true);

    window.addEventListener('keyup', keyUpHandler);
  }

  function keyUpHandler(event) {
    if (event.which === 27) {
      closeMobileNav();
    }
  }

  function closeMobileNav() {
    theme.Helpers.prepareTransition(cache.mobileNavContainer);
    cache.mobileNavContainer.classList.remove(classes.navOpen);
    cache.mobileNavContainer.style.transform = 'translateY(-100%)';
    cache.pageContainer.setAttribute('style', '');

    slate.a11y.trapFocus({
      container: document.querySelector('html'),
      elementToFocus: document.body
    });

    cache.mobileNavContainer.addEventListener(
      'transitionend',
      mobileNavRemoveTrapFocus,
      { once: true }
    );

    cache.mobileNavToggle.classList.add(classes.mobileNavOpenIcon);
    cache.mobileNavToggle.classList.remove(classes.mobileNavCloseIcon);
    cache.mobileNavToggle.setAttribute('aria-expanded', false);
    cache.mobileNavToggle.focus();

    window.removeEventListener('keyup', keyUpHandler);
    window.scrollTo(0, 0);
  }

  function mobileNavRemoveTrapFocus() {
    slate.a11y.removeTrapFocus({
      container: cache.mobileNav
    });
  }

  function toggleSubNav(event) {
    if (isTransitioning) return;

    var toggleBtn = event.currentTarget;
    var isReturn = toggleBtn.classList.contains(classes.return);

    isTransitioning = true;

    if (isReturn) {
      var subNavToggleBtn = document.querySelectorAll(
        '.' + classes.subNavToggleBtn + "[data-level='" + (menuLevel - 1) + "']"
      );

      subNavToggleBtn.forEach(function(element) {
        element.classList.remove(classes.subNavActive);
      });

      if (activeTrigger) {
        activeTrigger.classList.remove(classes.subNavActive);
      }
    } else {
      toggleBtn.classList.add(classes.subNavActive);
    }

    activeTrigger = toggleBtn;

    goToSubnav(toggleBtn.getAttribute('data-target'));
  }

  function goToSubnav(target) {
    var targetMenu = target
      ? document.querySelector(
          '.mobile-nav__dropdown[data-parent="' + target + '"]'
        )
      : cache.mobileNav;

    menuLevel = targetMenu.dataset.level ? Number(targetMenu.dataset.level) : 1;

    if (activeSubNav) {
      theme.Helpers.prepareTransition(activeSubNav);
      activeSubNav.classList.add(classes.subNavClosing);
    }

    activeSubNav = targetMenu;

    var translateMenuHeight = targetMenu.offsetHeight;

    var openNavClass =
      menuLevel > 2 ? classes.thirdNavShowing : classes.subNavShowing;

    cache.mobileNavContainer.style.height = translateMenuHeight + 'px';
    cache.mobileNavContainer.classList.remove(classes.thirdNavShowing);
    cache.mobileNavContainer.classList.add(openNavClass);

    if (!target) {
      cache.mobileNavContainer.classList.remove(
        classes.thirdNavShowing,
        classes.subNavShowing
      );
    }

    /* if going back to first subnav, focus is on whole header */
    var container = menuLevel === 1 ? cache.sectionHeader : targetMenu;

    cache.mobileNavContainer.addEventListener(
      'transitionend',
      trapMobileNavFocus,
      { once: true }
    );

    function trapMobileNavFocus() {
      slate.a11y.trapFocus({
        container: container
      });

      cache.mobileNavContainer.removeEventListener(
        'transitionend',
        trapMobileNavFocus
      );

      isTransitioning = false;
    }

    // Match height of subnav
    cache.pageContainer.style.transform =
      'translateY(' + translateMenuHeight + 'px)';

    activeSubNav.classList.remove(classes.subNavClosing);
  }

  function unload() {
    mql.removeListener(initBreakpoints);
  }

  return {
    init: init,
    unload: unload,
    closeMobileNav: closeMobileNav
  };
})();

window.Modals = (function() {
  function Modal(id, name, options) {
    var defaults = {
      close: '.js-modal-close',
      open: '.js-modal-open-' + name,
      openClass: 'modal--is-active',
      closeModalOnClick: false
    };

    this.modal = document.getElementById(id);

    if (!this.modal) return false;

    this.nodes = {
      parents: [document.querySelector('html'), document.body]
    };

    this.config = Object.assign(defaults, options);

    this.modalIsOpen = false;

    this.focusOnOpen = this.config.focusOnOpen
      ? document.getElementById(this.config.focusOnOpen)
      : this.modal;

    this.openElement = document.querySelector(this.config.open);
    this.init();
  }

  Modal.prototype.init = function() {
    this.openElement.addEventListener('click', this.open.bind(this));

    this.modal
      .querySelector(this.config.close)
      .addEventListener('click', this.closeModal.bind(this));
  };

  Modal.prototype.open = function(evt) {
    var self = this;
    // Keep track if modal was opened from a click, or called by another function
    var externalCall = false;

    if (this.modalIsOpen) return;

    // Prevent following href if link is clicked
    if (evt) {
      evt.preventDefault();
    } else {
      externalCall = true;
    }

    // Without this, the modal opens, the click event bubbles up
    // which closes the modal.
    if (evt && evt.stopPropagation) {
      evt.stopPropagation();
    }

    if (this.modalIsOpen && !externalCall) {
      this.closeModal();
    }

    this.modal.classList.add(this.config.openClass);

    this.nodes.parents.forEach(function(node) {
      node.classList.add(self.config.openClass);
    });

    this.modalIsOpen = true;

    slate.a11y.trapFocus({
      container: this.modal,
      elementToFocus: this.focusOnOpen
    });

    this.bindEvents();
  };

  Modal.prototype.closeModal = function() {
    if (!this.modalIsOpen) return;

    document.activeElement.blur();

    this.modal.classList.remove(this.config.openClass);

    var self = this;

    this.nodes.parents.forEach(function(node) {
      node.classList.remove(self.config.openClass);
    });

    this.modalIsOpen = false;

    slate.a11y.removeTrapFocus({
      container: this.modal
    });

    this.openElement.focus();

    this.unbindEvents();
  };

  Modal.prototype.bindEvents = function() {
    this.keyupHandler = this.keyupHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    document.body.addEventListener('keyup', this.keyupHandler);
    document.body.addEventListener('click', this.clickHandler);
  };

  Modal.prototype.unbindEvents = function() {
    document.body.removeEventListener('keyup', this.keyupHandler);
    document.body.removeEventListener('click', this.clickHandler);
  };

  Modal.prototype.keyupHandler = function(event) {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };

  Modal.prototype.clickHandler = function(event) {
    if (this.config.closeModalOnClick && !this.modal.contains(event.target)) {
      this.closeModal();
    }
  };

  return Modal;
})();

(function() {
  var selectors = {
    backButton: '.return-link'
  };

  var backButton = document.querySelector(selectors.backButton);

  if (!document.referrer || !backButton || !window.history.length) {
    return;
  }

  backButton.addEventListener(
    'click',
    function(evt) {
      evt.preventDefault();

      var referrerDomain = urlDomain(document.referrer);
      var shopDomain = urlDomain(window.location.href);

      if (shopDomain === referrerDomain) {
        history.back();
      }

      return false;
    },
    { once: true }
  );

  function urlDomain(url) {
    var anchor = document.createElement('a');
    anchor.ref = url;

    return anchor.hostname;
  }
})();

theme.Slideshow = (function() {
  var selectors = {
    button: '[data-slider-button]',
    indicator: '[data-slider-indicator]',
    indicators: '[data-slider-indicators]',
    pause: '[data-slider-pause]',
    slider: '[data-slider]',
    sliderItem: '[data-slider-item]',
    sliderItemLink: '[data-slider-item-link]',
    sliderTrack: '[data-slider-track]',
    sliderContainer: '[data-slider-container]'
  };

  var classes = {
    isPaused: 'slideshow__pause--is-paused',
    indicator: 'slider-indicators__item',
    indicatorActive: 'slick-active',
    sliderInitialized: 'slick-initialized',
    slideActive: 'slideshow__slide--active',
    slideClone: 'slick-cloned'
  };

  var attributes = {
    buttonNext: 'data-slider-button-next'
  };

  function Slideshow(container, options) {
    this.container = container;
    this.slider = this.container.querySelector(selectors.slider);

    if (!this.slider) return;

    this.eventHandlers = {};
    this.lastSlide = 0;
    this.slideIndex = 0;
    this.sliderContainer = null;
    this.slides = [];
    this.options = Object.assign(
      {},
      {
        autoplay: false,
        canUseKeyboardArrows: true,
        canUseTouchEvents: false,
        slideActiveClass: classes.slideActive,
        slideInterval: 0,
        slidesToShow: 0,
        slidesToScroll: 1,
        type: 'fade'
      },
      options
    );

    this.sliderContainer = this.slider.querySelector(selectors.sliderContainer);
    this.adaptHeight =
      this.sliderContainer.getAttribute('data-adapt-height') === 'true';
    this.slides = Array.from(
      this.sliderContainer.querySelectorAll(selectors.sliderItem)
    );
    // adding -1 to accomodate Array order
    this.lastSlide = this.slides.length - 1;
    this.buttons = this.container.querySelectorAll(selectors.button);
    this.pause = this.container.querySelector(selectors.pause);
    this.indicators = this.container.querySelectorAll(selectors.indicators);

    if (this.slides.length <= 1) return;

    this.timeout = 250;

    if (this.options.autoplay) {
      this.startAutoplay();
    }

    if (this.adaptHeight) {
      this.setSlideshowHeight();
    }

    if (this.options.type === 'slide') {
      this.isFirstSlide = false;
      this.isLastSlide = false;
      this.sliderItemWidthTotal = 0;
      this.sliderTrack = this.slider.querySelector(selectors.sliderTrack);
      // added setTimeout due to matchMedia calling too early
      // which result wrong value when getting dimension from an element
      this.sliderItemWidthTotal = 0;
      theme.Helpers.promiseStylesheet().then(
        function() {
          this._setupSlideType();
        }.bind(this)
      );
    } else {
      this.setupSlider(0);
    }

    this._setupEventHandlers();
  }

  Slideshow.prototype = Object.assign({}, Slideshow.prototype, {
    /**
     * Moves to the previous slide
     */
    previousSlide: function() {
      this._move();
    },

    /**
     * Moves to the next slide
     */
    nextSlide: function() {
      this._move('next');
    },

    /**
     * Moves to the specified slide
     * @param {Number} index - The index of the slide to move to
     */
    setSlide: function(index) {
      this._setPosition(Number(index));
    },

    /**
     * Starts autoplaying the slider if autoplay is enabled
     */
    startAutoplay: function() {
      this.isAutoPlaying = true;

      window.clearTimeout(this.autoTimeOut);

      this.autoTimeOut = window.setTimeout(
        function() {
          var nextSlideIndex = this._getNextSlideIndex('next');
          this._setPosition(nextSlideIndex);
        }.bind(this),
        this.options.slideInterval
      );
    },

    /**
     * Stops autoplaying the slider if autoplay is enabled
     */
    stopAutoplay: function() {
      this.isAutoPlaying = false;

      window.clearTimeout(this.autoTimeOut);
    },

    /**
     * Set active states for sliders and indicators
     * @param {index} integer - Slide index to set up slider from
     */
    setupSlider: function(index) {
      this.slideIndex = index;

      if (this.indicators.length) {
        this._setActiveIndicator(index);
      }

      this._setupActiveSlide(index);
    },

    /**
     * Removes event listeners, among other things when wanting to destroy the
     * slider instance. This method needs to be called manually and will most
     * likely be included in a section's onUnload() method.
     */
    destroy: function() {
      if (this.adaptHeight) {
        window.removeEventListener('resize', this.eventHandlers.debounceResize);
      }

      this.container.removeEventListener(
        'focus',
        this.eventHandlers.focus,
        true
      );
      this.slider.removeEventListener(
        'focusin',
        this.eventHandlers.focusIn,
        true
      );
      this.slider.removeEventListener(
        'focusout',
        this.eventHandlers.focusOut,
        true
      );
      this.container.removeEventListener('blur', this.eventHandlers.blur, true);

      if (this.buttons) {
        this.buttons.forEach(
          function(button) {
            button.removeEventListener('click', this.eventHandlers.clickButton);
          }.bind(this)
        );
      }

      this.indicators.forEach(function(indicatorWrapper) {
        indicatorWrapper.childNodes.forEach(function(indicator) {
          indicator.firstElementChild.removeEventListener(
            'click',
            this.eventHandlers.onClickIndicator
          );

          indicator.firstElementChild.removeEventListener(
            'keydown',
            this.eventHandlers.onKeydownIndicator
          );
        }, this);
      }, this);

      if (this.options.type === 'slide') {
        window.removeEventListener(
          'resize',
          this.eventHandlers.debounceResizeSlideIn
        );

        if (this.touchEvents && this.options.canUseTouchEvents) {
          this.touchEvents.destroy();
          this.touchEvents = null;
        }
      }
    },

    _setupEventHandlers: function() {
      this.eventHandlers.focus = this._onFocus.bind(this);
      this.eventHandlers.focusIn = this._onFocusIn.bind(this);
      this.eventHandlers.focusOut = this._onFocusOut.bind(this);
      this.eventHandlers.blur = this._onBlur.bind(this);
      this.eventHandlers.keyUp = this._onKeyUp.bind(this);
      this.eventHandlers.clickButton = this._onClickButton.bind(this);
      this.eventHandlers.onClickIndicator = this._onClickIndicator.bind(this);
      this.eventHandlers.onKeydownIndicator = this._onKeydownIndicator.bind(
        this
      );
      this.eventHandlers.onClickPause = this._onClickPause.bind(this);

      if (this.adaptHeight) {
        this.eventHandlers.debounceResize = theme.Helpers.debounce(
          function() {
            this.setSlideshowHeight();
          }.bind(this),
          50
        );

        window.addEventListener('resize', this.eventHandlers.debounceResize);
      }

      this.container.addEventListener('focus', this.eventHandlers.focus, true);
      this.slider.addEventListener('focusin', this.eventHandlers.focusIn, true);
      this.slider.addEventListener(
        'focusout',
        this.eventHandlers.focusOut,
        true
      );
      this.container.addEventListener('blur', this.eventHandlers.blur, true);

      if (this.buttons) {
        this.buttons.forEach(
          function(button) {
            button.addEventListener('click', this.eventHandlers.clickButton);
          }.bind(this)
        );
      }

      if (this.pause) {
        this.pause.addEventListener('click', this.eventHandlers.onClickPause);
      }

      this.indicators.forEach(function(indicatorWrapper) {
        indicatorWrapper.childNodes.forEach(function(indicator) {
          indicator.firstElementChild.addEventListener(
            'click',
            this.eventHandlers.onClickIndicator
          );

          indicator.firstElementChild.addEventListener(
            'keydown',
            this.eventHandlers.onKeydownIndicator
          );
        }, this);
      }, this);

      if (this.options.type === 'slide') {
        this.eventHandlers.debounceResizeSlideIn = theme.Helpers.debounce(
          function() {
            this.sliderItemWidthTotal = 0;
            this._setupSlideType(true);
          }.bind(this),
          50
        );

        window.addEventListener(
          'resize',
          this.eventHandlers.debounceResizeSlideIn
        );

        if (
          this.options.canUseTouchEvents &&
          this.options.slidesToScroll < this.slides.length
        ) {
          this._setupTouchEvents();
        }
      }
    },

    _setupTouchEvents: function() {
      this.touchEvents = new theme.TouchEvents(this.sliderTrack, {
        start: function() {
          this._onTouchStart();
        }.bind(this),
        move: function(event, direction, difference) {
          this._onTouchMove(event, direction, difference);
        }.bind(this),
        end: function(event, direction, difference) {
          this._onTouchEnd(event, direction, difference);
        }.bind(this)
      });
    },

    /**
     * Set slideshop for "slide-in" effect
     * @param {Boolean} onResize if function call came from resize event
     */
    _setupSlideType: function(onResize) {
      this.sliderItemWidth = Math.floor(
        this.sliderContainer.offsetWidth / this.options.slidesToShow
      );
      this.sliderTranslateXMove =
        this.sliderItemWidth * this.options.slidesToScroll;

      if (!onResize) {
        this.sliderContainer.classList.add(classes.sliderInitialized);
      }

      // Loop through all slider items
      // Set width according to the number of items to show in 1 slide
      // Set container width to accomodate all items
      this.slides.forEach(function(sliderItem, index) {
        var sliderItemLink = sliderItem.querySelector(selectors.sliderItemLink);
        sliderItem.style.width = this.sliderItemWidth + 'px';
        sliderItem.setAttribute('aria-hidden', true);
        sliderItem.setAttribute('tabindex', -1);
        this.sliderItemWidthTotal =
          this.sliderItemWidthTotal + sliderItem.offsetWidth;

        if (sliderItemLink) {
          sliderItemLink.setAttribute('tabindex', -1);
        }

        if (index < this.options.slidesToShow) {
          sliderItem.setAttribute('aria-hidden', false);
          sliderItem.classList.add(this.options.slideActiveClass);

          if (sliderItemLink) {
            sliderItemLink.setAttribute('tabindex', 0);
          }
        }
      }, this);

      this.sliderTrack.style.width =
        Math.floor(this.sliderItemWidthTotal) + 'px';
      this.sliderTrack.style.transform = 'translateX(-0px)';

      // set disabled attribute on Previous button
      if (this.buttons.length) {
        this.buttons[0].setAttribute('aria-disabled', true);
        this.buttons[1].removeAttribute('aria-disabled');
      }

      if (this.indicators.length) {
        this._setActiveIndicator(0);
      }
    },

    _onTouchStart: function() {
      this.touchStartPosition = this._getTranslateXPosition();
    },

    _onTouchMove: function(event, direction, difference) {
      // Fix touch events cause unexpected behaviour
      // when the dragging motion goes beyond the theme editor preview.
      var threshold = 80;
      if (
        Shopify.designMode &&
        (event.clientX <= threshold ||
          event.clientX >= window.innerWidth - threshold)
      ) {
        event.target.dispatchEvent(
          new MouseEvent('mouseup', {
            bubbles: true,
            cancelable: true
          })
        );
        return;
      }

      if (direction !== 'left' && direction !== 'right') return;

      this.touchMovePosition = this.touchStartPosition + difference.xPosition;

      this.sliderTrack.style.transform =
        'translateX(' + this.touchMovePosition + 'px';
    },

    _onTouchEnd: function(event, direction, difference) {
      var nextTranslateXPosition = 0;

      if (Object.keys(difference).length === 0) return;

      var slideDirection = direction === 'left' ? 'next' : '';

      if (direction === 'left') {
        if (this._isNextTranslateXLast(this.touchStartPosition)) {
          nextTranslateXPosition = this.touchStartPosition;
        } else {
          nextTranslateXPosition =
            this.touchStartPosition - this.sliderTranslateXMove;
        }
      } else {
        nextTranslateXPosition =
          this.touchStartPosition + this.sliderTranslateXMove;
        if (this._isNextTranslateXFirst(this.touchStartPosition)) {
          nextTranslateXPosition = 0;
        }
      }

      this.slideIndex = this._getNextSlideIndex(slideDirection);

      this.sliderTrack.style.transition = 'transform 500ms ease 0s';
      this.sliderTrack.style.transform =
        'translateX(' + nextTranslateXPosition + 'px';

      window.setTimeout(
        function() {
          this.sliderTrack.style.transition = '';
        }.bind(this),
        500
      );

      this._verifyFirstLastSlideTranslateX(nextTranslateXPosition);

      this._postTransitionEnd();
    },

    /**
     * Events handlers for next and previous button
     * @param {Object} event event handler
     */
    _onClickButton: function(event) {
      // prevent multiple clicks
      if (event.detail > 1) return;

      var button = event.currentTarget;
      var nextButton = button.hasAttribute(attributes.buttonNext);

      if (
        this.options.type === 'slide' &&
        button.getAttribute('aria-disabled') === 'true'
      ) {
        return;
      }

      if (this.options.autoplay && this.isAutoPlaying) {
        this.stopAutoplay();
      }

      if (nextButton) {
        this.nextSlide();
      } else {
        this.previousSlide();
      }
    },

    _onClickIndicator: function(event) {
      event.preventDefault();

      if (event.target.classList.contains(classes.indicatorActive)) return;

      if (this.options.autoplay && this.isAutoPlaying) {
        this.stopAutoplay();
      }

      this.slideIndex = Number(event.target.dataset.slideNumber);
      this.goToSlideByIndex(this.slideIndex);
    },

    goToSlideByIndex: function(index) {
      this._setPosition(index);

      if (this.options.type === 'slide' && this.sliderTrack) {
        this.sliderTrack.style.transition = 'transform 500ms ease 0s';
        var newPosition = index * this.slides[0].offsetWidth;

        this.sliderTrack.style.transform = 'translateX(-' + newPosition + 'px)';

        if (this.options.slidesToShow > 1) {
          this._verifyFirstLastSlideTranslateX(newPosition);

          if (this.buttons.length) {
            this._disableArrows();
          }

          this._setupMultipleActiveSlide(
            index,
            index + (this.options.slidesToShow - 1)
          );
        }
      }
    },

    _onKeydownIndicator: function(event) {
      if (event.keyCode !== slate.utils.keyboardKeys.ENTER) return;

      this._onClickIndicator(event);

      this.slider.focus();
    },

    _onClickPause: function(event) {
      if (!event.currentTarget.classList.contains(classes.isPaused)) {
        event.currentTarget.classList.add(classes.isPaused);
        this.stopAutoplay();
      } else {
        event.currentTarget.classList.remove(classes.isPaused);
        this.startAutoplay();
      }
    },

    _onFocus: function() {
      this.container.addEventListener('keyup', this.eventHandlers.keyUp);
    },

    _onFocusIn: function() {
      if (this.slider.hasAttribute('aria-live')) return;

      if (this.options.autoplay && this.isAutoPlaying) {
        this.stopAutoplay();
      }

      this.slider.setAttribute('aria-live', 'polite');
    },

    _onBlur: function() {
      this.container.removeEventListener('keyup', this.eventHandlers.keyUp);
    },

    _onFocusOut: function() {
      this.slider.removeAttribute('aria-live');

      // Adding a setTimeout because everytime we focus out
      // It automatically goes to <body>
      // We want to resume autoplay when focus is outside of the slideshow container
      setTimeout(
        function() {
          if (
            !document.activeElement.closest(
              '#' + this.slider.getAttribute('id')
            )
          ) {
            if (
              this.options.autoplay &&
              !this.isAutoPlaying &&
              !this.pause.classList.contains(classes.isPaused)
            ) {
              this.startAutoplay();
            }
          }
        }.bind(this),
        this.timeout
      );
    },

    _onKeyUp: function(event) {
      switch (event.keyCode) {
        case slate.utils.keyboardKeys.LEFTARROW:
          if (!this.options.canUseKeyboardArrows) return;

          if (this.options.type === 'slide' && this.isFirstSlide) {
            return;
          }

          this.previousSlide();

          break;
        case slate.utils.keyboardKeys.RIGHTARROW:
          if (!this.options.canUseKeyboardArrows) return;

          if (this.options.type === 'slide' && this.isLastSlide) {
            return;
          }

          this.nextSlide();

          break;
        case slate.utils.keyboardKeys.ESCAPE:
          this.slider.blur();
          break;
      }
    },

    _move: function(direction) {
      if (this.options.type === 'slide') {
        this.slideIndex = this._getNextSlideIndex(direction);
        this._moveSlideshow(direction);
      } else {
        var nextSlideIndex = this._getNextSlideIndex(direction);
        this._setPosition(nextSlideIndex);
      }
    },

    _moveSlideshow: function(direction) {
      this.direction = direction;
      var valueXToMove = 0;

      // Get current position of translateX
      var currentTranslateXPosition = this._getTranslateXPosition();
      var currentActiveSlidesIndex = this._getActiveSlidesIndex();

      // In the future, we'll use ES6 deconstructure
      // Math.min(...currentActiveSlidesIndex);
      var currentActiveSlidesMinIndex = Math.min.apply(
        Math,
        currentActiveSlidesIndex
      );
      var currentActiveSlidesMaxIndex = Math.max.apply(
        Math,
        currentActiveSlidesIndex
      );

      // Set the next active state depending on the direction
      // We bump up the index depending on the "slidesToShow" option
      this.nextMinIndex =
        direction === 'next'
          ? currentActiveSlidesMinIndex + this.options.slidesToShow
          : currentActiveSlidesMinIndex - this.options.slidesToShow;
      this.nextMaxIndex =
        direction === 'next'
          ? currentActiveSlidesMaxIndex + this.options.slidesToShow
          : currentActiveSlidesMinIndex - 1;

      this.sliderTrack.style.transition = 'transform 500ms ease 0s';

      if (direction === 'next') {
        valueXToMove = currentTranslateXPosition - this.sliderTranslateXMove;
        this.sliderTrack.style.transform = 'translateX(' + valueXToMove + 'px)';
      } else {
        valueXToMove = currentTranslateXPosition + this.sliderTranslateXMove;
        this.sliderTrack.style.transform = 'translateX(' + valueXToMove + 'px)';
      }

      this._verifyFirstLastSlideTranslateX(valueXToMove);

      this._postTransitionEnd();

      this._setupMultipleActiveSlide(this.nextMinIndex, this.nextMaxIndex);
    },

    _setPosition: function(nextSlideIndex) {
      this.slideIndex = nextSlideIndex;

      if (this.indicators.length) {
        this._setActiveIndicator(nextSlideIndex);
      }

      this._setupActiveSlide(nextSlideIndex);

      if (this.options.autoplay && this.isAutoPlaying) {
        this.startAutoplay();
      }

      this.container.dispatchEvent(
        new CustomEvent('slider_slide_changed', {
          detail: nextSlideIndex
        })
      );
    },

    _setupActiveSlide: function(index) {
      this.slides.forEach(function(slide) {
        slide.setAttribute('aria-hidden', true);
        slide.classList.remove(this.options.slideActiveClass);
      }, this);

      this.slides[index].setAttribute('aria-hidden', false);
      this.slides[index].classList.add(this.options.slideActiveClass);
    },

    /**
     * Loops through all slide items
     * Set the active state depending the direction and slide indexes
     * Because slide-in effect can have multiple items in 1 slide, we need to target multiple active elements
     * @param {String} direction "next" for next slides or empty string for previous
     * @param {*} minIndex the current active minimum index
     * @param {*} maxIndex the current active maximum index
     */
    _setupMultipleActiveSlide: function(minIndex, maxIndex) {
      this.slides.forEach(function(slide) {
        var sliderIndex = Number(slide.getAttribute('data-slider-slide-index'));
        var sliderItemLink = slide.querySelector(selectors.sliderItemLink);

        slide.setAttribute('aria-hidden', true);
        slide.classList.remove(this.options.slideActiveClass);
        if (sliderItemLink) {
          sliderItemLink.setAttribute('tabindex', -1);
        }

        if (sliderIndex >= minIndex && sliderIndex <= maxIndex) {
          slide.setAttribute('aria-hidden', false);
          slide.classList.add(this.options.slideActiveClass);

          if (sliderItemLink) {
            sliderItemLink.setAttribute('tabindex', 0);
          }
        }
      }, this);
    },

    _setActiveIndicator: function(index) {
      this.indicators.forEach(function(indicatorWrapper) {
        var activeIndicator = indicatorWrapper.querySelector(
          '.' + classes.indicatorActive
        );

        var nextIndicator = indicatorWrapper.childNodes[index];

        if (activeIndicator) {
          activeIndicator.setAttribute('aria-selected', false);
          activeIndicator.classList.remove(classes.indicatorActive);
          activeIndicator.firstElementChild.removeAttribute('aria-current');
        }

        nextIndicator.classList.add(classes.indicatorActive);
        nextIndicator.setAttribute('aria-selected', true);
        nextIndicator.firstElementChild.setAttribute('aria-current', true);
      }, this);
    },

    setSlideshowHeight: function() {
      var minAspectRatio = this.sliderContainer.getAttribute(
        'data-min-aspect-ratio'
      );
      this.sliderContainer.style.height =
        document.documentElement.offsetWidth / minAspectRatio + 'px';
    },

    /**
     * Increase or decrease index position of the slideshow
     * Automatically auto-rotate
     * - Last slide goes to first slide when clicking "next"
     * - First slide goes to last slide when clicking "previous"
     * @param {String} direction "next" as a String, other empty string is previous slide
     */
    _getNextSlideIndex: function(direction) {
      var counter = direction === 'next' ? 1 : -1;

      if (direction === 'next') {
        if (this.slideIndex === this.lastSlide) {
          return this.options.type === 'slide' ? this.lastSlide : 0;
        }
      } else if (!this.slideIndex) {
        return this.options.type === 'slide' ? 0 : this.lastSlide;
      }

      return this.slideIndex + counter;
    },

    /**
     * In "slide-in" type, multiple items are active in 1 slide
     * This will return an array containing their indexes
     */
    _getActiveSlidesIndex: function() {
      var currentActiveSlides = this.slides.filter(function(sliderItem) {
        if (sliderItem.classList.contains(this.options.slideActiveClass)) {
          return sliderItem;
        }
      }, this);
      var currentActiveSlidesIndex = currentActiveSlides.map(function(
        sliderItem
      ) {
        return Number(sliderItem.getAttribute('data-slider-slide-index'));
      });

      return currentActiveSlidesIndex;
    },

    /**
     * This checks the next "translateX" value and verifies
     * If it's at the last slide or beginning of the slide
     * So we can disable the arrow buttons
     */
    _disableArrows: function() {
      if (this.buttons.length === 0) return;

      var previousButton = this.buttons[0];
      var nextButton = this.buttons[1];

      // first slide
      if (this.isFirstSlide) {
        previousButton.setAttribute('aria-disabled', true);
      } else {
        previousButton.removeAttribute('aria-disabled');
      }

      // last slide
      if (this.isLastSlide) {
        nextButton.setAttribute('aria-disabled', true);
      } else {
        nextButton.removeAttribute('aria-disabled');
      }
    },

    /**
     * Verify if translateX reaches at first or last slide
     * @param {Number} translateXValue
     */
    _verifyFirstLastSlideTranslateX: function(translateXValue) {
      // first slide
      if (this._isNextTranslateXFirst(translateXValue)) {
        this.isFirstSlide = true;
      } else {
        this.isFirstSlide = false;
      }

      // last slide
      if (this._isNextTranslateXLast(translateXValue)) {
        this.isLastSlide = true;
      } else {
        this.isLastSlide = false;
      }
    },

    _getTranslateXPosition: function() {
      return Number(this.sliderTrack.style.transform.match(/(-?[0-9]+)/g)[0]);
    },

    _isNextTranslateXFirst: function(translateXValue) {
      return translateXValue === 0;
    },

    _isNextTranslateXLast: function(translateXValue) {
      // because translateX values are using negative, I'm converting into positive value
      var translateXValueAbsolute = Math.abs(translateXValue);
      var nextTranslateXValue =
        translateXValueAbsolute + this.sliderTranslateXMove;

      return nextTranslateXValue >= this.sliderItemWidthTotal;
    },

    _postTransitionEnd: function() {
      if (this.buttons.length) {
        this._disableArrows();
      }

      if (this.indicators.length) {
        this._setActiveIndicator(this.slideIndex);
      }
    }
  });

  return Slideshow;
})();

theme.Video = (function() {
  var autoplayCheckComplete = false;
  var playOnClickChecked = false;
  var playOnClick = false;
  var youtubeLoaded = false;
  var videos = {};
  var videoPlayers = [];
  var videoOptions = {
    ratio: 16 / 9,
    scrollAnimationDuration: 400,
    playerVars: {
      // eslint-disable-next-line camelcase
      iv_load_policy: 3,
      modestbranding: 1,
      autoplay: 0,
      controls: 0,
      wmode: 'opaque',
      branding: 0,
      autohide: 0,
      rel: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerChange
    }
  };
  var classes = {
    playing: 'video-is-playing',
    paused: 'video-is-paused',
    loading: 'video-is-loading',
    loaded: 'video-is-loaded',
    backgroundVideoWrapper: 'video-background-wrapper',
    videoWithImage: 'video--image_with_play',
    backgroundVideo: 'video--background',
    userPaused: 'is-paused',
    supportsAutoplay: 'autoplay',
    supportsNoAutoplay: 'no-autoplay',
    wrapperMinHeight: 'video-section-wrapper--min-height'
  };

  var selectors = {
    section: '.video-section',
    videoWrapper: '.video-section-wrapper',
    playVideoBtn: '.video-control__play',
    closeVideoBtn: '.video-control__close-wrapper',
    pauseVideoBtn: '.video__pause',
    pauseVideoStop: '.video__pause-stop',
    pauseVideoResume: '.video__pause-resume',
    fallbackText: '.icon__fallback-text'
  };

  /**
   * Public functions
   */
  function init(video) {
    if (!video) return;

    videos[video.id] = {
      id: video.id,
      videoId: video.dataset.id,
      type: video.dataset.type,
      status:
        video.dataset.type === 'image_with_play' ? 'closed' : 'background', // closed, open, background
      video: video,
      videoWrapper: video.closest(selectors.videoWrapper),
      section: video.closest(selectors.section),
      controls: video.dataset.type === 'background' ? 0 : 1
    };

    if (!youtubeLoaded) {
      // This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    playOnClickCheck();
  }

  function customPlayVideo(playerId) {
    // Make sure we have carried out the playOnClick check first
    if (!playOnClickChecked && !playOnClick) {
      return;
    }

    if (playerId && typeof videoPlayers[playerId].playVideo === 'function') {
      privatePlayVideo(playerId);
    }
  }

  function pauseVideo(playerId) {
    if (
      videoPlayers[playerId] &&
      typeof videoPlayers[playerId].pauseVideo === 'function'
    ) {
      videoPlayers[playerId].pauseVideo();
    }
  }

  function loadVideos() {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        createPlayer(key);
      }
    }

    initEvents();
    youtubeLoaded = true;
  }

  function editorLoadVideo(key) {
    if (!youtubeLoaded) {
      return;
    }
    createPlayer(key);

    initEvents();
  }

  /**
   * Private functions
   */

  function privatePlayVideo(id, clicked) {
    var videoData = videos[id];
    var player = videoPlayers[id];
    var videoWrapper = videoData.videoWrapper;

    if (playOnClick) {
      // playOnClick means we are probably on mobile (no autoplay).
      // setAsPlaying will show the iframe, requiring another click
      // to play the video.
      setAsPlaying(videoData);
    } else if (clicked || autoplayCheckComplete) {
      // Play if autoplay is available or clicked to play
      videoWrapper.classList.remove(classes.loading);
      setAsPlaying(videoData);
      player.playVideo();
      return;
    } else {
      player.playVideo();
    }
  }

  function setAutoplaySupport(supported) {
    var supportClass = supported
      ? classes.supportsAutoplay
      : classes.supportsNoAutoplay;
    document.documentElement.classList.remove(
      classes.supportsAutoplay,
      classes.supportsNoAutoplay
    );
    document.documentElement.classList.add(supportClass);

    if (!supported) {
      playOnClick = true;
    }

    autoplayCheckComplete = true;
  }

  function playOnClickCheck() {
    if (playOnClickChecked) {
      return;
    }

    if (isMobile()) {
      playOnClick = true;
    }

    if (playOnClick) {
      // No need to also do the autoplay check
      setAutoplaySupport(false);
    }

    playOnClickChecked = true;
  }

  // The API will call this function when each video player is ready
  function onPlayerReady(evt) {
    evt.target.setPlaybackQuality('hd1080');
    var videoData = getVideoOptions(evt);
    var videoTitle = evt.target.getVideoData().title;
    playOnClickCheck();

    // Prevent tabbing through YouTube player controls until visible
    document.getElementById(videoData.id).setAttribute('tabindex', '-1');

    sizeBackgroundVideos();
    setButtonLabels(videoData.videoWrapper, videoTitle);

    // Customize based on options from the video ID
    if (videoData.type === 'background') {
      evt.target.mute();
      privatePlayVideo(videoData.id);
    }

    videoData.videoWrapper.classList.add(classes.loaded);
  }

  function onPlayerChange(evt) {
    var videoData = getVideoOptions(evt);
    if (
      videoData.status === 'background' &&
      !isMobile() &&
      !autoplayCheckComplete &&
      (evt.data === YT.PlayerState.PLAYING ||
        evt.data === YT.PlayerState.BUFFERING)
    ) {
      setAutoplaySupport(true);
      autoplayCheckComplete = true;
      videoData.videoWrapper.classList.remove(classes.loading);
    }
    switch (evt.data) {
      case YT.PlayerState.ENDED:
        setAsFinished(videoData);
        break;
      case YT.PlayerState.PAUSED:
        // Seeking on a YouTube video also fires a PAUSED state change,
        // checking the state after a delay prevents us pausing the video when
        // the user is seeking instead of pausing
        setTimeout(function() {
          if (evt.target.getPlayerState() === YT.PlayerState.PAUSED) {
            setAsPaused(videoData);
          }
        }, 200);
        break;
    }
  }

  function setAsFinished(videoData) {
    switch (videoData.type) {
      case 'background':
        videoPlayers[videoData.id].seekTo(0);
        break;
      case 'image_with_play':
        closeVideo(videoData.id);
        toggleExpandVideo(videoData.id, false);
        break;
    }
  }

  function setAsPlaying(videoData) {
    var videoWrapper = videoData.videoWrapper;
    var pauseButton = videoWrapper.querySelector(selectors.pauseVideoBtn);

    videoWrapper.classList.remove(classes.loading);

    if (pauseButton.classList.contains(classes.userPaused)) {
      pauseButton.classList.remove(classes.userPaused);
    }

    // Do not change element visibility if it is a background video
    if (videoData.status === 'background') {
      return;
    }

    document.getElementById(videoData.id).setAttribute('tabindex', '0');

    if (videoData.type === 'image_with_play') {
      videoWrapper.classList.remove(classes.paused);
      videoWrapper.classList.add(classes.playing);
    }

    // Update focus to the close button so we stay within the video wrapper,
    // allowing time for the scroll animation
    setTimeout(function() {
      videoWrapper.querySelector(selectors.closeVideoBtn).focus();
    }, videoOptions.scrollAnimationDuration);
  }

  function setAsPaused(videoData) {
    var videoWrapper = videoData.videoWrapper;

    // YT's events fire after our click event. This status flag ensures
    // we don't interact with a closed or background video.
    if (videoData.type === 'image_with_play') {
      if (videoData.status === 'closed') {
        videoWrapper.classList.remove(classes.paused);
      } else {
        videoWrapper.classList.add(classes.paused);
      }
    }

    videoWrapper.classList.remove(classes.playing);
  }

  function closeVideo(playerId) {
    var videoData = videos[playerId];
    var videoWrapper = videoData.videoWrapper;

    document.getElementById(videoData.id).setAttribute('tabindex', '-1');

    videoData.status = 'closed';

    switch (videoData.type) {
      case 'image_with_play':
        videoPlayers[playerId].stopVideo();
        setAsPaused(videoData); // in case the video is already paused
        break;
      case 'background':
        videoPlayers[playerId].mute();
        setBackgroundVideo(playerId);
        break;
    }

    videoWrapper.classList.remove(classes.paused, classes.playing);
  }

  function getVideoOptions(evt) {
    var id = evt.target.getIframe().id;
    return videos[id];
  }

  function toggleExpandVideo(playerId, expand) {
    var video = videos[playerId];
    var elementTop =
      video.videoWrapper.getBoundingClientRect().top + window.pageYOffset;
    var playButton = video.videoWrapper.querySelector(selectors.playVideoBtn);
    var offset = 0;
    var newHeight = 0;

    if (isMobile()) {
      video.videoWrapper.parentElement.classList.toggle('page-width', !expand);
    }

    if (expand) {
      if (isMobile()) {
        newHeight = window.innerWidth / videoOptions.ratio;
      } else {
        newHeight = video.videoWrapper.offsetWidth / videoOptions.ratio;
      }
      offset = (window.innerHeight - newHeight) / 2;

      video.videoWrapper.style.height =
        video.videoWrapper.getBoundingClientRect().height + 'px';
      video.videoWrapper.classList.remove(classes.wrapperMinHeight);
      video.videoWrapper.style.height = newHeight + 'px';

      // Animate doesn't work in mobile editor, so we don't use it
      if (!(isMobile() && Shopify.designMode)) {
        var scrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'smooth';
        window.scrollTo({ top: elementTop - offset });
        document.documentElement.style.scrollBehavior = scrollBehavior;
      }
    } else {
      if (isMobile()) {
        newHeight = video.videoWrapper.dataset.mobileHeight;
      } else {
        newHeight = video.videoWrapper.dataset.desktopHeight;
      }

      video.videoWrapper.style.height = newHeight + 'px';

      setTimeout(function() {
        video.videoWrapper.classList.add(classes.wrapperMinHeight);
      }, 600);
      // Set focus on play button, but don't scroll page
      var x = window.scrollX;
      var y = window.scrollY;
      playButton.focus();
      window.scrollTo(x, y);
    }
  }

  function togglePause(playerId) {
    var pauseButton = videos[playerId].videoWrapper.querySelector(
      selectors.pauseVideoBtn
    );
    var paused = pauseButton.classList.contains(classes.userPaused);
    if (paused) {
      pauseButton.classList.remove(classes.userPaused);
      customPlayVideo(playerId);
    } else {
      pauseButton.classList.add(classes.userPaused);
      pauseVideo(playerId);
    }
    pauseButton.setAttribute('aria-pressed', !paused);
  }

  function startVideoOnClick(playerId) {
    var video = videos[playerId];

    // add loading class to wrapper
    video.videoWrapper.classList.add(classes.loading);

    // Explicity set the video wrapper height (needed for height transition)
    video.videoWrapper.style.height = video.videoWrapper.offsetHeight + 'px';

    video.status = 'open';

    switch (video.type) {
      case 'image_with_play':
        privatePlayVideo(playerId, true);
        break;
      case 'background':
        unsetBackgroundVideo(playerId, video);
        videoPlayers[playerId].unMute();
        privatePlayVideo(playerId, true);
        break;
    }

    toggleExpandVideo(playerId, true);

    // esc to close video player
    document.addEventListener('keydown', handleVideoPlayerKeydown);
  }

  var handleVideoPlayerKeydown = function(evt) {
    var playerId = document.activeElement.dataset.controls;
    if (evt.keyCode !== slate.utils.keyboardKeys.ESCAPE || !playerId) {
      return;
    }

    closeVideo(playerId);
    toggleExpandVideo(playerId, false);
  };

  function sizeBackgroundVideos() {
    var backgroundVideos = document.querySelectorAll(
      '.' + classes.backgroundVideo
    );
    backgroundVideos.forEach(function(el) {
      sizeBackgroundVideo(el);
    });
  }

  function sizeBackgroundVideo(videoPlayer) {
    if (!youtubeLoaded) {
      return;
    }

    if (isMobile()) {
      videoPlayer.style.cssText = null;
    } else {
      var videoWrapper = videoPlayer.closest(selectors.videoWrapper);
      var videoWidth = videoWrapper.clientWidth;
      var playerWidth = videoPlayer.clientWidth;
      var desktopHeight = videoWrapper.dataset.desktopHeight;

      // when screen aspect ratio differs from video, video must center and underlay one dimension
      if (videoWidth / videoOptions.ratio < desktopHeight) {
        playerWidth = Math.ceil(desktopHeight * videoOptions.ratio); // get new player width
        var styles =
          'width: ' +
          playerWidth +
          'px; height: ' +
          desktopHeight +
          'px; left: ' +
          (videoWidth - playerWidth) / 2 +
          'px; top: 0;';
        videoPlayer.style.cssText = styles;
      } else {
        // new video width < window width (gap to right)
        desktopHeight = Math.ceil(videoWidth / videoOptions.ratio); // get new player height
        var styles2 =
          'width: ' +
          videoWidth +
          'px; height: ' +
          desktopHeight +
          'px; top: ' +
          (desktopHeight - desktopHeight) / 2 +
          'px; left: 0;'; // player height is greater, offset top; reset left
        videoPlayer.style.cssText = styles2;
      }

      theme.Helpers.prepareTransition(videoPlayer);
      videoWrapper.classList.add(classes.loaded);
    }
  }

  function unsetBackgroundVideo(playerId) {
    // Switch the background video to a chrome-only player once played
    var player = document.getElementById(playerId);
    player.classList.remove(classes.backgroundVideo);
    player.classList.add(classes.videoWithImage);

    setTimeout(function() {
      document.getElementById(playerId).style.cssText = null;
    }, 600);

    videos[playerId].videoWrapper.classList.remove(
      classes.backgroundVideoWrapper
    );
    videos[playerId].videoWrapper.classList.add(classes.playing);

    videos[playerId].status = 'open';
  }

  function setBackgroundVideo(playerId) {
    var player = document.getElementById(playerId);
    player.classList.remove(classes.videoWithImage);
    player.classList.add(classes.backgroundVideo);

    videos[playerId].videoWrapper.classList.add(classes.backgroundVideoWrapper);

    videos[playerId].status = 'background';
    sizeBackgroundVideo(player);
  }

  function isMobile() {
    return window.innerWidth < theme.breakpoints.medium;
  }

  var handleWindowResize = theme.Helpers.debounce(function() {
    if (!youtubeLoaded) return;
    var key;
    var fullscreen = window.innerHeight === screen.height;
    sizeBackgroundVideos();

    if (isMobile()) {
      for (key in videos) {
        if (videos.hasOwnProperty(key)) {
          if (videos[key].videoWrapper.classList.contains(classes.playing)) {
            if (!fullscreen) {
              pauseVideo(key);
              setAsPaused(videos[key]);
            }
          }
          videos[key].videoWrapper.style.height =
            document.documentElement.clientWidth / videoOptions.ratio + 'px';
        }
      }
      setAutoplaySupport(false);
    } else {
      setAutoplaySupport(true);
      for (key in videos) {
        var videosWithImage = videos[key].videoWrapper.querySelectorAll(
          '.' + classes.videoWithImage
        );
        if (videosWithImage.length) {
          continue;
        }
        videoPlayers[key].playVideo();
        setAsPlaying(videos[key]);
      }
    }
  }, 200);

  var handleWindowScroll = theme.Helpers.debounce(function() {
    if (!youtubeLoaded) return;

    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var videoWrapper = videos[key].videoWrapper;
        var condition =
          videoWrapper.getBoundingClientRect().top +
            window.pageYOffset +
            videoWrapper.offsetHeight * 0.75 <
            window.pageYOffset ||
          videoWrapper.getBoundingClientRect().top +
            window.pageYOffset +
            videoWrapper.offsetHeight * 0.25 >
            window.pageYOffset + window.innerHeight;

        // Close the video if more than 75% of it is scrolled out of view
        if (videoWrapper.classList.contains(classes.playing)) {
          if (!condition) return;
          closeVideo(key);
          toggleExpandVideo(key, false);
        }
      }
    }
  }, 50);

  function initEvents() {
    var playVideoBtns = document.querySelectorAll(selectors.playVideoBtn);
    var closeVideoBtns = document.querySelectorAll(selectors.closeVideoBtn);
    var pauseVideoBtns = document.querySelectorAll(selectors.pauseVideoBtn);

    playVideoBtns.forEach(function(btn) {
      btn.addEventListener('click', function(evt) {
        var playerId = evt.currentTarget.dataset.controls;
        startVideoOnClick(playerId);
      });
    });

    closeVideoBtns.forEach(function(btn) {
      btn.addEventListener('click', function(evt) {
        var playerId = evt.currentTarget.dataset.controls;

        evt.currentTarget.blur();
        closeVideo(playerId);
        toggleExpandVideo(playerId, false);
      });
    });

    pauseVideoBtns.forEach(function(btn) {
      btn.addEventListener('click', function(evt) {
        var playerId = evt.currentTarget.dataset.controls;
        togglePause(playerId);
      });
    });

    // Listen to resize to keep a background-size:cover-like layout
    window.addEventListener('resize', handleWindowResize);

    window.addEventListener('scroll', handleWindowScroll);
  }

  function createPlayer(key) {
    var args = Object.assign(videoOptions, videos[key]);

    args.playerVars.controls = args.controls;
    videoPlayers[key] = new YT.Player(key, args);
  }

  function removeEvents() {
    document.removeEventListener('keydown', handleVideoPlayerKeydown);
    window.removeEventListener('resize', handleWindowResize);
    window.removeEventListener('scroll', handleWindowScroll);
  }

  function setButtonLabels(videoWrapper, title) {
    var playButtons = videoWrapper.querySelectorAll(selectors.playVideoBtn);
    var closeButton = videoWrapper.querySelector(selectors.closeVideoBtn);
    var pauseButton = videoWrapper.querySelector(selectors.pauseVideoBtn);
    var closeButtonText = closeButton.querySelector(selectors.fallbackText);

    var pauseButtonStop = pauseButton.querySelector(selectors.pauseVideoStop);
    var pauseButtonStopText = pauseButtonStop.querySelector(
      selectors.fallbackText
    );

    var pauseButtonResume = pauseButton.querySelector(
      selectors.pauseVideoResume
    );
    var pauseButtonResumeText = pauseButtonResume.querySelector(
      selectors.fallbackText
    );

    // Insert the video title retrieved from YouTube into the instructional text
    // for each button
    playButtons.forEach(function(playButton) {
      var playButtonText = playButton.querySelector(selectors.fallbackText);

      playButtonText.textContent = playButtonText.textContent.replace(
        '[video_title]',
        title
      );
    });
    closeButtonText.textContent = closeButtonText.textContent.replace(
      '[video_title]',
      title
    );
    pauseButtonStopText.textContent = pauseButtonStopText.textContent.replace(
      '[video_title]',
      title
    );
    pauseButtonResumeText.textContent = pauseButtonResumeText.textContent.replace(
      '[video_title]',
      title
    );
  }

  return {
    init: init,
    editorLoadVideo: editorLoadVideo,
    loadVideos: loadVideos,
    playVideo: customPlayVideo,
    pauseVideo: pauseVideo,
    removeEvents: removeEvents
  };
})();

theme.ProductVideo = (function() {
  var videos = {};

  var hosts = {
    shopify: 'shopify',
    external: 'external'
  };

  var selectors = {
    productMediaWrapper: '[data-product-single-media-wrapper]'
  };

  var attributes = {
    enableVideoLooping: 'enable-video-looping',
    videoId: 'video-id'
  };

  function init(videoContainer, sectionId) {
    if (!videoContainer) {
      return;
    }

    var videoElement = videoContainer.querySelector('iframe, video');

    if (!videoElement) {
      return;
    }

    var mediaId = videoContainer.getAttribute('data-media-id');

    videos[mediaId] = {
      mediaId: mediaId,
      sectionId: sectionId,
      host: hostFromVideoElement(videoElement),
      container: videoContainer,
      element: videoElement,
      ready: function() {
        createPlayer(this);
      }
    };

    window.Shopify.loadFeatures([
      {
        name: 'video-ui',
        version: '2.0',
        onLoad: setupVideos
      }
    ]);
    theme.LibraryLoader.load('plyrShopifyStyles');
  }

  function setupVideos(errors) {
    if (errors) {
      fallbackToNativeVideo();
      return;
    }

    loadVideos();
  }

  function createPlayer(video) {
    if (video.player) {
      return;
    }

    var productMediaWrapper = video.container.closest(
      selectors.productMediaWrapper
    );

    var enableLooping =
      productMediaWrapper.getAttribute(
        'data-' + attributes.enableVideoLooping
      ) === 'true';

    // eslint-disable-next-line no-undef
    video.player = new Shopify.Video(video.element, {
      loop: { active: enableLooping }
    });

    var pauseVideo = function() {
      if (!video.player) return;
      video.player.pause();
    };

    productMediaWrapper.addEventListener('mediaHidden', pauseVideo);
    productMediaWrapper.addEventListener('xrLaunch', pauseVideo);

    productMediaWrapper.addEventListener('mediaVisible', function() {
      if (theme.Helpers.isTouch()) return;
      if (!video.player) return;
      video.player.play();
    });
  }

  function hostFromVideoElement(video) {
    if (video.tagName === 'VIDEO') {
      return hosts.shopify;
    }

    return hosts.external;
  }

  function loadVideos() {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];
        video.ready();
      }
    }
  }

  function fallbackToNativeVideo() {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];

        if (video.nativeVideo) continue;

        if (video.host === hosts.shopify) {
          video.element.setAttribute('controls', 'controls');
          video.nativeVideo = true;
        }
      }
    }
  }

  function removeSectionVideos(sectionId) {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];

        if (video.sectionId === sectionId) {
          if (video.player) video.player.destroy();
          delete videos[key];
        }
      }
    }
  }

  return {
    init: init,
    hosts: hosts,
    loadVideos: loadVideos,
    removeSectionVideos: removeSectionVideos
  };
})();

theme.ProductModel = (function() {
  var modelJsonSections = {};
  var models = {};
  var xrButtons = {};

  var selectors = {
    mediaGroup: '[data-product-single-media-group]',
    xrButton: '[data-shopify-xr]'
  };

  function init(modelViewerContainers, sectionId) {
    modelJsonSections[sectionId] = {
      loaded: false
    };

    modelViewerContainers.forEach(function(modelViewerContainer, index) {
      var mediaId = modelViewerContainer.getAttribute('data-media-id');
      var modelViewerElement = modelViewerContainer.querySelector(
        'model-viewer'
      );
      var modelId = modelViewerElement.getAttribute('data-model-id');

      if (index === 0) {
        var mediaGroup = modelViewerContainer.closest(selectors.mediaGroup);
        var xrButton = mediaGroup.querySelector(selectors.xrButton);
        xrButtons[sectionId] = {
          element: xrButton,
          defaultId: modelId
        };
      }

      models[mediaId] = {
        modelId: modelId,
        sectionId: sectionId,
        container: modelViewerContainer,
        element: modelViewerElement
      };
    });

    window.Shopify.loadFeatures([
      {
        name: 'shopify-xr',
        version: '1.0',
        onLoad: setupShopifyXr
      },
      {
        name: 'model-viewer-ui',
        version: '1.0',
        onLoad: setupModelViewerUi
      }
    ]);
    theme.LibraryLoader.load('modelViewerUiStyles');
  }

  function setupShopifyXr(errors) {
    if (errors) return;

    if (!window.ShopifyXR) {
      document.addEventListener('shopify_xr_initialized', function() {
        setupShopifyXr();
      });
      return;
    }

    for (var sectionId in modelJsonSections) {
      if (modelJsonSections.hasOwnProperty(sectionId)) {
        var modelSection = modelJsonSections[sectionId];

        if (modelSection.loaded) continue;
        var modelJson = document.querySelector('#ModelJson-' + sectionId);

        window.ShopifyXR.addModels(JSON.parse(modelJson.innerHTML));
        modelSection.loaded = true;
      }
    }
    window.ShopifyXR.setupXRElements();
  }

  function setupModelViewerUi(errors) {
    if (errors) return;

    for (var key in models) {
      if (models.hasOwnProperty(key)) {
        var model = models[key];
        if (!model.modelViewerUi) {
          model.modelViewerUi = new Shopify.ModelViewerUI(model.element);
        }
        setupModelViewerListeners(model);
      }
    }
  }

  function setupModelViewerListeners(model) {
    var xrButton = xrButtons[model.sectionId];

    model.container.addEventListener('mediaVisible', function() {
      xrButton.element.setAttribute('data-shopify-model3d-id', model.modelId);
      if (theme.Helpers.isTouch()) return;
      model.modelViewerUi.play();
    });

    model.container.addEventListener('mediaHidden', function() {
      xrButton.element.setAttribute(
        'data-shopify-model3d-id',
        xrButton.defaultId
      );
      model.modelViewerUi.pause();
    });

    model.container.addEventListener('xrLaunch', function() {
      model.modelViewerUi.pause();
    });
  }

  function removeSectionModels(sectionId) {
    for (var key in models) {
      if (models.hasOwnProperty(key)) {
        var model = models[key];
        if (model.sectionId === sectionId) {
          models[key].modelViewerUi.destroy();
          delete models[key];
        }
      }
    }
    delete modelJsonSections[sectionId];
  }

  return {
    init: init,
    removeSectionModels: removeSectionModels
  };
})();

window.theme = window.theme || {};

theme.FormStatus = (function() {
  var selectors = {
    statusMessage: '[data-form-status]'
  };

  function init() {
    var statusMessages = document.querySelectorAll(selectors.statusMessage);

    statusMessages.forEach(function(statusMessage) {
      statusMessage.setAttribute('tabindex', -1);
      statusMessage.focus();

      statusMessage.addEventListener(
        'blur',
        function(evt) {
          evt.target.removeAttribute('tabindex');
        },
        { once: true }
      );
    });
  }

  return {
    init: init
  };
})();

theme.Hero = (function() {
  var classes = {
    indexSectionFlush: 'index-section--flush'
  };

  var selectors = {
    heroFixedWidthContent: '.hero-fixed-width__content',
    heroFixedWidthImage: '.hero-fixed-width__image'
  };

  function hero(el, sectionId) {
    var hero = document.querySelector(el);
    var layout = hero.getAttribute('data-layout');
    var parentSection = document.querySelector('#shopify-section-' + sectionId);
    var heroContent = parentSection.querySelector(
      selectors.heroFixedWidthContent
    );
    var heroImage = parentSection.querySelector(selectors.heroFixedWidthImage);

    if (layout !== 'fixed_width') {
      return;
    }

    parentSection.classList.remove(classes.indexSectionFlush);
    heroFixedHeight();

    window.addEventListener('resize', function() {
      theme.Helpers.debounce(function() {
        heroFixedHeight();
      }, 50);
    });

    function heroFixedHeight() {
      var contentHeight;
      var imageHeight;

      if (heroContent) {
        contentHeight = heroContent.offsetHeight + 50;
      }

      if (heroImage) {
        imageHeight = heroImage.offsetHeight;
      }

      if (contentHeight > imageHeight) {
        heroImage.style.minHeight = contentHeight + 'px';
      }
    }
  }

  return hero;
})();

// prettier-ignore
window.theme = window.theme || {};

theme.SearchResultsTemplate = (function() {
  function renderResults(products, isLoading, searchQuery) {
    return [
      '<div class="predictive-search">',
      renderHeader(products, isLoading),
      renderProducts(products, searchQuery),
      '</div>'
    ].join('');
  }

  function renderHeader(products, isLoading) {
    if (products.length === 0) {
      return '';
    }

    return [
      '<div class="predictive-search-title">',
      '<h3 id="predictive-search" class="predictive-search-title__content">' +
        theme.strings.products +
        '</h3>',
      '<span class="predictive-search-title__loading-spinner">' +
        (isLoading
          ? '<span class= "icon-predictive-search-spinner" ></span >'
          : '') +
        '</span>',
      '</div>'
    ].join('');
  }

  function loadingState() {
    return [
      '<div class="predictive-search">',
      '<div class="predictive-search-loading">',
      '<span class="visually-hidden">' + theme.strings.loading + '</span>',
      '<span class="predictive-search-loading__icon">',
      '<span class="icon-predictive-search-spinner"></span>',
      '</span>',
      '</div>',
      '</div>'
    ].join('');
  }

  function renderViewAll(searchQuery) {
    return [
      '<button type="submit" class="predictive-search-view-all__button" tabindex="-1">',
      theme.strings.searchFor +
        '<span class="predictive-search-view-all__query"> &ldquo;' +
        _htmlEscape(searchQuery) +
        '&rdquo;</span>',
      '</button>'
    ].join('');
  }

  function renderProducts(products, searchQuery) {
    var resultsCount = products.length;

    return [
      '<ul id="predictive-search-results" class="predictive-search__list" role="listbox" aria-labelledby="predictive-search">',
      products
        .map(function(product, index) {
          return renderProduct(normalizeProduct(product), index, resultsCount);
        })
        .join(''),
      '<li id="search-all" class="predictive-search-view-all" role="option" data-search-result>' +
        renderViewAll(searchQuery) +
        '</li>',
      '</ul>'
    ].join('');
  }

  function renderProduct(product, index, resultsCount) {
    return [
      '<li id="search-result-' +
        index +
        '" class="predictive-search-item" role="option" data-search-result>',
      '<a class="predictive-search-item__link" href="' +
        product.url +
        '" tabindex="-1">',
      '<div class="predictive-search__column predictive-search__column--image" data-image-loading-animation>',
      renderProductImage(product),
      '</div>',
      '<div class="predictive-search__column predictive-search__column--content ' +
        (getDetailsCount() ? '' : 'predictive-search__column--center') +
        '">',
      '<span class="predictive-search-item__title">',
      '<span class="predictive-search-item__title-text">' +
        product.title +
        '</span>',
      '</span>' + (getDetailsCount() ? renderProductDetails(product) : ''),
      '<span class="visually-hidden">, </span>',
      '<span class="visually-hidden">' +
        getNumberOfResultsString(index + 1, resultsCount) +
        '</span>',
      '</div>',
      '</a>',
      '</li>'
    ].join('');
  }

  function renderProductImage(product) {
    if (product.image === null) {
      return '';
    }

    return (
      '<img class="predictive-search-item__image lazyload" src="' +
      product.image.url +
      '" data-src="' +
      product.image.url +
      '" data-image alt="' +
      product.image.alt +
      '" />'
    );
  }

  function renderProductDetails(product) {
    return [
      '<dl class="predictive-search-item__details price' +
        (product.isOnSale ? ' price--on-sale' : '') +
        (!product.available ? ' price--sold-out' : '') +
        (!product.isPriceVaries && product.isCompareVaries
          ? ' price--compare-price-hidden'
          : '') +
        '">',
      '<div class="predictive-search-item__detail">',
      renderVendor(product),
      '</div>',
      '<div class="predictive-search-item__detail predictive-search-item__detail--inline">' +
        renderProductPrice(product),
      '</div>',
      '</dl>'
    ].join('');
  }
  function renderProductPrice(product) {
    if (!theme.settings.predictiveSearchShowPrice) {
      return '';
    }

    var accessibilityAnnounceComma = '<span class="visually-hidden">, </span>';

    var priceMarkup =
      '<div class="price__regular">' + renderPrice(product) + '</div>';

    var salePriceMarkup =
      '<div class="price__sale">' + renderSalePrice(product) + '</div>';

    return (
      accessibilityAnnounceComma +
      '<div class="price__pricing-group">' +
      (product.isOnSale ? salePriceMarkup : priceMarkup) +
      '</div>'
    );
  }

  function renderSalePrice(product) {
    return [
      '<dt>',
      '<span class="visually-hidden">' + theme.strings.salePrice + '</span>',
      '</dt>',
      '<dd>',
      '<span class="predictive-search-item__price predictive-search-item__price--sale">' +
        (product.isPriceVaries
          ? theme.strings.fromLowestPrice.replace('[price]', product.price)
          : product.price) +
        '</span>',
      '</dd>',
      '<div class="price__compare">' + renderCompareAtPrice(product) + '</div>'
    ].join('');
  }

  function renderCompareAtPrice(product) {
    return [
      '<dt>',
      '<span class="visually-hidden">' +
        theme.strings.regularPrice +
        '</span> ',
      '</dt>',
      '<dd>',
      '<span class="predictive-search-item__price predictive-search-item__price--compare">' +
        product.compareAtPrice +
        '</span>',
      '</dd>'
    ].join('');
  }

  function renderPrice(product) {
    return [
      '<dt>',
      '<span class="visually-hidden">' + theme.strings.regularPrice + '</span>',
      '</dt>',
      '<dd>',
      '<span class="predictive-search-item__price">' +
        (product.isPriceVaries
          ? theme.strings.fromLowestPrice.replace('[price]', product.price)
          : product.price) +
        '</span>',
      '</dd>'
    ].join('');
  }

  function renderVendor(product) {
    if (!theme.settings.predictiveSearchShowVendor || product.vendor === '') {
      return '';
    }

    return [
      '<dt>',
      '<span class="visually-hidden">' + theme.strings.vendor + '</span>',
      '</dt>',
      '<dd class="predictive-search-item__vendor">' + product.vendor + '</dd>'
    ].join('');
  }

  function normalizeProduct(product) {
    var productOrVariant =
      product.variants.length > 0 ? product.variants[0] : product;

    return {
      url: productOrVariant.url,
      image: getProductImage(product),
      title: product.title,
      vendor: product.vendor || '',
      price: theme.Currency.formatMoney(product.price_min, theme.moneyFormat),
      compareAtPrice: theme.Currency.formatMoney(
        product.compare_at_price_min,
        theme.moneyFormat
      ),
      available: product.available,
      isOnSale: isOnSale(product),
      isPriceVaries: isPriceVaries(product),
      isCompareVaries: isCompareVaries(product)
    };
  }

  function getProductImage(product) {
    var image;
    var featuredImage;

    if (product.variants.length > 0 && product.variants[0].image !== null) {
      featuredImage = product.variants[0].featured_image;
    } else if (product.image) {
      featuredImage = product.featured_image;
    } else {
      image = null;
    }

    if (image !== null) {
      image = {
        url: theme.Images.getSizedImageUrl(featuredImage.url, '100x'),
        alt: featuredImage.alt
      };
    }

    return image;
  }

  function isOnSale(product) {
    return (
      product.compare_at_price_min !== null &&
      parseInt(product.compare_at_price_min, 10) >
        parseInt(product.price_min, 10)
    );
  }

  function isPriceVaries(product) {
    return product.price_max !== product.price_min;
  }

  function isCompareVaries(product) {
    return product.compare_at_price_max !== product.compare_at_price_min;
  }

  // Returns the number of optional product details to be shown,
  // values of the detailsList need to be boolean.
  function getDetailsCount() {
    var detailsList = [
      theme.settings.predictiveSearchShowPrice,
      theme.settings.predictiveSearchShowVendor
    ];

    var detailsCount = detailsList.reduce(function(acc, detail) {
      return acc + (detail ? 1 : 0);
    }, 0);

    return detailsCount;
  }

  function getNumberOfResultsString(resultNumber, resultsCount) {
    return theme.strings.number_of_results
      .replace('[result_number]', resultNumber)
      .replace('[results_count]', resultsCount);
  }

  function _htmlEscape(input) {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  return function(data) {
    var products = data.products || [];
    var isLoading = data.isLoading;
    var searchQuery = data.searchQuery || '';

    if (isLoading && products.length === 0) {
      return loadingState();
    }

    return renderResults(products, isLoading, searchQuery);
  };
})();

window.theme = window.theme || {};

(function() {
  // (a11y) This function will be used by the Predictive Search Component
  // to announce the number of search results
  function numberOfResultsTemplateFct(data) {
    if (data.products.length === 1) {
      return theme.strings.one_result_found;
    } else {
      return theme.strings.number_of_results_found.replace(
        '[results_count]',
        data.products.length
      );
    }
  }

  // (a11y) This function will be used by the Predictive Search Component
  // to announce that it's loading results
  function loadingResultsMessageTemplateFct() {
    return theme.strings.loading;
  }

  function isPredictiveSearchSupported() {
    var shopifyFeatures = JSON.parse(
      document.getElementById('shopify-features').textContent
    );

    return shopifyFeatures.predictiveSearch;
  }

  function isPredictiveSearchEnabled() {
    return window.theme.settings.predictiveSearchEnabled;
  }

  function canInitializePredictiveSearch() {
    return isPredictiveSearchSupported() && isPredictiveSearchEnabled();
  }

  // listen for search submits and validate query
  function validateSearchHandler(searchEl, submitEl) {
    submitEl.addEventListener(
      'click',
      validateSearchInput.bind(this, searchEl)
    );
  }

  // if there is nothing in the search field, prevent submit
  function validateSearchInput(searchEl, evt) {
    var isInputValueEmpty = searchEl.value.trim().length === 0;
    if (!isInputValueEmpty) {
      return;
    }

    if (typeof evt !== 'undefined') {
      evt.preventDefault();
    }

    searchEl.focus();
  }

  window.theme.SearchPage = (function() {
    var selectors = {
      searchReset: '[data-search-page-predictive-search-clear]',
      searchInput: '[data-search-page-predictive-search-input]',
      searchSubmit: '[data-search-page-predictive-search-submit]',
      searchResults: '[data-predictive-search-mount="default"]'
    };

    var componentInstance;

    function init(config) {
      var searchInput = document.querySelector(selectors.searchInput);
      var searchSubmit = document.querySelector(selectors.searchSubmit);
      var searchUrl = searchInput.dataset.baseUrl;

      componentInstance = new window.Shopify.theme.PredictiveSearchComponent({
        selectors: {
          input: selectors.searchInput,
          reset: selectors.searchReset,
          result: selectors.searchResults
        },
        searchUrl: searchUrl,
        resultTemplateFct: window.theme.SearchResultsTemplate,
        numberOfResultsTemplateFct: numberOfResultsTemplateFct,
        loadingResultsMessageTemplateFct: loadingResultsMessageTemplateFct,
        onOpen: function(nodes) {
          if (config.isTabletAndUp) {
            return;
          }

          var searchInputBoundingRect = searchInput.getBoundingClientRect();
          var bodyHeight = document.body.offsetHeight;
          var offset = 50;
          var resultsMaxHeight =
            bodyHeight - searchInputBoundingRect.bottom - offset;

          nodes.result.style.maxHeight = resultsMaxHeight + 'px';
        },
        onBeforeDestroy: function(nodes) {
          // If the viewport width changes from mobile to tablet
          // reset the top position of the results
          nodes.result.style.maxHeight = '';
        }
      });

      validateSearchHandler(searchInput, searchSubmit);
    }

    function unload() {
      if (!componentInstance) {
        return;
      }
      componentInstance.destroy();
      componentInstance = null;
    }

    return {
      init: init,
      unload: unload
    };
  })();

  window.theme.SearchHeader = (function() {
    var selectors = {
      searchInput: '[data-predictive-search-drawer-input]',
      searchResults: '[data-predictive-search-mount="drawer"]',
      searchFormContainer: '[data-search-form-container]',
      searchSubmit: '[data-search-form-submit]'
    };

    var componentInstance;

    function init(config) {
      var searchInput = document.querySelector(selectors.searchInput);
      var searchSubmit = document.querySelector(selectors.searchSubmit);
      var searchUrl = searchInput.dataset.baseUrl;

      componentInstance = new window.Shopify.theme.PredictiveSearchComponent({
        selectors: {
          input: selectors.searchInput,
          result: selectors.searchResults
        },
        searchUrl: searchUrl,
        resultTemplateFct: window.theme.SearchResultsTemplate,
        numberOfResultsTemplateFct: numberOfResultsTemplateFct,
        numberOfResults: config.numberOfResults,
        loadingResultsMessageTemplateFct: loadingResultsMessageTemplateFct,
        onInputBlur: function() {
          return false;
        },
        onOpen: function(nodes) {
          var searchInputBoundingRect = searchInput.getBoundingClientRect();

          // For tablet screens and up, stop the scroll area from extending past
          // the bottom of the screen because we're locking the body scroll
          var maxHeight =
            window.innerHeight -
            searchInputBoundingRect.bottom -
            (config.isTabletAndUp ? 20 : 0);

          nodes.result.style.top = config.isTabletAndUp
            ? ''
            : searchInputBoundingRect.bottom + 'px';
          nodes.result.style.maxHeight = maxHeight + 'px';
        },
        onClose: function(nodes) {
          nodes.result.style.maxHeight = '';
        },
        onBeforeDestroy: function(nodes) {
          // If the viewport width changes from mobile to tablet
          // reset the top position of the results
          nodes.result.style.top = '';
        }
      });

      validateSearchHandler(searchInput, searchSubmit);
    }

    function unload() {
      if (!componentInstance) {
        return;
      }

      componentInstance.destroy();
      componentInstance = null;
    }

    function clearAndClose() {
      if (!componentInstance) {
        return;
      }

      componentInstance.clearAndClose();
    }

    return {
      init: init,
      unload: unload,
      clearAndClose: clearAndClose
    };
  })();

  window.theme.Search = (function() {
    var classes = {
      searchTemplate: 'template-search'
    };
    var selectors = {
      siteHeader: '.site-header'
    };
    var mediaQueryList = {
      mobile: window.matchMedia('(max-width: 749px)'),
      tabletAndUp: window.matchMedia('(min-width: 750px)')
    };

    function init() {
      if (!document.querySelector(selectors.siteHeader)) {
        return;
      }

      if (!canInitializePredictiveSearch()) {
        return;
      }

      Object.keys(mediaQueryList).forEach(function(device) {
        mediaQueryList[device].addListener(initSearchAccordingToViewport);
      });

      initSearchAccordingToViewport();
    }

    function initSearchAccordingToViewport() {
      theme.SearchDrawer.close();
      theme.SearchHeader.unload();
      theme.SearchPage.unload();

      if (mediaQueryList.mobile.matches) {
        theme.SearchHeader.init({
          numberOfResults: 4,
          isTabletAndUp: false
        });

        if (isSearchPage()) {
          theme.SearchPage.init({ isTabletAndUp: false });
        }
      } else {
        // Tablet and up
        theme.SearchHeader.init({
          numberOfResults: 4,
          isTabletAndUp: true
        });

        if (isSearchPage()) {
          theme.SearchPage.init({ isTabletAndUp: true });
        }
      }
    }

    function isSearchPage() {
      return document.body.classList.contains(classes.searchTemplate);
    }

    function unload() {
      theme.SearchHeader.unload();
      theme.SearchPage.unload();
    }

    return {
      init: init,
      unload: unload
    };
  })();
})();

window.theme = window.theme || {};

theme.SearchDrawer = (function() {
  var selectors = {
    headerSection: '[data-header-section]',
    drawer: '[data-predictive-search-drawer]',
    drawerOpenButton: '[data-predictive-search-open-drawer]',
    headerSearchInput: '[data-predictive-search-drawer-input]',
    predictiveSearchWrapper: '[data-predictive-search-mount="drawer"]'
  };

  var drawerInstance;

  function init() {
    setAccessibilityProps();

    drawerInstance = new theme.Drawers('SearchDrawer', 'top', {
      onDrawerOpen: function() {
        setHeight();
        theme.MobileNav.closeMobileNav();
        lockBodyScroll();
      },
      onDrawerClose: function() {
        theme.SearchHeader.clearAndClose();
        var drawerOpenButton = document.querySelector(
          selectors.drawerOpenButton
        );

        if (drawerOpenButton) drawerOpenButton.focus();

        unlockBodyScroll();
      },
      withPredictiveSearch: true,
      elementToFocusOnOpen: document.querySelector(selectors.headerSearchInput)
    });
  }

  function setAccessibilityProps() {
    var drawerOpenButton = document.querySelector(selectors.drawerOpenButton);

    if (drawerOpenButton) {
      drawerOpenButton.setAttribute('aria-controls', 'SearchDrawer');
      drawerOpenButton.setAttribute('aria-expanded', 'false');
      drawerOpenButton.setAttribute('aria-controls', 'dialog');
    }
  }

  function setHeight() {
    var searchDrawer = document.querySelector(selectors.drawer);
    var headerHeight = document.querySelector(selectors.headerSection)
      .offsetHeight;

    searchDrawer.style.height = headerHeight + 'px';
  }

  function close() {
    drawerInstance.close();
  }

  function lockBodyScroll() {
    theme.Helpers.enableScrollLock();
  }

  function unlockBodyScroll() {
    theme.Helpers.disableScrollLock();
  }

  return {
    init: init,
    close: close
  };
})();

theme.Disclosure = (function() {
  var selectors = {
    disclosureForm: '[data-disclosure-form]',
    disclosureList: '[data-disclosure-list]',
    disclosureToggle: '[data-disclosure-toggle]',
    disclosureInput: '[data-disclosure-input]',
    disclosureOptions: '[data-disclosure-option]'
  };

  var classes = {
    listVisible: 'disclosure-list--visible'
  };

  function Disclosure(disclosure) {
    this.container = disclosure;
    this._cacheSelectors();
    this._setupListeners();
  }

  Disclosure.prototype = Object.assign({}, Disclosure.prototype, {
    _cacheSelectors: function() {
      this.cache = {
        disclosureForm: this.container.closest(selectors.disclosureForm),
        disclosureList: this.container.querySelector(selectors.disclosureList),
        disclosureToggle: this.container.querySelector(
          selectors.disclosureToggle
        ),
        disclosureInput: this.container.querySelector(
          selectors.disclosureInput
        ),
        disclosureOptions: this.container.querySelectorAll(
          selectors.disclosureOptions
        )
      };
    },

    _setupListeners: function() {
      this.eventHandlers = this._setupEventHandlers();

      this.cache.disclosureToggle.addEventListener(
        'click',
        this.eventHandlers.toggleList
      );

      this.cache.disclosureOptions.forEach(function(disclosureOption) {
        disclosureOption.addEventListener(
          'click',
          this.eventHandlers.connectOptions
        );
      }, this);

      this.container.addEventListener(
        'keyup',
        this.eventHandlers.onDisclosureKeyUp
      );

      this.cache.disclosureList.addEventListener(
        'focusout',
        this.eventHandlers.onDisclosureListFocusOut
      );

      this.cache.disclosureToggle.addEventListener(
        'focusout',
        this.eventHandlers.onDisclosureToggleFocusOut
      );

      document.body.addEventListener('click', this.eventHandlers.onBodyClick);
    },

    _setupEventHandlers: function() {
      return {
        connectOptions: this._connectOptions.bind(this),
        toggleList: this._toggleList.bind(this),
        onBodyClick: this._onBodyClick.bind(this),
        onDisclosureKeyUp: this._onDisclosureKeyUp.bind(this),
        onDisclosureListFocusOut: this._onDisclosureListFocusOut.bind(this),
        onDisclosureToggleFocusOut: this._onDisclosureToggleFocusOut.bind(this)
      };
    },

    _connectOptions: function(event) {
      event.preventDefault();

      this._submitForm(event.currentTarget.dataset.value);
    },

    _onDisclosureToggleFocusOut: function(event) {
      var disclosureLostFocus =
        this.container.contains(event.relatedTarget) === false;

      if (disclosureLostFocus) {
        this._hideList();
      }
    },

    _onDisclosureListFocusOut: function(event) {
      var childInFocus = event.currentTarget.contains(event.relatedTarget);

      var isVisible = this.cache.disclosureList.classList.contains(
        classes.listVisible
      );

      if (isVisible && !childInFocus) {
        this._hideList();
      }
    },

    _onDisclosureKeyUp: function(event) {
      if (event.which !== slate.utils.keyboardKeys.ESCAPE) return;
      this._hideList();
      this.cache.disclosureToggle.focus();
    },

    _onBodyClick: function(event) {
      var isOption = this.container.contains(event.target);
      var isVisible = this.cache.disclosureList.classList.contains(
        classes.listVisible
      );

      if (isVisible && !isOption) {
        this._hideList();
      }
    },

    _submitForm: function(value) {
      this.cache.disclosureInput.value = value;
      this.cache.disclosureForm.submit();
    },

    _hideList: function() {
      this.cache.disclosureList.classList.remove(classes.listVisible);
      this.cache.disclosureToggle.setAttribute('aria-expanded', false);
    },

    _toggleList: function() {
      var ariaExpanded =
        this.cache.disclosureToggle.getAttribute('aria-expanded') === 'true';
      this.cache.disclosureList.classList.toggle(classes.listVisible);
      this.cache.disclosureToggle.setAttribute('aria-expanded', !ariaExpanded);
    },

    destroy: function() {
      this.cache.disclosureToggle.removeEventListener(
        'click',
        this.eventHandlers.toggleList
      );

      this.cache.disclosureOptions.forEach(function(disclosureOption) {
        disclosureOption.removeEventListener(
          'click',
          this.eventHandlers.connectOptions
        );
      }, this);

      this.container.removeEventListener(
        'keyup',
        this.eventHandlers.onDisclosureKeyUp
      );

      this.cache.disclosureList.removeEventListener(
        'focusout',
        this.eventHandlers.onDisclosureListFocusOut
      );

      this.cache.disclosureToggle.removeEventListener(
        'focusout',
        this.eventHandlers.onDisclosureToggleFocusOut
      );

      document.body.removeEventListener(
        'click',
        this.eventHandlers.onBodyClick
      );
    }
  });

  return Disclosure;
})();

theme.Zoom = (function() {
  var selectors = {
    imageZoom: '[data-image-zoom]'
  };

  var classes = {
    zoomImg: 'zoomImg'
  };

  var attributes = {
    imageZoomTarget: 'data-image-zoom-target'
  };

  function Zoom(container) {
    this.container = container;
    this.cache = {};
    this.url = container.dataset.zoom;

    this._cacheSelectors();

    if (!this.cache.sourceImage) return;

    this._duplicateImage();
  }

  Zoom.prototype = Object.assign({}, Zoom.prototype, {
    _cacheSelectors: function() {
      this.cache = {
        sourceImage: this.container.querySelector(selectors.imageZoom)
      };
    },

    _init: function() {
      var targetWidth = this.cache.targetImage.width;
      var targetHeight = this.cache.targetImage.height;

      if (this.cache.sourceImage === this.cache.targetImage) {
        this.sourceWidth = targetWidth;
        this.sourceHeight = targetHeight;
      } else {
        this.sourceWidth = this.cache.sourceImage.width;
        this.sourceHeight = this.cache.sourceImage.height;
      }

      this.xRatio =
        (this.cache.sourceImage.width - targetWidth) / this.sourceWidth;
      this.yRatio =
        (this.cache.sourceImage.height - targetHeight) / this.sourceHeight;
    },

    _start: function(e) {
      this._init();
      this._move(e);
    },

    _stop: function() {
      this.cache.targetImage.style.opacity = 0;
    },

    /**
     * Sets the correct coordinates top and left position in px
     * It sets a limit within between 0 and the max height of the image
     * So when the mouse leaves the target image, it could
     * never go above or beyond the target image zone
     */
    _setTopLeftMaxValues: function(top, left) {
      return {
        left: Math.max(Math.min(left, this.sourceWidth), 0),
        top: Math.max(Math.min(top, this.sourceHeight), 0)
      };
    },

    _move: function(e) {
      // get left and top position within the "source image" zone
      var left =
        e.pageX -
        (this.cache.sourceImage.getBoundingClientRect().left + window.scrollX);
      var top =
        e.pageY -
        (this.cache.sourceImage.getBoundingClientRect().top + window.scrollY);
      // make sure the left and top position don't go
      // above or beyond the target image zone
      var position = this._setTopLeftMaxValues(top, left);

      top = position.top;
      left = position.left;

      this.cache.targetImage.style.left = -(left * -this.xRatio) + 'px';
      this.cache.targetImage.style.top = -(top * -this.yRatio) + 'px';
      this.cache.targetImage.style.opacity = 1;
    },

    /**
     * This loads a high resolution image
     * via the data attributes url
     * It adds all necessary CSS styles and adds to the container
     */
    _duplicateImage: function() {
      this._loadImage()
        .then(
          function(image) {
            this.cache.targetImage = image;
            image.style.width = image.width + 'px';
            image.style.height = image.height + 'px';
            image.style.position = 'absolute';
            image.style.maxWidth = 'none';
            image.style.maxHeight = 'none';
            image.style.opacity = 0;
            image.style.border = 'none';
            image.style.left = 0;
            image.style.top = 0;

            this.container.appendChild(image);

            this._init();

            this._start = this._start.bind(this);
            this._stop = this._stop.bind(this);
            this._move = this._move.bind(this);

            this.container.addEventListener('mouseenter', this._start);
            this.container.addEventListener('mouseleave', this._stop);
            this.container.addEventListener('mousemove', this._move);

            this.container.style.position = 'relative';
            this.container.style.overflow = 'hidden';
          }.bind(this)
        )
        .catch(function(error) {
          // eslint-disable-next-line no-console
          console.warn('Error fetching image', error);
        });
    },

    _loadImage: function() {
      // eslint-disable-next-line
      return new Promise(function(resolve, reject) {
          var image = new Image();
          image.setAttribute('role', 'presentation');
          image.setAttribute(attributes.imageZoomTarget, true);
          image.classList.add(classes.zoomImg);
          image.src = this.url;

          image.addEventListener('load', function() {
            resolve(image);
          });

          image.addEventListener('error', function(error) {
            reject(error);
          });
        }.bind(this)
      );
    },

    unload: function() {
      var targetImage = this.container.querySelector(
        '[' + attributes.imageZoomTarget + ']'
      );
      if (targetImage) {
        targetImage.remove();
      }

      this.container.removeEventListener('mouseenter', this._start);
      this.container.removeEventListener('mouseleave', this._stop);
      this.container.removeEventListener('mousemove', this._move);
    }
  });

  return Zoom;
})();


/* ================ TEMPLATES ================ */
(function() {
  var filterBys = document.querySelectorAll('[data-blog-tag-filter]');

  if (!filterBys.length) return;

  slate.utils.resizeSelects(filterBys);

  filterBys.forEach(function(filterBy) {
    filterBy.addEventListener('change', function(evt) {
      location.href = evt.target.value;
    });
  });
})();

window.theme = theme || {};

theme.customerTemplates = (function() {
  var selectors = {
    RecoverHeading: '#RecoverHeading',
    RecoverEmail: '#RecoverEmail',
    LoginHeading: '#LoginHeading'
  };

  function initEventListeners() {
    this.recoverHeading = document.querySelector(selectors.RecoverHeading);
    this.recoverEmail = document.querySelector(selectors.RecoverEmail);
    this.loginHeading = document.querySelector(selectors.LoginHeading);
    var recoverPassword = document.getElementById('RecoverPassword');
    var hideRecoverPasswordLink = document.getElementById(
      'HideRecoverPasswordLink'
    );

    // Show reset password form
    if (recoverPassword) {
      recoverPassword.addEventListener(
        'click',
        function(evt) {
          evt.preventDefault();
          showRecoverPasswordForm();
          this.recoverHeading.setAttribute('tabindex', '-1');
          this.recoverHeading.focus();
        }.bind(this)
      );
    }

    // Hide reset password form
    if (hideRecoverPasswordLink) {
      hideRecoverPasswordLink.addEventListener(
        'click',
        function(evt) {
          evt.preventDefault();
          hideRecoverPasswordForm();
          this.loginHeading.setAttribute('tabindex', '-1');
          this.loginHeading.focus();
        }.bind(this)
      );
    }

    if (this.recoverHeading) {
      this.recoverHeading.addEventListener('blur', function(evt) {
        evt.target.removeAttribute('tabindex');
      });
    }

    if (this.loginHeading) {
      this.loginHeading.addEventListener('blur', function(evt) {
        evt.target.removeAttribute('tabindex');
      });
    }
  }

  /**
   *
   *  Show/Hide recover password form
   *
   */

  function showRecoverPasswordForm() {
    document.getElementById('RecoverPasswordForm').classList.remove('hide');
    document.getElementById('CustomerLoginForm').classList.add('hide');

    if (this.recoverEmail.getAttribute('aria-invalid') === 'true') {
      this.recoverEmail.focus();
    }
  }

  function hideRecoverPasswordForm() {
    document.getElementById('RecoverPasswordForm').classList.add('hide');
    document.getElementById('CustomerLoginForm').classList.remove('hide');
  }

  /**
   *
   *  Show reset password success message
   *
   */
  function resetPasswordSuccess() {
    var formState = document.querySelector('.reset-password-success');

    // check if reset password form was successfully submited.
    if (!formState) {
      return;
    }

    // show success message
    var resetSuccess = document.getElementById('ResetSuccess');
    resetSuccess.classList.remove('hide');
    resetSuccess.focus();
  }

  /**
   *
   *  Show/hide customer address forms
   *
   */
  function customerAddressForm() {
    var newAddressForm = document.getElementById('AddressNewForm');
    var newAddressFormButton = document.getElementById('AddressNewButton');

    if (!newAddressForm) {
      return;
    }

    // Initialize observers on address selectors, defined in shopify_common.js
    if (Shopify) {
      // eslint-disable-next-line no-new
      new Shopify.CountryProvinceSelector(
        'AddressCountryNew',
        'AddressProvinceNew',
        {
          hideElement: 'AddressProvinceContainerNew'
        }
      );
    }

    // Initialize each edit form's country/province selector
    document
      .querySelectorAll('.address-country-option')
      .forEach(function(option) {
        var formId = option.dataset.formId;
        var countrySelector = 'AddressCountry_' + formId;
        var provinceSelector = 'AddressProvince_' + formId;
        var containerSelector = 'AddressProvinceContainer_' + formId;

        // eslint-disable-next-line no-new
        new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
          hideElement: containerSelector
        });
      });

    // Toggle new/edit address forms
    document.querySelectorAll('.address-new-toggle').forEach(function(button) {
      button.addEventListener('click', function() {
        var isExpanded =
          newAddressFormButton.getAttribute('aria-expanded') === 'true';

        newAddressForm.classList.toggle('hide');
        newAddressFormButton.setAttribute('aria-expanded', !isExpanded);
        newAddressFormButton.focus();
      });
    });

    document.querySelectorAll('.address-edit-toggle').forEach(function(button) {
      button.addEventListener('click', function(evt) {
        var formId = evt.target.dataset.formId;
        var editButton = document.getElementById('EditFormButton_' + formId);
        var editAddress = document.getElementById('EditAddress_' + formId);
        var isExpanded = editButton.getAttribute('aria-expanded') === 'true';

        editAddress.classList.toggle('hide');
        editButton.setAttribute('aria-expanded', !isExpanded);
        editButton.focus();
      });
    });

    document.querySelectorAll('.address-delete').forEach(function(button) {
      button.addEventListener('click', function(evt) {
        var target = evt.target.dataset.target;
        var confirmMessage = evt.target.dataset.confirmMessage;

        // eslint-disable-next-line no-alert
        if (
          confirm(
            confirmMessage || 'Are you sure you wish to delete this address?'
          )
        ) {
          Shopify.postLink(target, {
            parameters: { _method: 'delete' }
          });
        }
      });
    });
  }

  /**
   *
   *  Check URL for reset password hash
   *
   */
  function checkUrlHash() {
    var hash = window.location.hash;

    // Allow deep linking to recover password form
    if (hash === '#recover') {
      showRecoverPasswordForm.bind(this)();
    }
  }

  return {
    init: function() {
      initEventListeners();
      checkUrlHash();
      resetPasswordSuccess();
      customerAddressForm();
    }
  };
})();


/*================ SECTIONS ================*/
window.theme = window.theme || {};

theme.Cart = (function() {
  var selectors = {
    cartCount: '[data-cart-count]',
    cartCountBubble: '[data-cart-count-bubble]',
    cartDiscount: '[data-cart-discount]',
    cartDiscountTitle: '[data-cart-discount-title]',
    cartDiscountAmount: '[data-cart-discount-amount]',
    cartDiscountWrapper: '[data-cart-discount-wrapper]',
    cartErrorMessage: '[data-cart-error-message]',
    cartErrorMessageWrapper: '[data-cart-error-message-wrapper]',
    cartItem: '[data-cart-item]',
    cartItemDetails: '[data-cart-item-details]',
    cartItemDiscount: '[data-cart-item-discount]',
    cartItemDiscountedPriceGroup: '[data-cart-item-discounted-price-group]',
    cartItemDiscountTitle: '[data-cart-item-discount-title]',
    cartItemDiscountAmount: '[data-cart-item-discount-amount]',
    cartItemDiscountList: '[data-cart-item-discount-list]',
    cartItemFinalPrice: '[data-cart-item-final-price]',
    cartItemImage: '[data-cart-item-image]',
    cartItemLinePrice: '[data-cart-item-line-price]',
    cartItemOriginalPrice: '[data-cart-item-original-price]',
    cartItemPrice: '[data-cart-item-price]',
    cartItemPriceList: '[data-cart-item-price-list]',
    cartItemProperty: '[data-cart-item-property]',
    cartItemPropertyName: '[data-cart-item-property-name]',
    cartItemPropertyValue: '[data-cart-item-property-value]',
    cartItemRegularPriceGroup: '[data-cart-item-regular-price-group]',
    cartItemRegularPrice: '[data-cart-item-regular-price]',
    cartItemTitle: '[data-cart-item-title]',
    cartItemOption: '[data-cart-item-option]',
    cartItemSellingPlanName: '[data-cart-item-selling-plan-name]',
    cartLineItems: '[data-cart-line-items]',
    cartNote: '[data-cart-notes]',
    cartQuantityErrorMessage: '[data-cart-quantity-error-message]',
    cartQuantityErrorMessageWrapper:
      '[data-cart-quantity-error-message-wrapper]',
    cartRemove: '[data-cart-remove]',
    cartStatus: '[data-cart-status]',
    cartSubtotal: '[data-cart-subtotal]',
    cartTableCell: '[data-cart-table-cell]',
    cartWrapper: '[data-cart-wrapper]',
    emptyPageContent: '[data-empty-page-content]',
    quantityInput: '[data-quantity-input]',
    quantityInputMobile: '[data-quantity-input-mobile]',
    quantityInputDesktop: '[data-quantity-input-desktop]',
    quantityLabelMobile: '[data-quantity-label-mobile]',
    quantityLabelDesktop: '[data-quantity-label-desktop]',
    inputQty: '[data-quantity-input]',
    thumbnails: '.cart__image',
    unitPrice: '[data-unit-price]',
    unitPriceBaseUnit: '[data-unit-price-base-unit]',
    unitPriceGroup: '[data-unit-price-group]'
  };

  var classes = {
    cartNoCookies: 'cart--no-cookies',
    cartRemovedProduct: 'cart__removed-product',
    thumbnails: 'cart__image',
    hide: 'hide',
    inputError: 'input--error'
  };

  var attributes = {
    cartItemIndex: 'data-cart-item-index',
    cartItemKey: 'data-cart-item-key',
    cartItemQuantity: 'data-cart-item-quantity',
    cartItemTitle: 'data-cart-item-title',
    cartItemUrl: 'data-cart-item-url',
    quantityItem: 'data-quantity-item'
  };

  var mediumUpQuery = '(min-width: ' + theme.breakpoints.medium + 'px)';

  function Cart(container) {
    this.container = container;
    this.thumbnails = this.container.querySelectorAll(selectors.thumbnails);
    this.quantityInputs = this.container.querySelectorAll(selectors.inputQty);
    this.ajaxEnabled =
      this.container.getAttribute('data-ajax-enabled') === 'true';

    this.cartRoutes = JSON.parse(
      document.querySelector('[data-cart-routes]').innerHTML
    );

    this._handleInputQty = theme.Helpers.debounce(
      this._handleInputQty.bind(this),
      500
    );
    this.setQuantityFormControllers = this.setQuantityFormControllers.bind(
      this
    );
    this._onNoteChange = this._onNoteChange.bind(this);
    this._onRemoveItem = this._onRemoveItem.bind(this);

    if (!theme.Helpers.cookiesEnabled()) {
      this.container.classList.add(classes.cartNoCookies);
    }

    this.thumbnails.forEach(function(element) {
      element.style.cursor = 'pointer';
    });

    this.container.addEventListener('click', this._handleThumbnailClick);
    this.container.addEventListener('change', this._handleInputQty);

    this.mql = window.matchMedia(mediumUpQuery);
    this.mql.addListener(this.setQuantityFormControllers);

    this.setQuantityFormControllers();

    if (this.ajaxEnabled) {
      /**
       * Because the entire cart is recreated when a cart item is updated,
       * we cannot cache the elements in the cart. Instead, we add the event
       * listeners on the cart's container to allow us to retain the event
       * listeners after rebuilding the cart when an item is updated.
       */
      this.container.addEventListener('click', this._onRemoveItem);
      this.container.addEventListener('change', this._onNoteChange);

      this._setupCartTemplates();
    }
  }

  Cart.prototype = Object.assign({}, Cart.prototype, {
    _setupCartTemplates: function() {
      var cartItem = this.container.querySelector(selectors.cartItem);
      if (!cartItem) return;

      this.itemTemplate = this.container
        .querySelector(selectors.cartItem)
        .cloneNode(true);

      this.itemDiscountTemplate = this.itemTemplate
        .querySelector(selectors.cartItemDiscount)
        .cloneNode(true);

      this.cartDiscountTemplate = this.container
        .querySelector(selectors.cartDiscount)
        .cloneNode(true);

      this.itemPriceListTemplate = this.itemTemplate
        .querySelector(selectors.cartItemPriceList)
        .cloneNode(true);

      this.itemOptionTemplate = this.itemTemplate
        .querySelector(selectors.cartItemOption)
        .cloneNode(true);

      this.itemPropertyTemplate = this.itemTemplate
        .querySelector(selectors.cartItemProperty)
        .cloneNode(true);

      this.itemSellingPlanNameTemplate = this.itemTemplate
        .querySelector(selectors.cartItemSellingPlanName)
        .cloneNode(true);
    },

    _handleInputQty: function(evt) {
      if (!evt.target.hasAttribute('data-quantity-input')) return;

      var input = evt.target;
      var itemElement = input.closest(selectors.cartItem);

      var itemIndex = Number(input.getAttribute('data-quantity-item'));

      var itemQtyInputs = this.container.querySelectorAll(
        "[data-quantity-item='" + itemIndex + "']"
      );

      var value = parseInt(input.value);

      var isValidValue = !(value < 0 || isNaN(value));

      itemQtyInputs.forEach(function(element) {
        element.value = value;
      });

      this._hideCartError();
      this._hideQuantityErrorMessage();

      if (!isValidValue) {
        this._showQuantityErrorMessages(itemElement);
        return;
      }

      if (isValidValue && this.ajaxEnabled) {
        this._updateItemQuantity(itemIndex, itemElement, itemQtyInputs, value);
      }
    },

    _updateItemQuantity: function(
      itemIndex,
      itemElement,
      itemQtyInputs,
      value
    ) {
      var key = itemElement.getAttribute(attributes.cartItemKey);
      var index = Number(itemElement.getAttribute(attributes.cartItemIndex));

      var request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;'
        },
        body: JSON.stringify({
          line: index,
          quantity: value
        })
      };

      fetch(this.cartRoutes.cartChangeUrl + '.js', request)
        .then(function(response) {
          return response.json();
        })
        .then(
          function(state) {
            this._setCartCountBubble(state.item_count);

            if (!state.item_count) {
              this._emptyCart();
              return;
            }

            // Cache current in-focus element, used later to restore focus
            var inFocus = document.activeElement;

            this._createCart(state);

            if (!value) {
              this._showRemoveMessage(itemElement.cloneNode(true));
              return;
            }

            var item = this.getItem(key, state);

            this._updateLiveRegion(item);

            // Restore focus to the "equivalent" element after the DOM has been updated
            if (!inFocus) return;
            var row = inFocus.closest('[' + attributes.cartItemIndex + ']');
            if (!row) return;
            var target = this.container.querySelector(
              '[' +
                attributes.cartItemIndex +
                '="' +
                row.getAttribute(attributes.cartItemIndex) +
                '"] [data-role="' +
                inFocus.getAttribute('data-role') +
                '"]'
            );
            if (!target) return;
            target.focus();
          }.bind(this)
        )
        .catch(
          function() {
            this._showCartError(null);
          }.bind(this)
        );
    },

    getItem: function(key, state) {
      return state.items.find(function(item) {
        return item.key === key;
      });
    },

    _liveRegionText: function(item) {
      // Dummy content for live region
      var liveRegionText =
        theme.strings.update +
        ': [QuantityLabel]: [Quantity], [Regular] [$$] [DiscountedPrice] [$]. [PriceInformation]';

      // Update Quantity
      liveRegionText = liveRegionText
        .replace('[QuantityLabel]', theme.strings.quantity)
        .replace('[Quantity]', item.quantity);

      // Update pricing information
      var regularLabel = '';
      var regularPrice = theme.Currency.formatMoney(
        item.original_line_price,
        theme.moneyFormat
      );
      var discountLabel = '';
      var discountPrice = '';
      var discountInformation = '';

      if (item.original_line_price > item.final_line_price) {
        regularLabel = theme.strings.regularTotal;

        discountLabel = theme.strings.discountedTotal;
        discountPrice = theme.Currency.formatMoney(
          item.final_line_price,
          theme.moneyFormat
        );

        discountInformation = theme.strings.priceColumn;
      }

      liveRegionText = liveRegionText
        .replace('[Regular]', regularLabel)
        .replace('[$$]', regularPrice)
        .replace('[DiscountedPrice]', discountLabel)
        .replace('[$]', discountPrice)
        .replace('[PriceInformation]', discountInformation)
        .trim();

      return liveRegionText;
    },

    _updateLiveRegion: function(item) {
      if (!item) return;

      var liveRegion = this.container.querySelector(selectors.cartStatus);

      liveRegion.textContent = this._liveRegionText(item);
      liveRegion.setAttribute('aria-hidden', false);

      setTimeout(function() {
        liveRegion.setAttribute('aria-hidden', true);
      }, 1000);
    },

    _createCart: function(state) {
      var cartDiscountList = this._createCartDiscountList(state);

      var cartTable = this.container.querySelector(selectors.cartLineItems);
      cartTable.innerHTML = '';

      this._createLineItemList(state).forEach(function(lineItem) {
        cartTable.appendChild(lineItem);
      });

      this.setQuantityFormControllers();

      this.cartNotes =
        this.cartNotes || this.container.querySelector(selectors.cartNote);

      if (this.cartNotes) {
        this.cartNotes.value = state.note;
      }

      var discountWrapper = this.container.querySelector(
        selectors.cartDiscountWrapper
      );

      if (cartDiscountList.length === 0) {
        discountWrapper.innerHTML = '';
        discountWrapper.classList.add(classes.hide);
      } else {
        discountWrapper.innerHTML = '';

        cartDiscountList.forEach(function(discountItem) {
          discountWrapper.appendChild(discountItem);
        });

        discountWrapper.classList.remove(classes.hide);
      }

      this.container.querySelector(
        selectors.cartSubtotal
      ).innerHTML = theme.Currency.formatMoney(
        state.total_price,
        theme.moneyFormatWithCurrency
      );
    },

    _createCartDiscountList: function(cart) {
      return cart.cart_level_discount_applications.map(
        function(discount) {
          var discountNode = this.cartDiscountTemplate.cloneNode(true);

          discountNode.querySelector(selectors.cartDiscountTitle).textContent =
            discount.title;

          discountNode.querySelector(
            selectors.cartDiscountAmount
          ).innerHTML = theme.Currency.formatMoney(
            discount.total_allocated_amount,
            theme.moneyFormat
          );

          return discountNode;
        }.bind(this)
      );
    },

    _createLineItemList: function(state) {
      return state.items.map(
        function(item, index) {
          var itemNode = this.itemTemplate.cloneNode(true);

          var itemPriceList = this.itemPriceListTemplate.cloneNode(true);

          this._setLineItemAttributes(itemNode, item, index);
          this._setLineItemImage(itemNode, item.featured_image);

          var cartItemTitle = itemNode.querySelector(selectors.cartItemTitle);
          cartItemTitle.textContent = item.product_title;
          cartItemTitle.setAttribute('href', item.url);

          var selling_plan_name = item.selling_plan_allocation
            ? item.selling_plan_allocation.selling_plan.name
            : null;

          var productDetailsList = this._createProductDetailsList(
            item.product_has_only_default_variant,
            item.options_with_values,
            item.properties,
            selling_plan_name
          );

          this._setProductDetailsList(itemNode, productDetailsList);

          this._setItemRemove(itemNode, item.title);

          itemPriceList.innerHTML = this._createItemPrice(
            item.original_price,
            item.final_price
          ).outerHTML;

          if (item.unit_price_measurement) {
            itemPriceList.appendChild(
              this._createUnitPrice(
                item.unit_price,
                item.unit_price_measurement
              )
            );
          }

          this._setItemPrice(itemNode, itemPriceList);

          var itemDiscountList = this._createItemDiscountList(item);
          this._setItemDiscountList(itemNode, itemDiscountList);
          this._setQuantityInputs(itemNode, item, index);

          var itemLinePrice = this._createItemPrice(
            item.original_line_price,
            item.final_line_price
          );

          this._setItemLinePrice(itemNode, itemLinePrice);

          return itemNode;
        }.bind(this)
      );
    },

    _setLineItemAttributes: function(itemNode, item, index) {
      itemNode.setAttribute(attributes.cartItemKey, item.key);
      itemNode.setAttribute(attributes.cartItemUrl, item.url);
      itemNode.setAttribute(attributes.cartItemTitle, item.title);
      itemNode.setAttribute(attributes.cartItemIndex, index + 1);
      itemNode.setAttribute(attributes.cartItemQuantity, item.quantity);
    },

    _setLineItemImage: function(itemNode, featuredImage) {
      var image = itemNode.querySelector(selectors.cartItemImage);

      var sizedImageUrl =
        featuredImage.url !== null
          ? theme.Images.getSizedImageUrl(featuredImage.url, 'x190')
          : null;

      if (sizedImageUrl) {
        image.setAttribute('alt', featuredImage.alt);
        image.setAttribute('src', sizedImageUrl);
        image.classList.remove(classes.hide);
      } else {
        image.parentNode.removeChild(image);
      }
    },

    _setProductDetailsList: function(item, productDetailsList) {
      var itemDetails = item.querySelector(selectors.cartItemDetails);

      if (productDetailsList.length) {
        itemDetails.classList.remove(classes.hide);
        itemDetails.innerHTML = productDetailsList.reduce(function(
          result,
          element
        ) {
          return result + element.outerHTML;
        },
        '');

        return;
      }

      itemDetails.classList.add(classes.hide);
      itemDetails.textContent = '';
    },

    _setItemPrice: function(item, price) {
      item.querySelector(selectors.cartItemPrice).innerHTML = price.outerHTML;
    },

    _setItemDiscountList: function(item, discountList) {
      var itemDiscountList = item.querySelector(selectors.cartItemDiscountList);

      if (discountList.length === 0) {
        itemDiscountList.innerHTML = '';
        itemDiscountList.classList.add(classes.hide);
      } else {
        itemDiscountList.innerHTML = discountList.reduce(function(
          result,
          element
        ) {
          return result + element.outerHTML;
        },
        '');

        itemDiscountList.classList.remove(classes.hide);
      }
    },

    _setItemRemove: function(item, title) {
      item
        .querySelector(selectors.cartRemove)
        .setAttribute(
          'aria-label',
          theme.strings.removeLabel.replace('[product]', title)
        );
    },

    _setQuantityInputs: function(itemNode, item, index) {
      var mobileInput = itemNode.querySelector(selectors.quantityInputMobile);
      var desktopInput = itemNode.querySelector(selectors.quantityInputDesktop);

      mobileInput.setAttribute('id', 'updates_' + item.key);
      desktopInput.setAttribute('id', 'updates_large_' + item.key);

      [mobileInput, desktopInput].forEach(function(element) {
        element.setAttribute(attributes.quantityItem, index + 1);
        element.value = item.quantity;
      });

      itemNode
        .querySelector(selectors.quantityLabelMobile)
        .setAttribute('for', 'updates_' + item.key);

      itemNode
        .querySelector(selectors.quantityLabelDesktop)
        .setAttribute('for', 'updates_large_' + item.key);
    },

    setQuantityFormControllers: function() {
      var desktopQuantityInputs = document.querySelectorAll(
        selectors.quantityInputDesktop
      );

      var mobileQuantityInputs = document.querySelectorAll(
        selectors.quantityInputMobile
      );

      if (this.mql.matches) {
        addNameAttribute(desktopQuantityInputs);
        removeNameAttribute(mobileQuantityInputs);
      } else {
        addNameAttribute(mobileQuantityInputs);
        removeNameAttribute(desktopQuantityInputs);
      }

      function addNameAttribute(inputs) {
        inputs.forEach(function(element) {
          element.setAttribute('name', 'updates[]');
        });
      }

      function removeNameAttribute(inputs) {
        inputs.forEach(function(element) {
          element.removeAttribute('name');
        });
      }
    },

    _setItemLinePrice: function(item, price) {
      item.querySelector(selectors.cartItemLinePrice).innerHTML =
        price.outerHTML;
    },

    _createProductDetailsList: function(
      product_has_only_default_variant,
      options,
      properties,
      selling_plan_name
    ) {
      var optionsPropertiesHTML = [];

      if (!product_has_only_default_variant) {
        optionsPropertiesHTML = optionsPropertiesHTML.concat(
          this._getOptionList(options)
        );
      }

      if (selling_plan_name) {
        optionsPropertiesHTML = optionsPropertiesHTML.concat(
          this._getSellingPlanName(selling_plan_name)
        );
      }

      if (properties !== null && Object.keys(properties).length !== 0) {
        optionsPropertiesHTML = optionsPropertiesHTML.concat(
          this._getPropertyList(properties)
        );
      }

      return optionsPropertiesHTML;
    },

    _getOptionList: function(options) {
      return options.map(
        function(option) {
          var optionElement = this.itemOptionTemplate.cloneNode(true);

          optionElement.textContent = option.name + ': ' + option.value;
          optionElement.classList.remove(classes.hide);

          return optionElement;
        }.bind(this)
      );
    },

    _getPropertyList: function(properties) {
      var propertiesArray =
        properties !== null ? Object.entries(properties) : [];

      var filteredPropertiesArray = propertiesArray.filter(function(property) {
        // Line item properties prefixed with an underscore are not to be displayed
        // if the property value has a length of 0 (empty), don't display it
        if (property[0].charAt(0) === '_' || property[1].length === 0) {
          return false;
        } else {
          return true;
        }
      });

      return filteredPropertiesArray.map(
        function(property) {
          var propertyElement = this.itemPropertyTemplate.cloneNode(true);

          propertyElement.querySelector(
            selectors.cartItemPropertyName
          ).textContent = property[0] + ': ';

          if (property[0].indexOf('/uploads/') === -1) {
            propertyElement.querySelector(
              selectors.cartItemPropertyValue
            ).textContent = property[1];
          } else {
            propertyElement.querySelector(
              selectors.cartItemPropertyValue
            ).innerHTML =
              '<a href="' +
              property[1] +
              '"> ' +
              property[1].split('/').pop() +
              '</a>';
          }

          propertyElement.classList.remove(classes.hide);

          return propertyElement;
        }.bind(this)
      );
    },

    _getSellingPlanName: function(selling_plan_name) {
      var sellingPlanNameElement = this.itemSellingPlanNameTemplate.cloneNode(
        true
      );

      sellingPlanNameElement.textContent = selling_plan_name;
      sellingPlanNameElement.classList.remove(classes.hide);

      return sellingPlanNameElement;
    },

    _createItemPrice: function(original_price, final_price) {
      var originalPriceHTML = theme.Currency.formatMoney(
        original_price,
        theme.moneyFormat
      );

      var resultHTML;

      if (original_price !== final_price) {
        resultHTML = this.itemPriceListTemplate
          .querySelector(selectors.cartItemDiscountedPriceGroup)
          .cloneNode(true);

        resultHTML.querySelector(
          selectors.cartItemOriginalPrice
        ).innerHTML = originalPriceHTML;

        resultHTML.querySelector(
          selectors.cartItemFinalPrice
        ).innerHTML = theme.Currency.formatMoney(
          final_price,
          theme.moneyFormat
        );
      } else {
        resultHTML = this.itemPriceListTemplate
          .querySelector(selectors.cartItemRegularPriceGroup)
          .cloneNode(true);

        resultHTML.querySelector(
          selectors.cartItemRegularPrice
        ).innerHTML = originalPriceHTML;
      }

      resultHTML.classList.remove(classes.hide);
      return resultHTML;
    },

    _createUnitPrice: function(unitPrice, unitPriceMeasurement) {
      var unitPriceGroup = this.itemPriceListTemplate
        .querySelector(selectors.unitPriceGroup)
        .cloneNode(true);

      var unitPriceBaseUnit =
        (unitPriceMeasurement.reference_value !== 1
          ? unitPriceMeasurement.reference_value
          : '') + unitPriceMeasurement.reference_unit;

      unitPriceGroup.querySelector(
        selectors.unitPriceBaseUnit
      ).textContent = unitPriceBaseUnit;

      unitPriceGroup.querySelector(
        selectors.unitPrice
      ).innerHTML = theme.Currency.formatMoney(unitPrice, theme.moneyFormat);

      unitPriceGroup.classList.remove(classes.hide);

      return unitPriceGroup;
    },

    _createItemDiscountList: function(item) {
      return item.line_level_discount_allocations.map(
        function(discount) {
          var discountNode = this.itemDiscountTemplate.cloneNode(true);

          discountNode.querySelector(
            selectors.cartItemDiscountTitle
          ).textContent = discount.discount_application.title;

          discountNode.querySelector(
            selectors.cartItemDiscountAmount
          ).innerHTML = theme.Currency.formatMoney(
            discount.amount,
            theme.moneyFormat
          );

          return discountNode;
        }.bind(this)
      );
    },

    _showQuantityErrorMessages: function(itemElement) {
      itemElement
        .querySelectorAll(selectors.cartQuantityErrorMessage)
        .forEach(function(element) {
          element.textContent = theme.strings.quantityMinimumMessage;
        });

      itemElement
        .querySelectorAll(selectors.cartQuantityErrorMessageWrapper)
        .forEach(function(element) {
          element.classList.remove(classes.hide);
        });

      itemElement
        .querySelectorAll(selectors.inputQty)
        .forEach(function(element) {
          element.classList.add(classes.inputError);
          element.focus();
        });
    },

    _hideQuantityErrorMessage: function() {
      var errorMessages = document.querySelectorAll(
        selectors.cartQuantityErrorMessageWrapper
      );

      errorMessages.forEach(function(element) {
        element.classList.add(classes.hide);

        element.querySelector(selectors.cartQuantityErrorMessage).textContent =
          '';
      });

      this.container
        .querySelectorAll(selectors.inputQty)
        .forEach(function(element) {
          element.classList.remove(classes.inputError);
        });
    },

    _handleThumbnailClick: function(evt) {
      if (!evt.target.classList.contains(classes.thumbnails)) return;

      window.location.href = evt.target
        .closest(selectors.cartItem)
        .getAttribute('data-cart-item-url');
    },

    _onNoteChange: function(evt) {
      if (!evt.target.hasAttribute('data-cart-notes')) return;

      var note = evt.target.value;
      this._hideCartError();
      this._hideQuantityErrorMessage();

      var headers = new Headers({ 'Content-Type': 'application/json' });

      var request = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ note: note })
      };

      fetch('/cart/update.js', request).catch(
        function() {
          this._showCartError(evt.target);
        }.bind(this)
      );
    },

    _showCartError: function(elementToFocus) {
      document.querySelector(selectors.cartErrorMessage).textContent =
        theme.strings.cartError;

      document
        .querySelector(selectors.cartErrorMessageWrapper)
        .classList.remove(classes.hide);

      if (!elementToFocus) return;
      elementToFocus.focus();
    },

    _hideCartError: function() {
      document
        .querySelector(selectors.cartErrorMessageWrapper)
        .classList.add(classes.hide);
      document.querySelector(selectors.cartErrorMessage).textContent = '';
    },

    _onRemoveItem: function(evt) {
      if (!evt.target.hasAttribute('data-cart-remove')) return;

      evt.preventDefault();
      var lineItem = evt.target.closest(selectors.cartItem);
      var index = Number(lineItem.getAttribute(attributes.cartItemIndex));

      this._hideCartError();

      var request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;'
        },
        body: JSON.stringify({
          line: index,
          quantity: 0
        })
      };

      fetch(this.cartRoutes.cartChangeUrl + '.js', request)
        .then(function(response) {
          return response.json();
        })
        .then(
          function(state) {
            if (state.item_count === 0) {
              this._emptyCart();
            } else {
              this._createCart(state);
              this._showRemoveMessage(lineItem.cloneNode(true));
            }

            this._setCartCountBubble(state.item_count);
          }.bind(this)
        )
        .catch(
          function() {
            this._showCartError(null);
          }.bind(this)
        );
    },

    _showRemoveMessage: function(lineItem) {
      var index = lineItem.getAttribute('data-cart-item-index');
      var removeMessage = this._getRemoveMessage(lineItem);

      if (index - 1 === 0) {
        this.container
          .querySelector('[data-cart-item-index="1"]')
          .insertAdjacentHTML('beforebegin', removeMessage.outerHTML);
      } else {
        this.container
          .querySelector("[data-cart-item-index='" + (index - 1) + "']")
          .insertAdjacentHTML('afterend', removeMessage.outerHTML);
      }

      this.container.querySelector('[data-removed-item-row]').focus();
    },

    _getRemoveMessage: function(lineItem) {
      var formattedMessage = this._formatRemoveMessage(lineItem);

      var tableCell = lineItem
        .querySelector(selectors.cartTableCell)
        .cloneNode(true);

      tableCell.removeAttribute('class');
      tableCell.classList.add(classes.cartRemovedProduct);
      tableCell.setAttribute('colspan', '4');
      tableCell.innerHTML = formattedMessage;

      lineItem.setAttribute('role', 'alert');
      lineItem.setAttribute('tabindex', '-1');
      lineItem.setAttribute('data-removed-item-row', true);
      lineItem.innerHTML = tableCell.outerHTML;

      return lineItem;
    },

    _formatRemoveMessage: function(lineItem) {
      var quantity = lineItem.getAttribute('data-cart-item-quantity');
      var url = lineItem.getAttribute(attributes.cartItemUrl);
      var title = lineItem.getAttribute(attributes.cartItemTitle);

      return theme.strings.removedItemMessage
        .replace('[quantity]', quantity)
        .replace(
          '[link]',
          '<a ' +
            'href="' +
            url +
            '" class="text-link text-link--accent">' +
            title +
            '</a>'
        );
    },

    _setCartCountBubble: function(quantity) {
      this.cartCountBubble =
        this.cartCountBubble ||
        document.querySelector(selectors.cartCountBubble);

      this.cartCount =
        this.cartCount || document.querySelector(selectors.cartCount);

      if (quantity > 0) {
        this.cartCountBubble.classList.remove(classes.hide);
        this.cartCount.textContent = quantity;
      } else {
        this.cartCountBubble.classList.add(classes.hide);
        this.cartCount.textContent = '';
      }
    },

    _emptyCart: function() {
      this.emptyPageContent =
        this.emptyPageContent ||
        this.container.querySelector(selectors.emptyPageContent);

      this.cartWrapper =
        this.cartWrapper || this.container.querySelector(selectors.cartWrapper);

      this.emptyPageContent.classList.remove(classes.hide);
      this.cartWrapper.classList.add(classes.hide);
    }
  });

  return Cart;
})();

window.theme = window.theme || {};

theme.Filters = (function() {
  var settings = {
    mediaQueryMediumUp: '(min-width: ' + theme.breakpoints.medium + 'px)'
  };

  var selectors = {
    filterSelection: '#FilterTags',
    sortSelection: '#SortBy',
    selectInput: '[data-select-input]'
  };

  function Filters(container) {
    this.filterSelect = container.querySelector(selectors.filterSelection);
    this.sortSelect = container.querySelector(selectors.sortSelection);

    this.selects = document.querySelectorAll(selectors.selectInput);

    if (this.sortSelect) {
      this.defaultSort = this._getDefaultSortValue();
    }

    if (this.selects.length) {
      this.selects.forEach(function(select) {
        select.classList.remove('hidden');
      });
    }

    this.initBreakpoints = this._initBreakpoints.bind(this);

    this.mql = window.matchMedia(settings.mediaQueryMediumUp);
    this.mql.addListener(this.initBreakpoints);

    if (this.filterSelect) {
      this.filterSelect.addEventListener(
        'change',
        this._onFilterChange.bind(this)
      );
    }

    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', this._onSortChange.bind(this));
    }

    theme.Helpers.promiseStylesheet().then(
      function() {
        this._initBreakpoints();
      }.bind(this)
    );
    this._initParams();
  }

  Filters.prototype = Object.assign({}, Filters.prototype, {
    _initBreakpoints: function() {
      if (this.mql.matches) {
        slate.utils.resizeSelects(this.selects);
      }
    },

    _initParams: function() {
      this.queryParams = {};
      if (location.search.length) {
        var aKeyValue;
        var aCouples = location.search.substr(1).split('&');
        for (var i = 0; i < aCouples.length; i++) {
          aKeyValue = aCouples[i].split('=');
          if (aKeyValue.length > 1) {
            this.queryParams[
              decodeURIComponent(aKeyValue[0])
            ] = decodeURIComponent(aKeyValue[1]);
          }
        }
      }
    },

    _onSortChange: function() {
      this.queryParams.sort_by = this._getSortValue();

      if (this.queryParams.page) {
        delete this.queryParams.page;
      }

      window.location.search = decodeURIComponent(
        new URLSearchParams(Object.entries(this.queryParams)).toString()
      );
    },

    _onFilterChange: function() {
      document.location.href = this._getFilterValue();
    },

    _getFilterValue: function() {
      return this.filterSelect.value;
    },

    _getSortValue: function() {
      return this.sortSelect.value || this.defaultSort;
    },

    _getDefaultSortValue: function() {
      return this.sortSelect.dataset.defaultSortby;
    },

    onUnload: function() {
      if (this.filterSelect) {
        this.filterSelect.removeEventListener('change', this._onFilterChange);
      }

      if (this.sortSelect) {
        this.sortSelect.removeEventListener('change', this._onSortChange);
      }

      this.mql.removeListener(this.initBreakpoints);
    }
  });

  return Filters;
})();

window.theme = window.theme || {};

theme.HeaderSection = (function() {
  function Header() {
    theme.Header.init();
    theme.MobileNav.init();
    theme.SearchDrawer.init();
    theme.Search.init();
  }

  Header.prototype = Object.assign({}, Header.prototype, {
    onUnload: function() {
      theme.Header.unload();
      theme.Search.unload();
      theme.MobileNav.unload();
    }
  });

  return Header;
})();

theme.Maps = (function() {
  var config = {
    zoom: 14
  };
  var apiStatus = null;
  var mapsToLoad = [];

  var errors = {
    addressNoResults: theme.strings.addressNoResults,
    addressQueryLimit: theme.strings.addressQueryLimit,
    addressError: theme.strings.addressError,
    authError: theme.strings.authError
  };

  var selectors = {
    section: '[data-section-type="map"]',
    map: '[data-map]',
    mapOverlay: '[data-map-overlay]'
  };

  var classes = {
    mapError: 'map-section--load-error',
    errorMsg: 'map-section__error errors text-center'
  };

  // Global function called by Google on auth errors.
  // Show an auto error message on all map instances.
  // eslint-disable-next-line camelcase, no-unused-vars
  window.gm_authFailure = function() {
    if (!Shopify.designMode) {
      return;
    }

    document.querySelector(selectors.section).classList.add(classes.mapError);
    document.querySelector(selectors.map).remove();
    document
      .querySelector(selectors.mapOverlay)
      .insertAdjacentHTML(
        'afterend',
        '<div class="' +
          classes.errorMsg +
          '">' +
          theme.strings.authError +
          '</div>'
      );
  };

  function Map(container) {
    this.map = container.querySelector(selectors.map);
    if (!this.map) return;
    this.key = this.map.dataset.apiKey;

    if (typeof this.key === 'undefined') {
      return;
    }

    if (apiStatus === 'loaded') {
      this.createMap();
    } else {
      mapsToLoad.push(this);

      if (apiStatus !== 'loading') {
        apiStatus = 'loading';
        if (typeof window.google === 'undefined') {
          theme.Helpers.getScript(
            'https://maps.googleapis.com/maps/api/js?key=' + this.key
          ).then(function() {
            apiStatus = 'loaded';
            initAllMaps();
          });
        }
      }
    }
  }

  function initAllMaps() {
    // API has loaded, load all Map instances in queue
    mapsToLoad.forEach(function(map) {
      map.createMap();
    });
  }

  function geolocate(map) {
    return new Promise(function(resolve, reject) {
      var geocoder = new google.maps.Geocoder();
      var address = map.dataset.addressSetting;

      geocoder.geocode({ address: address }, function(results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
          reject(status);
        }

        resolve(results);
      });
    });
  }

  Map.prototype = Object.assign({}, Map.prototype, {
    createMap: function() {
      return geolocate(this.map)
        .then(
          function(results) {
            var mapOptions = {
              zoom: config.zoom,
              center: results[0].geometry.location,
              draggable: false,
              clickableIcons: false,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              disableDefaultUI: true
            };

            var map = (this.map = new google.maps.Map(this.map, mapOptions));
            var center = (this.center = map.getCenter());

            //eslint-disable-next-line no-unused-vars
            var marker = new google.maps.Marker({
              map: map,
              position: map.getCenter()
            });

            google.maps.event.addDomListener(
              window,
              'resize',
              theme.Helpers.debounce(
                function() {
                  google.maps.event.trigger(map, 'resize');
                  map.setCenter(center);
                  this.map.removeAttribute('style');
                }.bind(this),
                250
              )
            );
          }.bind(this)
        )
        .catch(
          function() {
            var errorMessage;

            switch (status) {
              case 'ZERO_RESULTS':
                errorMessage = errors.addressNoResults;
                break;
              case 'OVER_QUERY_LIMIT':
                errorMessage = errors.addressQueryLimit;
                break;
              case 'REQUEST_DENIED':
                errorMessage = errors.authError;
                break;
              default:
                errorMessage = errors.addressError;
                break;
            }

            // Show errors only to merchant in the editor.
            if (Shopify.designMode) {
              this.map.parentNode.classList.add(classes.mapError);
              this.map.parentNode.innerHTML =
                '<div class="' +
                classes.errorMsg +
                '">' +
                errorMessage +
                '</div>';
            }
          }.bind(this)
        );
    },

    onUnload: function() {
      if (this.map) {
        google.maps.event.clearListeners(this.map, 'resize');
      }
    }
  });

  return Map;
})();

/* eslint-disable no-new */
theme.Product = (function() {
  function Product(container) {
    this.container = container;
    var sectionId = container.getAttribute('data-section-id');
    this.zoomPictures = [];
    this.ajaxEnabled = container.getAttribute('data-ajax-enabled') === 'true';

    this.settings = {
      // Breakpoints from src/stylesheets/global/variables.scss.liquid
      mediaQueryMediumUp: 'screen and (min-width: 750px)',
      mediaQuerySmall: 'screen and (max-width: 749px)',
      bpSmall: false,
      enableHistoryState:
        container.getAttribute('data-enable-history-state') === 'true',
      namespace: '.slideshow-' + sectionId,
      sectionId: sectionId,
      sliderActive: false,
      zoomEnabled: false
    };

    this.selectors = {
      addToCart: '[data-add-to-cart]',
      addToCartText: '[data-add-to-cart-text]',
      cartCount: '[data-cart-count]',
      cartCountBubble: '[data-cart-count-bubble]',
      cartPopup: '[data-cart-popup]',
      cartPopupCartQuantity: '[data-cart-popup-cart-quantity]',
      cartPopupClose: '[data-cart-popup-close]',
      cartPopupDismiss: '[data-cart-popup-dismiss]',
      cartPopupImage: '[data-cart-popup-image]',
      cartPopupImageWrapper: '[data-cart-popup-image-wrapper]',
      cartPopupImagePlaceholder: '[data-image-loading-animation]',
      cartPopupProductDetails: '[data-cart-popup-product-details]',
      cartPopupQuantity: '[data-cart-popup-quantity]',
      cartPopupQuantityLabel: '[data-cart-popup-quantity-label]',
      cartPopupTitle: '[data-cart-popup-title]',
      cartPopupWrapper: '[data-cart-popup-wrapper]',
      loader: '[data-loader]',
      loaderStatus: '[data-loader-status]',
      quantity: '[data-quantity-input]',
      SKU: '.variant-sku',
      productStatus: '[data-product-status]',
      originalSelectorId: '#ProductSelect-' + sectionId,
      productForm: '[data-product-form]',
      errorMessage: '[data-error-message]',
      errorMessageWrapper: '[data-error-message-wrapper]',
      imageZoomWrapper: '[data-image-zoom-wrapper]',
      productMediaWrapper: '[data-product-single-media-wrapper]',
      productThumbImages: '.product-single__thumbnail--' + sectionId,
      productThumbs: '.product-single__thumbnails-' + sectionId,
      productThumbListItem: '.product-single__thumbnails-item',
      productThumbsWrapper: '.thumbnails-wrapper',
      saleLabel: '.product-price__sale-label-' + sectionId,
      singleOptionSelector: '.single-option-selector-' + sectionId,
      shopifyPaymentButton: '.shopify-payment-button',
      productMediaTypeVideo: '[data-product-media-type-video]',
      productMediaTypeModel: '[data-product-media-type-model]',
      priceContainer: '[data-price]',
      regularPrice: '[data-regular-price]',
      salePrice: '[data-sale-price]',
      unitPrice: '[data-unit-price]',
      unitPriceBaseUnit: '[data-unit-price-base-unit]',
      productPolicies: '[data-product-policies]',
      storeAvailabilityContainer: '[data-store-availability-container]'
    };

    this.classes = {
      cartPopupWrapperHidden: 'cart-popup-wrapper--hidden',
      hidden: 'hide',
      visibilityHidden: 'visibility-hidden',
      inputError: 'input--error',
      jsZoomEnabled: 'js-zoom-enabled',
      productOnSale: 'price--on-sale',
      productUnitAvailable: 'price--unit-available',
      productUnavailable: 'price--unavailable',
      productSoldOut: 'price--sold-out',
      cartImage: 'cart-popup-item__image',
      productFormErrorMessageWrapperHidden:
        'product-form__error-message-wrapper--hidden',
      activeClass: 'active-thumb',
      variantSoldOut: 'product-form--variant-sold-out'
    };

    this.eventHandlers = {};

    this.quantityInput = container.querySelector(this.selectors.quantity);
    this.errorMessageWrapper = container.querySelector(
      this.selectors.errorMessageWrapper
    );
    this.productForm = container.querySelector(this.selectors.productForm);
    this.addToCart = container.querySelector(this.selectors.addToCart);
    this.addToCartText = this.addToCart.querySelector(
      this.selectors.addToCartText
    );
    this.shopifyPaymentButton = container.querySelector(
      this.selectors.shopifyPaymentButton
    );
    this.priceContainer = container.querySelector(
      this.selectors.priceContainer
    );
    this.productPolicies = container.querySelector(
      this.selectors.productPolicies
    );
    this.storeAvailabilityContainer = container.querySelector(
      this.selectors.storeAvailabilityContainer
    );
    if (this.storeAvailabilityContainer) {
      this._initStoreAvailability();
    }

    this.loader = this.addToCart.querySelector(this.selectors.loader);
    this.loaderStatus = container.querySelector(this.selectors.loaderStatus);

    this.imageZoomWrapper = container.querySelectorAll(
      this.selectors.imageZoomWrapper
    );

    // Stop parsing if we don't have the product json script tag when loading
    // section in the Theme Editor
    var productJson = document.getElementById('ProductJson-' + sectionId);
    if (!productJson || !productJson.innerHTML.length) {
      return;
    }

    this.productSingleObject = JSON.parse(productJson.innerHTML);

    // Initial state for global productState object
    this.productState = {
      available: true,
      soldOut: false,
      onSale: false,
      showUnitPrice: false
    };

    this.settings.zoomEnabled =
      this.imageZoomWrapper.length > 0
        ? this.imageZoomWrapper[0].classList.contains(
            this.classes.jsZoomEnabled
          )
        : false;

    this.cartRoutes = JSON.parse(
      document.querySelector('[data-cart-routes]').innerHTML
    );

    this.initMobileBreakpoint = this._initMobileBreakpoint.bind(this);
    this.initDesktopBreakpoint = this._initDesktopBreakpoint.bind(this);

    this.mqlSmall = window.matchMedia(this.settings.mediaQuerySmall);
    this.mqlSmall.addListener(this.initMobileBreakpoint);

    this.mqlMediumUp = window.matchMedia(this.settings.mediaQueryMediumUp);
    this.mqlMediumUp.addListener(this.initDesktopBreakpoint);

    this.initMobileBreakpoint();
    this.initDesktopBreakpoint();
    this._stringOverrides();
    this._initVariants();
    this._initMediaSwitch();
    this._initAddToCart();
    this._setActiveThumbnail();
    this._initProductVideo();
    this._initModelViewerLibraries();
    this._initShopifyXrLaunch();
  }

  Product.prototype = Object.assign({}, Product.prototype, {
    _stringOverrides: function() {
      theme.productStrings = theme.productStrings || {};
      theme.strings = Object.assign({}, theme.strings, theme.productStrings);
    },

    _initStoreAvailability: function() {
      this.storeAvailability = new theme.StoreAvailability(
        this.storeAvailabilityContainer
      );

      var storeAvailabilityModalOpenedCallback = function(event) {
        if (
          this.cartPopupWrapper &&
          !this.cartPopupWrapper.classList.contains(
            this.classes.cartPopupWrapperHidden
          )
        ) {
          this._hideCartPopup(event);
        }
      };

      // hide cart popup modal if the store availability modal is also opened
      this.storeAvailabilityContainer.addEventListener(
        'storeAvailabilityModalOpened',
        storeAvailabilityModalOpenedCallback.bind(this)
      );
    },

    _initMobileBreakpoint: function() {
      if (this.mqlSmall.matches) {
        // initialize thumbnail slider on mobile if more than four thumbnails
        if (
          this.container.querySelectorAll(this.selectors.productThumbImages)
            .length > 4
        ) {
          this._initThumbnailSlider();
        }

        // destroy image zooming if enabled
        if (this.settings.zoomEnabled) {
          this.imageZoomWrapper.forEach(
            function(element, index) {
              this._destroyZoom(index);
            }.bind(this)
          );
        }

        this.settings.bpSmall = true;
      } else {
        if (this.settings.sliderActive) {
          this._destroyThumbnailSlider();
        }

        this.settings.bpSmall = false;
      }
    },

    _initDesktopBreakpoint: function() {
      if (this.mqlMediumUp.matches && this.settings.zoomEnabled) {
        this.imageZoomWrapper.forEach(
          function(element, index) {
            this._enableZoom(element, index);
          }.bind(this)
        );
      }
    },

    _initVariants: function() {
      var options = {
        container: this.container,
        enableHistoryState:
          this.container.getAttribute('data-enable-history-state') === 'true',
        singleOptionSelector: this.selectors.singleOptionSelector,
        originalSelectorId: this.selectors.originalSelectorId,
        product: this.productSingleObject
      };

      this.variants = new slate.Variants(options);
      if (this.storeAvailability && this.variants.currentVariant.available) {
        this.storeAvailability.updateContent(this.variants.currentVariant.id);
      }

      this.eventHandlers.updateAvailability = this._updateAvailability.bind(
        this
      );
      this.eventHandlers.updateMedia = this._updateMedia.bind(this);
      this.eventHandlers.updatePrice = this._updatePrice.bind(this);
      this.eventHandlers.updateSKU = this._updateSKU.bind(this);

      this.container.addEventListener(
        'variantChange',
        this.eventHandlers.updateAvailability
      );
      this.container.addEventListener(
        'variantImageChange',
        this.eventHandlers.updateMedia
      );
      this.container.addEventListener(
        'variantPriceChange',
        this.eventHandlers.updatePrice
      );
      this.container.addEventListener(
        'variantSKUChange',
        this.eventHandlers.updateSKU
      );
    },

    _initMediaSwitch: function() {
      if (!document.querySelector(this.selectors.productThumbImages)) {
        return;
      }

      var self = this;

      var productThumbImages = document.querySelectorAll(
        this.selectors.productThumbImages
      );

      this.eventHandlers.handleMediaFocus = this._handleMediaFocus.bind(this);

      productThumbImages.forEach(function(el) {
        el.addEventListener('click', function(evt) {
          evt.preventDefault();
          var mediaId = el.getAttribute('data-thumbnail-id');

          self._switchMedia(mediaId);
          self._setActiveThumbnail(mediaId);
        });
        el.addEventListener('keyup', self.eventHandlers.handleMediaFocus);
      });
    },

    _initAddToCart: function() {
      this.productForm.addEventListener(
        'submit',
        function(evt) {
          if (this.addToCart.getAttribute('aria-disabled') === 'true') {
            evt.preventDefault();
            return;
          }

          if (!this.ajaxEnabled) return;

          evt.preventDefault();

          this.previouslyFocusedElement = document.activeElement;

          var isInvalidQuantity =
            !!this.quantityInput && this.quantityInput.value <= 0;

          if (isInvalidQuantity) {
            this._showErrorMessage(theme.strings.quantityMinimumMessage);
            return;
          }

          if (!isInvalidQuantity && this.ajaxEnabled) {
            // disable the addToCart and dynamic checkout button while
            // request/cart popup is loading and handle loading state
            this._handleButtonLoadingState(true);
            this._addItemToCart(this.productForm);
            return;
          }
        }.bind(this)
      );
    },

    _initProductVideo: function() {
      var sectionId = this.settings.sectionId;

      var productMediaTypeVideo = this.container.querySelectorAll(
        this.selectors.productMediaTypeVideo
      );
      productMediaTypeVideo.forEach(function(el) {
        theme.ProductVideo.init(el, sectionId);
      });
    },

    _initModelViewerLibraries: function() {
      var modelViewerElements = this.container.querySelectorAll(
        this.selectors.productMediaTypeModel
      );
      if (modelViewerElements.length < 1) return;
      theme.ProductModel.init(modelViewerElements, this.settings.sectionId);
    },

    _initShopifyXrLaunch: function() {
      this.eventHandlers.initShopifyXrLaunchHandler = this._initShopifyXrLaunchHandler.bind(
        this
      );
      document.addEventListener(
        'shopify_xr_launch',
        this.eventHandlers.initShopifyXrLaunchHandler
      );
    },

    _initShopifyXrLaunchHandler: function() {
      var currentMedia = this.container.querySelector(
        this.selectors.productMediaWrapper +
          ':not(.' +
          self.classes.hidden +
          ')'
      );
      currentMedia.dispatchEvent(
        new CustomEvent('xrLaunch', {
          bubbles: true,
          cancelable: true
        })
      );
    },

    _addItemToCart: function(form) {
      var self = this;

      fetch(this.cartRoutes.cartAddUrl + '.js', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: theme.Helpers.serialize(form)
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          if (json.status && json.status !== 200) {
            var error = new Error(json.description);
            error.isFromServer = true;
            throw error;
          }
          self._hideErrorMessage();
          self._setupCartPopup(json);
        })
        .catch(function(error) {
          self.previouslyFocusedElement.focus();
          self._showErrorMessage(
            error.isFromServer && error.message.length
              ? error.message
              : theme.strings.cartError
          );
          self._handleButtonLoadingState(false);
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },

    _handleButtonLoadingState: function(isLoading) {
      if (isLoading) {
        this.addToCart.setAttribute('aria-disabled', true);
        this.addToCartText.classList.add(this.classes.hidden);
        this.loader.classList.remove(this.classes.hidden);

        if (this.shopifyPaymentButton) {
          this.shopifyPaymentButton.setAttribute('disabled', true);
        }

        this.loaderStatus.setAttribute('aria-hidden', false);
      } else {
        this.addToCart.removeAttribute('aria-disabled');
        this.addToCartText.classList.remove(this.classes.hidden);
        this.loader.classList.add(this.classes.hidden);

        if (this.shopifyPaymentButton) {
          this.shopifyPaymentButton.removeAttribute('disabled');
        }

        this.loaderStatus.setAttribute('aria-hidden', true);
      }
    },

    _showErrorMessage: function(errorMessage) {
      var errorMessageContainer = this.container.querySelector(
        this.selectors.errorMessage
      );
      errorMessageContainer.innerHTML = errorMessage;

      if (this.quantityInput) {
        this.quantityInput.classList.add(this.classes.inputError);
      }

      this.errorMessageWrapper.classList.remove(
        this.classes.productFormErrorMessageWrapperHidden
      );
      this.errorMessageWrapper.setAttribute('aria-hidden', true);
      this.errorMessageWrapper.removeAttribute('aria-hidden');
    },

    _hideErrorMessage: function() {
      this.errorMessageWrapper.classList.add(
        this.classes.productFormErrorMessageWrapperHidden
      );

      if (this.quantityInput) {
        this.quantityInput.classList.remove(this.classes.inputError);
      }
    },

    _setupCartPopup: function(item) {
      this.cartPopup =
        this.cartPopup || document.querySelector(this.selectors.cartPopup);
      this.cartPopupWrapper =
        this.cartPopupWrapper ||
        document.querySelector(this.selectors.cartPopupWrapper);
      this.cartPopupTitle =
        this.cartPopupTitle ||
        document.querySelector(this.selectors.cartPopupTitle);
      this.cartPopupQuantity =
        this.cartPopupQuantity ||
        document.querySelector(this.selectors.cartPopupQuantity);
      this.cartPopupQuantityLabel =
        this.cartPopupQuantityLabel ||
        document.querySelector(this.selectors.cartPopupQuantityLabel);
      this.cartPopupClose =
        this.cartPopupClose ||
        document.querySelector(this.selectors.cartPopupClose);
      this.cartPopupDismiss =
        this.cartPopupDismiss ||
        document.querySelector(this.selectors.cartPopupDismiss);
      this.cartPopupImagePlaceholder =
        this.cartPopupImagePlaceholder ||
        document.querySelector(this.selectors.cartPopupImagePlaceholder);

      this._setupCartPopupEventListeners();

      this._updateCartPopupContent(item);
    },

    _updateCartPopupContent: function(item) {
      var self = this;

      var quantity = this.quantityInput ? this.quantityInput.value : 1;

      var selling_plan_name = item.selling_plan_allocation
        ? item.selling_plan_allocation.selling_plan.name
        : null;

      this.cartPopupTitle.textContent = item.product_title;
      this.cartPopupQuantity.textContent = quantity;
      this.cartPopupQuantityLabel.textContent = theme.strings.quantityLabel.replace(
        '[count]',
        quantity
      );

      this._setCartPopupPlaceholder(item.featured_image.url);
      this._setCartPopupImage(item.featured_image.url, item.featured_image.alt);
      this._setCartPopupProductDetails(
        item.product_has_only_default_variant,
        item.options_with_values,
        item.properties,
        selling_plan_name
      );

      fetch(this.cartRoutes.cartUrl + '.js', { credentials: 'same-origin' })
        .then(function(response) {
          return response.json();
        })
        .then(function(cart) {
          self._setCartQuantity(cart.item_count);
          self._setCartCountBubble(cart.item_count);
          self._showCartPopup();
        })
        .catch(function(error) {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },

    _setupCartPopupEventListeners: function() {
      this.eventHandlers.cartPopupWrapperKeyupHandler = this._cartPopupWrapperKeyupHandler.bind(
        this
      );
      this.eventHandlers.hideCartPopup = this._hideCartPopup.bind(this);
      this.eventHandlers.onBodyClick = this._onBodyClick.bind(this);

      this.cartPopupWrapper.addEventListener(
        'keyup',
        this.eventHandlers.cartPopupWrapperKeyupHandler
      );
      this.cartPopupClose.addEventListener(
        'click',
        this.eventHandlers.hideCartPopup
      );
      this.cartPopupDismiss.addEventListener(
        'click',
        this.eventHandlers.hideCartPopup
      );
      document.body.addEventListener('click', this.eventHandlers.onBodyClick);
    },

    _cartPopupWrapperKeyupHandler: function(event) {
      if (event.keyCode === slate.utils.keyboardKeys.ESCAPE) {
        this._hideCartPopup(event);
      }
    },

    _setCartPopupPlaceholder: function(imageUrl) {
      this.cartPopupImageWrapper =
        this.cartPopupImageWrapper ||
        document.querySelector(this.selectors.cartPopupImageWrapper);

      if (imageUrl === null) {
        this.cartPopupImageWrapper.classList.add(this.classes.hidden);
        return;
      }
    },

    _setCartPopupImage: function(imageUrl, imageAlt) {
      if (imageUrl === null) return;

      this.cartPopupImageWrapper.classList.remove(this.classes.hidden);
      var sizedImageUrl = theme.Images.getSizedImageUrl(imageUrl, '200x');
      var image = document.createElement('img');
      image.src = sizedImageUrl;
      image.alt = imageAlt;
      image.classList.add(this.classes.cartImage);
      image.setAttribute('data-cart-popup-image', '');

      image.onload = function() {
        this.cartPopupImagePlaceholder.removeAttribute(
          'data-image-loading-animation'
        );
        this.cartPopupImageWrapper.append(image);
      }.bind(this);
    },

    _setCartPopupProductDetails: function(
      product_has_only_default_variant,
      options,
      properties,
      selling_plan_name
    ) {
      this.cartPopupProductDetails =
        this.cartPopupProductDetails ||
        document.querySelector(this.selectors.cartPopupProductDetails);
      var variantPropertiesHTML = '';

      if (!product_has_only_default_variant) {
        variantPropertiesHTML =
          variantPropertiesHTML + this._getVariantOptionList(options);
      }

      if (selling_plan_name) {
        variantPropertiesHTML =
          variantPropertiesHTML + this._getSellingPlanHTML(selling_plan_name);
      }

      if (properties !== null && Object.keys(properties).length !== 0) {
        variantPropertiesHTML =
          variantPropertiesHTML + this._getPropertyList(properties);
      }

      if (variantPropertiesHTML.length === 0) {
        this.cartPopupProductDetails.innerHTML = '';
        this.cartPopupProductDetails.setAttribute('hidden', '');
      } else {
        this.cartPopupProductDetails.innerHTML = variantPropertiesHTML;
        this.cartPopupProductDetails.removeAttribute('hidden');
      }
    },

    _getVariantOptionList: function(variantOptions) {
      var variantOptionListHTML = '';

      variantOptions.forEach(function(variantOption) {
        variantOptionListHTML =
          variantOptionListHTML +
          '<li class="product-details__item product-details__item--variant-option">' +
          variantOption.name +
          ': ' +
          variantOption.value +
          '</li>';
      });

      return variantOptionListHTML;
    },

    _getPropertyList: function(properties) {
      var propertyListHTML = '';
      var propertiesArray = Object.entries(properties);

      propertiesArray.forEach(function(property) {
        // Line item properties prefixed with an underscore are not to be displayed
        if (property[0].charAt(0) === '_') return;

        // if the property value has a length of 0 (empty), don't display it
        if (property[1].length === 0) return;

        propertyListHTML =
          propertyListHTML +
          '<li class="product-details__item product-details__item--property">' +
          '<span class="product-details__property-label">' +
          property[0] +
          ': </span>' +
          property[1];
        ': ' + '</li>';
      });

      return propertyListHTML;
    },

    _getSellingPlanHTML: function(selling_plan_name) {
      var sellingPlanHTML =
        '<li class="product-details__item product-details__item--property">' +
        selling_plan_name +
        '</li>';

      return sellingPlanHTML;
    },

    _setCartQuantity: function(quantity) {
      this.cartPopupCartQuantity =
        this.cartPopupCartQuantity ||
        document.querySelector(this.selectors.cartPopupCartQuantity);
      var ariaLabel;

      if (quantity === 1) {
        ariaLabel = theme.strings.oneCartCount;
      } else if (quantity > 1) {
        ariaLabel = theme.strings.otherCartCount.replace('[count]', quantity);
      }

      this.cartPopupCartQuantity.textContent = quantity;
      this.cartPopupCartQuantity.setAttribute('aria-label', ariaLabel);
    },

    _setCartCountBubble: function(quantity) {
      this.cartCountBubble =
        this.cartCountBubble ||
        document.querySelector(this.selectors.cartCountBubble);
      this.cartCount =
        this.cartCount || document.querySelector(this.selectors.cartCount);

      this.cartCountBubble.classList.remove(this.classes.hidden);
      this.cartCount.textContent = quantity;
    },

    _showCartPopup: function() {
      theme.Helpers.prepareTransition(this.cartPopupWrapper);

      this.cartPopupWrapper.classList.remove(
        this.classes.cartPopupWrapperHidden
      );
      this._handleButtonLoadingState(false);

      slate.a11y.trapFocus({
        container: this.cartPopupWrapper,
        elementToFocus: this.cartPopup,
        namespace: 'cartPopupFocus'
      });
    },

    _hideCartPopup: function(event) {
      var setFocus = event.detail === 0 ? true : false;
      theme.Helpers.prepareTransition(this.cartPopupWrapper);
      this.cartPopupWrapper.classList.add(this.classes.cartPopupWrapperHidden);

      var cartPopupImage = document.querySelector(
        this.selectors.cartPopupImage
      );
      if (cartPopupImage) {
        cartPopupImage.remove();
      }
      this.cartPopupImagePlaceholder.setAttribute(
        'data-image-loading-animation',
        ''
      );

      slate.a11y.removeTrapFocus({
        container: this.cartPopupWrapper,
        namespace: 'cartPopupFocus'
      });

      if (setFocus) this.previouslyFocusedElement.focus();

      this.cartPopupWrapper.removeEventListener(
        'keyup',
        this.eventHandlers.cartPopupWrapperKeyupHandler
      );
      this.cartPopupClose.removeEventListener(
        'click',
        this.eventHandlers.hideCartPopup
      );
      this.cartPopupDismiss.removeEventListener(
        'click',
        this.eventHandlers.hideCartPopup
      );
      document.body.removeEventListener(
        'click',
        this.eventHandlers.onBodyClick
      );
    },

    _onBodyClick: function(event) {
      var target = event.target;

      if (
        target !== this.cartPopupWrapper &&
        !target.closest(this.selectors.cartPopup)
      ) {
        this._hideCartPopup(event);
      }
    },

    _setActiveThumbnail: function(mediaId) {
      // If there is no element passed, find it by the current product image
      if (typeof mediaId === 'undefined') {
        var productMediaWrapper = this.container.querySelector(
          this.selectors.productMediaWrapper + ':not(.hide)'
        );

        if (!productMediaWrapper) return;
        mediaId = productMediaWrapper.getAttribute('data-media-id');
      }

      var thumbnailWrappers = this.container.querySelectorAll(
        this.selectors.productThumbListItem + ':not(.slick-cloned)'
      );

      var activeThumbnail;
      thumbnailWrappers.forEach(
        function(el) {
          var current = el.querySelector(
            this.selectors.productThumbImages +
              "[data-thumbnail-id='" +
              mediaId +
              "']"
          );
          if (current) {
            activeThumbnail = current;
          }
        }.bind(this)
      );

      var productThumbImages = document.querySelectorAll(
        this.selectors.productThumbImages
      );
      productThumbImages.forEach(
        function(el) {
          el.classList.remove(this.classes.activeClass);
          el.removeAttribute('aria-current');
        }.bind(this)
      );

      if (activeThumbnail) {
        activeThumbnail.classList.add(this.classes.activeClass);
        activeThumbnail.setAttribute('aria-current', true);
        this._adjustThumbnailSlider(activeThumbnail);
      }
    },

    _adjustThumbnailSlider: function(activeThumbnail) {
      var sliderItem = activeThumbnail.closest('[data-slider-item]');
      if (!sliderItem) return;

      var slideGroupLeaderIndex =
        Math.floor(
          Number(sliderItem.getAttribute('data-slider-slide-index')) / 3
        ) * 3;

      window.setTimeout(
        function() {
          if (!this.slideshow) return;
          this.slideshow.goToSlideByIndex(slideGroupLeaderIndex);
        }.bind(this),
        251
      );
    },

    _switchMedia: function(mediaId) {
      var currentMedia = this.container.querySelector(
        this.selectors.productMediaWrapper +
          ':not(.' +
          this.classes.hidden +
          ')'
      );

      var newMedia = this.container.querySelector(
        this.selectors.productMediaWrapper + "[data-media-id='" + mediaId + "']"
      );

      var otherMedia = this.container.querySelectorAll(
        this.selectors.productMediaWrapper +
          ":not([data-media-id='" +
          mediaId +
          "'])"
      );

      currentMedia.dispatchEvent(
        new CustomEvent('mediaHidden', {
          bubbles: true,
          cancelable: true
        })
      );
      newMedia.classList.remove(this.classes.hidden);
      newMedia.dispatchEvent(
        new CustomEvent('mediaVisible', {
          bubbles: true,
          cancelable: true
        })
      );
      otherMedia.forEach(
        function(el) {
          el.classList.add(this.classes.hidden);
        }.bind(this)
      );
    },

    _handleMediaFocus: function(evt) {
      if (evt.keyCode !== slate.utils.keyboardKeys.ENTER) return;

      var mediaId = evt.currentTarget.getAttribute('data-thumbnail-id');

      var productMediaWrapper = this.container.querySelector(
        this.selectors.productMediaWrapper + "[data-media-id='" + mediaId + "']"
      );
      productMediaWrapper.focus();
    },

    _initThumbnailSlider: function() {
      setTimeout(
        function() {
          this.slideshow = new theme.Slideshow(
            this.container.querySelector('[data-thumbnail-slider]'),
            {
              canUseTouchEvents: true,
              type: 'slide',
              slideActiveClass: 'slick-active',
              slidesToShow: 3,
              slidesToScroll: 3
            }
          );

          this.settings.sliderActive = true;
        }.bind(this),
        250
      );
    },

    _destroyThumbnailSlider: function() {
      var sliderButtons = this.container.querySelectorAll(
        '[data-slider-button]'
      );
      var sliderTrack = this.container.querySelector('[data-slider-track]');
      var sliderItems = sliderTrack.querySelectorAll('[data-slider-item');
      this.settings.sliderActive = false;

      if (sliderTrack) {
        sliderTrack.removeAttribute('style');
        sliderItems.forEach(function(sliderItem) {
          var sliderItemLink = sliderItem.querySelector(
            '[data-slider-item-link]'
          );
          sliderItem.classList.remove('slick-active');
          sliderItem.removeAttribute('style');
          sliderItem.removeAttribute('tabindex');
          sliderItem.removeAttribute('aria-hidden');
          sliderItemLink.removeAttribute('tabindex');
        });
      }

      sliderButtons.forEach(function(sliderButton) {
        sliderButton.removeAttribute('aria-disabled');
      });

      this.slideshow.destroy();
      this.slideshow = null;
    },

    _liveRegionText: function(variant) {
      // Dummy content for live region
      var liveRegionText =
        '[Availability] [Regular] [$$] [Sale] [$]. [UnitPrice] [$$$]';

      if (!this.productState.available) {
        liveRegionText = theme.strings.unavailable;
        return liveRegionText;
      }

      // Update availability
      var availability = this.productState.soldOut
        ? theme.strings.soldOut + ','
        : '';
      liveRegionText = liveRegionText.replace('[Availability]', availability);

      // Update pricing information
      var regularLabel = '';
      var regularPrice = theme.Currency.formatMoney(
        variant.price,
        theme.moneyFormat
      );
      var saleLabel = '';
      var salePrice = '';
      var unitLabel = '';
      var unitPrice = '';

      if (this.productState.onSale) {
        regularLabel = theme.strings.regularPrice;
        regularPrice =
          theme.Currency.formatMoney(
            variant.compare_at_price,
            theme.moneyFormat
          ) + ',';
        saleLabel = theme.strings.sale;
        salePrice = theme.Currency.formatMoney(
          variant.price,
          theme.moneyFormat
        );
      }

      if (this.productState.showUnitPrice) {
        unitLabel = theme.strings.unitPrice;
        unitPrice =
          theme.Currency.formatMoney(variant.unit_price, theme.moneyFormat) +
          ' ' +
          theme.strings.unitPriceSeparator +
          ' ' +
          this._getBaseUnit(variant);
      }

      liveRegionText = liveRegionText
        .replace('[Regular]', regularLabel)
        .replace('[$$]', regularPrice)
        .replace('[Sale]', saleLabel)
        .replace('[$]', salePrice)
        .replace('[UnitPrice]', unitLabel)
        .replace('[$$$]', unitPrice)
        .trim();

      return liveRegionText;
    },

    _updateLiveRegion: function(evt) {
      var variant = evt.detail.variant;
      var liveRegion = this.container.querySelector(
        this.selectors.productStatus
      );
      liveRegion.innerHTML = this._liveRegionText(variant);
      liveRegion.setAttribute('aria-hidden', false);
      // hide content from accessibility tree after announcement
      setTimeout(function() {
        liveRegion.setAttribute('aria-hidden', true);
      }, 1000);
    },

    _enableAddToCart: function(message) {
      this.addToCart.removeAttribute('aria-disabled');
      this.addToCart.setAttribute('aria-label', message);
      this.addToCartText.innerHTML = message;
      this.productForm.classList.remove(this.classes.variantSoldOut);
    },

    _disableAddToCart: function(message) {
      message = message || theme.strings.unavailable;
      this.addToCart.setAttribute('aria-disabled', true);
      this.addToCart.setAttribute('aria-label', message);
      this.addToCartText.innerHTML = message;
      this.productForm.classList.add(this.classes.variantSoldOut);
    },

    _updateAddToCart: function() {
      if (!this.productState.available) {
        this._disableAddToCart(theme.strings.unavailable);
        return;
      }
      if (this.productState.soldOut) {
        this._disableAddToCart(theme.strings.soldOut);
        return;
      }

      this._enableAddToCart(theme.strings.addToCart);
    },

    /**
     * The returned productState object keeps track of a number of properties about the current variant and product
     * Multiple functions within product.js leverage the productState object to determine how to update the page's UI
     * @param {object} evt - object returned from variant change event
     * @return {object} productState - current product variant's state
     *                  productState.available - true if current product options result in valid variant
     *                  productState.soldOut - true if variant is sold out
     *                  productState.onSale - true if variant is on sale
     *                  productState.showUnitPrice - true if variant has unit price value
     */
    _setProductState: function(evt) {
      var variant = evt.detail.variant;

      if (!variant) {
        this.productState.available = false;
        return;
      }

      this.productState.available = true;
      this.productState.soldOut = !variant.available;
      this.productState.onSale = variant.compare_at_price > variant.price;
      this.productState.showUnitPrice = !!variant.unit_price;
    },

    _updateAvailability: function(evt) {
      // remove error message if one is showing
      this._hideErrorMessage();

      // set product state
      this._setProductState(evt);

      // update store availabilities info
      this._updateStoreAvailabilityContent(evt);
      // update form submit
      this._updateAddToCart();
      // update live region
      this._updateLiveRegion(evt);

      this._updatePriceComponentStyles(evt);
    },

    _updateStoreAvailabilityContent: function(evt) {
      if (!this.storeAvailability) {
        return;
      }

      if (this.productState.available && !this.productState.soldOut) {
        this.storeAvailability.updateContent(evt.detail.variant.id);
      } else {
        this.storeAvailability.clearContent();
      }
    },

    _updateMedia: function(evt) {
      var variant = evt.detail.variant;
      var mediaId = variant.featured_media.id;
      var sectionMediaId = this.settings.sectionId + '-' + mediaId;

      this._switchMedia(sectionMediaId);
      this._setActiveThumbnail(sectionMediaId);
    },

    _hidePriceComponent: function() {
      this.priceContainer.classList.add(this.classes.productUnavailable);
      this.priceContainer.setAttribute('aria-hidden', true);
      if (this.productPolicies) {
        this.productPolicies.classList.add(this.classes.visibilityHidden);
      }
    },

    _updatePriceComponentStyles: function(evt) {
      var variant = evt.detail.variant;

      var unitPriceBaseUnit = this.priceContainer.querySelector(
        this.selectors.unitPriceBaseUnit
      );

      if (!this.productState.available) {
        this._hidePriceComponent();
        return;
      }

      if (this.productState.soldOut) {
        this.priceContainer.classList.add(this.classes.productSoldOut);
      } else {
        this.priceContainer.classList.remove(this.classes.productSoldOut);
      }

      if (this.productState.showUnitPrice) {
        unitPriceBaseUnit.innerHTML = this._getBaseUnit(variant);
        this.priceContainer.classList.add(this.classes.productUnitAvailable);
      } else {
        this.priceContainer.classList.remove(this.classes.productUnitAvailable);
      }

      if (this.productState.onSale) {
        this.priceContainer.classList.add(this.classes.productOnSale);
      } else {
        this.priceContainer.classList.remove(this.classes.productOnSale);
      }

      this.priceContainer.classList.remove(this.classes.productUnavailable);
      this.priceContainer.removeAttribute('aria-hidden');
      if (this.productPolicies) {
        this.productPolicies.classList.remove(this.classes.visibilityHidden);
      }
    },

    _updatePrice: function(evt) {
      var variant = evt.detail.variant;

      var regularPrices = this.priceContainer.querySelectorAll(
        this.selectors.regularPrice
      );
      var salePrice = this.priceContainer.querySelector(
        this.selectors.salePrice
      );
      var unitPrice = this.priceContainer.querySelector(
        this.selectors.unitPrice
      );

      var formatRegularPrice = function(regularPriceElement, price) {
        regularPriceElement.innerHTML = theme.Currency.formatMoney(
          price,
          theme.moneyFormat
        );
      };

      // On sale
      if (this.productState.onSale) {
        regularPrices.forEach(function(regularPrice) {
          formatRegularPrice(regularPrice, variant.compare_at_price);
        });
        salePrice.innerHTML = theme.Currency.formatMoney(
          variant.price,
          theme.moneyFormat
        );
      } else {
        // Regular price
        regularPrices.forEach(function(regularPrice) {
          formatRegularPrice(regularPrice, variant.price);
        });
      }

      // Unit price
      if (this.productState.showUnitPrice) {
        unitPrice.innerHTML = theme.Currency.formatMoney(
          variant.unit_price,
          theme.moneyFormat
        );
      }
    },

    _getBaseUnit: function(variant) {
      return variant.unit_price_measurement.reference_value === 1
        ? variant.unit_price_measurement.reference_unit
        : variant.unit_price_measurement.reference_value +
            variant.unit_price_measurement.reference_unit;
    },

    _updateSKU: function(evt) {
      var variant = evt.detail.variant;

      // Update the sku
      var sku = document.querySelector(this.selectors.SKU);
      if (!sku) return;
      sku.innerHTML = variant.sku;
    },

    _enableZoom: function(el, index) {
      this.zoomPictures[index] = new theme.Zoom(el);
    },

    _destroyZoom: function(index) {
      if (this.zoomPictures.length === 0) return;
      this.zoomPictures[index].unload();
    },

    onUnload: function() {
      this.container.removeEventListener(
        'variantChange',
        this.eventHandlers.updateAvailability
      );
      this.container.removeEventListener(
        'variantImageChange',
        this.eventHandlers.updateMedia
      );
      this.container.removeEventListener(
        'variantPriceChange',
        this.eventHandlers.updatePrice
      );
      this.container.removeEventListener(
        'variantSKUChange',
        this.eventHandlers.updateSKU
      );
      theme.ProductVideo.removeSectionVideos(this.settings.sectionId);
      theme.ProductModel.removeSectionModels(this.settings.sectionId);

      if (this.mqlSmall) {
        this.mqlSmall.removeListener(this.initMobileBreakpoint);
      }

      if (this.mqlMediumUp) {
        this.mqlMediumUp.removeListener(this.initDesktopBreakpoint);
      }
    }
  });

  return Product;
})();

theme.ProductRecommendations = (function() {
  function ProductRecommendations(container) {
    var baseUrl = container.dataset.baseUrl;
    var productId = container.dataset.productId;
    var recommendationsSectionUrl =
      baseUrl +
      '?section_id=product-recommendations&product_id=' +
      productId +
      '&limit=4';

    window.performance.mark(
      'debut:product:fetch_product_recommendations.start'
    );

    fetch(recommendationsSectionUrl)
      .then(function(response) {
        return response.text();
      })
      .then(function(productHtml) {
        if (productHtml.trim() === '') return;

        container.innerHTML = productHtml;
        container.innerHTML = container.firstElementChild.innerHTML;

        window.performance.mark(
          'debut:product:fetch_product_recommendations.end'
        );

        performance.measure(
          'debut:product:fetch_product_recommendations',
          'debut:product:fetch_product_recommendations.start',
          'debut:product:fetch_product_recommendations.end'
        );
      });
  }

  return ProductRecommendations;
})();

theme.Quotes = (function() {
  var config = {
    mediaQuerySmall: 'screen and (max-width: 749px)',
    mediaQueryMediumUp: 'screen and (min-width: 750px)',
    slideCount: 0
  };

  var defaults = {
    canUseKeyboardArrows: false,
    type: 'slide',
    slidesToShow: 3
  };

  function Quotes(container) {
    this.container = container;
    var sectionId = container.getAttribute('data-section-id');
    this.slider = document.getElementById('Quotes-' + sectionId);

    this.sliderActive = false;

    this.mobileOptions = Object.assign({}, defaults, {
      canUseTouchEvents: true,
      slidesToShow: 1
    });

    this.desktopOptions = Object.assign({}, defaults, {
      slidesToShow: Math.min(
        defaults.slidesToShow,
        this.slider.getAttribute('data-count')
      )
    });

    this.initMobileSlider = this._initMobileSlider.bind(this);
    this.initDesktopSlider = this._initDesktopSlider.bind(this);

    this.mqlSmall = window.matchMedia(config.mediaQuerySmall);
    this.mqlSmall.addListener(this.initMobileSlider);

    this.mqlMediumUp = window.matchMedia(config.mediaQueryMediumUp);
    this.mqlMediumUp.addListener(this.initDesktopSlider);

    this.initMobileSlider();
    this.initDesktopSlider();
  }

  Quotes.prototype = Object.assign({}, Quotes.prototype, {
    onUnload: function() {
      this.mqlSmall.removeListener(this.initMobileSlider);
      this.mqlMediumUp.removeListener(this.initDesktopSlider);
      this.slideshow.destroy();
    },

    // eslint-disable-next-line no-unused-vars
    onBlockSelect: function(evt) {
      var slide = document.querySelector(
        '.quotes-slide--' + evt.detail.blockId
      );
      var slideIndex = Number(slide.getAttribute('data-slider-slide-index'));

      if (this.mqlMediumUp.matches) {
        slideIndex = Math.max(
          0,
          Math.min(slideIndex, this.slideshow.slides.length - 3)
        );
      }

      this.slideshow.goToSlideByIndex(slideIndex);
    },

    _initMobileSlider: function() {
      if (this.mqlSmall.matches) {
        this._initSlider(this.mobileOptions);
      }
    },

    _initDesktopSlider: function() {
      if (this.mqlMediumUp.matches) {
        this._initSlider(this.desktopOptions);
      }
    },

    // eslint-disable-next-line no-unused-vars
    _initSlider: function(args) {
      if (this.sliderActive) {
        this.slideshow.destroy();
        this.sliderActive = false;
      }

      this.slideshow = new theme.Slideshow(this.container, args);
      this.sliderActive = true;
    }
  });

  return Quotes;
})();

theme.SlideshowSection = (function() {
  var selectors = {
    sliderMobileContentIndex: '[data-slider-mobile-content-index]'
  };

  function SlideshowSection(container) {
    var sectionId = container.dataset.sectionId;

    this.container = container;
    this.eventHandlers = {};
    this.slideshowDom = container.querySelector('#Slideshow-' + sectionId);
    this.sliderMobileContentIndex = container.querySelectorAll(
      selectors.sliderMobileContentIndex
    );

    this.slideshow = new theme.Slideshow(container, {
      autoplay: this.slideshowDom.getAttribute('data-autorotate') === 'true',
      slideInterval: this.slideshowDom.getAttribute('data-speed')
    });
    this._setupEventListeners();
  }

  return SlideshowSection;
})();

theme.SlideshowSection.prototype = Object.assign(
  {},
  theme.SlideshowSection.prototype,
  {
    _setupEventListeners: function() {
      this.eventHandlers.onSliderSlideChanged = function(event) {
        this._onSliderSlideChanged(event.detail);
      }.bind(this);

      this.container.addEventListener(
        'slider_slide_changed',
        this.eventHandlers.onSliderSlideChanged
      );
    },

    _onSliderSlideChanged: function(slideIndex) {
      var activeClass = 'slideshow__text-content--mobile-active';

      this.sliderMobileContentIndex.forEach(function(element) {
        if (
          Number(element.getAttribute('data-slider-mobile-content-index')) ===
          slideIndex
        ) {
          element.classList.add(activeClass);
        } else {
          element.classList.remove(activeClass);
        }
      });
    },

    onUnload: function() {
      this.slideshow.destroy();
    },

    onBlockSelect: function(evt) {
      if (this.slideshow.adaptHeight) {
        this.slideshow.setSlideshowHeight();
      }

      // Get slide's index using theme editor's id
      var slide = this.container.querySelector(
        '.slideshow__slide--' + evt.detail.blockId
      );
      var slideIndex = slide.getAttribute('data-slider-slide-index');

      // Go to selected slide, pause auto-rotate
      this.slideshow.setSlide(slideIndex);
      this.slideshow.stopAutoplay();
    },

    onBlockDeselect: function() {
      // Resume auto-rotate
      this.slideshow.startAutoplay();
    }
  }
);

window.theme = window.theme || {};

theme.StoreAvailability = (function() {
  var selectors = {
    storeAvailabilityModalOpen: '[data-store-availability-modal-open]',
    storeAvailabilityModalProductTitle:
      '[data-store-availability-modal-product-title]',
    storeAvailabilityModalVariantTitle:
      '[data-store-availability-modal-variant-title]'
  };

  var classes = {
    hidden: 'hide'
  };

  function StoreAvailability(container) {
    this.container = container;
    this.productTitle = this.container.dataset.productTitle;
    this.hasOnlyDefaultVariant =
      this.container.dataset.hasOnlyDefaultVariant === 'true';
  }

  StoreAvailability.prototype = Object.assign({}, StoreAvailability.prototype, {
    updateContent: function(variantId) {
      var variantSectionUrl =
        this.container.dataset.baseUrl +
        '/variants/' +
        variantId +
        '/?section_id=store-availability';
      var self = this;

      var storeAvailabilityModalOpen = self.container.querySelector(
        selectors.storeAvailabilityModalOpen
      );

      this.container.style.opacity = 0.5;
      if (storeAvailabilityModalOpen) {
        storeAvailabilityModalOpen.disabled = true;
        storeAvailabilityModalOpen.setAttribute('aria-busy', true);
      }

      fetch(variantSectionUrl)
        .then(function(response) {
          return response.text();
        })
        .then(function(storeAvailabilityHTML) {
          if (storeAvailabilityHTML.trim() === '') {
            return;
          }
          self.container.innerHTML = storeAvailabilityHTML;
          self.container.innerHTML = self.container.firstElementChild.innerHTML;
          self.container.style.opacity = 1;

          // Need to query this again because we updated the DOM
          storeAvailabilityModalOpen = self.container.querySelector(
            selectors.storeAvailabilityModalOpen
          );

          if (!storeAvailabilityModalOpen) {
            return;
          }

          storeAvailabilityModalOpen.addEventListener(
            'click',
            self._onClickModalOpen.bind(self)
          );

          self.modal = self._initModal();
          self._updateProductTitle();
          if (self.hasOnlyDefaultVariant) {
            self._hideVariantTitle();
          }
        });
    },

    clearContent: function() {
      this.container.innerHTML = '';
    },

    _onClickModalOpen: function() {
      this.container.dispatchEvent(
        new CustomEvent('storeAvailabilityModalOpened', {
          bubbles: true,
          cancelable: true
        })
      );
    },

    _initModal: function() {
      return new window.Modals(
        'StoreAvailabilityModal',
        'store-availability-modal',
        {
          close: '.js-modal-close-store-availability-modal',
          closeModalOnClick: true,
          openClass: 'store-availabilities-modal--active'
        }
      );
    },

    _updateProductTitle: function() {
      var storeAvailabilityModalProductTitle = this.container.querySelector(
        selectors.storeAvailabilityModalProductTitle
      );
      storeAvailabilityModalProductTitle.textContent = this.productTitle;
    },

    _hideVariantTitle: function() {
      var storeAvailabilityModalVariantTitle = this.container.querySelector(
        selectors.storeAvailabilityModalVariantTitle
      );
      storeAvailabilityModalVariantTitle.classList.add(classes.hidden);
    }
  });

  return StoreAvailability;
})();

theme.VideoSection = (function() {
  function VideoSection(container) {
    container.querySelectorAll('.video').forEach(function(el) {
      theme.Video.init(el);
      theme.Video.editorLoadVideo(el.id);
    });
  }

  return VideoSection;
})();

theme.VideoSection.prototype = Object.assign({}, theme.VideoSection.prototype, {
  onUnload: function() {
    theme.Video.removeEvents();
  }
});

theme.heros = {};

theme.HeroSection = (function() {
  function HeroSection(container) {
    var sectionId = container.getAttribute('data-section-id');
    var hero = '#Hero-' + sectionId;
    theme.heros[hero] = new theme.Hero(hero, sectionId);
  }

  return HeroSection;
})();

window.theme = window.theme || {};

var selectors = {
  disclosureLocale: '[data-disclosure-locale]',
  disclosureCountry: '[data-disclosure-country]'
};

theme.FooterSection = (function() {
  function Footer(container) {
    this.container = container;
    this.cache = {};
    this.cacheSelectors();

    if (this.cache.localeDisclosure) {
      this.localeDisclosure = new theme.Disclosure(this.cache.localeDisclosure);
    }

    if (this.cache.countryDisclosure) {
      this.countryDisclosure = new theme.Disclosure(
        this.cache.countryDisclosure
      );
    }
  }

  Footer.prototype = Object.assign({}, Footer.prototype, {
    cacheSelectors: function() {
      this.cache = {
        localeDisclosure: this.container.querySelector(
          selectors.disclosureLocale
        ),
        countryDisclosure: this.container.querySelector(
          selectors.disclosureCountry
        )
      };
    },

    onUnload: function() {
      if (this.cache.localeDisclosure) {
        this.localeDisclosure.destroy();
      }

      if (this.cache.countryDisclosure) {
        this.countryDisclosure.destroy();
      }
    }
  });

  return Footer;
})();


document.addEventListener('DOMContentLoaded', function() {
  var sections = new theme.Sections();

  sections.register('cart-template', theme.Cart);
  sections.register('product', theme.Product);
  sections.register('collection-template', theme.Filters);
  sections.register('product-template', theme.Product);
  sections.register('header-section', theme.HeaderSection);
  sections.register('map', theme.Maps);
  sections.register('slideshow-section', theme.SlideshowSection);
  sections.register('store-availability', theme.StoreAvailability);
  sections.register('video-section', theme.VideoSection);
  sections.register('quotes', theme.Quotes);
  sections.register('hero-section', theme.HeroSection);
  sections.register('product-recommendations', theme.ProductRecommendations);
  sections.register('footer-section', theme.FooterSection);

  theme.customerTemplates.init();

  // Theme-specific selectors to make tables scrollable
  var tableSelectors = '.rte table,' + '.custom__item-inner--html table';

  slate.rte.wrapTable({
    tables: document.querySelectorAll(tableSelectors),
    tableWrapperClass: 'scrollable-wrapper'
  });

  // Theme-specific selectors to make iframes responsive
  var iframeSelectors =
    '.rte iframe[src*="youtube.com/embed"],' +
    '.rte iframe[src*="player.vimeo"],' +
    '.custom__item-inner--html iframe[src*="youtube.com/embed"],' +
    '.custom__item-inner--html iframe[src*="player.vimeo"]';

  slate.rte.wrapIframe({
    iframes: document.querySelectorAll(iframeSelectors),
    iframeWrapperClass: 'video-wrapper'
  });

  // Common a11y fixes
  slate.a11y.pageLinkFocus(
    document.getElementById(window.location.hash.substr(1))
  );

  var inPageLink = document.querySelector('.in-page-link');
  if (inPageLink) {
    inPageLink.addEventListener('click', function(evt) {
      slate.a11y.pageLinkFocus(
        document.getElementById(evt.currentTarget.hash.substr(1))
      );
    });
  }

  document.querySelectorAll('a[href="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(evt) {
      evt.preventDefault();
    });
  });

  slate.a11y.accessibleLinks({
    messages: {
      newWindow: theme.strings.newWindow,
      external: theme.strings.external,
      newWindowExternal: theme.strings.newWindowExternal
    },
    links: document.querySelectorAll(
      'a[href]:not([aria-describedby]), .product-single__thumbnail'
    )
  });

  theme.FormStatus.init();

  var selectors = {
    image: '[data-image]',
    lazyloaded: '.lazyloaded'
  };

  document.addEventListener('lazyloaded', function(evt) {
    var image = evt.target;

    removeImageLoadingAnimation(image);

    if (document.body.classList.contains('template-index')) {
      var mainContent = document.getElementById('MainContent');

      if (mainContent && mainContent.children && mainContent.children.length) {
        var firstSection = document.getElementsByClassName('index-section')[0];

        if (!firstSection.contains(image)) return;

        window.performance.mark('debut:index:first_image_visible');
      }
    }

    if (image.hasAttribute('data-bgset')) {
      var innerImage = image.querySelector(selectors.lazyloaded);

      if (innerImage) {
        var alt = image.getAttribute('data-alt');
        var src = innerImage.hasAttribute('data-src')
          ? innerImage.getAttribute('data-src')
          : image.getAttribute('data-bg');

        image.setAttribute('alt', alt ? alt : '');
        image.setAttribute('src', src ? src : '');
      }
    }

    if (!image.hasAttribute('data-image')) {
      return;
    }
  });

  // When the theme loads, lazysizes might load images before the "lazyloaded"
  // event listener has been attached. When this happens, the following function
  // hides the loading placeholders.
  function onLoadHideLazysizesAnimation() {
    var alreadyLazyloaded = document.querySelectorAll('.lazyloaded');
    alreadyLazyloaded.forEach(function(image) {
      removeImageLoadingAnimation(image);
    });
  }

  onLoadHideLazysizesAnimation();

  document.addEventListener(
    'touchstart',
    function() {
      theme.Helpers.setTouch();
    },
    { once: true }
  );

  if (document.fonts) {
    document.fonts.ready.then(function() {
      window.performance.mark('debut:fonts_loaded');
    });
  }
});

// Youtube API callback
// eslint-disable-next-line no-unused-vars
function onYouTubeIframeAPIReady() {
  theme.Video.loadVideos();
}

function removeImageLoadingAnimation(image) {
  // Remove loading animation
  var imageWrapper = image.hasAttribute('data-image-loading-animation')
    ? image
    : image.closest('[data-image-loading-animation]');

  if (imageWrapper) {
    imageWrapper.removeAttribute('data-image-loading-animation');
  }
}
