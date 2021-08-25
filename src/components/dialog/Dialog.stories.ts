import { Story, Meta } from '@storybook/vue3'
import Dialog from 'src/components/dialog/Dialog.vue'
import type DialogProps from 'src/models/Dialog'

export default {
  title: 'Dialog/Dialog',
  component: Dialog,
  argTypes: {
    onClick: {},
  },
} as Meta

const Template: Story<DialogProps> = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Dialog },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<Dialog v-bind="args">This is a Dialog</Dialog>',
})

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
}
