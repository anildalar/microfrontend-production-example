import React from 'react'
import Checkbox from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('Checkbox Component', () => {
  describe('Renders Component', () => {
    const createTestProps = () => ({
    })

    let props = createTestProps()
    let component

    test('snapshot test', () => {
      component = setUpRTR(Checkbox, props)
      expect(component).toMatchSnapshot()
    })

    test('snapshot test with renderLabel prop', () => {
      props = {
        ...createTestProps(),
        renderLabel: () => (<span>Test</span>),
      }
      component = setUpRTR(Checkbox, props)
      expect(component).toMatchSnapshot()
    })
  })
})
