/* eslint-disable import/no-unresolved */
import React, { memo, useEffect } from 'react'
import { useTheme } from '@emotion/react'
import { Typography } from '@mui/material'
import * as CommonComponents from 'COMMON_UI/common/Components'
import { Trans, useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { hooks } from 'tenerity-ui-toolkit'
import sagaActions from '../../../../redux/actions'
import { defaultProps, propTypes } from './types'
import * as resolveAlertReducer from '../../../../redux/reducers/alerts/resolveAlert'

const AlertDetails = memo(({ rowdata, identifier, close }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useDispatch()
  const resolveAlert = useSelector((state) => state?.resolveAlert)
  const { getApiSchema } = hooks?.useConfigStoreHook()
  const apiEndpoint = getApiSchema('resolvedAlert')
  const getAlertsApiEndpoint = getApiSchema('getAlerts')
  const { description, source, assetfound } = rowdata
  const { setUnMountAction } = hooks?.useUnmount()

  useEffect(() => {
    setUnMountAction([
      resolveAlertReducer.setReset.type,
    ])
  }, [setUnMountAction])

  const resetAlertDetails = (status) => () => {
    close()
    dispatch({
      type: sagaActions.GET_ALERTS,
      payload: { data: { apiEndpoint: getAlertsApiEndpoint, status } },
    })
  }

  const handleActiveAlertSubmit = () => {
    dispatch({
      type: sagaActions.RESOLVE_ALERT,
      payload: {
        data: {
          alertId: rowdata?.id,
          status: 'RESOLVED',
          apiEndpoint,
        },
      },
      callback: resetAlertDetails('NEW'),
    })
  }

  const handleResolvedAlertSubmit = () => {
    dispatch({
      type: sagaActions.RESOLVE_ALERT,
      payload: {
        data: {
          alertId: rowdata?.id,
          status: 'NEW',
          apiEndpoint,
        },
      },
      callback: resetAlertDetails('RESOLVED'),
    })
  }
  return (
    <div style={{ ...theme?.customStyle?.alertCenterCard?.containerStyle }}>
      <Typography
        data-testid="alert-detail-heading"
        variant="h4"
      >
        {t('alertCenter.alert_details_heading')}
      </Typography>
      <CommonComponents.AlertCard
        icon={theme?.artifacts?.appIcons?.source_icon?.url}
        severity="error"
        heading={`${t('alertCenter.source_heading_label')}: ${t(`common_items.${source?.toLowerCase()}`)}`}
        subHeading="alertCenter.source_subHeading"
      >
        <Typography
          variant="subtitle2"
          data-testid="alert-details-description"
        >
          {t(description)}
        </Typography>
      </CommonComponents.AlertCard>
      <CommonComponents.AlertCard
        icon={theme?.artifacts?.appIcons?.recommendation_icon?.url}
        severity="info"
        heading="alertCenter.recommendation_label"
      >
        <Trans
          i18nKey={t(`alertCenter.recommendations_${assetfound}`)}
          components={{
            br: <br />,
            ul: <ul style={{ padding: '0 1rem' }} />,
            li: <li />,
          }}
        >
          {null}
        </Trans>
      </CommonComponents.AlertCard>
      {
        identifier === 'activeAlerts' ? (
          <CommonComponents.ResolvedCard
            icon={theme?.artifacts?.appIcons?.resolved_icon?.url}
            description="alertCenter.resolved_moveToResolved_description"
            submitButtonLabel="action_items.resolved_moveToResolved_label"
            onSubmit={handleActiveAlertSubmit}
            disabled={resolveAlert?.isLoading}
            onCancel={close}
          />
        ) : (
          <CommonComponents.ResolvedCard
            icon={theme?.artifacts?.appIcons?.error_outline_icon?.url}
            description="alertCenter.resolved_moveToCurrent_description"
            submitButtonLabel="action_items.resolved_moveToCurrent_label"
            onSubmit={handleResolvedAlertSubmit}
            disabled={resolveAlert?.isLoading}
            onCancel={close}
          />
        )
      }

    </div>
  )
})
AlertDetails.propTypes = propTypes
AlertDetails.defaultProps = defaultProps
AlertDetails.displayName = 'AlertDetails'

export default AlertDetails
