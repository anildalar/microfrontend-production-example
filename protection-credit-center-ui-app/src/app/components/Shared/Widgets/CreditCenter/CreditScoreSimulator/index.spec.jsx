import { fireEvent } from '@testing-library/react'
import { testingUtilsObj } from '../../../../../../../devtool-config/jest/utils/test'
import CreditScoreUpdateInfo from '.'

describe('- CreditScoreUpdateInfo Component', () => {
  let component
  const defaultState = {}
  let updateState = { ...defaultState }
  const createTestProps = (props) => ({
    ...props,
  })
  const props = createTestProps()

  describe('- Renders Component', () => {
    beforeEach(() => {
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(CreditScoreUpdateInfo,
        props, updateState)
    })
    test('- Component to be defined test', () => {
      expect(component).toMatchSnapshot()
    })

    test('- Component to be defined', () => {
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(CreditScoreUpdateInfo,
        props, updateState)
      expect(component).toBeDefined()
    })
    test('- UpdateInfo with data available', () => {
      updateState = {
        creditScore: {
          data: {
            lastUpdateDate: '20/02/2023',
            nextUpdateDate: '21/02/2023',
          },
        },
      }
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(CreditScoreUpdateInfo,
        props, updateState)
      expect(component).toBeDefined()
    })

    test('- onCLick Score History Report', () => {
      component = testingUtilsObj?.setUpRTLWithProviderAndRouter(CreditScoreUpdateInfo,
        props, defaultState)
      const creditScoreSimulator = component.getByTestId('credit-score-simulator')
      fireEvent.click(creditScoreSimulator)
      expect(component).toBeDefined()
    })
  })
})
