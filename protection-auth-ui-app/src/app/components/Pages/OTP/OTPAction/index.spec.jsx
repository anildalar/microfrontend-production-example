import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'
import OTPAction from '.'

const { setUpRTRWithProviderAndRouter } = testingUtilsObj

require('../../../../../mocks/react-i18next-init').default()

describe('- OTPAction Component', () => {
  let component

  describe('- Renders Component', () => {
    beforeEach(() => {
      component = setUpRTRWithProviderAndRouter(OTPAction, {})
    })

    test('- Component to be defined test', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
