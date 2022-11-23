// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />
it('picks a country using the dropdown', () => {
  cy.visit('index.html')
  cy.contains('th', 'Country').invoke('index').should('equal', 7)
  cy.get('tbody tr')
    .should('have.length.greaterThan', 3)
    .eq(1)
    .find('td')
    .eq(7)
    .find('img')
    .should('have.attr', 'title' /*, 'Great Britain'*/)
    .then((country) => {
      return country === 'Great Britain' ? 'France' : 'Great Britain'
    })
    .as('country')
  cy.get('tbody tr').eq(1).find('td').eq(7).find('img').click()
  cy.get('td#grid_active_cell .k-picker').click()
  cy.get('ul[role=listbox]')
    .should('be.visible')
    .find('li')
    .should('have.length.greaterThan', 2)
  cy.get('@country').then((country) => {
    cy.contains('ul[role=listbox] li', country).click()

    cy.get('ul[role=listbox]').should('not.exist')
    cy.get('tbody tr')
      .eq(1)
      .find('td')
      .eq(7)
      .find('img')
      .should('have.attr', 'title', country)
  })
})
