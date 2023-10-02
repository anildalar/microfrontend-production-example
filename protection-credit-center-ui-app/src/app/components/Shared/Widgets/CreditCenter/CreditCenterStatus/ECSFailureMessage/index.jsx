/* eslint-disable import/no-unresolved */
import React from 'react'
import { FailureMessage } from 'COMMON_UI/common/Components'

import { defaultProps, propTypes } from './types'

const ECSFailureMessage = ({ termDaysLeft }) => (
  <FailureMessage
    trialMessage="creditCenterWidget.trial_term_message"
    termDaysLeft={termDaysLeft}
    errorMessage="creditCenterWidget.ecs_failure_message"
    identityInfoMessage="creditCenterWidget.identity_info_message"
    creditInfoMessage="creditCenterWidget.credit_info_message"
  />
)

ECSFailureMessage.propTypes = propTypes
ECSFailureMessage.defaultProps = defaultProps

export default ECSFailureMessage
