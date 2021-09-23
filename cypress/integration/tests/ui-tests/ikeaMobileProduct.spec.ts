import { merchantProductPage } from "cypress/page-objects/merchantProductPage";

describe('Ikea Mobile Product Page Injection Test', () => {
    beforeEach(() => {
        cy.viewport('iphone-x') // Set viewport to 375px x 812px
        //other available presets iphone-7, samsung-s10. You can also set specific width/height
        merchantProductPage.visitAndInjectWidget(
            'https://www.ikea.com/au/en/p/kivik-corner-sofa-6-seat-with-chaise-longue-skiftebo-dark-grey-s59305551/',
            '[class="range-revamp-product-availability"]',
            'before'
        )
    })

    it('The Widget should be visible after injection', () => {
        cy.get('#humm-widgets-cards-nz').should('be.visible')
    })
})