/* eslint-disable import/no-unresolved */
import React from 'react'
import {
  Box, Grid, Link, Typography, useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { DynamicSVG, Riskometer } from 'COMMON_UI/common/Components'
import { hooks } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'

const RiskoMeterItem = ({
  changeDiff, bureauIcon, isExist, riskLevel, status, showStatus, showChangeDiff,
  variant, sx,
}) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { getConfigStoreData } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()

  return (
    <Box data-testid="credit-score-item-container" sx={{ ...sx }}>
      <Grid container direction="column" justifyContent="space-between" sx={{ minHeight: '100%' }}>
        <Grid item xs={12}>
          <DynamicSVG
            path={bureauIcon}
            data-testid="credit-score-bureau-icon"
          />
          <Riskometer
            variant={variant}
            svgPath={theme?.artifacts?.appIcons?.credit_riskometer?.url}
            riskLevel={riskLevel}
            renderInfo={status?.toLowerCase() === 'inactive' ? (
              <Typography variant="body1">
                {t('creditCenterWidget.score_not_available')}
              </Typography>
            ) : (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <Link component="button" color="action.active" sx={{ width: '150px' }} variant="body2">
                {t('creditCenterWidget.credit_plan_upgrade')}
              </Link>
            )}
            riskConfig={configStoreData?.creditRiskometer}
            sx={{ opacity: isExist && status === 'active' ? 1 : 0.4 }}
          />
          {
            showChangeDiff
            && (
              <Box sx={{
                ...theme?.customStyle?.creditCenter?.creditScorePinningStatus,
              }}
              >
                <Typography data-testid="credit-score-risk-difference" variant="body2" color={Math.sign(changeDiff) === 1 ? 'success.main' : 'error.main'}>{changeDiff}</Typography>
                {changeDiff && (
                  <DynamicSVG
                    data-testid="credit-score-risk-difference-icon"
                    path={Math.sign(changeDiff) === 1
                      ? theme?.artifacts?.appIcons?.score_up_icon?.url
                      : theme?.artifacts?.appIcons?.score_down_icon?.url}
                  />
                )}
              </Box>
            )
          }
        </Grid>
        <Grid item>
          {(isExist && showStatus) && (
            <Box sx={{
              ...theme?.customStyle?.creditCenter?.creditScorePinningStatus,
            }}
            >
              <DynamicSVG
                path={status?.toLowerCase() === 'active' ? theme?.artifacts?.appIcons?.check_circle_icon?.url : theme?.artifacts?.appIcons?.circle_icon_red?.url}
                style={{ width: '0.83rem' }}
                data-testid="credit-score-pinning-status-icon"
              />
              <Typography variant="body2" data-testid="credit-score-pinning-status">
                {status?.toLowerCase() === 'active' ? t('creditCenterWidget.pinning_status_active') : t('creditCenterWidget.pinning_status_inactive')}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
RiskoMeterItem.propTypes = propTypes
RiskoMeterItem.defaultProps = defaultProps

export default RiskoMeterItem
