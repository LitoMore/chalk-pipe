import type {ChalkInstance, Modifiers, Color} from 'chalk';
import chalk from 'chalk';
import type {Keyword} from './styles.js';
import {modifiers, colors, cssKeywords} from './styles.js';

export const normalizeHexColor = (text: string) => {
	let color = text.replace('#', '');
	if (color.length < 6) {
		color = [...color.slice(0, 3)].map((x) => x.repeat(2)).join('');
	} else if (color.length > 6) {
		color = color.slice(0, 6);
	}

	return '#' + color;
};

export const isBuiltInStyle = (style: string) => {
	return ([...modifiers, ...colors] as string[]).includes(style);
};

export const isBackground = (style: string) => {
	return style.startsWith('bg');
};

export const isHexColor = (style: string) => {
	return /^#?[a-f\d]{3,8}$/i.test(style);
};

export const isKeyword = (style: string) => {
	return style in cssKeywords;
};

const chalkPipe = (stylePipe?: string, customChalk?: ChalkInstance) => {
	// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
	let paint = customChalk || chalk;

	if (!stylePipe || stylePipe.length === 0) {
		return paint;
	}

	const styles = stylePipe.split('.');

	for (let style of styles) {
		let isBg = false;

		// Built-in styles
		if (isBuiltInStyle(style)) {
			paint = paint[style as Modifiers | Color];
			continue;
		}

		// Background
		if (isBackground(style)) {
			style = style.slice(2);
			style = style.slice(0, 1).toLowerCase() + style.slice(1);
			isBg = true;
		}

		// Keyword
		if (isKeyword(style)) {
			paint = isBg
				? paint.bgHex(cssKeywords[style as Keyword])
				: paint.hex(cssKeywords[style as Keyword]);
			continue;
		}

		// Hex
		if (isHexColor(style)) {
			style = normalizeHexColor(style);
			paint = isBg ? paint.bgHex(style) : paint.hex(style);
			continue;
		}
	}

	return paint;
};

export {default as chalk} from 'chalk';
export * from 'chalk';

export {
	type Keyword,
	modifiers,
	foregroundColors,
	backgroundColors,
	colors,
	keywords,
} from './styles.js';

export default chalkPipe;
