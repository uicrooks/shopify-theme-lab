const package = require('../../../package.json')

// load values from package.json
module.exports = {
  serverPort: package.config.reloadr.serverPort || 5000, // port for communication with shopify themekit
  websocketPort: package.config.reloadr.websocketPort || 5050, // port for communication with reloadr client
  delay: package.config.reloadr.delay || 2000 // delay the auto reload by milliseonds
}