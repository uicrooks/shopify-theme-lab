import serialize from "form-serialize";

export function addToCartSubmit(event) {
	event.preventDefault();

	const form = event.target;

	let formData = serialize(form, {
		hash: true,
		disabled: true,
		empty: false
	});

	if (Array.isArray(formData.event_id)) {
		formData.event_id = formData.event_id.shift();
	}

	form.classList.add("adding");
	const errorCallback = event?.detail?.errorCallback;
	document.dispatchEvent(
		new CustomEvent("product:add", {
			detail: {
				items: [formData],
				callback: () => {
					setTimeout(() => {
						form.classList.remove("adding");
					}, 500);
				},
				errorCallback: ({ response }) => {
					form.classList.remove("adding");

					if (typeof errorCallback === "function") {
						errorCallback(response);
					}
				}
			}
		})
	);
}
