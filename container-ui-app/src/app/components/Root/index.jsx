/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */

/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as CommonPages from 'COMMON_UI/common/Pages'
import { global, hooks, i18n } from 'tenerity-ui-toolkit'
import AppThemePalette from '../App/AppThemePalette'

import sagaActions from '../../redux/actions'
import { setLoading } from '../../redux/reducers/appConfig'

// eslint-disable-next-line no-unused-vars
const Root = ({ children }) => {
  const {
    getLoadingStatus, getAppConfigData,
    getConfigStoreData, getThemeConfigData,
    getWebFormData, getAppConfigError,
  } = hooks?.useConfigStoreHook()
  const appConfigData = getAppConfigData()
  const configStoreData = getConfigStoreData()
  const isLoading = getLoadingStatus()
  const themeConfigData = getThemeConfigData()
  const formFieldsData = getWebFormData()
  const error = getAppConfigError()

  const dispatch = useDispatch()

  const getCall = useCallback(() => {
    dispatch({ type: sagaActions.APP_CONFIG_FETCH })
  }, [dispatch])

  useEffect(() => {
    getCall()
  }, [getCall])

  useEffect(() => {
    if (Object.keys(configStoreData).length > 0) {
      if (appConfigData?.clientId) {
        const info = {
          clientId: appConfigData?.clientId,
          supportedLngs: configStoreData?.locales?.supportedLngs,
          lng: configStoreData?.locales?.lng,
          fallbackLang: configStoreData?.locales?.fallbackLng,
          buildHash: appConfigData?.buildHash,
        }
        const i18nSuccessCallBack = () => {
          i18n?.runTimeTranslations(
            {
              action_items: {
                ...formFieldsData?.action_items,
              },
              form_field_items: {
                ...formFieldsData?.form_field_items,
              },
              common_items: {
                ...formFieldsData?.common_items,
              },
            },
            configStoreData?.locales?.lng,
          )
          dispatch(setLoading(false))
          // if (configStoreData?.locales) {
          //   dispatch(setLoading(false))
          //   dispatch({
          //     type: sagaActions.SET_LOCALE,
          //     payload: configStoreData?.locales?.lng,
          //   })
          // }
        }

        i18n?.initateI18n({ ...info }, i18nSuccessCallBack)
        global?.api?.createAxiosInstance({ ...appConfigData, ...configStoreData })
      }
    }
  }, [appConfigData, configStoreData, formFieldsData, dispatch])

  const render = () => (
    <>
      {
        !isLoading && (
          !error ? (
            <>
              <AppThemePalette theme={themeConfigData}>
                {children}
              </AppThemePalette>
            </>
          ) : <CommonPages.Maintenance isInMaintenance />
        )
      }
    </>
  )

  return render()
}

export default Root
