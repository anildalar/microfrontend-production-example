import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'
import OTP from '.'

const { setUpRTRWithProviderAndRouter } = testingUtilsObj

require('../../../../mocks/react-i18next-init').default()

describe('- OTP Component', () => {
  let component

  describe('- Renders Component', () => {
    beforeEach(() => {
      component = setUpRTRWithProviderAndRouter(OTP, {})
    })

    test('- Component to be defined test', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
