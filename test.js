import test from 'ava'
import spawn from 'cross-spawn'

test('main', t => {
  const ps = spawn.sync('./bin/cli.js', ['test'])
  const stdout = ps.stdout.toString()
  t.is(stdout, '')
})

test('Remotes branch', t => {
  const ps = spawn.sync('./bin/cli.js', ['test', '-r'])
  const stdout = ps.stdout.toString()
  t.is(stdout, '')
})
