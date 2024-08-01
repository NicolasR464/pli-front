import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import Home from '@/app/page'

describe('Home', () => {
    it('Should Have Home Text', () => {
        // Arrange
        render(<Home />)

        // Act
        const HomeText = screen.getByText('Home')

        // Assert
        expect(HomeText).toBeInTheDocument()
    })
})
