import React from 'react'
import GridWrapper from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR } = testingUtilsObj
// require('../../../../mocks/react-i18next-init').default()

describe('- GridWrapper Component', () => {
  const createTestProps = (props = {}) => ({
    children: <div />,
    ...props,
  })
  let component
  let props = {}
  describe('- Renders Component', () => {
    beforeEach(() => {
      props = createTestProps()
      component = setUpRTR(GridWrapper, props)
    })

    test('- Loading true', () => {
      props = createTestProps({ loading: true, sxt: { width: '50%' } })
      component = setUpRTR(GridWrapper, props)
      expect(component).toMatchSnapshot()
    })

    test('- Loading false', () => {
      props = createTestProps({ loading: false, sx: { width: '50%' }, children: 'Test' })
      component = setUpRTR(GridWrapper, props)
      expect(component).toMatchSnapshot()
    })
  })
})
