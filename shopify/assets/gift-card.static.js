window.addEventListener('DOMContentLoaded', function() {
  var qrCode = document.getElementById('QrCode');

  new QRCode(qrCode, {
    text: qrCode.dataset.identifier,
    width: 120,
    height: 120,
    imageAltText: theme.strings.qrImageAlt
  });

  document
    .getElementById('GiftCardDigits')
    .addEventListener('focus', function(event) {
      event.target.select();
    });
});
