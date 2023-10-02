import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Alert, AlertTitle, Typography,
} from '@mui/material'
import DynamicSVG from '../DynamicSVG'
import { defaultProps, propTypes } from './types'

const AlertCard = memo(({
  icon, heading, subHeading, ...restProps
}) => {
  const { t } = useTranslation()
  return (
    <Alert icon={<DynamicSVG path={icon} />} {...restProps} sx={{ width: '100%' }}>
      {heading && (
        <AlertTitle
          data-testid="alertCard-heading"
        >
          {t(heading)}
        </AlertTitle>
      )}
      {subHeading
        && (
          <Typography
            variant="h6"
            data-testid="alertCard-subHeading"
          >
            {t(subHeading)}
          </Typography>
        )}
      {restProps.children}
    </Alert>
  )
})
AlertCard.propTypes = propTypes
AlertCard.defaultProps = defaultProps
AlertCard.displayName = 'AlertCard'

export default AlertCard
