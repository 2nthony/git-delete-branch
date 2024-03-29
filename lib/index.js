const cac = require('cac')
const path = require('path')
const fs = require('fs')
const spawn = require('cross-spawn')
const ora = require('ora')
const parseArgs = require('../utils/parseArgs')
const logger = require('../utils/logger')
const matcher = require('multimatch')
const kleur = require('kleur')

module.exports = class Core {
  constructor() {
    this.cwd = process.cwd()
    this.rawArgs = process.argv
    this.args = parseArgs(this.rawArgs)
    this.isRemotes = this.args.has('r') || this.args.has('remotes')

    this.isGitProject()

    this.initCli()
  }

  initCli() {
    const cli = (this.cli = cac())
    this.command = cli
      .command('[...branches]')
      .usage('[...branches] [options]')
      .option('-r, --remotes', 'Delete remotes branches')
      .action((branches, options) => {
        if (branches.length === 0) cli.outputHelp()

        this.deleteBranch(branches, options)
      })

    if (this.isRemotes) {
      cli.option('--scope <scope>', 'Remote branch scope', {
        default: 'origin'
      })
    }

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

  getBranch(options) {
    const { stdout } = spawn.sync(
      'git',
      ['branch'].concat(this.isRemotes ? ['-r'] : [])
    )
    let branch = []

    branch = stdout
      .toString()
      .trimRight()
      .split('\n')
      .map(b => {
        if (!b.includes('*')) {
          return b.trim()
        }
      })

    if (this.isRemotes && options.scope) {
      branch = matcher(branch, [`${options.scope}/**`]).map(b => {
        if (!b.includes('->')) {
          return b.replace(`${options.scope}/`, '')
        }
      })
    }

    return branch.filter(Boolean)
  }

  deleteBranch(branches, options) {
    const matched = matcher(this.getBranch(options), branches)

    matched.forEach(branch => {
      const spinner = ora(`Deleting${this.text(branch)}`)
      spinner.start()
      const args = this.isRemotes
        ? ['push', options.scope, `:${branch}`]
        : ['branch', branch, '-D']
      const ps = spawn.sync('git', args)
      if (ps.status === 0) {
        spinner.succeed(`Deleted${this.text(branch)}`)
      }
    })
  }

  text(branch) {
    return `${this.isRemotes ? ' remotes' : ''} branch ` + kleur.magenta(branch)
  }

  run() {
    this.cli.runMatchedCommand()
  }
}
