import { Story, Meta } from '@storybook/vue3'
import Tabs from 'src/components/tabs/Tabs.vue'
import type TabsProps from 'src/models/Tabs'

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
      productType: 'Standard',
      productItems: [
        {
          id: '18months',
          label: '18 months',
          contents: [
            { name: 'Interest free period', value: '18 months' },
            { name: 'Purchase amount', value: '$1,699.00' },
            { name: 'Establishment fee', value: '$50.00' },
            {
              name: 'Indicative minimum monthly repayments*',
              value: '$48.00',
            },
            {
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
            { name: 'Interest free period', value: '24 months' },
            { name: 'Purchase amount', value: '$1,699.50' },
            { name: 'Establishment fee', value: '$50.50' },
            {
              name: 'Indicative minimum monthly repayments*',
              value: '$48.50',
            },
            {
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
      productType: 'Standard',
      productItems: [
        {
          id: '18months',
          label: '18 months',
          contents: [
            { name: 'Interest free period', value: '18 months' },
            { name: 'Purchase amount', value: '$1,699.00' },
            { name: 'Establishment fee', value: '$50.00' },
            {
              name: 'Indicative minimum monthly repayments*',
              value: '$48.00',
            },
            {
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
            { name: 'Interest free period', value: '24 months' },
            { name: 'Purchase amount', value: '$1,699.50' },
            { name: 'Establishment fee', value: '$50.50' },
            {
              name: 'Indicative minimum monthly repayments*',
              value: '$48.50',
            },
            {
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
