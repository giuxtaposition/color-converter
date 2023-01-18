export const COLOR_MODELS = ['rgb', 'cmy', 'cmyk', 'hsb', 'hsl'] as const;

export const COLOR_MODELS_MIN_MAX = {
	rgb: [
		[0, 255],
		[0, 255],
		[0, 255]
	],
	cmy: [
		[0, 100],
		[0, 100],
		[0, 100]
	],
	cmyk: [
		[0, 100],
		[0, 100],
		[0, 100],
		[0, 100]
	],
	hsb: [
		[0, 360],
		[0, 100],
		[0, 100]
	],
	hsl: [
		[0, 360],
		[0, 100],
		[0, 100]
	]
} as const;

export type ColorModelType = (typeof COLOR_MODELS)[number];
