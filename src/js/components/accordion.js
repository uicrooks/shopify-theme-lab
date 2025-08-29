(function () {
	const accordionItems = [...document.querySelectorAll(".js-accordion__item")];
	if (!accordionItems.length) {
		return;
	}
	const onClickAccordionHeader = (event) => {
		const parentNode = event.currentTarget.parentNode;

		if (parentNode.classList.contains("active")) {
			parentNode.classList.remove("active");
		} else {
			accordionItems.forEach((item) => item.classList.remove("active"));
			parentNode.classList.add("active");
		}
	};

	const init = () => {
		accordionItems.forEach((elem) => {
			const accordionHeader = elem.querySelector(".js-accordion__header");
			accordionHeader.addEventListener("click", onClickAccordionHeader, false);
		});
	};

	document.addEventListener("DOMContentLoaded", init);
})();
