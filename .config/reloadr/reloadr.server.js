const http = require('http')
const WebSocket = require('ws')
const chalk = require('chalk')
const options = require('./reloadr.config.js')

/**
 * custom console.log
 */
const log = (msg) => {
  console.log(`${chalk.yellow.bold('[reloadr]')} ${chalk.yellow.inverse(` ${msg} `)}`)
}

/**
 * create websocket server
 * for remote shopify theme
 */
const wss = new WebSocket.Server({ port: options.websocketPort })

wss.broadcast = (msg) => {
  wss.clients.forEach((client) => {
    client.send(msg)
  })
}

/**
 * create http server
 * for themekit notify requests
 */
http.createServer((req, res) => {
  const url = req.url

  if (url === '/reload' && wss.clients.size) {
    setTimeout(() => {
      wss.broadcast('reload')
      log('reloading clients')
    }, options.delay)
  } else {
    log('no clients connected')
  }

  res.end()
}).listen(options.serverPort)