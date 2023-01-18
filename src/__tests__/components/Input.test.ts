import '@testing-library/jest-dom';

import { COLOR_MODELS } from '$lib/types/ColorModel';
import { render, screen } from '@testing-library/svelte';
import Input from '$lib/components/Input.svelte';

describe('Input', () => {
	test.each([
		[COLOR_MODELS[0], '(0 < value < 255, 0 < value < 255, 0 < value < 255)'],
		[COLOR_MODELS[1], '(0 < value < 100, 0 < value < 100, 0 < value < 100)'],
		[COLOR_MODELS[2], '(0 < value < 100, 0 < value < 100, 0 < value < 100, 0 < value < 100)'],
		[COLOR_MODELS[3], '(0 < value < 360, 0 < value < 100, 0 < value < 100)'],
		[COLOR_MODELS[4], '(0 < value < 360, 0 < value < 100, 0 < value < 100)']
	])('should show correct hint based on selected color model', (representation, value) => {
		render(Input, {
			colorModelSelected: representation,
			onInputChange: vi.fn(),
			error: null
		});
		expect(screen.getByText(value)).toBeVisible();
	});
});
