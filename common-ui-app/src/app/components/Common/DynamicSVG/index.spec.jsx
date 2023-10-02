import DynamicSVG from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- DynamicSVG Component', () => {
  describe('- Renders Component', () => {
    let component
    test('- snapshot test with relative path', () => {
      component = setUpRTR(DynamicSVG, { path: 'test/test.svg' })
      expect(component).toMatchSnapshot()
    })
    test('- snapshot test with absolute path', () => {
      component = setUpRTR(DynamicSVG, { path: 'https://test/test.svg' })
      expect(component).toMatchSnapshot()
    })
  })
})
