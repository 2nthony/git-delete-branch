const kleur = require('kleur')
const path = require('path')

class Logger {
  log(...args) {
    console.log(...args)
  }

  success(...args) {
    this.log(kleur.green('success'), ...args)
  }

  error(...args) {
    this.log(kleur.red('error'), ...args)
  }

  done(...args) {
    this.log(kleur.green(process.platform === 'win32' ? '√' : '✔'), ...args)
  }
}

module.exports = new Logger()
