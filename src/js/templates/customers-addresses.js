import $ from "jquery";

/**
 * Customer Addresses Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Customer Addresses
 * template.
 *
 * @namespace customerAddresses
 */

window.theme.customerAddresses = (function () {
	let $newAddressForm = $("#AddressNewForm");

	if (!$newAddressForm.length) {
		return;
	}

	// Initialize observers on address selectors, defined in shopify_common.js
	if (window.Shopify) {
		new window.Shopify.CountryProvinceSelector(
			"AddressCountryNew",
			"AddressProvinceNew",
			{
				hideElement: "AddressProvinceContainerNew"
			}
		);
	}

	// Initialize each edit form's country/province selector
	$(".address-country-option").each(function () {
		let formId = $(this).data("form-id");
		let countrySelector = "AddressCountry_" + formId;
		let provinceSelector = "AddressProvince_" + formId;
		let containerSelector = "AddressProvinceContainer_" + formId;

		new window.Shopify.CountryProvinceSelector(
			countrySelector,
			provinceSelector,
			{
				hideElement: containerSelector
			}
		);
	});

	// Toggle new/edit address forms
	$(".address-new-toggle").on("click", function () {
		$newAddressForm.toggleClass("hide");
	});

	$(".address-edit-toggle").on("click", function () {
		let formId = $(this).data("form-id");
		$("#EditAddress_" + formId).toggleClass("hide");
	});

	$(".address-delete").on("click", function () {
		let $el = $(this);
		let formId = $el.data("form-id");
		let confirmMessage = $el.data("confirm-message");
		if (
			confirm(confirmMessage || "Are you sure you wish to delete this address?")
		) {
			window.Shopify.postLink("/account/addresses/" + formId, {
				parameters: { _method: "delete" }
			});
		}
	});
})();
