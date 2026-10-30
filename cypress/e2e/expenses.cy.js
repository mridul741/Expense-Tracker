describe('Expense tracker', () => {
  it('adds expenses, filters by category, and updates the total and count', () => {
    cy.visit('/')

    cy.get('[data-cy="title"]').type('Lunch')
    cy.get('[data-cy="amount"]').type('250')
    cy.get('[data-cy="category"]').select('Food')
    cy.get('[data-cy="add-expense"]').click()

    cy.get('[data-cy="title"]').type('Cab')
    cy.get('[data-cy="amount"]').clear().type('400')
    cy.get('[data-cy="category"]').select('Travel')
    cy.get('[data-cy="add-expense"]').click()

    cy.get('[data-cy="total"]').should('contain', '650.00')

    cy.get('[data-cy="filter"]').select('Food')
    cy.get('[data-cy="expense-item"]').should('have.length', 1)
    cy.get('[data-cy="count"]').should('contain', '1')
  })
})
