import { fireEvent } from '@testing-library/react'
import FailureMessage from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR, setUpRTL } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- Card Component', () => {
  let component
  const props = {
    trialMessage: 'You have {{daysLeft}} days left on your trial',
    termDaysLeft: '14',
    errorMessage: 'Authentication incomplete',
    identityInfoMessage: "We're sorry, but we were unable to confirm your identity based on the information provided.",
    creditInfoMessage: 'For your security, we cannot display your credit information.<br /> You can re-attempt authorization by clicking below or call us at 1-800-374-8273.',
    reAttemptInfoMessage: 'By clicking Re-attempt, I authorize Trilegiant, who provides <service>,and its service providers, which may include ConsumerInfo.com,Inc. and CSIdentity Corporation, to obtain and monitor my own credit information from credit reporting agencies and send this information to me alone for my own use.',
    reAttemptAuth: jest.fn(),
  }

  describe('- Renders Component', () => {
    test('- Component to be defined test', () => {
      component = setUpRTR(FailureMessage, { ...props })
      expect(component).toMatchSnapshot()
    })
    test('- button should call reAttemptAuth method', () => {
      component = setUpRTL(FailureMessage, { ...props })
      const reAuthBtn = component.getByTestId('re-attempt-auth-button')
      fireEvent.click(reAuthBtn)
      expect(props.reAttemptAuth).toHaveBeenCalled()
    })
  })
})
