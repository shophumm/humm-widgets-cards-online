import { Story, Meta } from '@storybook/vue3'
import ButtonClose from 'src/components/buttons/ButtonClose.vue'
import type ButtonCloseProps from 'src/models/ButtonClose'

export default {
  title: 'Buttons/ButtonClose',
  component: ButtonClose,
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: {},
  },
} as Meta

const Template: Story<ButtonCloseProps> = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ButtonClose },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<ButtonClose v-bind="args">This is a button</ButtonClose>',
})

export const Default = Template.bind({})
Default.args = {}

export const WithFill = Template.bind({})
WithFill.args = {
  fill: 'var(--color-1)',
}
