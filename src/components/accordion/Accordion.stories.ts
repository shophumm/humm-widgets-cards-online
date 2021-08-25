import { Story, Meta } from '@storybook/vue3'
import Accordion from 'src/components/accordion/Accordion.vue'
import type AccordionProps from 'src/models/Accordion'

export default {
  title: 'Accordion/Accordion',
  component: Accordion,
  argTypes: {
    onClick: {},
  },
} as Meta

const Template: Story<AccordionProps> = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Accordion },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<Accordion v-bind="args">This is an accordion</Accordion>',
})

export const Default = Template.bind({})
Default.args = {
  id: 'accordion',
  content: `*Approved applicants only, fees, terms, conditions and minimum monthly payment [and minimum finance amount $<XX>][AU LEGAL NOTE: only include if a minimum finance amount applies] apply, including a $99 Annual Fee charged on first debit to your humm90 Account and annually thereafter; which attracts interest (charged at the humm90 Purchase Rate, currently 23.99% p.a) from the date charged unless fully paid within Interest Free Period and the Interest Free Criteria are met. Indicative monthly payment excl the Annual Fee and assumes no additional purchases, cash advances or other fees and no interest applies. 

  Indicative monthly payment is a minimum monthly repayment (MMP) of the greater of $30 or 3% of the outstanding balance for the first month, as the first month’s MMP is greater than the Transaction amount divided by the Interest Free Period. The MMP decreases each month as the Eligible Unpaid Balance decreases, therefore the purchase price of the Transaction will not be repaid within the Interest Free Period if you only pay the contractual MMP over the entire Interest Free Period.  Credit provided by humm Cards Pty Ltd ABN 31 099 651 877 Australian Credit Licence number 247415.
  
  ^ Indicative repayments (Transaction amount divided by Interest Free Period) are an estimate only, which excl $99 Annual Fee, and assumes no additional purchases, cash advances or other fees or charges. Interest Free Period available when indicative monthly repayments are made by each statement period due date, resulting in full repayment of purchase amount within the Interest Free Period. `,
}
