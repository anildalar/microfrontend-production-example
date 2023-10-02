import React, { memo, useMemo } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { RiskometerSVG, RiskometerDialContainer, RiskScoreText } from '../../../styles/styles'
import { defaultProps, propTypes } from './types'

const getAngle = (riskLevel, configData) => {
  const { lowerRiskLimit, upperRiskLimit, maxAngle } = configData
  return riskLevel <= lowerRiskLimit
    ? 0
    : riskLevel > upperRiskLimit
      ? maxAngle
      : maxAngle * ((riskLevel - lowerRiskLimit) / (upperRiskLimit - lowerRiskLimit))
}

const getRiskLevelData = (riskLevel, configData) => configData
  ?.bands?.find((config) => riskLevel >= config?.rangeLL && riskLevel <= config?.rangeUL)

const Riskometer = memo(({
  svgPath,
  riskLevel,
  riskConfig,
  hideScore,
  hideRangeText,
  renderInfo,
  sx,
  variant,
}) => {
  const { t } = useTranslation()
  const { lowerRiskLimit, upperRiskLimit } = riskConfig
  const currentRisk = useMemo(() => ({
    ...getRiskLevelData(riskLevel, riskConfig),
  }), [riskLevel, riskConfig])

  return (
    <Box>
      <RiskometerDialContainer>
        <RiskometerSVG
          path={svgPath}
          angle={getAngle(riskLevel, riskConfig)}
          sx={{ color: currentRisk?.color, ...sx }}
          data-testid="credit-score-riskometer"
        />
        {
          !hideScore && (
            <RiskScoreText data-testid="credit-score-risk-score">
              {riskLevel || renderInfo}
            </RiskScoreText>
          )
        }
      </RiskometerDialContainer>
      <Grid container justifyContent={!hideRangeText ? 'space-between' : 'center'} pt="6px">
        {
          !hideRangeText && (
            <Typography variant="caption" data-testid="credit-score-lower-risk">
              {lowerRiskLimit}
            </Typography>
          )
        }
        <Typography variant={variant} data-testid="credit-score-risk-label">
          {t(`common_items.${currentRisk?.label}`, ' ')}
        </Typography>
        {
          !hideRangeText && (
            <Typography variant="caption" data-testid="credit-score-upper-risk">
              {upperRiskLimit}
            </Typography>
          )
        }
      </Grid>
    </Box>
  )
})

Riskometer.propTypes = propTypes
Riskometer.defaultProps = defaultProps
Riskometer.displayName = 'Riskometer'
export default Riskometer
