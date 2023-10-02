import React, { memo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useTheme } from '@emotion/react'
import {
  Box, Typography, Divider, Button, Stack,
} from '@mui/material'
import DynamicSVG from '../DynamicSVG'
import { defaultProps, propTypes } from './types'

const FailureMessage = memo(({
  trialMessage, termDaysLeft, errorMessage, identityInfoMessage,
  creditInfoMessage, reAttemptInfoMessage, reAttemptAuth,
}) => {
  const { t } = useTranslation()
  const { artifacts, customStyle } = useTheme()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 'inherit' }}>
      <Stack direction="column" alignItems="center" spacing={4} sx={{ width: '100%' }}>
        {
          trialMessage
          && (
            <Typography data-testid="trail-term-message" variant="h4" sx={customStyle?.failureMessage?.trialMessage}>
              <Trans
                i18nKey={t(trialMessage)}
                values={{
                  daysLeft: termDaysLeft,
                }}
              >
                {null}
              </Trans>
            </Typography>
          )
        }
        <Stack data-testid="error-message-heading" direction="row" alignItems="center">
          <DynamicSVG
            path={artifacts?.appIcons?.alert_icon?.url}
            style={{
              ...customStyle?.tabs?.icons,
              ...customStyle?.failureMessage?.icons,
            }}
          />
          <Typography variant="h4">{t(errorMessage)}</Typography>
        </Stack>
        <Box data-testid="error-message-subheading" sx={customStyle?.failureMessage?.ciInfoMessagesWrapper}>
          <Typography variant="body1" sx={customStyle?.failureMessage?.identityInfoMessage}>
            {t(identityInfoMessage)}
          </Typography>
          <Typography variant="subtitle1">
            <Trans
              i18nKey={t(creditInfoMessage)}
              components={{
                br: <br />,
              }}
            >
              {null}
            </Trans>
          </Typography>
        </Box>
        {
          reAttemptInfoMessage
          && (
            <>
              <Divider style={customStyle?.failureMessage?.divider} />
              <Typography data-testid="re-attempt-message" variant="body1" sx={{ textAlign: 'center' }}>
                {t(reAttemptInfoMessage)}
              </Typography>
              {reAttemptAuth
                && (
                  <Button
                    data-testid="re-attempt-auth-button"
                    variant="contained"
                    onClick={reAttemptAuth}
                    size="medium"
                  >
                    {`${t('action_items.reAttempt_authorization')}`}
                  </Button>
                )}
            </>
          )
        }
      </Stack>
    </Box>
  )
})

FailureMessage.propTypes = propTypes
FailureMessage.defaultProps = defaultProps
FailureMessage.displayName = 'FailureMessage'

export default FailureMessage
