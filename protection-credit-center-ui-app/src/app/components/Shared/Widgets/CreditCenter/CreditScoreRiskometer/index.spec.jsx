import { testingUtilsObj } from '../../../../../../../devtool-config/jest/utils/test'
import CreditRiskoMeter from '.'

describe('- CreditRiskoMeter Component', () => {
  let component
  const defaultState = {}
  const createTestProps = (props) => ({
    ...props,
  })
  let props = createTestProps({
    creditScores: {
      experian: {
        bureau: 'Experian',
        value: 500,
        changeDifference: '+1',
        status: 'active',
        rating: 'No Rating',
        range: {
          min: '300',
          max: '850',
        },
      },
      equifax: {
        bureau: 'Equifax',
        value: 0,
        changeDifference: null,
        rating: 'Fair',
        status: 'inactive',
        range:
          { min: '300', max: '850' },
      },
    },
  })

  describe('- Renders Component', () => {
    beforeEach(() => {
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(CreditRiskoMeter,
        props, defaultState)
    })
    test('- Component to be defined test', () => {
      expect(component).toMatchSnapshot()
    })

    test('- Component to be defined', () => {
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(CreditRiskoMeter,
        props, defaultState)
      expect(component).toBeDefined()
    })

    test('- Component to be defined with negative change diff', () => {
      props = {
        creditScores: {
          experian: {
            bureau: 'Experian',
            value: 500,
            changeDifference: '-1',
            status: 'active',
            rating: 'No Rating',
            range: {
              min: '300',
              max: '850',
            },
          },
        },
      }
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(CreditRiskoMeter,
        props, defaultState)
      expect(component).toBeDefined()
    })
  })
})
