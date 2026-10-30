describe('Expense tracker validation', () => {
  it('rejects empty titles and negative amounts without creating rows', () => {
    cy.visit('/')

    cy.get('[data-cy="add-expense"]').click()
    cy.contains('Title is required').should('be.visible')

    cy.get('[data-cy="title"]').type('Lunch')
    cy.get('[data-cy="amount"]').type('-50')
    cy.get('[data-cy="add-expense"]').click()
    cy.contains('Amount must be greater than zero').should('be.visible')

    cy.get('[data-cy="expense-item"]').should('have.length', 0)
  })
})
