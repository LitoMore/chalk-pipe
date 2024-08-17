export const normalizeHexColor = (text: string) => {
	let color = text.replace('#', '');
	if (color.length < 6) {
		// eslint-disable-next-line unicorn/no-useless-spread
		color = [...color.slice(0, 3)].map((x) => x.repeat(2)).join('');
	} else if (color.length > 6) {
		color = color.slice(0, 6);
	}

	return '#' + color;
};
