import '@testing-library/jest-dom';

import Selector from '$lib/components/Selector.svelte';
import { render, screen } from '@testing-library/svelte';
import { COLOR_MODELS } from '$lib/types/ColorModel';

describe('Selector', () => {
	test('should correctly set default option', () => {
		render(Selector, {
			name: 'aName',
			label: 'aLabel',
			selected: 'cmyk',
			onSelectOverlap: vi.fn()
		});

		expect(
			(
				screen.getByRole('option', {
					name: /cmyk/i
				}) as HTMLOptionElement
			).selected
		).toBe(true);
	});

	test('should correctly set label', () => {
		render(Selector, {
			name: 'aName',
			label: 'aLabel',
			selected: 'cmyk',
			onSelectOverlap: vi.fn()
		});

		expect(
			screen.getByRole('combobox', {
				name: /aLabel/i
			})
		).toBeInTheDocument();
	});

	test('should list all representation options when optionToRemove is not passed as prop', () => {
		render(Selector, {
			name: 'aName',
			label: 'aLabel',
			selected: 'cmyk',
			onSelectOverlap: vi.fn()
		});

		COLOR_MODELS.forEach((representation) => {
			expect(
				screen.getByRole('option', {
					name: representation.toUpperCase()
				}) as HTMLOptionElement
			).toBeInTheDocument();
		});
	});

	test('should list all representation options except optionToRemove if it is passed as prop', () => {
		render(Selector, {
			name: 'aName',
			label: 'aLabel',
			selected: 'cmyk',
			onSelectOverlap: vi.fn(),
			optionToRemove: 'hsb'
		});

		COLOR_MODELS.filter((representation) => representation !== 'hsb').forEach((representation) => {
			expect(
				screen.getByRole('option', {
					name: representation.toUpperCase()
				}) as HTMLOptionElement
			).toBeInTheDocument();
		});

		expect(
			screen.queryByRole('option', {
				name: 'hsb'.toUpperCase()
			}) as HTMLOptionElement
		).not.toBeInTheDocument();
	});

	test('should change selected option if optionToRemove is selected option', () => {
		const updateSelect = vi.fn();
		render(Selector, {
			name: 'aName',
			label: 'aLabel',
			selected: 'cmy',
			optionToRemove: 'cmy',
			onSelectOverlap: updateSelect
		});

		expect(updateSelect).toHaveBeenCalled();
	});
});
