import Modal from "./components/Modal";

(function () {
	const modalId = "#LoginModal";
	const loginModal = document.querySelector(modalId);

	if (!loginModal) {
		return;
	}

	window.Modals = new Modal();

	// Open modal if errors exist
	if (document.body.dataset.passwordErrors === "true") {
		window.Modals.open(modalId);
	}
})();
