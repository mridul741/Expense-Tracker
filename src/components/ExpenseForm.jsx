import { useState } from 'react'
import { EXPENSE_CATEGORIES, validateExpense } from '../utils/expenseUtils.js'

/*
 * Props:
 * - categories: the options shown in the category dropdown.
 * - onAddExpense: callback triggered after the form passes validation.
 * State:
 * - formData stores the title, numeric amount, and selected category.
 * - errors stores validation feedback shown under each field.
 */
function ExpenseForm({ categories = EXPENSE_CATEGORIES, onAddExpense }) {
  const initialFormState = {
    title: '',
    amount: '',
    category: categories[0] || 'Food',
  }

  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = validateExpense(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const newExpense = {
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      title: formData.title.trim(),
      amount: Number(formData.amount),
      category: formData.category,
    }

    onAddExpense(newExpense)
    setFormData(initialFormState)
    setErrors({})
  }

  return (
    <section className="panel">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="field-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Groceries"
              data-cy="title"
              aria-invalid={Boolean(errors.title)}
            />
            <span className="field-error">{errors.title ?? ''}</span>
          </div>

          <div className="field-group">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              data-cy="amount"
              aria-invalid={Boolean(errors.amount)}
            />
            <span className="field-error">{errors.amount ?? ''}</span>
          </div>

          <div className="field-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              data-cy="category"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <span className="field-error">{errors.category ?? ''}</span>
          </div>

          <button className="primary-button" type="submit" data-cy="add-expense">
            Add expense
          </button>
        </div>
      </form>
    </section>
  )
}

export { ExpenseForm }
