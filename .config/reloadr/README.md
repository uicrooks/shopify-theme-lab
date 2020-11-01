# Reloadr

Reloadr is a custom script for reloading a remote Shopify theme during development.

The `reloadr.server.js` script runs a http server, as well as a websocket server, locally. The http server listens for requests, send from the `shopify:watch` task (which is the default Shopify Them Kit [watch task](https://shopify.github.io/themekit/commands#watch)) and communicates via websocket connection with the `reloadr.client.js` script.

The `reloadr.client.js` script (websocket client) is injected into the webpack bundle, during development, and connects via `localhost:port` to the websocket server. The script listens to reload messages from the server script.

Settings and ports for the script can be adjusted in the `packages.json`.

## Settings
| Option | Description |
| - | - |
| serverPort | the localhost port `shopify:watch` task and `reloadr.server.js` use to communicate |
| websocketPort | the localhost port `reloadr.server.js` and `reloader.client.js` use to communicate |
| delay | auto reload needs a slight delay before reloading the remote site, so all newly uploaded files will be loaded. Values between `1500`ms and `2000`ms seem to work well |