import axios from "axios";

export default {
	loaded: false,
	settings: {},
	async load() {
		const settings = await axios
			.get("/?view=settings", {
				responseType: "json"
			})
			.then((response) => response.data);

		this.loaded = true;
		this.settings = settings;

		document.dispatchEvent(
			new CustomEvent("theme:settings:loaded", {
				detail: {
					settings
				}
			})
		);
	},
	get(name) {
		return this.settings[name];
	},
	all() {
		return this.settings;
	}
};
