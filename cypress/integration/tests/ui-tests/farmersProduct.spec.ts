import { merchantProductPage } from 'cypress/page-objects/merchantProductPage'

describe('Farmers Product Page Injection Test', () => {
  beforeEach(() => {
    cy.viewport('macbook-15')
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
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
