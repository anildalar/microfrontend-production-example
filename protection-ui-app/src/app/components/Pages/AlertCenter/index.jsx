/* eslint-disable import/no-unresolved */
import React from 'react'
import { useTheme } from '@mui/material'
import { styles } from 'tenerity-ui-toolkit'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import * as CommonComponents from 'COMMON_UI/common/Components'

import { defaultProps, propTypes } from './types'
import AlertCenterHeading from './AlertCenterHeading'
// import { useErrorBoundary } from '../../../utils/hooks'

const { PageLayout, MediumPageContainer } = styles

const AlertCenter = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  // const [throwError] = useErrorBoundary()
  const alerts = useSelector((state) => state?.alerts)
  const { data } = alerts
  const resolveAlert = useSelector((state) => state?.resolveAlert)
  const { data: resolvedAlertData, error: resolvedAlertError } = resolveAlert

  const tabRouteConfig = {
    defaultSelectedIndex: '/alert-center/active-alerts',
    tabRoutes: [
      {
        id: 'active_alerts',
        icon: theme?.artifacts?.appIcons?.active_alert_icon?.url,
        label: `${(t('alertCenter.activeAlerts_title'))}`,
        commonLabel: `${(data?.totalActiveAlerts > 0 ? `(${data?.totalActiveAlerts})` : '')}`,
        href: '/alert-center/active-alerts',
      },
      {
        id: 'resolved_alerts',
        icon: theme?.artifacts?.appIcons?.resolved_alert_icon?.url,
        label: `${(t('alertCenter.resolvedAlerts_title'))}`,
        commonLabel: `${(data?.totalResolvedAlerts > 0 ? `(${data?.totalResolvedAlerts})` : '')}`,
        href: '/alert-center/resolved-alerts',
      },
    ],
  }

  return (
    <PageLayout sx={{ ...theme?.customStyle?.alertCenter?.layoutStyle }} data-testid="alert-center-info">
      <MediumPageContainer sx={{ ...theme?.customStyle?.alertCenter?.containerStyle }}>
        <AlertCenterHeading />
        {(resolvedAlertError) && (
        <CommonComponents.Alerts
          severity="success"
          display={!!(resolvedAlertData)}
          errorCode={resolvedAlertError}
        />
        )}
        <CommonComponents.TabRoute
          tabRouteConfig={tabRouteConfig}
          variant="scrollable"
        />
      </MediumPageContainer>
    </PageLayout>
  )
}

AlertCenter.propTypes = propTypes
AlertCenter.defaultProps = defaultProps

export default AlertCenter
