import { merchantProductPage } from 'cypress/page-objects/merchantProductPage'

describe('Michael Hill Product Page Injection Test', () => {
    beforeEach(() => {
        cy.viewport('macbook-15')
        merchantProductPage.visitAndInjectWidget(
            Cypress.env('flightcentreUrl'),
            '[class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-1 MuiGrid-item"]',
            'before'
        )
    })

    it('The Widget should be visible after injection', () => {
        cy.scrollTo(0, 200) // TODO: this is TEMP, need to figure out why element thinks its invisible if not "on the screen", vs other tests which dont suffer from this? is it due to some overflow:hidden?
        cy.get('#humm-widgets-cards-nz-default').should('be.visible')
    })
})
