import { merchantProductPage } from 'cypress/page-objects/merchantProductPage'

describe('Samsung Product Page Injection Test', () => {
  beforeEach(() => {
    cy.viewport('macbook-15')
    merchantProductPage.visitAndInjectWidget(
      Cypress.env('samsungProductUrl'),
      '[class="pd-select-option__list pd-select-option__list--color"]',
      'after'
    )
  })

  it('The Widget should be visible after injection', () => {
    cy.get('#humm-widgets-cards-nz-default').should('be.visible')
  })
})
