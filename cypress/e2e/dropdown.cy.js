/// <reference types="cypress" />
it('picks a country using the dropdown', () => {
  cy.visit('index.html')
  cy.contains('th', 'Country').invoke('index').should('equal', 7)
  cy.get('tbody tr')
    .should('have.length.above', 3)
    .eq(1)
    .find('td')
    .eq(7)
    .find('img')
    .should('have.attr', 'title')
    .then((country) => {
      return country === 'Brazil' ? 'Great Britain' : 'Brazil'
    })
    .as('country')
  cy.get('tbody tr')
    .should('have.length.above', 3)
    .eq(1)
    .find('td')
    .eq(7)
    .find('img')
    .click()
  cy.get('#grid_active_cell .k-picker').click()

  cy.get('@country').then((country) => {
    cy.get('ul[role=listbox]')
      .should('be.visible')
      .get('li')
      .should('have.length.above', 2)
    cy.contains('ul[role=listbox] li', country).click()

    cy.get('.k-loading-mask').should('not.exist')

    cy.get('tbody tr')
      .should('have.length.above', 3)
      .eq(1)
      .find('td')
      .eq(7)
      .find('img')
      .should('have.attr', 'title', country)
  })
})
