import { merchantProductPage } from 'cypress/page-objects/merchantProductPage'

describe('Michael Hill Product Page Injection Test', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.viewport('macbook-15')
    merchantProductPage.visitAndInjectWidget({
      url: Cypress.env('michaelHillUrl'),
      targetElement: '[class="pdp-payment-messages moved"]',
      position: 'after',
      country: 'au',
    })
  })

  it('The Widget should be visible after injection', () => {
    cy.scrollTo(0, 250) // TODO: this is TEMP, need to figure out why element thinks its invisible if not "on the screen", vs other tests which dont suffer from this? is it due to some overflow:hidden?
    cy.get('#humm-widgets-cards-au-default').should('be.visible')
  })
})
