import React from 'react'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'
import Carousel from '.'

const { setUpRTR } = testingUtilsObj

describe('- Carousel Component', () => {
  let component
  const props = {
    accountCards: [() => <></>, () => <></>],
    settings: {},
  }

  describe('- Renders Component', () => {
    test('- Component to be defined test', () => {
      component = setUpRTR(Carousel, { ...props })
      expect(component).toMatchSnapshot()
    })
  })
})
