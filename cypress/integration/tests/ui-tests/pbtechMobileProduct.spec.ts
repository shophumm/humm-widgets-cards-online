import { merchantProductPage } from "cypress/page-objects/merchantProductPage";

describe('PBTech Mobile Product Page Injection Test', () => {
    beforeEach(() => {
        cy.viewport('iphone-x') // Set viewport to 375px x 812px
        //other available presets iphone-7, samsung-s10. You can also set specific width/height
        merchantProductPage.visitAndInjectWidget(
            'https://www.pbtech.co.nz/product/HOMRBK0015/Roborock-S7-Smart-Robot-Vacuum-Cleaner---2-in-1-Sw',
            '[class="product_bgWrap p-3 bgcolor rounded"]',
            'after'
        )
    })

    it('The Widget should be visible after injection', () => {
        cy.get('#humm-widgets-cards-nz').should('be.visible')
    })
})