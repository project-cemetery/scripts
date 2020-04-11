# @solid-soda/scripts

<img src="https://raw.githubusercontent.com/solid-soda/assets/master/logo.png" align="right"
     alt="Solid Soda logo" width="160" height="160">

Speed up the creation and maintenance of your JS applications. Zero configuration way to use modern code-quality tools.

+ **Zero-config.** Any tool is already configured for you.
+ **Universal.** Supports TS, React, and can be used with any tech.
+ **Uniform.** Config can be shared (all projects have the same configs).

## TL;DR

```sh
yarn dlx @solid-soda/scripts
```

or if you prefer `npm`

```sh
npx @solid-soda/scripts
```

## Motivation

1. Before start to code we must set-up ESLint, Stylelint, Prettier, Commitizen, etc. We can to automate all of this. Machines have to suffer.
2. New lint rule adding is a hell. We provide the one source of true for any project. Just run `@solid-soda/scripts` in your project directory.

## Usage

Just run scripts in a directory with your project.

If you use `yarn@berry`, just run:
```sh
yarn dlx @solid-soda/scripts
```

If you use `npm` of `yarn@classic`, just run:
```sh
npx @solid-soda/scripts
```

It will generate all configs and put it to repository. Now, you can use any provided tool.

Some scripts will be added to your `package.json`:
+ `commit` — runs Commitizen and allow create nice commit messages
+ `pretty` — runs Prettier and format all code in the repo
+ `lint:code` — runs ESLint and preform static analysis of code

If you have some styles in the repo, we will add extra script:
+ `lint:styles` — runs Styleslint and preform static analysis of styles

If you want to release repo by git-tags, we will add ont more script:
+ `release` — runs Standard Version, updates CHANGELOG.md, bump version in `package.json` and created git-tag

Also, this library sets up `lint-staged` (prettify all staged files), `Commitlint` (check commit messages by [Conventional Commits specifications](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification)) and `Husky` (to run Prettier and Commitlint).

## Migration guide

Upgrading from version **1.x.x**, you must do some simple actions:
1. remove `@solid-soda/scripts` dependency from the project
2. run `@solid-soda/scripts` in your repository

For example:
```sh
npm uninstall @solid-soda/scripts
npx @solid-soda/scripts
```

## Acknowledgements

This project based on [mrm](https://github.com/sapegin/mrm) and setup configs for [Commitizen](http://commitizen.github.io/cz-cli/), [Commitlint](https://commitlint.js.org/#/), [ESLint](https://eslint.org), [Husky](https://github.com/typicode/husky), [lint-staged](https://github.com/okonet/lint-staged), [Prettier](https://prettier.io), [Stylelint](https://stylelint.io).
