import React from 'react'
import Searchbar from './Searchbar'
import {mountWithClerk} from '@/cypress/e2e/mountClerk'

describe('<Searchbar />', () => {
  it('renders', () => {
    mountWithClerk(<Searchbar />)
  })
})