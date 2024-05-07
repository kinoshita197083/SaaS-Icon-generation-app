import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Generate from '~/pages/generate';

beforeEach(() => {
    // Perform setup tasks here that should run before each test case
    render(<Generate />);
});

describe('Generate Page', () => {

    it('should have the defined title on the Home page', () => {
        const element = screen.getByText(/describe your/i);

        expect(element).toBeInTheDocument();
    })

})
