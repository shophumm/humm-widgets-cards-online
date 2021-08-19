import theme from '../src/providers/Theme.vue'

export const decorators = [
  (story) => ({
    components: { story, theme },
    template: '<theme><story /></theme>',
  }),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
