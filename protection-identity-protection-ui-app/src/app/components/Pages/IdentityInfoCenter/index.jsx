/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useMemo } from 'react'
import { useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { hooks, styles } from 'tenerity-ui-toolkit'
import * as CommonComponents from 'COMMON_UI/common/Components'
import IdentityInfoHeading from './IdentityInfoHeading'
import sagaActions from '../../../redux/actions'
import { defaultProps, propTypes } from './types'

const { MediumPageContainer, PageLayout } = styles

const IdentityInfoCenter = React.memo(() => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { t } = useTranslation()
  const [throwError] = hooks?.useErrorBoundary()
  const { getApiSchema } = hooks?.useConfigStoreHook()
  const apiEndpoint = getApiSchema('getAssets')
  const { postAsset, deleteAsset, manageAssets } = useSelector((state) => state)
  const { data, error } = manageAssets
  const { data: postAssetData, error: postAssetError } = postAsset
  const {
    data: deleteAssetData,
    error: deleteAssetError,
    // isLoading: deleteAssetLoading,
  } = deleteAsset

  const tabRouteConfig = useMemo(() => ({
    defaultSelectedIndex: '/identity-center/personal',
    tabRoutes: [
      {
        id: 'personal_data',
        icon: theme?.artifacts?.appIcons?.personal_tab_icon?.url,
        label: `${(t('identityInfo.personalData_title'))}`,
        commonLabel: `${(data?.personal_data?.assets?.length > 0 ? `(${data?.personal_data?.assets?.length})` : '')}`,
        href: '/identity-center/personal',
      },
      {
        id: 'financial_data',
        icon: theme?.artifacts?.appIcons?.financial_tab_icon?.url,
        label: `${(t('identityInfo.financialData_title'))}`,
        commonLabel: `${(data?.financial_data?.assets?.length > 0 ? `(${data?.financial_data?.assets?.length})` : '')}`,
        href: '/identity-center/financial',
      },
      {
        id: 'id_documents',
        icon: theme?.artifacts?.appIcons?.documents_tab_icon?.url,
        label: `${(t('identityInfo.idDocuments_title'))}`,
        commonLabel: `${(data?.id_documents?.assets?.length > 0 ? `(${data?.id_documents?.assets?.length})` : '')}`,
        href: '/identity-center/documents',
      },
    ],
  }), [data, theme, t])

  const getCall = useCallback(() => {
    dispatch({
      type: sagaActions.GET_ASSETS,
      payload: {
        data: {
          apiEndpoint,
        },
      },
    })
  }, [dispatch, apiEndpoint])

  useEffect(() => {
    if (postAssetData || deleteAssetData) {
      getCall()
    }
  }, [getCall, postAssetData, deleteAssetData])

  useEffect(() => {
    getCall()
  }, [getCall])

  useEffect(() => {
    if (error || postAssetError || deleteAssetError) {
      throwError(error || postAssetError || deleteAssetError)
    }
  }, [throwError, postAssetError, error, deleteAssetError])

  return (
    <PageLayout sx={{ ...theme?.customStyle?.identityInfo?.layoutStyle }} data-testid="identity-info">
      <MediumPageContainer sx={{ ...theme?.customStyle?.identityInfo?.containerStyle }}>
        <IdentityInfoHeading />
        {(postAssetData || deleteAssetData || deleteAssetError || postAssetError) && (
        <CommonComponents.Alerts
          severity="success"
          display={!!(postAssetData || deleteAssetData)}
          message={t(`app_messages.PROTECTION_${(postAssetData && 'POST') || (deleteAssetData && 'DELETE')}_ASSET_${postAssetData?.[0]?.type || deleteAssetData?.type}_SUCCESS`.toLowerCase())}
          errorCode={deleteAssetError || postAssetError}
        />
        )}
        <CommonComponents.TabRoute
          tabRouteConfig={tabRouteConfig}
          variant="scrollable"
        />
      </MediumPageContainer>
    </PageLayout>
  )
})

IdentityInfoCenter.propTypes = propTypes
IdentityInfoCenter.defaultProps = defaultProps
IdentityInfoCenter.displayName = 'IdentityInfoCenter'

export default IdentityInfoCenter
