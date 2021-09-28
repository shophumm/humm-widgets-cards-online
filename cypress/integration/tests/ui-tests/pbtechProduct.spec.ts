import { merchantProductPage } from "cypress/page-objects/merchantProductPage";

describe('PBTech Product Page Injection Test', () => {
    beforeEach(() => {
        merchantProductPage.visitAndInjectWidget(
            Cypress.env('pbtectProductUrl'),
            '[class="product_bgWrap p-3 bgcolor rounded"]',
            'after'
        )
    })

    it('The Widget should be visible after injection', () => {
        cy.get('#humm-widgets-cards-nz').should('be.visible')
    })
})