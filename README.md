# Getting started

## Installation

TBC - not on npm yet

## License

This project is TBC

## publishing notes

for namescaped packages, need to run `npm publish --access=public`

To build for local installs, edit the package files:

```
	"main": "dist/esm/index.js",
	"types": "dist/declaration/index.d.ts",
```
then `npm run build-esm` to build configured to use the esm config for local usage.