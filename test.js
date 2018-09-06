'use strict';

const test = require('ava');
const chalk = require('chalk');

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
