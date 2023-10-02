import React from 'react'

import { Typography, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { Trans, useTranslation } from 'react-i18next'
import { defaultProps, propTypes } from './types'

const TrialTermMessage = () => {
  const { customStyle } = useTheme()
  const { t } = useTranslation()
  const solicitationDetails = useSelector((state) => state?.solicitation)
  const {
    currency, newMemberFee, maxFreeDays, billAmount,
  } = solicitationDetails?.data?.trialTerm || {}

  const render = () => (
    solicitationDetails?.data?.trialTerm ? (
      <Typography
        variant="subtitle1"
        sx={{
          ...customStyle?.trialTerm,
        }}
      >
        <Trans
          i18nKey={t('registration.trial_term_message')}
          values={{
            currency,
            newMemberFee,
            maxFreeDays,
            billAmount,
          }}
        >
          {null}
        </Trans>
      </Typography>
    ) : null
  )

  return render()
}

TrialTermMessage.propTypes = propTypes
TrialTermMessage.defaultProps = defaultProps

export default TrialTermMessage
