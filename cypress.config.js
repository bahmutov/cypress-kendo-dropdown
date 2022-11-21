const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    supportFile: false,
    fixturesFolder: false,
    viewportHeight: 1000,
    viewportWidth: 2000,
  },
})
