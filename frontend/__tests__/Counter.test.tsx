import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import Counter from '@/components/Counter';
import { makeStore } from '@/lib/store';

describe('Counter', () => {
  it('renders the initial count and increments on click', () => {
    render(
      <Provider store={makeStore()}>
        <Counter />
      </Provider>
    )

    // Initially count should be 0
    expect(screen.getByText(/Count:/)).toHaveTextContent('Count: 0')

    // Click button
    fireEvent.click(screen.getByRole('button', { name: /Increment/i }))

    // Expect count to increment
    expect(screen.getByText(/Count:/)).toHaveTextContent('Count: 1')
  })
})