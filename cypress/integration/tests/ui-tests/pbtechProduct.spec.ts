import { merchantProductPage } from 'cypress/page-objects/merchantProductPage'

describe('PBTech Product Page Injection Test', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.viewport('macbook-15')
    merchantProductPage.visitAndInjectWidget(
      Cypress.env('pbtectProductUrl'),
      '[class="product_bgWrap p-3 bgcolor rounded"]',
      'after'
    )
  })

  it('The Widget should be visible after injection', () => {
    cy.get('#humm-widgets-cards-nz-default').should('be.visible')
  })
})
