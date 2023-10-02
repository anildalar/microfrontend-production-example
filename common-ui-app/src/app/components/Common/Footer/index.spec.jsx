import Footer from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTLWithProviderAndRouter } = testingUtilsObj

require('../../../mocks/react-i18next-init').default()

describe('- Footer Component', () => {
  describe('- Renders Component', () => {
    let component

    test('- snapshot test', () => {
      component = setUpRTLWithProviderAndRouter(Footer, {}, {})
      expect(component).toMatchSnapshot()
    })
  })
})
