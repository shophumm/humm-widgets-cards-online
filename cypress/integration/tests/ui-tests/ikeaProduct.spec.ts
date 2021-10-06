import { merchantProductPage } from 'cypress/page-objects/merchantProductPage'

describe('Ikea Product Page Injection Test', () => {
  beforeEach(() => {
    merchantProductPage.visitAndInjectWidget(
      Cypress.env('ikeaProductUrl'),
      '[class="range-revamp-product-availability"]',
      'before'
    )
  })

  it('The Widget should be visible after injection', () => {
    cy.scrollTo(0, 200) // TODO: this is TEMP, need to figure out why element thinks its invisible if not "on the screen", vs other tests which dont suffer from this? is it due to some overflow:hidden?
    cy.get('#humm-widgets-cards-nz-default').should('be.visible')
  })
})