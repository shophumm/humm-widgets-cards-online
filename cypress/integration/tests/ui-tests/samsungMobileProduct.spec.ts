import { merchantProductPage } from 'cypress/page-objects/merchantProductPage'

describe('Samsung Mobile Product Page Injection Test', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.viewport('iphone-x') // Set viewport to 375px x 812px
    //other available presets iphone-7, samsung-s10. You can also set specific width/height
    merchantProductPage.visitAndInjectWidget({
      url: Cypress.env('samsungProductUrl'),
      targetElement: '[class="cost-box pd-buying-price--cta3"]',
      position: 'after',
    })
  })

  it('The Widget should be visible after injection', () => {
    cy.get('#humm-widgets-cards-nz-default').should('be.visible')
  })
})
