/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Grid, useTheme } from '@mui/material'
import { global, hooks, styles } from 'tenerity-ui-toolkit'

import { Loader } from 'COMMON_UI/common/Components'
import AssetSelectDropDown, { dropDownLabel } from '../AssetSelect'
import CreditCardActionForm from './CreditCardForm'
import IdentityDataGrid from '../IdentityDataGrid'
import BankAccountActionForm from './BankAccountForm'
import sagaActions from '../../../../redux/actions'

const { PaperWrapper } = styles

const FinanceData = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { setUnMountAction } = hooks?.useUnmount()
  const [assetType, setAssetType] = useState(null)
  const manageAssets = useSelector((state) => state?.manageAssets)
  const { data, isLoading } = manageAssets
  const postAsset = useSelector((state) => state?.postAsset)
  const { data: postAssetData } = postAsset

  const { getConfigStoreData, getApiSchema } = hooks.useConfigStoreHook()
  const apiEndpoint = getApiSchema('postAsset')
  const configStoreData = getConfigStoreData()
  const dispatch = useDispatch()

  const resetForm = useCallback(() => {
    setAssetType(null)
  }, [])

  useEffect(() => {
    setUnMountAction([
      sagaActions.POST_ASSET_RESET,
      sagaActions.DELETE_ASSET_RESET,
    ])
  }, [setUnMountAction])

  useEffect(() => {
    if (postAssetData) {
      resetForm()
    }
  }, [postAssetData, resetForm])

  const handleSubmit = (values) => {
    const creditCard = values?.credit_card?.replace(/[^\d]/g, '')
    const formValues = { ...values, credit_card: creditCard }

    delete formValues?.REGEX
    delete formValues?.validation
    delete formValues?.nickname

    dispatch({
      type: sagaActions.POST_ASSET,
      payload: {
        data: {
          assetData: { ...formValues },
          type: assetType,
          category: 'financial_data',
          name: values?.nickname,
          apiEndpoint,
        },
      },
    })
  }

  const options = [
    {
      label: dropDownLabel(t('form_field_items.credit_card_asset_type_label'),
        global?.utils?.getInteger(data?.financial_data?.summary?.credit_card?.actualCount),
        global?.utils?.getInteger(data?.financial_data?.summary?.credit_card?.maxCount)),
      value: 'credit_card',
      disabled: global?.utils?.getInteger(data?.financial_data?.summary?.credit_card?.actualCount)
          >= global?.utils?.getInteger(data?.financial_data?.summary?.credit_card?.maxCount),
    },
    {
      label: dropDownLabel(t('form_field_items.bank_account_asset_type_label'),
        global?.utils?.getInteger(data?.financial_data?.summary?.bank_account?.actualCount),
        global?.utils?.getInteger(data?.financial_data?.summary?.bank_account?.maxCount)),
      value: 'bank_account',
      disabled: (global?.utils?.getInteger(data?.financial_data?.summary?.bank_account?.actualCount)
          >= global?.utils?.getInteger(data?.financial_data?.summary?.bank_account?.maxCount)),
    },
  ]

  return (
    <PaperWrapper>
      {isLoading ? <Loader />
        : (
          <>
            <Grid container sx={{ ...theme?.customStyle?.assetFormDataContainer }}>
              {
          !assetType && (
            <Grid container item justifyContent="space-between" alignItems="center" gap="1rem" data-testid="asset-select-drop">
              <AssetSelectDropDown
                initialValues={{
                  assetType,
                }}
                options={options}
                setAssetType={setAssetType}
              />
            </Grid>
          )
        }
              {
          assetType === 'credit_card' && (
            <Grid container item justifyContent="space-between" alignItems="center" data-testid="asset-form-container">
              <CreditCardActionForm
                initialValues={{
                  REGEX: configStoreData?.REGEX,
                  validation: configStoreData?.validation,
                }}
                onSubmit={handleSubmit}
                resetForm={resetForm}
              />
            </Grid>
          )
        }
              {
        assetType === 'bank_account' && (
          <Grid container item justifyContent="space-between" alignItems="center" data-testid="asset-form-container">
            <BankAccountActionForm
              initialValues={{
                REGEX: configStoreData?.REGEX,
                validation: configStoreData?.validation,
              }}
              onSubmit={handleSubmit}
              resetForm={resetForm}
            />
          </Grid>
        )
      }
            </Grid>
            <Divider />
            <IdentityDataGrid data={data?.financial_data} />
          </>
        )}
    </PaperWrapper>
  )
}

export default FinanceData
