import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'
import { defaultProps, propTypes } from './types'

const CreditCenterHeading = () => {
  const { t } = useTranslation()

  const render = () => (
    <>
      <Typography
        data-testid="credit-center-heading"
        variant="h1"
        sx={{ mb: '2.5rem', mt: '3rem' }}
        color="primary.main"
      >
        {t('creditCenter.heading')}
      </Typography>

      <Typography
        data-testid="credit-center-subHeading"
        variant="body1"
        sx={{ mb: '2.5rem' }}
      >
        {t('creditCenter.subHeading')}
      </Typography>

    </>
  )

  return render()
}

CreditCenterHeading.propTypes = propTypes
CreditCenterHeading.defaultProps = defaultProps

export default CreditCenterHeading
