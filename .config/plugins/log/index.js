const chalk = require('chalk')
const boxen = require('boxen')

module.exports = {
  box ({ msg, color }) {
    console.log(boxen(
      chalk[color](msg),
      {
        padding: 1,
        margin: { top: 1, right: 0, bottom: 1, left: 0 },
        borderColor: color
      }
    ))
  }
}