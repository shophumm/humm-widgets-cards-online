const path = require('path')
const custom = require('../node_modules/@vue/cli-service/webpack.config.js')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y"
  ],
  webpackFinal: (config) => {
    config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules']

    return { 
      ...config, 
      module: { ...config.module, rules: custom.module.rules } 
    }
  },
}