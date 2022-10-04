# chalk-pipe

[![](https://github.com/LitoMore/chalk-pipe/workflows/Node/badge.svg)](https://github.com/LitoMore/chalk-pipe/actions)
[![](https://img.shields.io/npm/v/chalk-pipe.svg)](https://www.npmjs.com/package/chalk-pipe)
[![](https://img.shields.io/npm/l/chalk-pipe.svg)](https://github.com/LitoMore/chalk-pipe/blob/main/LICENSE)
[![](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray)](https://github.com/xojs/xo)

Create chalk style schemes with simpler style strings

![](https://raw.githubusercontent.com/LitoMore/chalk-pipe/main/screenshot.png)

## Install

```sh
npm install chalk-pipe
```

## Usage

```js
import chalkPipe from 'chalk-pipe';

console.log(chalkPipe('blue.bold')('Hello world!'));
```

Use dot `.` to separeate multiple styles:

```js
const link = chalkPipe('blue.underline');
const error = chalkPipe('bgRed.#cccccc');
const warning = chalkPipe('orange.bold');

console.log(link('Link!'));
console.log(error('Error!'));
console.log(warning('Warning!'));
```

`chalkPipe` is also `chalk`:

```js
const blue = chalkPipe('blue');
const link = blue.underline;

console.log(link('Link!'));
```

### Use custom chalk

```js
import chalkPipe, {chalk, Chalk} from 'chalk-pipe';

const customChalk = new Chalk({level: 1});

console.log(chalkPipe('underline', chalk.blue)('Link!'));
console.log(chalkPipe('underline', customChalk.blue)('Link!'));
```

## Built-in Chalk

All Chalk exported functions, variables, and declarations are exposed for convenience.

This can be useful if you want to use `chalk` directly.

```js
import {chalk, Chalk} from 'chalk-pipe';

const customChalk = new Chalk({level: 0});

console.log(chalk.blue('Hello'))
console.log(customChalk.green('World'));
```

## API

### chalkPipe(styles)(text)

Example:

 ```js
 chalkPipe('blue.underline')('Link!');
 ```

### chalkPipe(styles, chalk)(text)

Example:

```js
import {Chalk} from 'chalk';

const chalk = new Chalk({level: 1});

chalkPipe('underline', chalk.blue)('Link!');
```

### modifiers, foregroundColors, backgroundColors, colors, and keywords

All supported style strings are exposed as an array of strings for convenience. `colors` is the combination of `foregroundColors` and `backgroundColors`.

This can be useful if you wrap Chalk and need to validate input:

```js
import {modifiers, foregroundColors, keywords} from 'chalk-pipe';

console.log(modifiers.includes('bold'));
//=> true

console.log(foregroundColors.includes('pink'));
//=> false

console.log(keywords.includes('pink'));
//=> true
```

### isBuiltInStyle, isBackground, isHexColor, and isKeyword

These methods are used to determine whether a string is the specified style. `isBuiltInStyle` is used to determine whether it is a style supported by Chalk built-in.

```js
import {isBuiltInStyle, isBackground, isHexColor, isKeyword} from 'chalk-pipe';

console.log(isBuiltInStyle('pink'));
//=> false

console.log(isBackground('bgPink'));
//=> true

console.log(isHexColor('#fff'));
//=> true

console.log(isHexColor('fff'));
//=> true
```

### normalizeHexColor

This method is used to convert non-6-digit hex color to 6-digit.

```js
import {normalizeHexColor} from 'chalk-pipe';

console.log(normalizeHexColor('0cf'));
//=> '#00ccff'
```

## Supported styles

- [Modifiers](https://github.com/chalk/chalk#modifiers)
- [Colors](https://github.com/chalk/chalk#colors)
- [Background colors](https://github.com/chalk/chalk#background-colors)
- [Hex triplet](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet)
- [CSS keywords](https://www.w3.org/wiki/CSS/Properties/color/keywords)

## Related

- [chalk-pipe-cli](https://github.com/LitoMore/chalk-pipe-cli) - CLI for this module
- [ink-color-pipe](https://github.com/LitoMore/ink-color-pipe) - Ink component for this module
- [inquirer-chalk-pipe](https://github.com/LitoMore/inquirer-chalk-pipe) - A inquirer plugin for input chalk-pipe style strings
- [chalk](https://github.com/chalk/chalk) - Output colored text to terminal

## License

MIT © [LitoMore](https://github.com/LitoMore)
