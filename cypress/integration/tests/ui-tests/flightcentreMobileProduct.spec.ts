import { merchantProductPage } from 'cypress/page-objects/merchantProductPage'
import CountryEnum from 'cypress/models/enum/CountryEnum'

describe('Flight Centre Mobile Product Page Injection Test', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.viewport('iphone-x') // Set viewport to 375px x 812px
    //other available presets iphone-7, samsung-s10. You can also set specific width/height
    merchantProductPage.visitAndInjectWidget({
      url: Cypress.env('flightcentreUrl'),
      targetElement:
        '[class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-1 MuiGrid-item"]',
      position: 'before',
      country: CountryEnum.Australia,
    })
  })

  it('The Widget should be visible after injection', () => {
    cy.get('#humm-widgets-cards-au-default').should('be.visible')
  })
})
