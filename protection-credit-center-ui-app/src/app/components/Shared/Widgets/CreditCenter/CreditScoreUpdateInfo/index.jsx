/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import {
  Box,
  Button, Grid, Typography, useTheme,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { Trans, useTranslation } from 'react-i18next'
import { DynamicSVG, Link } from 'COMMON_UI/common/Components'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import { defaultProps, propTypes } from './types'
import { ScoreBenefitStatusWrapper } from '../../../../../styles/styles'

const Item = ({ iconPath, content, sx }) => {
  const theme = useTheme()
  return (
    <Box sx={{
      ...theme?.customStyle?.creditCenter?.creditUpdateInfo, ...sx,
    }}
    >
      <DynamicSVG
        path={iconPath}
      />
      <Typography variant="body2">
        {content}
      </Typography>
    </Box>
  )
}
Item.propTypes = propTypes
Item.defaultProps = defaultProps

const CreditScoreUpdateInfo = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const theme = useTheme()
  const creditScore = useSelector((state) => state?.creditScore)
  const { data } = creditScore
  return (
    <Grid lg={4} xs={12} item>
      <Box sx={{ ...theme?.customStyle?.creditCenter?.creditUpdateInfo }} />
      <Item
        data-testid="credit-report-updated-date"
        content={(
          <Trans
            i18nKey={`${t('creditCenterWidget.updated_on')}`?.replace('#date#', data?.lastUpdateDate ? dayjs(data?.lastUpdateDate).format('MM/DD/YY') : '')}
            components={{
              strong: <span style={{ fontWeight: 600 }} />,
            }}
          >
            {null}
          </Trans>
        )}
        iconPath={theme?.artifacts?.appIcons?.calendar?.url}
      />
      <Item
        data-testid="credit-report-nextupdate-date"
        iconPath={theme?.artifacts?.appIcons?.update_available?.url}
        content={(
          <Trans
            i18nKey={`${t('creditCenterWidget.next_updated_on')}`?.replace('#date#', data?.nextUpdateDate ? dayjs(data?.nextUpdateDate).format('MM/DD/YY') : '')}
            components={{
              strong: <span style={{ fontWeight: 600 }} />,
            }}
          >
            {null}
          </Trans>
        )}
      />
      <Item
        content={(
          <Link data-testid="score-history" variant="body2" to="/credit-center/score-history" name="scoreHistory" underline="none" noRenderBox>
            {t('creditCenterWidget.view_score_history')}
          </Link>
        )}
        iconPath={theme?.artifacts?.appIcons?.score_history_tab_icon?.url}
        sx={{ color: theme?.palette?.action?.active }}
      />
      <Button
        data-testid="credit-score-report"
        aria-label={t('view_report_n_score')}
        variant="contained"
        size="medium"
        sx={{ mb: '2rem' }}
        onClick={() => navigate('/credit-center/credit-report')}
      >
        {t('creditCenterWidget.view_report_n_score')}
      </Button>
      <ScoreBenefitStatusWrapper>
        <Item
          content={t('creditCenterWidget.credit_monitoring_status')}
          iconPath={theme?.artifacts?.appIcons?.credit_monitoring_icon?.url}
        />
      </ScoreBenefitStatusWrapper>

    </Grid>
  )
}

CreditScoreUpdateInfo.propTypes = propTypes
CreditScoreUpdateInfo.defaultProps = defaultProps

export default CreditScoreUpdateInfo
