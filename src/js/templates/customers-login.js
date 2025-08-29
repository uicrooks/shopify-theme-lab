import $ from "jquery";

/**
 * Password Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Password template.
 *
 * @namespace password
 */

window.theme.customerLogin = (function () {
	let config = {
		recoverPasswordForm: "#RecoverPassword",
		hideRecoverPasswordLink: "#HideRecoverPasswordLink"
	};

	if (!$(config.recoverPasswordForm).length) {
		return;
	}

	checkUrlHash();
	resetPasswordSuccess();

	$(config.recoverPasswordForm).on("click", onShowHidePasswordForm);
	$(config.hideRecoverPasswordLink).on("click", onShowHidePasswordForm);

	function onShowHidePasswordForm(evt) {
		evt.preventDefault();
		toggleRecoverPasswordForm();
	}

	function checkUrlHash() {
		let hash = window.location.hash;

		// Allow deep linking to recover password form
		if (hash === "#recover") {
			toggleRecoverPasswordForm();
		}
	}

	/**
	 *  Show/Hide recover password form
	 */
	function toggleRecoverPasswordForm() {
		$("#RecoverPasswordForm").toggleClass("hide");
		$("#CustomerLoginForm").toggleClass("hide");
	}

	/**
	 *  Show reset password success message
	 */
	function resetPasswordSuccess() {
		let $formState = $(".reset-password-success");

		// check if reset password form was successfully submited.
		if (!$formState.length) {
			return;
		}

		// show success message
		$("#ResetSuccess").removeClass("hide");
	}
})();
