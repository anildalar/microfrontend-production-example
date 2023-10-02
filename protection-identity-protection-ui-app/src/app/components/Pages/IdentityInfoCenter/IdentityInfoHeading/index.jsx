import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'
import { defaultProps, propTypes } from './types'

const IdentityInfoHeading = () => {
  const { t } = useTranslation()

  const render = () => (
    <>
      <Typography
        data-testid="identity-info-heading"
        variant="h1"
        sx={{ mb: '2.5rem', mt: '3rem' }}
        color="primary.main"
      >
        {t('identityInfo.heading')}
      </Typography>

      <Typography
        data-testid="identity-info-subHeading"
        variant="body1"
        sx={{ mb: '2.5rem' }}
      >
        {t('identityInfo.subHeading')}
      </Typography>

    </>
  )

  return render()
}

IdentityInfoHeading.propTypes = propTypes
IdentityInfoHeading.defaultProps = defaultProps

export default IdentityInfoHeading
