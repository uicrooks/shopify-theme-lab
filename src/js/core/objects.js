import axios from "axios";
import unescape from "./helpers/unescape";

export const ROUTE_ROOT = "root_url";
export const ROUTE_ACCOUNT = "account_url";
export const ROUTE_ACCOUNT_LOGIN = "account_login_url";
export const ROUTE_ACCOUNT_LOGOUT = "account_logout_url";
export const ROUTE_ACCOUNT_REGISTER = "account_register_url";
export const ROUTE_ACCOUNT_ADDRESSES = "account_addresses_url";
export const ROUTE_COLLECTIONS = "collections_url";
export const ROUTE_ALL_PRODUCTS = "all_products_collection_url";
export const ROUTE_SEARCH = "search_url";
export const ROUTE_CART = "cart_url";
export const ROUTE_CART_ADD = "cart_add_url";
export const ROUTE_CART_CHANGE = "cart_change_url";
export const ROUTE_CART_CLEAR = "cart_clear_url";
export const ROUTE_PRODUCT_RECOMMENDATIONS = "product_recommendations_url";
export const CHECKOUT = "checkout";

export default {
	loaded: false,
	objects: {},
	async load() {
		const objects = await axios
			.get("/?view=objects", {
				responseType: "json"
			})
			.then((response) => response.data);

		this.loaded = true;
		this.objects = objects;

		document.dispatchEvent(
			new CustomEvent("theme:objects:loaded", {
				detail: {
					objects
				}
			})
		);
	},
	routes(route) {
		return this.objects.routes[route];
	},
	get(name) {
		try {
			const value = name.split(".").reduce((objects, key) => {
				if (Object.prototype.hasOwnProperty.call(objects, key)) {
          return objects[key];
        }

				return null;
			}, this.objects);

			return unescape(value);
		} catch (error) {
      console.log(error)
    }

		return null;
	},
	all() {
		return this.objects;
	}
};
