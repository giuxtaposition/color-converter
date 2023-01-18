import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/svelte';
import Page from '../../routes/+page.svelte';

describe('Home page', () => {
	test('should render the correct header', () => {
		render(Page);
		const heading = screen.getByText('Color Converter');
		expect(heading).toBeInTheDocument();
	});
});
