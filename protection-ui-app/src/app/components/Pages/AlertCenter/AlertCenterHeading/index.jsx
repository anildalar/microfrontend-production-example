import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, useTheme } from '@mui/material'

import { defaultProps, propTypes } from './types'

const AlertCenterHeading = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  const render = () => (

    <>
      <Typography
        data-testid="alert-center-heading"
        variant="h1"
        sx={{ ...theme?.customStyle?.alertCenter?.headingStyle }}
        color="primary"
      >
        {t('alertCenter.heading')}

      </Typography>

      <Typography
        data-testid="alert-center-subHeading"
        variant="h2"
        sx={{ ...theme?.customStyle?.alertCenter?.subHeadingStyle }}
      >
        {t('alertCenter.subHeading')}

      </Typography>

      <Typography
        data-testid="alert-center-subHeading2"
        variant="body1"
        sx={{ ...theme?.customStyle?.alertCenter?.subHeadingStyle2 }}
      >
        {t('alertCenter.subHeading2')}

      </Typography>

    </>

  )

  return render()
}

AlertCenterHeading.propTypes = propTypes
AlertCenterHeading.defaultProps = defaultProps

export default AlertCenterHeading
