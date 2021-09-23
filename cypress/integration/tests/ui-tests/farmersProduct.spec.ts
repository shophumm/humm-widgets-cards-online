import { merchantProductPage } from "cypress/page-objects/merchantProductPage";

describe('Farmers Product Page Injection Test', () => {
    beforeEach(() => {
        merchantProductPage.visitAndInjectWidget(
            'http://www.farmers.co.nz/fisher-paykel-614l-french-door-fridge-freezer-stainless-steel-rf610anux5-6604672',
            '[class="mobile-check-store-container"]',
            ''
        )
    })

    it('The Widget should be visible after injection', () => {
        cy.get('#humm-widgets-cards-nz').should('be.visible')
    })
})


