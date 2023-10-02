/* eslint-disable no-nested-ternary */
import React from 'react'
import {
  Grid, Typography, useTheme, Button,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import { MainPageContent } from '../../../../styles/styles'
import DynamicSVG from '../../../Common/DynamicSVG'

import { defaultProps, propTypes } from './types'

const Maintenance = (props) => {
  const {
    state, onClick, isInDev, isPageNotFound, isInMaintenance,
  } = props
  const theme = useTheme()
  const { i18n, t } = useTranslation()
  return (
    <MainPageContent noPadding data-testid={state?.errorCode ? 'generic-error-page-content' : `application-${isInDev || isInMaintenance ? 'in-process' : isPageNotFound ? 'not-found' : 'generic-error'}-page-content`} style={{ display: 'flex', alignItems: 'center' }}>
      <Grid
        data-testid={state?.errorCode ? 'generic-error-page-container' : `application-${isInDev || isInMaintenance ? 'in-process' : isPageNotFound ? 'not-found' : 'generic-error'}-page-container`}
        container
      >
        <Grid xs={12} sm={6} item alignSelf="center">
          <DynamicSVG
            path={theme?.artifacts?.appIcons?.error_500?.url || 'https://images.contentstack.io/v3/assets/blt8911793295b7dfeb/bltb7fffada3eee6b71/64be7966d85ca694a776f042/500_Error.svg'}
            style={{
              width: theme?.isMobile ? 'calc(100vw)' : '100%',
              height: '80vh',
            }}
          />
        </Grid>
        <Grid
          xs={12}
          sm={6}
          item
          alignSelf="center"
          sx={{ textAlign: { xs: 'center', sm: 'left' }, width: { xs: '100%', sm: 'auto' } }}
        >
          <Typography sx={{ fontSize: '5rem' }} data-testid={state?.errorCode ? 'generic-error-page-heading' : `application-${isInDev || isInMaintenance ? 'in-process' : isPageNotFound ? 'not-found' : 'generic-error'}-page-heading`} paddingBottom="4.75rem">
            {
              isInDev || isInMaintenance
                ? 'Sooo Sorryyy'
                : isPageNotFound ? i18n?.exists('app_messages.404_heading') && t('app_messages.404_heading')
                  : t(`app_messages.${state?.errorCode || 'protection_generic_err'}_heading`.toLowerCase())
            }
          </Typography>
          <Typography data-testid={state?.errorCode ? 'generic-error-page-message' : `application-${isInDev || isInMaintenance ? 'in-process' : isPageNotFound ? 'not-found' : 'generic-error'}-page-message`} variant="h1" paddingBottom="1.25rem">
            {
              isInDev || isInMaintenance
                ? (isInDev ? 'This Page is under Development.' : 'We are going through Maintenance')
                : isPageNotFound ? i18n?.exists('app_messages.404_message') && t('app_messages.404_message')
                  : t(`app_messages.${state?.errorCode || 'protection_generic_err'}_message`.toLowerCase())
            }
          </Typography>
          <Typography data-testid={state?.errorCode ? 'generic-error-page-information' : `application-${isInDev || isInMaintenance ? 'in-process' : isPageNotFound ? 'not-found' : 'generic-error'}-page-information`} variant="h4" paddingBottom="4.75rem">
            {isInDev || isInMaintenance
              ? 'Sorry for the inconvenience, we are working on it!'
              : isPageNotFound ? ''
                : t(`app_messages.${state?.errorCode || 'protection_generic_err'}_information`.toLowerCase())}
          </Typography>
          {
            (!!onClick && !isInDev && !isInMaintenance && !isPageNotFound) && (
              <Button
                onClick={() => onClick()}
                variant="contained"
                startIcon={<DynamicSVG path={theme?.artifacts?.appIcons?.arrow_left_icon?.url} style={{ fill: 'white' }} />}
                size="large"
                data-testid="button"
              >
                <Typography variant="buttonL">
                  {state?.errorCode ? t('app_messages.protection_internal_server_err_action'.toLowerCase()) : ''}
                </Typography>
              </Button>
            )
          }
        </Grid>
      </Grid>
    </MainPageContent>
  )
}

Maintenance.propTypes = propTypes
Maintenance.defaultProps = defaultProps

export default Maintenance
