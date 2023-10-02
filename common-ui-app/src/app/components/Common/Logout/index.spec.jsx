/* eslint-disable jsx-a11y/anchor-is-valid */
import Logout from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTLWithProviderAndRouter } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- Logout Component', () => {
  describe('- Renders Component', () => {
    let component

    test('- snapshot test', () => {
      component = setUpRTLWithProviderAndRouter(Logout, {})
      expect(component).toMatchSnapshot()
    })
  })
})
