import { Story, Meta } from '@storybook/vue3'
import Tabs from 'src/components/tabs/Tabs.vue'
import type TabsProps from 'src/models/Tabs'
import ProductEnum from 'src/models/enums/ProductEnum'

export default {
  title: 'Tabs/Tabs',
  component: Tabs,
  argTypes: {
    onClick: {},
  },
} as Meta

const Template: Story<TabsProps> = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Tabs },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<Tabs v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
  tabs: [
    {
      productType: ProductEnum.Standard,
      productItems: [
        {
          id: '18months',
          label: '18 months',
          contents: [
            {
              key: 'interestFreePeriod',
              name: 'Interest free period',
              value: '18 months',
            },
            {
              key: 'purchaseAmount',
              name: 'Purchase amount',
              value: '$1,699.00',
            },
            {
              key: 'establishmentFee',
              name: 'Establishment fee',
              value: '$50.00',
            },
            {
              key: 'indicativeMinimumMonthly',
              name: 'Indicative minimum monthly repayments*',
              value: '$48.00',
            },
            {
              key: 'indicativeRepaymentToPay',
              name:
                'Indicative repayment to pay before Interest free period expires ^',
              value: '$450.50',
            },
          ],
        },
        {
          id: '24months',
          label: '24 months',
          contents: [
            {
              key: 'interestFreePeriod',
              name: 'Interest free period',
              value: '24 months',
            },
            {
              key: 'purchaseAmount',
              name: 'Purchase amount',
              value: '$1,699.50',
            },
            {
              key: 'establishmentFee',
              name: 'Establishment fee',
              value: '$50.50',
            },
            {
              key: 'indicativeMinimumMonthly',
              name: 'Indicative minimum monthly repayments*',
              value: '$48.50',
            },
            {
              key: 'indicativeRepaymentToPay',
              name:
                'Indicative repayment to pay before Interest free period expires ^',
              value: '$450.00',
            },
          ],
        },
      ],
    },
  ],
}

export const WithDefaultTabId = Template.bind({})
WithDefaultTabId.args = {
  defaultTabId: '24months',
  tabs: [
    {
      productType: ProductEnum.Standard,
      productItems: [
        {
          id: '18months',
          label: '18 months',
          contents: [
            {
              key: 'interestFreePeriod',
              name: 'Interest free period',
              value: '18 months',
            },
            {
              key: 'purchaseAmount',
              name: 'Purchase amount',
              value: '$1,699.00',
            },
            {
              key: 'establishmentFee',
              name: 'Establishment fee',
              value: '$50.00',
            },
            {
              key: 'indicativeMinimumMonthly',
              name: 'Indicative minimum monthly repayments*',
              value: '$48.00',
            },
            {
              key: 'indicativeRepaymentToPay',
              name:
                'Indicative repayment to pay before Interest free period expires ^',
              value: '$450.50',
            },
          ],
        },
        {
          id: '24months',
          label: '24 months',
          contents: [
            {
              key: 'interestFreePeriod',
              name: 'Interest free period',
              value: '24 months',
            },
            {
              key: 'purchaseAmount',
              name: 'Purchase amount',
              value: '$1,699.50',
            },
            {
              key: 'establishmentFee',
              name: 'Establishment fee',
              value: '$50.50',
            },
            {
              key: 'indicativeMinimumMonthly',
              name: 'Indicative minimum monthly repayments*',
              value: '$48.50',
            },
            {
              key: 'indicativeRepaymentToPay',
              name:
                'Indicative repayment to pay before Interest free period expires ^',
              value: '$450.00',
            },
          ],
        },
      ],
    },
  ],
}
