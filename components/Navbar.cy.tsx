import React from 'react'
import Navbar from './Navbar'
import { mountWithClerk } from '@/cypress/e2e/mountClerk'

describe('<Navbar />', () => {
  it('renders', () => {
    mountWithClerk(<Navbar />)
  })
})