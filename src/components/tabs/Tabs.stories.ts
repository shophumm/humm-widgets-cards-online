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
      id: '18months',
      label: '18 months',
      content: {
        interestFree: '12 months',
        purchaseAmount: '$1,699.00',
        estFee: '$50.00',
        minimumMonthlyPayment: '$48.00',
        repayBeforeInterest: '$450.50',
      },
    },
    {
      id: '24months',
      label: '24 months',
      content: {
        interestFree: '12 months',
        purchaseAmount: '$1,699.00',
        estFee: '$50.00',
        minimumMonthlyPayment: '$48.00',
        repayBeforeInterest: '$450.50',
      },
    },
  ],
}

export const WithDefaultTabId = Template.bind({})
WithDefaultTabId.args = {
  defaultTabId: '24months',
  tabs: [
    {
      id: '18months',
      label: '18 months',
      content: {
        interestFree: '12 months',
        purchaseAmount: '$1,699.00',
        estFee: '$50.00',
        minimumMonthlyPayment: '$48.00',
        repayBeforeInterest: '$450.50',
      },
    },
    {
      id: '24months',
      label: '24 months',
      content: {
        interestFree: '12 months',
        purchaseAmount: '$1,699.00',
        estFee: '$50.00',
        minimumMonthlyPayment: '$48.00',
        repayBeforeInterest: '$450.50',
      },
    },
  ],
}
