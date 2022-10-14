import test from 'ava';
import {cssKeywords} from './styles.js';
import {normalizeHexColor} from './utils.js';
import chalkPipe, {
	Chalk,
	modifierNames,
	foregroundColorNames,
	backgroundColorNames,
} from './index.js';

const chalk = new Chalk({level: 1});

test('Built-in modifiers', (t) => {
	const stackedScheme = chalkPipe(modifierNames.join('.'), chalk);
	const stackedText = stackedScheme('foo');
	const stackedExpected =
		chalk.reset.bold.dim.italic.underline.overline.inverse.hidden.strikethrough.visible(
			'foo',
		);
	t.is(stackedText, stackedExpected);

	const splicedText = modifierNames
		.map((style) => chalkPipe(style, chalk)(style))
		.join('');
	const splicedExpected = modifierNames
		.map((style) => chalk[style](style))
		.join('');
	t.is(splicedText, splicedExpected);
});

test('Built-in foreground colors', (t) => {
	const stackedScheme = chalkPipe(foregroundColorNames.join('.'), chalk);
	const stackedText = stackedScheme('bar');
	const stackedExpected =
		chalk.black.red.green.yellow.blue.magenta.cyan.white.blackBright.gray.grey.redBright.greenBright.yellowBright.blueBright.magentaBright.cyanBright.whiteBright(
			'bar',
		);
	t.is(stackedText, stackedExpected);

	const splicedText = foregroundColorNames
		.map((style) => chalkPipe(style, chalk)(style))
		.join('');
	const splicedExpected = foregroundColorNames
		.map((style) => chalk[style](style))
		.join('');
	t.is(splicedText, splicedExpected);
});

test('Built-in background colors', (t) => {
	const stackedScheme = chalkPipe(backgroundColorNames.join('.'), chalk);
	const stackedText = stackedScheme('bg');
	const stackedExpected =
		chalk.bgBlack.bgRed.bgGreen.bgYellow.bgBlue.bgMagenta.bgCyan.bgWhite.bgBlackBright.bgGray.bgGrey.bgRedBright.bgGreenBright.bgYellowBright.bgBlueBright.bgMagentaBright.bgCyanBright.bgWhiteBright(
			'bg',
		);
	t.is(stackedText, stackedExpected);

	const splicedText = backgroundColorNames
		.map((style) => chalkPipe(style, chalk)(style))
		.join('');
	const splicedExpected = backgroundColorNames
		.map((style) => chalk[style](style))
		.join('');
	t.is(splicedText, splicedExpected);
});

test('Keyword styles', (t) => {
	const scheme = chalkPipe('hotpink', chalk);
	const text = scheme('hug');
	const expected = chalk.hex(cssKeywords.hotpink)('hug');
	t.is(text, expected);
});

test('Background styles', (t) => {
	const scheme = chalkPipe('bgRed.bg#ff99cc.bgPink.bgBlackBright', chalk);
	const text = scheme('unicorn');
	const expected = chalk.bgRed
		.bgHex('#ff99cc')
		.bgHex(cssKeywords.pink)
		.bgBlackBright('unicorn');
	t.is(text, expected);
});

test('Hex color', (t) => {
	const expected = chalk.hex('#ff99cc')('flora');
	t.is(chalkPipe('#ff99cc', chalk)('flora'), expected);
	t.is(chalkPipe('ff99cc', chalk)('flora'), expected);
	t.is(chalkPipe('f9c', chalk)('flora'), expected);
	t.is(chalkPipe('#f9c', chalk)('flora'), expected);
	t.is(chalkPipe('#F9C', chalk)('flora'), expected);
	t.is(chalkPipe('#F9C', chalk)('flora'), expected);
	t.is(chalkPipe('bg#f9c', chalk)('flora'), chalk.bgHex('#ff99cc')('flora'));
	t.is(chalkPipe('bgf9c', chalk)('flora'), chalk.bgHex('#ff99cc')('flora'));
});

test('Empty style', (t) => {
	const scheme = chalkPipe('', chalk);
	const text = scheme('lito');
	const expected = chalk('lito');
	t.is(text, expected);
});

test('Unknown style', (t) => {
	const scheme = chalkPipe('unknown', chalk);
	const text = scheme('sasuke');
	const expected = chalk('sasuke');
	t.is(text, expected);
});

test('Built-in Chalk', (t) => {
	const scheme = chalkPipe('cyan', chalk);
	const text = scheme('normal text');
	const expected = chalk.cyan('normal text');
	t.is(text, expected);
});

test('normalizeHexColor', (t) => {
	t.is(normalizeHexColor('0cf'), '#00ccff');
	t.is(normalizeHexColor('0cfe'), '#00ccff');
	t.is(normalizeHexColor('0cfee'), '#00ccff');
	t.is(normalizeHexColor('00ccff'), '#00ccff');
	t.is(normalizeHexColor('00ccffe'), '#00ccff');
	t.is(normalizeHexColor('00ccffee'), '#00ccff');
	t.is(normalizeHexColor('#0cf'), '#00ccff');
	t.is(normalizeHexColor('#0cfe'), '#00ccff');
	t.is(normalizeHexColor('#0cfee'), '#00ccff');
	t.is(normalizeHexColor('#00ccff'), '#00ccff');
	t.is(normalizeHexColor('#00ccffe'), '#00ccff');
	t.is(normalizeHexColor('#00ccffee'), '#00ccff');
});
