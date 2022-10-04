import type {ChalkInstance, Modifiers, Color} from 'chalk';
import chalk from 'chalk';
import type {Keyword} from './styles.js';
import {modifiers, colors, cssKeywords} from './styles.js';

export const isBuiltInStyle = (style: string) => {
	return ([...modifiers, ...colors] as string[]).includes(style);
};

export const isBackground = (style: string) => {
	return style.startsWith('bg');
};

export const isHexColor = (style: string) => {
	return /^#[\da-f]{3,6}$/i.test(style);
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

		// Hex
		if (isHexColor(style)) {
			paint = isBg ? paint.bgHex(style) : paint.hex(style);
			continue;
		}

		// Keyword
		if (isKeyword(style)) {
			paint = isBg
				? paint.bgHex(cssKeywords[style as Keyword])
				: paint.hex(cssKeywords[style as Keyword]);
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
