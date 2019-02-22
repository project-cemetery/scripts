# Scripts

> [WIP] Package in develooment, be careful

## Instal

`yarn add -D @solid-soda/scripts`

## Usage

Modify your `package.json`
```json
{
  ...,
  scripts: {
    ...,
    s: solid-scripts,
  },
  ...
}
```

The following scripts available:

+ `lint` to apply ESLint to js/ts code
+ `pretty` to apply Prettier to all code
+ `cz` to create the commit by commitizen with Conventional Changelog rules

Examples:

+ `yarn s lint`
+ `yarn s pretty`
+ `yarn s cz`
