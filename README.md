# chalk-pipe

[![](https://img.shields.io/travis/LitoMore/chalk-pipe/master.svg)](https://travis-ci.org/LitoMore/chalk-pipe)
[![](https://img.shields.io/npm/v/chalk-pipe.svg)](https://www.npmjs.com/package/chalk-pipe)
[![](https://img.shields.io/npm/l/chalk-pipe.svg)](https://github.com/LitoMore/chalk-pipe/blob/master/LICENSE)
[![](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Create chalk style schemes with simpler style strings

![](https://raw.githubusercontent.com/LitoMore/chalk-pipe/master/screenshot.png)

## Install

```bash
$ npm install chalk-pipe
```

## Usage

```javascript
const chalkPipe = require('chalk-pipe');

console.log(chalkPipe('blue.bold')('Hello world!'));
```

Use dot `.` to separeate multiple styles:

```javascript
const link = chalkPipe('blue.underline');
const error = chalkPipe('bgRed.#cccccc');
const warning = chalkPipe('orange.bold');

console.log(link('Link!'));
console.log(error('Error!'));
console.log(warning('Warning!'));
```

`chalkPipe` is also `chalk`:

```javascript
const blue = chalkPipe('blue');
const link = blue.underline;

console.log(link('Link!'));
```

### Use custom chalk

```javascript
const chalk = require('chalk');
const chalkPipe = require('chalk-pipe');

const text =  chalkPipe('underline', chalk.blue)('Link!');

console.log(text);
```

## API

### chalkPipe(styles)(text)

Example:

 ```javascript
 chalkPipe('blue.underline')('Link!');
 ```

### chalkPipe(styles, chalk)(text)

Example:

```javascript
const chalk = require('chalk');

chalk.enable = true;

chalkPipe('underline', chalk.blue)('Link!');
```

## Valid styles

- [Modifiers](https://github.com/chalk/chalk#modifiers)
- [Colors](https://github.com/chalk/chalk#colors)
- [Background colors](https://github.com/chalk/chalk#background-colors)
- [Hex triplet](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet)
- [CSS keywords](https://www.w3.org/wiki/CSS/Properties/color/keywords)

## Related

- [chalk-pipe-cli](https://github.com/LitoMore/chalk-pipe-cli) - CLI for this module
- [inquirer-chalk-pipe](https://github.com/LitoMore/inquirer-chalk-pipe) - chalk-pipe style input for inquirer.js
- [chalk](https://github.com/chalk/chalk) - Output colored text to terminal

## License

MIT © [LitoMore](https://github.com/LitoMore)
