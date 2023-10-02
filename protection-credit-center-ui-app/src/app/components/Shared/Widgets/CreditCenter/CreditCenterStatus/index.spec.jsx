import { testingUtilsObj } from '../../../../../../../devtool-config/jest/utils/test'
import CreditCenterStatus from '.'

describe('- CreditCenterStatus Component', () => {
  let component
  const defaultState = {}
  let updateState = { ...defaultState }
  const createTestProps = (props) => ({
    ...props,
  })
  const props = createTestProps()

  describe('- Renders Component', () => {
    beforeEach(() => {
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(CreditCenterStatus,
        props, updateState)
    })
    test('- Component to be defined test', () => {
      expect(component).toMatchSnapshot()
    })

    test('- Component to be defined', () => {
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(CreditCenterStatus,
        props, updateState)
      expect(component).toBeDefined()
    })
    test('- Loading status true', () => {
      updateState = {
        creditScore: {
          isLoading: true,
        },
      }
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(CreditCenterStatus,
        props, updateState)
      expect(component).toBeDefined()
    })
    test('- ECS status inactive', () => {
      updateState = {
        creditScore: {
          data: {
            ecsStatus: 'inactive',
          },
        },
        remainingTrial: {
          data: {
            remainingDays: '14',
          },
        },
      }
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(CreditCenterStatus,
        props, updateState)
      expect(component).toBeDefined()
    })
    test('- ECS status active and KBA status inactive kabAttemep > 0', () => {
      updateState = {
        creditScore: {
          data: {
            ecsStatus: 'active',
            kbaStatus: 'inactive',
            kbaAttemptCount: 1,
          },
        },
        remainingTrial: {
          data: {
            remainingDays: '14',
          },
        },
      }
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(CreditCenterStatus,
        props, updateState)
      expect(component).toBeDefined()
    })
    test('- ECS status active and KBA status inactive kabAttemep 0', () => {
      updateState = {
        creditScore: {
          data: {
            ecsStatus: 'active',
            kbaStatus: 'inactive',
            kbaAttemptCount: 0,
          },
        },
        remainingTrial: {
          data: {
            remainingDays: '14',
          },
        },
      }
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(CreditCenterStatus,
        props, updateState)
      expect(component).toBeDefined()
    })
  })
})
