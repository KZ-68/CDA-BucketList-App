/* eslint-disable @typescript-eslint/no-namespace */
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'

import { mount } from 'cypress/react'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)