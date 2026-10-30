import { ExpenseItem } from './ExpenseItem.jsx'

/*
 * Props:
 * - expenses: the filtered set of expenses to render.
 * - onDelete: called when a user removes an individual expense.
 * State:
 * - no local state; the list is entirely driven by parent props.
 */
function ExpenseList({ expenses, onDelete }) {
  return (
    <section className="panel expense-list">
      <h2>Expenses</h2>

      {expenses.length === 0 ? (
        <p className="empty-state">No expenses match this filter.</p>
      ) : (
        <ul className="expense-list__items">
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </section>
  )
}

export { ExpenseList }
