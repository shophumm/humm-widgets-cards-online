import { merchantProductPage } from 'cypress/page-objects/merchantProductPage'

describe('Farmers Product Page Injection Test', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.viewport('macbook-15')
    merchantProductPage.visitAndInjectWidget(
      Cypress.env('farmersProductUrl'),
      '[class="mobile-check-store-container"]',
      ''
    )
  })

  it('The Widget should be visible after injection', () => {
    cy.get('#humm-widgets-cards-nz-default').should('be.visible')
  })
})
