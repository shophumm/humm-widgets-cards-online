import { Story, Meta } from '@storybook/vue3'
import Button from 'src/components/buttons/Button.vue'
import type ButtonProps from 'src/models/Button'

export default {
  title: 'Buttons/Button',
  component: Button,
  argTypes: {
    buttonColor: { control: 'color' },
    size: {
      options: ['auto', 'sm', 'lg'],
      type: 'select',
    },
    onClick: {},
  },
} as Meta

const Template: Story<ButtonProps> = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Button },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<Button v-bind="args">Find out more</Button>',
})

export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Default (auto)'

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
}

export const SizeSmall = Template.bind({})
SizeSmall.args = {
  size: 'sm',
}

export const SizeLarge = Template.bind({})
SizeLarge.args = {
  size: 'lg',
}

export const Link = Template.bind({})
Link.args = {
  href: '#anchor',
}
