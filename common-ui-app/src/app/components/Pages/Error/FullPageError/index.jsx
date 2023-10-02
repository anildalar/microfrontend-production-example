import React, { useEffect } from 'react'
import { Button, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { styles } from 'tenerity-ui-toolkit'

import DynamicSVG from '../../../Common/DynamicSVG'
import { defaultProps, propTypes } from './types'
import Link from '../../../Common/Link'

const { PageLayout, SmallPageContainer, SmallSectionContainer } = styles

const FullPageError = ({ errorCode, status, isAction }) => {
  const {
    artifacts, customStyle,
  } = useTheme()
  const { state } = useLocation()
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()
  const code = state?.errorCode || errorCode

  useEffect(() => {
    if (!code && !status) {
      navigate('/')
    }
  }, [code, status, navigate])

  const render = () => (
    <PageLayout>
      <SmallPageContainer maxWidth="none">
        <SmallSectionContainer data-testid="full-page-error-small-section-container">
          <DynamicSVG
            path={((state?.status || status) !== 'error'
              ? artifacts?.appIcons?.success_icon?.url
              : artifacts?.appIcons?.alert_icon?.url)}
            data-testid={`${`${code?.toLowerCase()}-` || ''}${state?.status || status}-icon`}
            style={customStyle?.fullPageError?.common}
          />
          {i18n?.exists(`app_messages.${state?.errorCode || errorCode}_heading`.toLowerCase())
            && (
              <Typography
                variant="h2"
                sx={customStyle?.fullPageError?.common}
                data-testid={`${`${code?.toLowerCase()}-` || ''}${state?.status || status}-heading`}
              >
                {t(`app_messages.${state?.errorCode || errorCode}_heading`.toLowerCase())}
              </Typography>
            )}

          <Typography
            variant="buttonL"
            sx={customStyle?.fullPageError?.common}
            component="p"
            data-testid={`${`${code?.toLowerCase()}-` || ''}${state?.status || status}-message`}
          >
            {t(`app_messages.${state?.errorCode || errorCode}_message`.toLowerCase())}
          </Typography>

          {i18n?.exists(`app_messages.${state?.errorCode || errorCode}_information`.toLowerCase())
            && (
              <Typography
                variant="body1"
                sx={customStyle?.fullPageError?.common}
                data-testid={`${`${code?.toLowerCase()}-` || ''}${state?.status || status}-information`}
              >
                {t(`app_messages.${state?.errorCode || errorCode}_information`.toLowerCase())}
              </Typography>
            )}

          {(state?.isAction || isAction) && (
            <Link to={state?.to}>
              <Button variant="contained" endIcon={<DynamicSVG path={artifacts?.appIcons?.arrow_right_icon?.url} style={{ fill: 'white' }} />} size="large" data-testid={`${`${code?.toLowerCase()}-` || ''}${state?.status || status}-button`}>
                <Typography variant="buttonL">
                  {t(`app_messages.${state?.errorCode || errorCode}_action`.toLowerCase())}
                </Typography>
              </Button>
            </Link>
          )}
        </SmallSectionContainer>
      </SmallPageContainer>
    </PageLayout>

  )

  return render()
}

FullPageError.propTypes = propTypes
FullPageError.defaultProps = defaultProps

export default FullPageError
