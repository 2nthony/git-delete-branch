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

  warn(...args) {
    this.log(kleur.yellow('warning'), ...args)
  }

  done(...args) {
    this.log(kleur.green(process.platform === 'win32' ? '√' : '✔'), ...args)
  }

  tip(...args) {
    this.log(kleur.blue('tip'), ...args)
  }

  info(...args) {
    this.log(kleur.cyan('info'), ...args)
  }
}

module.exports = new Logger()
