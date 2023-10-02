import FieldWrapper from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- FieldWrapper Component', () => {
  describe('- Renders Component', () => {
    let component
    test('- snapshot test with relative path', () => {
      component = setUpRTR(FieldWrapper, {})
      expect(component).toMatchSnapshot()
    })
    test('- snapshot test with absolute path', () => {
      component = setUpRTR(FieldWrapper, { loading: true, renderLabel: jest.fn() })
      expect(component).toMatchSnapshot()
    })
  })
})
