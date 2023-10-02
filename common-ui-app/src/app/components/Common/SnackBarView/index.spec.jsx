import SnackBarView from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpMountWithProvider } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- Snackbar Component', () => {
  let component
  let props = {}
  const code = 'SME_POST_ASSET_SUCCESS'

  describe('- Shallow Renders Desktop View', () => {
    test('- Component to be defined with message', () => {
      props = {
        isVisible: true, message: 'Test Message for Snackbar',
      }
      component = setUpMountWithProvider(SnackBarView, props, {})
      component.update()
      const alertWrapper = component.find('[data-testid="snack-bar-test"]').last()
      expect(alertWrapper).toMatchSnapshot()
    })
  })

  describe('- Shallow Renders Mobile View', () => {
    test('- Component to be defined with Success message code', () => {
      props = {
        isVisible: true, message: 'Test Message for Snackbar', isMobile: true,
      }
      component = setUpMountWithProvider(SnackBarView, props, {})
      component.update()
      const alertWrapper = component.find('[data-testid="snack-bar-test"]').last()
      expect(alertWrapper).toMatchSnapshot()
    })

    test(`Component to be defined with code -> ${code}`, () => {
      props = { code, isMobile: true }
      component = setUpMountWithProvider(SnackBarView, props, {})
      component.update()
      const alertWrapper = component.find('[data-testid="snack-bar-test"]').last()
      expect(alertWrapper).toMatchSnapshot()
    })
  })
})
