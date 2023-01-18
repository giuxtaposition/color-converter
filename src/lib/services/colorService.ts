import { COLOR_MODELS_REPRESENTATIONS, type ColorModelType } from '$lib/types/ColorModel';

export async function getColorRepresentation(
	from: ColorModelType,
	to: ColorModelType,
	values: string[]
): Promise<string[] | null> {
	if (from === 'rgb' || to === 'rgb') {
		return await singleGet(from, to, values);
	} else {
		return multipleGet(from, to, values);
	}
}

async function multipleGet(
	from: ColorModelType,
	to: ColorModelType,
	values: string[]
): Promise<string[] | null> {
	const valuesInRGB = await singleGet(from, 'rgb', values);

	if (valuesInRGB) return await singleGet('rgb', to, valuesInRGB);

	return null;
}

async function singleGet(
	from: ColorModelType,
	to: ColorModelType,
	values: string[]
): Promise<string[] | null> {
	const url = new URL(`https://api.color-space.doesntexist.xyz/dev/${from}/${to}`);

	const currentColorModel = COLOR_MODELS_REPRESENTATIONS[from];

	const params = values.map((value, index) => {
		return [currentColorModel[index], value.toString()];
	});

	url.search = new URLSearchParams(params).toString();

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}
	});

	if (response.status === 200) {
		const data = await response.json();
		return Object.values(data);
	}

	return null;
}
