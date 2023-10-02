import React from 'react'
import { Trans } from 'react-i18next'

export const alertsOrScreen = {
  PROTECTION_ERR_GENERIC: {
    type: 'screen',
    route: '/error',
    params: { status: 'error', isAction: true },
  },
  PROTECTION_ERR_GENERIC_ALERT: {
    type: 'alerts',
  },
  PROTECTION_ERR_DELETE_ASSET_GENERIC_ALERT: {
    type: 'alerts',
  },
  PROTECTION_LOGIN_ERR_EOAU411: {
    type: 'alerts',
  },
  PROTECTION_ERR_AUTH_FAILURE: {
    type: 'screen',
    route: '/error',
    params: { status: 'error', isAction: true },
  },
  PROTECTION_ENROLL_ERR_EOAOF4032: {
    type: 'alerts',
  },
  PROTECTION_ENROLL_ERR_EOEC512: {
    type: 'screen',
    route: '/error',
    params: { status: 'error', isAction: true, to: '/dashboard' },
  },
  PROTECTION_ENROLL_ERR_EOEX401: {
    type: 'screen',
    route: '/error',
    params: { status: 'error', isAction: true, to: '/dashboard' },
  },
  PROTECTION_RESET_PWD_ERR_EOAU516: {
    type: 'alerts',
  },
  PROTECTION_RESET_PWD_ERR_EOAU515: {
    type: 'screen',
    route: '/error',
    params: { status: 'error', isAction: true, to: '/secure/forgot-password' },
  },
  PROTECTION_INTERNAL_SERVER_ERR: {
    type: 'screen',
    route: '/error/generic',
    params: { status: 'error' },
  },
  PROTECTION_FORGOT_PWD_VALIDATE_SUCCESS: {
    type: 'alerts',
  },
  PROTECTION_FORGOT_PWD_ERR_EOAU518: {
    type: 'alerts',
  },
  PROTECTION_OTP_ERR_INVALID: {
    type: 'alerts',
  },
  PROTECTION_OTP_VALIDATE_SUCCESS: {
    type: 'alerts',
  },
  PROTECTION_OTP_ERR_TIMED_OUT: {
    type: 'alerts',
  },
  PROTECTION_OTP_ERR_EOAU519: {
    type: 'alerts',
  },
  PROTECTION_OTP_ERR_EOAU513: {
    type: 'alerts',
  },
}

export const errors = () => ({
  PROTECTION_ERR_GENERIC_ALERT: {
    display: true,
    severity: 'error',
    content: <Trans i18nKey={'app_messages.PROTECTION_ERR_GENERIC_ALERT_alert'.toLowerCase()}>{null}</Trans>,
  },
  PROTECTION_ERR_DELETE_ASSET_GENERIC_ALERT: {
    display: true,
    severity: 'error',
    content: <Trans i18nKey={'app_messages.PROTECTION_ERR_DELETE_ASSET_GENERIC_ALERT'.toLowerCase()}>{null}</Trans>,
  },
  PROTECTION_FORGOT_PWD_ERR_EOAU518: {
    display: true,
    severity: 'error',
    content: <Trans i18nKey={'app_messages.PROTECTION_FORGOT_PWD_ERR_EOAU518_alert'.toLowerCase()}>{null}</Trans>,
  },
  PROTECTION_FORGOT_PWD_VALIDATE_SUCCESS: {
    display: true,
    severity: 'success',
    content: <Trans i18nKey={'app_messages.PROTECTION_FORGOT_PWD_VALIDATE_SUCCESS_alert'.toLowerCase()}>{null}</Trans>,
  },
  PROTECTION_LOGIN_ERR_EOAU411: {
    display: true,
    severity: 'error',
    content: <Trans i18nKey={'app_messages.PROTECTION_LOGIN_ERR_EOAU411_alert'.toLowerCase()}>{null}</Trans>,
  },
  PROTECTION_ENROLL_ERR_EOAOF4032: {
    display: true,
    severity: 'error',
    content: <Trans i18nKey={'app_messages.PROTECTION_ENROLL_ERR_EOAOF4032_alert'.toLowerCase()}>{null}</Trans>,
  },
  PROTECTION_RESET_PWD_ERR_EOAU516: {
    display: true,
    severity: 'error',
    content: <Trans i18nKey={'app_messages.PROTECTION_RESET_PWD_ERR_EOAU516_alert'.toLowerCase()}>{null}</Trans>,
  },
  PROTECTION_OTP_ERR_INVALID: {
    display: true,
    severity: 'error',
    content: <Trans i18nKey={'app_messages.PROTECTION_OTP_ERR_INVALID_alert'.toLowerCase()}>{null}</Trans>,
  },
  PROTECTION_OTP_ERR_TIMED_OUT: {
    display: true,
    severity: 'error',
    content: <Trans i18nKey={'app_messages.PROTECTION_OTP_ERR_TIMED_OUT_alert'.toLowerCase()}>{null}</Trans>,
  },
  PROTECTION_OTP_VALIDATE_SUCCESS: {
    display: true,
    severity: 'success',
    content: <Trans i18nKey={'app_messages.PROTECTION_OTP_VALIDATE_SUCCESS_alert'.toLowerCase()}>{null}</Trans>,
  },
  PROTECTION_OTP_ERR_EOAU519: {
    display: true,
    severity: 'error',
    content: <Trans i18nKey={'app_messages.PROTECTION_OTP_ERR_EOAU519_alert'.toLowerCase()}>{null}</Trans>,
  },
  PROTECTION_OTP_ERR_EOAU513: {
    display: true,
    severity: 'error',
    content: <Trans i18nKey={'app_messages.PROTECTION_OTP_ERR_EOAU513_alert'.toLowerCase()}>{null}</Trans>,
  }
})
