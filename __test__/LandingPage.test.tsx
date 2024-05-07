import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LandingPage from '~/component/page/landingPage'

describe('Landing Page', () => {
    render(<LandingPage />);
});


it('should have the defined title on the landing page', () => {
    const header = screen.getByText('Icon');

    expect(header).toBeInTheDocument();
})
