const cac = require('cac')
const path = require('path')
const fs = require('fs')
const spawn = require('cross-spawn')
const parseArgs = require('../utils/parseArgs')
const logger = require('../utils/logger')

module.exports = class Core {
  constructor() {
    this.cwd = process.cwd()
    this.rawArgs = process.argv
    this.args = parseArgs(this.rawArgs.slice(2))

    this.isGitProject()

    this.initCli()
  }

  initCli() {
    const cli = (this.cli = cac())
    this.command = cli.command('[...branches]').action(branches => {
      this.deleteBranch(branches)
    })

    cli.version(require('../package.json').version).help()

    this.cli.parse(this.rawArgs, { run: false })
  }

  isGitProject() {
    if (!fs.existsSync(path.join(this.cwd, '.git'))) {
      logger.error('Current working directory is not a git project!')
      process.exit(1)
    }
    return true
  }

  getBranch() {
    const { stdout } = spawn.sync('git', ['branch'])
    const branch = stdout
      .toString()
      .trimRight()
      .split('\n')
      .map(b => {
        if (!b.includes('*')) {
          return b.trim()
        }
      })
      .filter(Boolean)

    return branch
  }

  deleteBranch(branches) {
    const match = require('multimatch')
    const matched = match(this.getBranch(), branches)

    matched.forEach(branch => {
      const ps = spawn.sync('git', ['branch', branch, '-D'])
      if (ps.status === 0) {
        logger.success('Deleted branch', `\`${branch}\``)
      }
    })
  }

  run() {
    this.cli.runMatchedCommand()
  }
}
