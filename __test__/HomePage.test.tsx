import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '~/component/page/homePage';

beforeEach(() => {
    // Perform setup tasks here that should run before each test case
    render(<HomePage />);
});

describe('Landing Page', () => {

    it('should have the defined title on the Home page', () => {
        const element = screen.getByText(/empower your/i);

        expect(element).toBeInTheDocument();
    })

    it('should have the defined sub-heading above the title', () => {
        const element = screen.getByText(/community & recipe/i);

        expect(element).toBeInTheDocument();
    })


})
