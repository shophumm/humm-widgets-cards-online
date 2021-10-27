import visitAndInjectWidgetProps from 'cypress/models/visitAndInjectWidget'
import CountryEnum from 'cypress/models/enum/CountryEnum'

class _merchantProductPage {
  visitAndInjectWidget({
    url,
    targetElement,
    position = '',
    country = CountryEnum.NewZealand,
    theme = undefined,
    darkMode = false,
  }: visitAndInjectWidgetProps) {
    cy.visit(url, {
      onLoad: contentWindow => {
        return new Cypress.Promise((resolve, reject) => {
          // create script element
          const tag = document.createElement('script')

          // append script element
          const el = cy.$$(<any>contentWindow.document.body).find(targetElement)

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
            Cypress.env('baseUrl') +
            `humm-widgets-cards-${country}.umd.js?productPrice=300&merchantId='8ea286eb-b884-4518-8fa1-b65a107a350d'${
              theme ? `&theme='${theme}'` : ''
            }${darkMode ? `&darkMode='${darkMode.toString()}'` : ''}`

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
export const merchantProductPage = new _merchantProductPage()
