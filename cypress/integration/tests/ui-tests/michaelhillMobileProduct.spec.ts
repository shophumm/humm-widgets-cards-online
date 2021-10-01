import { merchantProductPage } from 'cypress/page-objects/merchantProductPage'

describe('Ikea Mobile Product Page Injection Test', () => {
    beforeEach(() => {
        cy.viewport('iphone-x') // Set viewport to 375px x 812px
        //other available presets iphone-7, samsung-s10. You can also set specific width/height
        merchantProductPage.visitAndInjectWidget(
            Cypress.env('michaelHillUrl'),
            '[class="pdp-payment-messages moved"]',
            'before'
        )
    })

    it('The Widget should be visible after injection', () => {
        cy.get('#humm-widgets-cards-nz-default').should('be.visible')
    })
})
