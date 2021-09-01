import { Story, Meta } from '@storybook/vue3'
import Card from 'src/components/dataDisplay/Card.vue'
import type CardProps from 'src/models/Card'

export default {
  title: 'dataDisplay/Card',
  component: Card,
  argTypes: {
    size: {
      options: ['auto', 'sm', 'md', 'lg'],
      type: 'select',
    },
    onClick: {},
  },
} as Meta

const Template: Story<CardProps> = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Card },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template:
    '<Card v-bind="args"><img src="https://via.placeholder.com/55x36" alt="Humm90 card" /></Card>',
})

export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Default (auto)'

export const SizeSmall = Template.bind({})
SizeSmall.args = {
  size: 'sm',
}

export const SizeMedium = Template.bind({})
SizeMedium.args = {
  size: 'md',
}

export const SizeLarge = Template.bind({})
SizeLarge.args = {
  size: 'lg',
}
