import { COLOR_MODELS_REPRESENTATIONS, type ColorModelType } from '$lib/types/ColorModel';

interface colorRepresentation {
	valuesInRepresentation: string[] | null;
	valuesInRGB: string[] | null;
}

export async function getColorRepresentation(
	from: ColorModelType,
	to: ColorModelType,
	values: string[]
): Promise<colorRepresentation> {
	if (from === 'rgb' || to === 'rgb') {
		const result = await singleGet(from, to, values);
		return {
			valuesInRepresentation: result,
			valuesInRGB: from === 'rgb' ? values : result
		};
	} else {
		return await multipleGet(from, to, values);
	}
}

async function multipleGet(
	from: ColorModelType,
	to: ColorModelType,
	values: string[]
): Promise<colorRepresentation> {
	const valuesInRGB = await singleGet(from, 'rgb', values);

	if (valuesInRGB) {
		const result = await singleGet('rgb', to, valuesInRGB);

		return {
			valuesInRepresentation: result,
			valuesInRGB: valuesInRGB
		};
	}

	return {
		valuesInRepresentation: null,
		valuesInRGB: null
	};
}

async function singleGet(
	from: ColorModelType,
	to: ColorModelType,
	values: string[]
): Promise<string[] | null> {
	const currentColorModel = COLOR_MODELS_REPRESENTATIONS[from];

	const params = values.map((value, index) => {
		return [currentColorModel[index], value.toString()];
	});

	const url = new URL(`https://api.color-space.doesntexist.xyz/dev/${from}/${to}`);
	url.search = new URLSearchParams(params).toString();

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		cache: 'force-cache'
	});

	if (response.status === 200) {
		const data = await response.json();
		return Object.values(data);
	}

	return null;
}
