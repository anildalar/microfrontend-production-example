/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- Link Component', () => {
  describe('- Renders Component', () => {
    let component

    test('- snapshot test', () => {
      component = setUpRTR(Link, {})
      expect(component).toMatchSnapshot()
    })
  })
})
