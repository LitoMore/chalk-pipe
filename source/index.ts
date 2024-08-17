import chalk, {
	type ChalkInstance,
	type ModifierName,
	type ColorName,
	modifierNames,
	colorNames,
} from 'chalk';
import {type KeywordName, cssKeywords} from './styles.js';
import {normalizeHexColor} from './utils.js';

const isBuiltInStyle = (style: string) => {
	return ([...modifierNames, ...colorNames] as string[]).includes(style);
};

const isBackground = (style: string) => {
	return style.startsWith('bg');
};

const isHexColor = (style: string) => {
	return /^#?[a-f\d]{3,8}$/i.test(style);
};

const isKeyword = (style: string) => {
	return style in cssKeywords;
};

const chalkPipe = (stylePipe?: string, customChalk?: ChalkInstance) => {
	/* c8 ignore start */
	// eslint-disable-next-line n/no-unsupported-features/es-syntax
	let paint = customChalk ?? chalk;
	/* c8 ignore stop */

	if (!stylePipe || stylePipe.length === 0) {
		return paint;
	}

	const styles = stylePipe.split('.');

	for (let style of styles) {
		let isBg = false;

		// Built-in styles
		if (isBuiltInStyle(style)) {
			paint = paint[style as ModifierName | ColorName];
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
				? paint.bgHex(cssKeywords[style as KeywordName])
				: paint.hex(cssKeywords[style as KeywordName]);
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
export {type KeywordName, keywordNames} from './styles.js';
export default chalkPipe;
