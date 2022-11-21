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
    .as('currentCountry')
  cy.get('tbody tr').eq(1).find('td').eq(7).find('img').click()
  cy.get('td#grid_active_cell .k-picker').click()
  cy.get('ul[role=listbox]')
    .should('be.visible')
    .find('li')
    .should('have.length.greaterThan', 2)
  cy.get('@currentCountry').then((currentCountry) => {
    let newCountry = 'Italy'
    if (currentCountry === 'France') {
      newCountry = 'Italy'
    } else {
      newCountry = 'France'
    }

    cy.contains('ul[role=listbox] li', newCountry).click()

    cy.get('ul[role=listbox]').should('not.exist')
    cy.get('tbody tr')
      .eq(1)
      .find('td')
      .eq(7)
      .find('img')
      .should('have.attr', 'title', newCountry)
  })
})
