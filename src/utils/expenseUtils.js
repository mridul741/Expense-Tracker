export const EXPENSE_CATEGORIES = ['Food', 'Travel', 'Bills', 'Other']

export function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => total + Number(expense.amount || 0), 0)
}

export function filterExpenses(expenses, category) {
  if (category === 'All') {
    return expenses
  }

  return expenses.filter((expense) => expense.category === category)
}

export function validateExpense({ title, amount, category }) {
  const errors = {}

  if (!title || !title.trim()) {
    errors.title = 'Title is required'
  }

  const numericAmount = Number(amount)

  if (amount === '' || amount === null || amount === undefined || Number.isNaN(numericAmount)) {
    errors.amount = 'Amount must be a valid number'
  } else if (numericAmount <= 0) {
    errors.amount = 'Amount must be greater than zero'
  } else if (numericAmount > 100000) {
    errors.amount = 'Amount must be 100000 or less'
  }

  if (!category || !EXPENSE_CATEGORIES.includes(category)) {
    errors.category = 'Please choose a valid category'
  }

  return errors
}
