/* eslint-disable import/no-unresolved */
import React from 'react'
import { FailureMessage } from 'COMMON_UI/common/Components'

import { defaultProps, propTypes } from './types'

const KBAFailureMessage = ({ kbaAttempCount, termDaysLeft }) => {
  const failureMessageProps = () => {
    const kbaFailureProps = {
      trialMessage: 'creditCenterWidget.trial_term_message',
      termDaysLeft,
      errorMessage: 'creditCenterWidget.kba_failure_message',
      identityInfoMessage: 'creditCenterWidget.identity_info_message',
      creditInfoMessage: 'creditCenterWidget.credit_info_message_kba',
    }
    if (kbaAttempCount > 0) {
      return {
        ...kbaFailureProps,
        reAttemptInfoMessage: 'creditCenterWidget.reAttempt_info_message',
        reAttemptAuth: () => ({}), // navigate to kba
      }
    }
    return kbaFailureProps
  }

  return <FailureMessage {...failureMessageProps()} />
}

KBAFailureMessage.propTypes = propTypes
KBAFailureMessage.defaultProps = defaultProps

export default KBAFailureMessage
