const tiktokId = "C2NS8F23E7AIH24M2N2G";
import axios from "axios";
import CookieService from "@/vue/services/cookie.service";
import Helpers from "@/vue/services/general-helpers";

export default {
  linkEmailToKlaviyo(email, force) {
    const stored = CookieService.get("currency_option");
      if (stored) {
        let geoObj = {
          email: email || window.theme.customerEmail,
          country_code: stored.country_code,
          currency: stored.currency,
          currency_symbol: stored.symbol
        }
        var _learnq = window._learnq || [];
        if (_learnq.hasOwnProperty('identify')) {
            if (_learnq.identify().user_country && !force) {return;}
            _learnq.push(['identify', {'$email' : geoObj.email, 'user_country': geoObj.country_code, 'user_currency': geoObj.currency, 'user_currency_symbol': geoObj.symbol}]);                    
        }
      }
  },
  PAGE_VIEW() {

  },
  ADD_TO_CART(item) {

  },
  INITIATE_CHECKOUT(cart) {
    return new Promise(resolve => {
      // TIKTOK
      if (ttq) {
        if (window.theme.customerEmail) { ttq.instance("C30GSHTAR64QJ449RK20").identify(window.theme.customerId, {email: window.theme.customerEmail })}
        ttq.instance("C30GSHTAR64QJ449RK20").track('StartCheckout', {
          currency: cart.currency,
          value: cart.total_price/100,
          contents: cart.items.map(item => {
            return {
              content_id: item.id,
              content_type: 'product',
              content_name: item.product_title,
              quantity: item.qty,
              price: item.price/100,
            }
          })
        });
      }
      Helpers.addScriptToBody("img","//i.geistm.com/x/DrS-Initiatecheckout");
      const checkout_payload = {
        cart_token: CookieService.get('cart'),
        customer: window.theme.customerEmail ? {email: window.theme.customerEmail} : null,
        line_items: cart.items,
        currency: cart.currency,
        total_price: cart.total_price/100
      }
      axios.post('https://conversions.drsquatchservices.com/create-checkout', checkout_payload).catch(err => {
        console.error(err);
      });
      resolve()
    });
  }
  // trackCheckoutStart(cart) {
  //   if (ttq) {
  //     ttq.instance(tiktokId).track("StartCheckout", {
  //       currency: cart.currency,
  //       value: cart.total_price / 100,
  //       contents: cart.items.map(item => {
  //         return {
  //           content_id: item.id,
  //           content_type: "product",
  //           content_name: item.product_title,
  //           quantity: item.qty,
  //           price: item.price / 100
  //         };
  //       })
  //     });
  //   }
  // }
};