import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    pageLoadTimeout: 120000, // 2 minutes
  defaultCommandTimeout: 30000,
    specPattern : "cypress/src/specs/*.spec.cy.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
