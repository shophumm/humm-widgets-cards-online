import { merchantProductPage } from 'cypress/page-objects/merchantProductPage'

describe('Farmers Mobile Product Page Injection Test', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.viewport('iphone-x') // Set viewport to 375px x 812px
    //other available presets iphone-7, samsung-s10. You can also set specific width/height
    merchantProductPage.visitAndInjectWidget({
      url: Cypress.env('farmersProductUrl'),
      targetElement: '[class="mobile-check-store-container"]',
      theme: 'farmers',
      // darkMode: true,
    })
  })

  it('The Widget should be visible after injection', () => {
    cy.get('#humm-widgets-cards-nz-farmers').should('be.visible')
  })
})
