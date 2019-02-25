# Scripts

> [WIP] Package in develooment, be careful

## Install

```sh
yarn add -D @solid-soda/scripts
yarn soda init
```

### Init options

+ `--vscode` to initialize Visiual Studio Code setttings for ESLint plugin

## Usage

The following scripts available:

+ `lint` to apply ESLint to js/ts code
+ `pretty` to apply Prettier to all code
+ `cz` to create the commit by commitizen with Conventional Changelog rules
+ `release` to create new release by standard-version (bump version in package.json, generate changelog and create git tag)

Examples:

+ `yarn s lint`
+ `yarn s pretty`
+ `yarn s cz`
+ `yarn s release`
