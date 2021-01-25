import chalk from 'chalk';
import {modifiers, normalColors, cssColorNames} from './styles.js';

const isBackground = style => {
	return Boolean(style.match(/^bg.+$/));
};

const isNormalColor = style => {
	return Boolean(style.match(`^(${normalColors.join('|')})$`));
};

const isModifier = style => {
	return Boolean(style.match(`^(${modifiers.join('|')})$`));
};

const isHexColor = style => {
	return Boolean(style.match(/^#[\dA-Fa-f]{6}$/));
};

const isKeyword = style => {
	return Boolean(cssColorNames[style]);
};

const chalkPipe = (stylePipe, customChalk) => {
	let paint = customChalk || chalk;

	if (!stylePipe || stylePipe.length === 0) {
		return paint;
	}

	const styles = stylePipe.split('.');

	for (let style of styles) {
		let isBg = false;

		// Modifier
		if (isModifier(style)) {
			paint = paint[style];
			continue;
		}

		// Background
		if (isBackground(style)) {
			style = style.slice(2).replace('BlackBright', 'Gray');
			style = style[0].toLowerCase() + style.slice(1);
			isBg = true;
		}

		// Hex
		if (isHexColor(style)) {
			paint = isBg ? paint.bgHex(style) : paint.hex(style);

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
			paint = isBg ? paint.bgKeyword(style) : paint.keyword(style);

			continue;
		}
	}

	return paint;
};

export default chalkPipe;
