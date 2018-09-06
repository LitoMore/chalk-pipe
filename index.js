'use strict';

const chalk = require('chalk');
const cssColorNames = require('css-color-names');

const {modifiers, normalColors} = require('./styles');

function isBackground(style) {
	return Boolean(style.match(/^bg.+$/));
}

function isNormalColor(style) {
	return Boolean(style.match(`^(${normalColors.join('|')})$`));
}

function isModifier(style) {
	return Boolean(style.match(`^(${modifiers.join('|')})$`));
}

function isHexColor(style) {
	return Boolean(style.match(/^#[0-9A-Fa-f]{6}$/));
}

function isKeyword(style) {
	return Boolean(cssColorNames[style]);
}

module.exports = function (stylePipe, customChalk) {
	let paint = customChalk || chalk;

	if (!stylePipe || stylePipe.length === 0) {
		return paint;
	}

	const styles = stylePipe.split('.');

	for (let i = 0; i < styles.length; i++) {
		let style = styles[i];
		let isBg = false;

		// Modifier
		if (isModifier(style)) {
			paint = paint[style];
			continue;
		}

		// Background
		if (isBackground(style)) {
			style = style.substr(2).replace('BlackBright', 'Gray');
			style = style[0].toLowerCase() + style.slice(1);
			isBg = true;
		}

		// Hex
		if (isHexColor(style)) {
			if (isBg) {
				paint = paint.bgHex(style);
			} else {
				paint = paint.hex(style);
			}
			continue;
		}

		// Normal Color or Keyword
		if (isNormalColor(style)) {
			if (isBg) {
				style = ('bg' + style[0].toUpperCase() + style.slice(1)).replace('Gray', 'BlackBright');
				paint = paint[style];
			} else {
				paint = paint[style];
			}
			continue;
		} else if (isKeyword(style)) {
			if (isBg) {
				paint = paint.bgKeyword(style);
			} else {
				paint = paint.keyword(style);
			}
			continue;
		}
	}

	return paint;
};
