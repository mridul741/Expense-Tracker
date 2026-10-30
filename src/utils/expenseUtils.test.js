import { describe, expect, it } from 'vitest'
import {
  EXPENSE_CATEGORIES,
  calculateTotal,
  filterExpenses,
  validateExpense,
} from './expenseUtils.js'

describe('calculateTotal', () => {
  it('sums the prices of all expenses', () => {
    expect(
      calculateTotal([
        { amount: 120 },
        { amount: 80.5 },
        { amount: '45.25' },
      ]),
    ).toBe(245.75)
  })

  it('returns zero for an empty list', () => {
    expect(calculateTotal([])).toBe(0)
  })
})

describe('validateExpense', () => {
  it('rejects an empty title', () => {
    expect(validateExpense({ title: '', amount: '25', category: 'Food' })).toMatchObject({
      title: 'Title is required',
    })
  })

  it('rejects a non-numeric amount', () => {
    expect(validateExpense({ title: 'Lunch', amount: 'abc', category: 'Food' })).toMatchObject({
      amount: 'Amount must be a valid number',
    })
  })

  it('rejects zero and negative values', () => {
    expect(validateExpense({ title: 'Cab', amount: '0', category: 'Travel' })).toMatchObject({
      amount: 'Amount must be greater than zero',
    })

    expect(validateExpense({ title: 'Cab', amount: '-25', category: 'Travel' })).toMatchObject({
      amount: 'Amount must be greater than zero',
    })
  })

  it('rejects amounts above 100000', () => {
    expect(validateExpense({ title: 'Rent', amount: '100001', category: 'Bills' })).toMatchObject({
      amount: 'Amount must be 100000 or less',
    })
  })

  it('accepts valid values', () => {
    expect(
      validateExpense({ title: 'Streaming', amount: '499.99', category: 'Bills' }),
    ).toEqual({})
  })
})

describe('filterExpenses', () => {
  it('returns all items when the filter is All', () => {
    const items = [
      { id: 1, title: 'Lunch', category: 'Food', amount: 50 },
      { id: 2, title: 'Taxi', category: 'Travel', amount: 200 },
    ]

    expect(filterExpenses(items, 'All')).toHaveLength(2)
  })

  it('filters by the selected category', () => {
    const items = [
      { id: 1, title: 'Lunch', category: 'Food', amount: 50 },
      { id: 2, title: 'Taxi', category: 'Travel', amount: 200 },
      { id: 3, title: 'Electricity', category: 'Bills', amount: 120 },
    ]

    expect(filterExpenses(items, 'Food')).toEqual([
      { id: 1, title: 'Lunch', category: 'Food', amount: 50 },
    ])
  })
})

describe('constant categories', () => {
  it('contains the required expense categories', () => {
    expect(EXPENSE_CATEGORIES).toEqual(['Food', 'Travel', 'Bills', 'Other'])
  })
})
