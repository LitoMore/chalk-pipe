import chalk, {
	type ChalkInstance,
	type ModifierName,
	type ColorName,
	modifierNames,
	colorNames,
} from 'chalk';
import {cssKeywordsMap} from './styles.js';
import {normalizeHexColor} from './utils.js';

const builtInStyles = new Set<string>([...modifierNames, ...colorNames]);

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
		if (builtInStyles.has(style)) {
			paint = paint[style as ModifierName | ColorName];
			continue;
		}

		// Background
		if (style.startsWith('bg')) {
			style = style.slice(2);
			style = style.slice(0, 1).toLowerCase() + style.slice(1);
			isBg = true;
		}

		// Keyword
		if (cssKeywordsMap.has(style)) {
			const colorHex = cssKeywordsMap.get(style)!;
			paint = isBg ? paint.bgHex(colorHex) : paint.hex(colorHex);
			continue;
		}

		// Hex
		if (/^#?[a-f\d]{3,8}$/i.test(style)) {
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
