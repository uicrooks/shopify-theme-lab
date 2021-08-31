import axios from "axios";
// import TrackingService from "@/vue/services/tracking.service";
import CookieService from "@/vue/services/cookie.service";
import TrackingService from "@/vue/services/tracking.service";

const axiosConfig = {
  headers: {
    "Cache-Control": "must-revalidate",
    "Cache-Control": "no-cache",
    "Cache-Control": "no-store",
    Pragma: "no-cache"
  },
};

const CartService = {
  async initCart() {
    try {
      const res = await axios.get("/cart.js", axiosConfig);
      console.log("making init-cart call");
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      console.log("Failed to fetch cart", err);
      return null;
    }
  },
  async addItem(product, qty = 1, variantId = "", payload = {}) {
    // **** Let's Chat ****
    const variant = getMatchingVariantForProduct(product, variantId);
    if (!variant) {
      console.log("failed to add an item; item does not have matching variant");
      return null;
    }
    const props = product.properties ? { ...product.properties, ...payload } : { ...payload };
    try {
      const res = await axios.post("/cart/add.js", {
        quantity: qty,
        id: variant.id,
        properties: props
      });
      if (res.status === 200) {
        TrackingService.ADD_TO_CART(res.data);
        return true;
      }
    } catch (err) {
      console.log("Failed to add an item", err);
      return false;
    }
  },
  addItem2(variantId, qty = 1, properties) {
    return new Promise(async (resolve, reject) => {
      try {
        let props = properties || {};
        console.log(variantId)
        const res = await axios.post("/cart/add.js", {
          quantity: qty,
          id: variantId,
          properties: props
        });
        if (res.status === 200) {
          TrackingService.ADD_TO_CART(res.data);
          resolve(res.data);
        } else {
          throw new Error("Error response from Shopify")
        }
      } catch (err) {
        console.log("Failed to add an item", err);
        reject({variant_id: variantId, error: err.message});
      }
    });
  },
  async updateItemQuantity(itemIndex, updatedQuantity) {
    try {
      const res = await axios.post("/cart/change.js", {
        quantity: updatedQuantity,
        line: itemIndex
      });
      if (res.status === 200) {
        return true;
      }
    } catch (err) {
      console.log("Failed to update an item quantity", err);
      return false;
    }
  },
  addToCartBatch(item_array) {
    return new Promise(async (resolve,reject) => {
      var adds = [];
      // note: promise.all didn't work
      for (var i in item_array) {
        try {
          const {variant_id, quantity, properties} = item_array[i];
          let res = await this.addItem2(variant_id,quantity,properties);
          adds.push(res);
        } catch(err) {
          console.error(err.message);
          continue;
        }
      }
      resolve(adds);
    });
  },
  async redirectToCheckout() {
    console.log(window.location);
    const {isSubscriptionCart, cart} = await preCheckoutPromise();
    const cartCookieValue = CookieService.get("cart");
    console.log(cartCookieValue);
    const host = window.location.host;
    CookieService.set("cart", cartCookieValue, { domain: host });
    CookieService.set("cart", cartCookieValue, { domain: `.${host}` });

    var checkout_url, ga_linker;
    if (isSubscriptionCart) {
      try {
        ga_linker = window.ga.getAll()[0].get("linkerParam");
      } catch (e) {
        ga_linker = "";
      }        
      let customer_param = "";
      if (window.theme.customerEmail) { customer_param = `customer_id=${window.theme.customerId}&customer_email=${window.theme.customerEmail}`; }
      checkout_url = `https://subscribe.drsquatch.com/r/checkout?myshopify_domain=${app.myshopify_domain}&cart_token=${cartCookieValue}&${ga_linker}&${customer_param}`;
      if (window.theme.currency !== "USD") {
        // force to store/root currency
        CookieService.set("rc_shim", "CAD", { domain: `.${host}` }); 
        console.log("FORCING TO USD - START");
        await axios.get(`/services/currency/update?currency=USD&return_to=/pages/blank`);
      }
    } else {
      checkout_url = "/checkout";
    }
    const discountCode = sessionStorage.getItem("discount_code");
    if (discountCode) {
      checkout_url += `?discount=${discountCode}`;
    }
    window.location.href = checkout_url;
  },
  getProductSchema(product, variantId) {
    const variant = getMatchingVariantForProduct(product, variantId);
    if (!variant) {
      return null;
    }
    return {
      product_id: product.id,
      handle: product.handle,
      type: product.type,
      variant_id: variant.id,
      sku: variant.sku,
      price: variant.price / 100,
      compare_at_price: variant.compare_at_price / 100,
      image: variant.image ? variant.image : product.images[0],
      title: variant.title ? variant.title : product.title,
      // currency: cart.currency.isoCode,
      // currency_symbol: cart.currency.symbol,
      properties: {}
    };
  }
};

function getMatchingVariantForProduct(product, variantId) {
  let matchingVariant = product.variants && product.variants[0];
  if (variantId) {
    matchingVariant = product.variants.filter(variant => {
      variant.id = variantId;
    })[0];
  }
  return matchingVariant;
}

function preCheckoutPromise() {
  // handles async actions and returns checkout Destination
  console.log(this)
  return new Promise(async resolve => {
    console.log(this)
    const cart = await CartService.initCart();
    var hit = false;
    for (var i in cart.items) {
      if (cart.items[i].title.indexOf("Subscription")>-1) {
        hit=true;
        break;
      }
    }
    await TrackingService.INITIATE_CHECKOUT(cart);
    resolve({isSubscriptionCart: hit, cart});
  });
}

export default CartService;