# chalk-pipe

Apply color scheme in a style pipe

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

Use dot `.` to separeate multiple styles.

```javascript
const link = chalkPipe('blue.underline');
const error = chalkPipe('bgRed.#cccccc');
const warning = chalkPipe('orange.bold');

console.log(link('Link!'));
console.log(error('Error!'));
console.log(warning('Warning!'));
```

`chalkPipe` is also `chalk`

```javascript
const blue = chalkPipe('blue');
const link = blue.underline;

console.log(link('Link!'));
```

## Valid styles

- [Modifiers](https://github.com/chalk/chalk#modifiers)
- [Colors](https://github.com/chalk/chalk#colors)
- [Background colors](https://github.com/chalk/chalk#background-colors)
- [Hex triplet](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet)
- [CSS keywords](https://www.w3.org/wiki/CSS/Properties/color/keywords)

## Related

- [chalk](https://github.com/chalk/chalk) - Output colored text to terminal

## License

MIT © [LitoMore](https://github.com/LitoMore)
