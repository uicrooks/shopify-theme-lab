const options = require('./reloadr.config.js')
let initialConnectionClose = true // allows to display disonnected error only once on 'close' event

initReloadrClient = () => {
  const socket = new WebSocket(`ws://localhost:${options.websocketPort}`)

  /**
   * custom console.log
   */
  const log = ({ msg, type }) => {
    let css

    if (type === 'success') css = 'background: rgb(190,255,175); color: rgb(60,100,40)'
    else if (type === 'error') css = 'background: rgb(245,165,165); color: rgb(80,40,40)'

    console.log(`%c Reloadr: ${msg} `, css)
  }

  /**
   * websocket eventslisteners
   */
  socket.addEventListener('open', () => {
    if (!initialConnectionClose) initialConnectionClose = true
    log({ msg: 'connected', type: 'success' })
  })

  socket.addEventListener('close', () => {
    if (initialConnectionClose) {
      log({ msg: 'disonected', type: 'error' })
      initialConnectionClose = false
    }

    setTimeout(() => initReloadrClient(), 1000)
  })

  socket.addEventListener('message', (event) => {
    if(event.data === 'reload') location.reload()
  })
}

/**
 * auto load in browser
 */
(() => {
  if (window) initReloadrClient()
})()