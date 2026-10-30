import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'

describe('Expense tracker app', () => {
  it('adds a valid expense and shows the updated total and count', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Title'), 'Lunch')
    await user.type(screen.getByLabelText('Amount'), '250')
    await user.selectOptions(screen.getByLabelText('Category'), 'Food')
    await user.click(screen.getByRole('button', { name: 'Add expense' }))

    expect(screen.getByText('Lunch')).toBeInTheDocument()
    expect(screen.getByTestId('total')).toHaveTextContent('250.00')
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('rejects an empty title', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Amount'), '250')
    await user.click(screen.getByRole('button', { name: 'Add expense' }))

    expect(screen.getByText('Title is required')).toBeInTheDocument()
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('rejects a non-numeric amount', async () => {
    render(<App />)

    const titleInput = screen.getByLabelText('Title')
    const amountInput = screen.getByLabelText('Amount')
    fireEvent.change(titleInput, { target: { value: 'Lunch' } })
    fireEvent.change(amountInput, { target: { value: 'abc' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add expense' }))

    expect(screen.getByText('Amount must be a valid number')).toBeInTheDocument()
  })

  it('rejects negative amounts', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Title'), 'Cab')
    await user.type(screen.getByLabelText('Amount'), '-50')
    await user.click(screen.getByRole('button', { name: 'Add expense' }))

    expect(screen.getByText('Amount must be greater than zero')).toBeInTheDocument()
  })

  it('filters expenses by category and updates the visible count', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Title'), 'Lunch')
    await user.type(screen.getByLabelText('Amount'), '250')
    await user.selectOptions(screen.getByLabelText('Category'), 'Food')
    await user.click(screen.getByRole('button', { name: 'Add expense' }))

    await user.type(screen.getByLabelText('Title'), 'Taxi')
    await user.type(screen.getByLabelText('Amount'), '400')
    await user.selectOptions(screen.getByLabelText('Category'), 'Travel')
    await user.click(screen.getByRole('button', { name: 'Add expense' }))

    await user.selectOptions(screen.getByLabelText('Filter by category'), 'Food')

    expect(screen.getByTestId('count')).toHaveTextContent('1')
    expect(screen.getAllByTestId('expense-item')).toHaveLength(1)
  })

  it('deletes an expense when requested', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Title'), 'Lunch')
    await user.type(screen.getByLabelText('Amount'), '250')
    await user.click(screen.getByRole('button', { name: 'Add expense' }))

    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(screen.getByText('No expenses match this filter.')).toBeInTheDocument()
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })
})
