/*
 * Props:
 * - categories: all filter choices shown in the dropdown.
 * - selectedCategory: the active filter value.
 * - onChange: updates the parent category state.
 * State:
 * - there is no local state; the selected value is controlled by App.
 */
function CategoryFilter({ categories, selectedCategory, onChange }) {
  return (
    <section className="panel">
      <div className="filter-group">
        <label htmlFor="category-filter">Filter by category</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) => onChange(event.target.value)}
          data-cy="filter"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}

export { CategoryFilter }
