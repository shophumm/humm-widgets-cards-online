class _merchantProductPage {

    visitAndInjectWidget(url: string, targetElement: string, position: string) {
        cy.visit(url, {
            onLoad: contentWindow => {
                return new Cypress.Promise((resolve, reject) => {
                    // create script element
                    let tag = document.createElement('script')

                    // append script element
                    let el = cy.$$(<any>contentWindow.document.body).find(targetElement)

                    switch (position) {
                        case 'append':
                            el.append(tag)
                            break
                        case 'prepend':
                            el.prepend(tag)
                            break
                        case 'after':
                            el.after(tag)
                            break
                        default:
                            el.before(tag)
                            break
                    }

                    // Add an onload event to script tag to resolve promise
                    tag.onload = () => {
                        resolve()
                    }

                    // set source of element (Note, must be done post injection, else the script wont have a "DOM" location to inject
                    tag.src =
                        'http://localhost:5000/humm-widgets-cards-nz.umd.js?productPrice=300'

                    // Add a timeout, to reject promise after 2.5s of not "load" fired
                    setTimeout(() => {
                        tag.onload = null
                        reject()
                    }, 3000)
                })
            },
        })
    }
}
export const merchantProductPage = new _merchantProductPage();