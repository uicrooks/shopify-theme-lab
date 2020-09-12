const options = require('../reloadr.config.js')

initReloadrClient = () => {
  const socket = new WebSocket(`ws://localhost:${options.websoketPort}`)

  /**
   * custom console.log
   */
  const log = (msg) => {
    const css = 'background: rgb(80,90,115); color: rgb(200,200,255)'
    console.log(`%c Reloadr: ${msg} `, css)
  }

  /**
   * websocket eventslisteners
   */
  socket.addEventListener('open', () => log('connected'))
  socket.addEventListener('error', () => log('error'))
  socket.addEventListener('close', () => log('disonected'))
  socket.addEventListener('message', (event) => {
    // don't reload when inside shopify's visual theme editor
    if(event.data === 'reload' && !location.href.includes('preview_theme')) location.reload()
  })
}

/**
 * auto load in browser
 */
(() => {
  if (window) initReloadrClient()
})()