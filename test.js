'use strict';

const test = require('ava');
const chalk = require('chalk');
const cssColorNames = require('css-color-names');

const {modifiers, normalColors} = require('./styles');
const chalkPipe = require('.');

chalk.enabled = true;

test('Modifiers', t => {
	const scheme = chalkPipe(modifiers.join('.'), chalk);
	const text = scheme('foo');
	const should = chalk
		.reset
		.bold
		.dim
		.italic
		.underline
		.inverse
		.hidden
		.strikethrough('foo');

	t.is(text, should);
});

test('Normal Colors', t => {
	const scheme = chalkPipe(normalColors.join('.'), chalk);
	const text = scheme('bar');
	const should = chalk
		.black
		.red
		.green
		.yellow
		.blue
		.magenta
		.cyan
		.white
		.gray
		.redBright
		.greenBright
		.yellowBright
		.blueBright
		.magentaBright
		.cyanBright
		.whiteBright('bar');

	t.is(text, should);
});

test('Keyword styles', t => {
	const scheme = chalkPipe('hotpink', chalk);
	const text = scheme('hug');
	const should = chalk.hex(cssColorNames.hotpink)('hug');

	t.is(text, should);
});

test('Background styles', t => {
	const scheme = chalkPipe('bgRed.bg#ff99cc.bgPink.bgBlackBright', chalk);
	const text = scheme('unicorn');
	const should = chalk
		.bgRed
		.bgHex('#ff99cc')
		.bgKeyword('pink')
		.bgBlackBright('unicorn');

	t.is(text, should);
});

test('Hex color', t => {
	const scheme = chalkPipe('#ff99cc', chalk);
	const text = scheme('flora');
	const should = chalk.hex('#ff99cc')('flora');

	t.is(text, should);
});

test('Empty style', t => {
	const scheme = chalkPipe('', chalk);
	const text = scheme('lito');
	const should = chalk('lito');

	t.is(text, should);
});

test('Unknown style', t => {
	const scheme = chalkPipe('unknown', chalk);
	const text = scheme('sasuke');
	const should = chalk('sasuke');

	t.is(text, should);
});

test('Built-in Chalk', t => {
	const scheme = chalkPipe();
	const text = scheme('normal text');
	const should = 'normal text';

	t.is(text, should);
});
