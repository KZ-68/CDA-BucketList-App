import React from 'react'
import Searchbar from './Searchbar'
import {mountWithClerk} from '@/cypress/support/mountClerk'

describe('<Searchbar />', () => {
  it('renders', () => {
    mountWithClerk(<Searchbar />)
  })
})