const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    defaultCommandTimeout: 5000,
    baseUrl: "https://jsonplaceholder.cypress.io",
    // chromeWebSecurity: false,
    viewportWidth: 1000,
    viewportHeight: 800,
  },
});
