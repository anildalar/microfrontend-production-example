/* eslint-disable import/no-unresolved */
import React from 'react'
import {
  Button, Grid, Typography,
} from '@mui/material'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { defaultProps, propTypes } from './types'

const CreditScoreSimulator = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      data-testid="credit-score-message"
    >
      <Grid item xs={9}>
        <Typography variant="body2">
          <Trans
            i18nKey={t('creditCenterWidget.credit_score_simulator_text')}
            components={{
              strong: <span style={{ fontWeight: 600 }} />,
            }}
          >
            {null}
          </Trans>
        </Typography>
      </Grid>
      <Grid item>
        <Button
          data-testid="credit-score-simulator"
          aria-label={t('creditCenterWidget.credit_score_simulator_action')}
          variant="contained"
          size="medium"
          onClick={() => navigate('/credit-center/score-simulator')}
        >
          {t('creditCenterWidget.credit_score_simulator_action')}
        </Button>
      </Grid>
    </Grid>
  )
}

CreditScoreSimulator.propTypes = propTypes
CreditScoreSimulator.defaultProps = defaultProps

export default CreditScoreSimulator
