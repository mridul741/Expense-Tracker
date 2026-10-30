import { useMemo, useState } from 'react'
import './App.css'
import { CategoryFilter } from './components/CategoryFilter.jsx'
import { ExpenseForm } from './components/ExpenseForm.jsx'
import { ExpenseList } from './components/ExpenseList.jsx'
import { EXPENSE_CATEGORIES, calculateTotal, filterExpenses } from './utils/expenseUtils.js'

function App() {
  const [expenses, setExpenses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredExpenses = useMemo(
    () => filterExpenses(expenses, selectedCategory),
    [expenses, selectedCategory],
  )

  const total = calculateTotal(expenses)

  const handleAddExpense = (newExpense) => {
    setExpenses((currentExpenses) => [...currentExpenses, newExpense])
  }

  const handleDeleteExpense = (expenseId) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== expenseId),
    )
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Personal budget</p>
          <h1>Expense Tracker</h1>
        </div>

        <div className="summary-grid" aria-label="Budget summary">
          <div className="summary-card">
            <span className="summary-label">Total</span>
            <strong className="summary-value" data-cy="total" data-testid="total">
              {total.toFixed(2)}
            </strong>
          </div>
          <div className="summary-card">
            <span className="summary-label">Visible</span>
            <strong className="summary-value" data-cy="count" data-testid="count">
              {filteredExpenses.length}
            </strong>
          </div>
        </div>
      </header>

      <ExpenseForm categories={EXPENSE_CATEGORIES} onAddExpense={handleAddExpense} />

      <CategoryFilter
        categories={['All', ...EXPENSE_CATEGORIES]}
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />

      <ExpenseList expenses={filteredExpenses} onDelete={handleDeleteExpense} />
    </main>
  )
}

export default App
