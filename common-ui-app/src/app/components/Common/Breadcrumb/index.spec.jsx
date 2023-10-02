import Breadcrumb from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTRWithTheme } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- Breadcrumb Component', () => {
  let component

  describe('- Renders Component', () => {
    test('- Component to be defined test', () => {
      component = setUpRTRWithTheme(Breadcrumb, {})
      expect(component).toMatchSnapshot()
    })
  })

  describe('- Mounting', () => {
    test('- snapshot test Desktop View', () => {
      component = setUpRTRWithTheme(Breadcrumb, {})
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test Mobile View', () => {
      component = setUpRTRWithTheme(Breadcrumb, { isMobile: true })
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test Tablet View', () => {
      component = setUpRTRWithTheme(Breadcrumb, { isTablet: true })
      expect(component).toMatchSnapshot()
    })
  })
})
