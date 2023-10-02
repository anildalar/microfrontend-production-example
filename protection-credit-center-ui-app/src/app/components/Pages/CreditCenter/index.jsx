/* eslint-disable import/no-unresolved */
import React, { useMemo, useEffect } from 'react'
import { useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { styles, hooks } from 'tenerity-ui-toolkit'
import { TabRoute } from 'COMMON_UI/common/Components'

import CreditCenterHeading from './CreditCenterHeading'
import sagaActions from '../../../redux/actions'
import { defaultProps, propTypes } from './types'

const { MediumPageContainer, PageLayout } = styles

const CreditCenter = React.memo(() => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { getApiSchema } = hooks?.useConfigStoreHook()
  const apiEndpoint = getApiSchema('creditScore')

  useEffect(() => {
    dispatch({
      type: sagaActions.GET_CREDIT_SCORE,
      payload: {
        data: {
          apiEndpoint,
        },
      },
    })
  }, [dispatch, apiEndpoint])

  const tabRouteConfig = useMemo(() => ({
    defaultSelectedIndex: '/credit-center/credit-report',
    tabRoutes: [
      {
        id: 'credit_report',
        icon: theme?.artifacts?.appIcons?.credit_report_tab_icon?.url,
        label: t('creditCenter.creditReport_title'),
        commonLabel: '',
        href: '/credit-center/credit-report',
      },
      {
        id: 'score_simulator',
        icon: theme?.artifacts?.appIcons?.score_simulator_tab_icon?.url,
        label: t('creditCenter.scoreSimulator_title'),
        commonLabel: '',
        href: '/credit-center/score-simulator',
      },
      {
        id: 'score_history',
        icon: theme?.artifacts?.appIcons?.score_history_tab_icon?.url,
        label: t('creditCenter.scoreHistory_title'),
        commonLabel: '',
        href: '/credit-center/score-history',
      },
      {
        id: 'calculators',
        icon: theme?.artifacts?.appIcons?.calculators_tab_icon?.url,
        label: t('creditCenter.calculators_title'),
        commonLabel: '',
        href: '/credit-center/calculators',
      },
    ],
  }), [theme, t])

  return (
    <PageLayout sx={{ ...theme?.customStyle?.identityInfo?.layoutStyle }} data-testid="credit-center">
      <MediumPageContainer sx={{ ...theme?.customStyle?.identityInfo?.containerStyle }}>
        <CreditCenterHeading />
        <TabRoute
          tabRouteConfig={tabRouteConfig}
          variant="scrollable"
        />
      </MediumPageContainer>
    </PageLayout>
  )
})

CreditCenter.propTypes = propTypes
CreditCenter.defaultProps = defaultProps
CreditCenter.displayName = 'CreditCenter'

export default CreditCenter
