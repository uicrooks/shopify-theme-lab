const http = require('http')
const WebSocket = require('ws')
const options = require('../reloadr.config.js')

/**
 * create websocket server
 * for remote shopify theme
 */
const wss = new WebSocket.Server({ port: options.websoketPort })
const clients = []

wss.on('connection', (ws, req) => {
  clients.push(ws)
})

/**
 * create http server
 * for themekit notify requests
 */
http.createServer((req, res) => {
  const url = req.url

  if (url === '/reload' && clients.length) {
    setTimeout(() => {
      clients.forEach(client => client.send('reload'))
    }, options.delay)
  }

  res.end()
}).listen(options.serverPort)