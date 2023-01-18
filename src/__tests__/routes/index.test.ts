import '@testing-library/jest-dom';
import { COLOR_MODELS } from '$lib/types/ColorModel';
import { InputError } from '$lib/types/Error';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from '@testing-library/svelte';
import Page from '../../routes/+page.svelte';

describe('Home page', () => {
	test('should render all needed components', () => {
		render(Page);
		const heading = screen.getByText('Color Converter');
		expect(heading).toBeInTheDocument();
		expect(
			screen.getByRole('combobox', {
				name: /From:/i
			})
		).toBeInTheDocument();

		expect(
			screen.getByRole('textbox', {
				name: /color input/i
			})
		).toBeInTheDocument();

		expect(
			screen.getByRole('combobox', {
				name: /To:/i
			})
		).toBeInTheDocument();
	});

	test("should remove selected 'from' option from 'to' option list", () => {
		render(Page);

		expect(
			screen.getByRole('combobox', {
				name: /To:/i
			})
		).not.toContainHTML('<option value="rgb">RGB</option>');
	});

	test.each(COLOR_MODELS)(
		'should show error if invalid number of values are inserted',
		async (colorModel) => {
			render(Page);

			const user = userEvent.setup();

			const options = screen.getAllByRole('option', {
				name: colorModel.toUpperCase()
			});

			await user.selectOptions(screen.getByRole('combobox', { name: /From:/i }), options[0]);

			await userEvent.clear(
				screen.getByRole('textbox', {
					name: /color input/i
				})
			);

			await user.type(screen.getByRole('textbox', { name: /color input/i }), '(56,');

			await waitFor(() => {
				expect(screen.getByText(InputError.InvalidNumberOfValues)).toBeVisible();
				expect(screen.getByRole('textbox', { name: /color input/i })).toBeInvalid();
			});
		}
	);

	test.each([
		[COLOR_MODELS[0], '(0,0,-255)'],
		[COLOR_MODELS[1], '(25,-25,25)'],
		[COLOR_MODELS[2], '(0,0,0,300)'],
		[COLOR_MODELS[3], '(380,3,69)'],
		[COLOR_MODELS[4], '(380,100,85)']
	])('should show error if invalid %p values are inserted', async (representation, value) => {
		render(Page);

		const options = screen.getAllByRole('option', {
			name: representation.toUpperCase()
		});

		await userEvent.selectOptions(screen.getByRole('combobox', { name: /From:/i }), options[0]);

		await userEvent.clear(
			screen.getByRole('textbox', {
				name: /color input/i
			})
		);

		await userEvent.type(screen.getByRole('textbox'), value);

		await waitFor(() => {
			expect(screen.getByText(InputError.InvalidValue)).toBeVisible();
			expect(screen.getByRole('textbox', { name: /color input/i })).toBeInvalid();
		});
	});

	test.each([
		[COLOR_MODELS[0], '(0,0,255)'],
		[COLOR_MODELS[1], '(25,25,25)'],
		[COLOR_MODELS[2], '(0,0,0,100)'],
		[COLOR_MODELS[3], '(360,3,69)'],
		[COLOR_MODELS[4], '(360,100,85)']
	])('should not show error if valid %p values are inserted', async (representation, value) => {
		render(Page);

		const options = screen.getAllByRole('option', {
			name: representation.toUpperCase()
		});

		await userEvent.selectOptions(screen.getByRole('combobox', { name: /From:/i }), options[0]);

		await userEvent.clear(
			screen.getByRole('textbox', {
				name: /color input/i
			})
		);

		await userEvent.type(screen.getByRole('textbox'), value);

		await waitFor(() => {
			expect(screen.getByRole('textbox')).toBeValid();
			expect(screen.queryByRole('alert')).not.toBeInTheDocument();
		});
	});

	test('should disable convert button if input is not valid', async () => {
		render(Page);

		await userEvent.type(
			screen.getByRole('textbox', {
				name: /color input/i
			}),
			'0'
		);

		await waitFor(() => {
			expect(
				screen.getByRole('button', {
					name: /Convert/i
				})
			).toBeDisabled();
		});
	});

	test('should enable convert button if input is valid', async () => {
		render(Page);

		await waitFor(() => {
			expect(
				screen.getByRole('button', {
					name: /Convert/i
				})
			).toBeEnabled();
		});
	});
});
