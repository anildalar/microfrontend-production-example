import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'
import Registration from '.'

describe('- Registation Component', () => {
  let component
  const defaultState = {}
  let updateState = { ...defaultState }
  const createTestProps = (props) => ({
    ...props,
  })
  const props = createTestProps()

  describe('- Renders Component', () => {
    beforeEach(() => {
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(Registration, props, updateState)
    })
    test('- Component to be defined test', () => {
      expect(component).toMatchSnapshot()
    })

    test('- Having Success registration witn membership id', () => {
      updateState = {
        userEnrollment: {
          data: {
            membershipNumber: 'TEST',
          },
          error: null,
        },
      }
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(Registration, props, updateState)
      component.update()
      expect(component).toBeDefined()
    })

    test('- Having Success registration witn membershipId and KBA', () => {
      updateState = {
        userEnrollment: {
          data: {
            membershipNumber: 'TEST',
            kba: { data: 'test' },
          },
          error: null,
        },
      }
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(Registration, props, updateState)
      component.update()
      expect(component).toBeDefined()
    })
  })
})
