/* eslint-disable @typescript-eslint/no-var-requires */
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  // Set the production output dir to build/ instead of dist/
  outputDir: 'build',

  // Inlines the css into the JS file if false
  css: {
    extract: true,
  },

  configureWebpack(config) {
    // Replace the default Vue demo.html page when building in lib mode
    // See https://github.com/vuejs/vue-cli/issues/3291
    config.plugins.some((plugin, index) => {
      return plugin.options?.filename === 'demo.html'
        ? config.plugins.splice(index, 1)
        : false
    })

    config.plugins.push(
      new CopyWebpackPlugin([{ from: 'public/demo.html', to: './index.html' }])
    )

    // Allow for absolute path imports
    config.resolve = {
      ...config.resolve,
      modules: [...config.resolve.modules, path.resolve(__dirname, './src')],
      alias: {
        ...config.resolve.alias,
        src: path.resolve(__dirname, './src'),
      },
    }
  },
}
