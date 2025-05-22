import { defineConfig } from "cypress";
import { configureVisualRegression } from 'cypress-visual-regression'

export default defineConfig({
  component: {
    specPattern: 'components/*.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    screenshotsFolder: './cypress/snapshots/actual',
    env: {
      visualRegressionType: 'regression'
    },
    setupNodeEvents(on, config) {
      configureVisualRegression(on)
    }
  },
});
