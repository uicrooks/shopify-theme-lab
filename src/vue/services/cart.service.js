import axios from "axios";
// import TrackingService from "@/vue/services/tracking.service";
import CookieService from "@/vue/services/cookie.service";

const axiosConfig = {
  headers: {
    "Cache-Control": "must-revalidate",
    "Cache-Control": "no-cache",
    "Cache-Control": "no-store",
    Pragma: "no-cache"
  },
};

export default {
  async initCart() {
    try {
      const res = await axios.get("/cart.js", axiosConfig);
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      console.log("Failed to fetch cart", err);
      return null;
    }
  },
  async addItem(product, qty = 1, variantId = "", payload = {}) {
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
        return true;
      }
    } catch (err) {
      console.log("Failed to add an item", err);
      return false;
    }
    // add tracking data
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
  redirectToCheckout() {
    console.log(window.location);
    const cartCookieValue = CookieService.get("cart");
    console.log(cartCookieValue);
    const host = window.location.host;
    CookieService.set("cart", cartCookieValue, { domain: host });
    CookieService.set("cart", cartCookieValue, { domain: `.${host}` });
    // if subscription item is included, go to recharge checkout
    let url = "/checkout";
    // check for discount code
    let discountCode = "";
    if (discountCode) {
      url += `?discount=${discountCode}`;
    }
    window.location.href = url;
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