import { defineConfig } from "cypress";

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
  },
});
