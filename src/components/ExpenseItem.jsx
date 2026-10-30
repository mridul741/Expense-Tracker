/*
 * Props:
 * - expense: one item with id, title, amount and category.
 * - onDelete: removes the selected item from the list.
 * State:
 * - this component is stateless; it renders from App-owned data only.
 */
function ExpenseItem({ expense, onDelete }) {
  return (
    <li className="expense-item" data-cy="expense-item" data-testid="expense-item">
      <div className="expense-main">
        <div>
          <h3>{expense.title}</h3>
          <span className="expense-category">{expense.category}</span>
        </div>
        <strong className="expense-amount">{Number(expense.amount).toFixed(2)}</strong>
      </div>

      <button
        type="button"
        className="delete-button"
        data-cy="delete-expense"
        onClick={() => onDelete(expense.id)}
      >
        Delete
      </button>
    </li>
  )
}

export { ExpenseItem }
