(function() {
  var selectors = {
    loginModal: '#LoginModal',
    loginField: '[data-login-field]'
  };

  var data = {
    formError: 'data-error'
  };

  var loginModal = document.querySelector(selectors.loginModal);
  var loginField = document.querySelector(selectors.loginField);

  if (!loginModal) {
    return;
  }

  var passwordModal = new window.Modals('LoginModal', 'login-modal', {
    focusOnOpen: 'Password'
  });

  // Open modal if errors exist
  if (loginField.hasAttribute(data.formError)) {
    passwordModal.open();
  }
})();
