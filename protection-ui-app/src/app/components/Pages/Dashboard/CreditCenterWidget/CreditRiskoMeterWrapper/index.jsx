/* eslint-disable import/no-unresolved */
import React from 'react'
import {
  Box, Divider, Typography, useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  CreditScoreUpdateInfo, CreditScoreRiskometer,
  CreditScoreSimulator,
} from 'PROTECTION_CREDIT_CENTER_UI/protection-credit-center-ui/widgets/credit-center'

import { defaultProps, propTypes } from './types'
import { CreditScoreRiskometerWrapper } from '../../../../../styles/styles'

const CreditScoreRiskometerContainer = ({ creditScores }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <>
      <Typography variant="h4" sx={{ pb: '0.625rem' }} data-testid="credit-center-heading">{t('creditCenterWidget.heading')}</Typography>
      <CreditScoreRiskometerWrapper container spacing={2}>
        {/* Left Item */}
        <CreditScoreUpdateInfo />
        {/* Right Item */}
        <CreditScoreRiskometer
          creditScores={creditScores}
          showStatus
          showChangeDiff
          variant="subtitle1"
          riskometerItemSx={theme?.customStyle?.creditCenter?.credRiskometerItem}
        />
      </CreditScoreRiskometerWrapper>
      <Divider />
      <Box sx={{ py: '2.5rem' }}>
        <CreditScoreSimulator />
      </Box>
      <Divider />
      {/* Add Graph Section */}
    </>
  )
}

CreditScoreRiskometerContainer.propTypes = propTypes
CreditScoreRiskometerContainer.defaultProps = defaultProps

export default CreditScoreRiskometerContainer
