import TrialTermMessage from '.'
import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'

const { setUpRTRWithProvider } = testingUtilsObj
// require('../../../../mocks/react-i18next-init').default()

describe('TrialTermMessage', () => {
  let component
  const props = {}
  const defaultState = {
    solicitation: {
      data: {
        trialTerm: {
          currency: '$',
          newMemberFee: '1',
          maxFreeDays: '14',
          billAmount: '24.99',
        },
      },
    },
  }
  const updateState = { ...defaultState }

  test('- Component to be defined test', () => {
    component = setUpRTRWithProvider(TrialTermMessage, props, updateState)
    expect(component).toMatchSnapshot()
  })
})
