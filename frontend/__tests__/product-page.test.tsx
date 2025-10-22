import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { makeStore } from '@/lib/store'
import ProductPage from '@/app/product/page'

describe('Product Page', () => {
    it('renders Counter with initial value and increments on click', () => {
        render(
            <Provider store={makeStore()}>
                <ProductPage />
            </Provider>
        )

        // Should show initial count from the store
        expect(screen.getByText(/Count:/)).toHaveTextContent('Count: 0')

        // Click the increment button
        fireEvent.click(screen.getByRole('button', { name: /Increment/i }))

        // Expect count to update
        expect(screen.getByText(/Count:/)).toHaveTextContent('Count: 1')
    })
})
