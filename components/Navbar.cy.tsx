import React from 'react'
import Navbar from './Navbar'
import { mountWithClerk } from '@/cypress/support/mountClerk'

describe('<Navbar />', () => {
  it('renders', () => {
    mountWithClerk(<Navbar />)
  })
})