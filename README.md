# git-delete-branch

> 🔌Git delete branch enhancement tooling

Please consider starring the project to show your ❤️ and support.

[![NPM version](https://badgen.net/npm/v/git-delete-branch?icon=npm)](https://npmjs.com/package/git-delete-branch)
[![NPM download](https://badgen.net/npm/dm/git-delete-branch?icon=npm)](https://npmjs.com/package/git-delete-branch)
[![CircleCI](https://badgen.net/circleci/github/evillt/git-delete-branch?icon=circleci)](https://circleci.com/gh/evillt/git-delete-branch/tree/master)
[![License](https://badgen.net/npm/license/git-delete-branch)](./LICENSE)
[![donate](https://badgen.net/badge/support%20me/donate/f2a)](https://donate.evila.me)

## Features

- Support delete matched branches. e.g.`feat-*`

<p align="center">
  <img src="https://unpkg.com/@evillt/media@latest/projects/git-delete-branch/main.svg">
</p>

## Prerequisites

- git
- node.js

## Usage

One-off usage via `npx`:

```sh
$ npx git-delete-branch [...branches]

# Example
$ npx git-delete-branch dev test-*
```

Using it globally:

```sh
$ npm i -g git-dlete-branch

# Or using yarn
$ yarn global add git-delete-branch

$ git-db [...branches]
$ git-delete-branch [...branches]

# Or using git external commands
$ git db [...branches]
$ git delete-branch [...branches]
```

## CLI

`git-delete-branch [...branches] [options]`

### `branches`

Delete branches

### `options`

#### `-r, --remotes`

Delete remotes branches

#### `--scope <scope>`

- Default: `origin`
- When: `-r, --remotes`

Branches scope name

## Relates

- [git-delete-tag](https://github.com/evillt/git-delete-tag)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**git-delete-branch** © [evillt](https://github.com/evillt), Released under the [MIT](./LICENSE) License.

Authored and maintained by **EVILLT** with help from contributors ([list](https://github.com/evillt/git-delete-branch/contributors)).

> [evila.me](https://evila.me) · GitHub [@evillt](https://github.com/evillt) · Twitter [@evillt](https://twitter.com/evillt)
