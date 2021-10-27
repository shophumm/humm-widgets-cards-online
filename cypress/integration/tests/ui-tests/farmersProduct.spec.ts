import { merchantProductPage } from 'cypress/page-objects/merchantProductPage'

describe('Farmers Product Page Injection Test', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.viewport('macbook-15')
    merchantProductPage.visitAndInjectWidget({
      url: Cypress.env('farmersProductUrl'),
      targetElement: '[class="mobile-check-store-container"]',
      theme: 'farmers',
    })
  })

  it('The Widget should be visible after injection', () => {
    cy.get('#humm-widgets-cards-nz-farmers').should('be.visible')
  })
})
