/* eslint-disable import/no-unresolved */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { styles } from 'tenerity-ui-toolkit'
import { Typography, useTheme } from '@mui/material'

import { defaultProps, propTypes } from './types'
import CreditCenterWidget from './CreditCenterWidget'

const { PageLayout, MediumPageContainer } = styles

const Dashboard = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <PageLayout sx={{ ...theme?.customStyle?.dashboardContainer }}>
      <MediumPageContainer>
        <Typography sx={{ pb: '2.125rem' }} variant="h1">{t('dashboard.heading').replace('#firstName#', 'User')}</Typography>
        <Typography sx={{ pb: '2.687rem' }} variant="body2">
          {t('dashboard.subHeading')}
        </Typography>
        <CreditCenterWidget />
      </MediumPageContainer>
    </PageLayout>
  )
}

Dashboard.propTypes = propTypes
Dashboard.defaultProps = defaultProps

export default Dashboard
