import chalk, {Chalk, Modifiers, ForegroundColor} from 'chalk';
import {modifiers, normalColors, cssColorNames} from './styles.js';

const isBackground = (style: string) => {
	return Boolean(/^bg.+$/.test(style));
};

const isNormalColor = (style: string) => {
	return Boolean(new RegExp(`^(${normalColors.join('|')})$`).test(style));
};

const isModifier = (style: string) => {
	return Boolean(new RegExp(`^(${modifiers.join('|')})$`).test(style));
};

const isHexColor = (style: string) => {
	return Boolean(/^#[\dA-Fa-f]{6}$/.test(style));
};

const isKeyword = (style: string) => {
	// @ts-expect-error
	return Boolean(cssColorNames[style]);
};

const chalkPipe = (stylePipe?: string, customChalk?: Chalk) => {
	let paint = customChalk ?? chalk;

	if (!stylePipe || stylePipe.length === 0) {
		return paint;
	}

	const styles = stylePipe.split('.');

	for (let style of styles) {
		let isBg = false;

		// Modifier
		if (isModifier(style)) {
			paint = paint[style as typeof Modifiers];
			continue;
		}

		// Background
		if (isBackground(style)) {
			style = style.slice(2).replace('BlackBright', 'Gray');
			style = style.slice(0, 1).toLowerCase() + style.slice(1);
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
				style = (
					'bg' +
					style.slice(0, 1).toUpperCase() +
					style.slice(1)
				).replace('Gray', 'BlackBright');
			}

			paint = paint[style as typeof ForegroundColor];

			continue;
		} else if (isKeyword(style)) {
			paint = isBg ? paint.bgKeyword(style) : paint.keyword(style);

			continue;
		}
	}

	return paint;
};

export default chalkPipe;
