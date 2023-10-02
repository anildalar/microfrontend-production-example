/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Grid, useTheme } from '@mui/material'
import { global, hooks, styles } from 'tenerity-ui-toolkit'

import { Loader } from 'COMMON_UI/common/Components'
import AssetSelectDropDown, { dropDownLabel } from '../AssetSelect'
import EmailActionForm from './EmailForm'
import PhoneNumberForm from './PhoneNumber'
import AddressActionForm from './AddressForm'
import DOBActionForm from './DOBForm'
import IdentityDataGrid from '../IdentityDataGrid'
import sagaActions from '../../../../redux/actions'

const { PaperWrapper } = styles

const PersonalData = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { setUnMountAction } = hooks?.useUnmount()
  const [assetType, setAssetType] = useState(null)
  const manageAssets = useSelector((state) => state?.manageAssets)
  const { data, isLoading } = manageAssets
  const postAsset = useSelector((state) => state?.postAsset)
  const { data: postAssetData } = postAsset

  const { getConfigStoreData, getApiSchema } = hooks?.useConfigStoreHook()
  const apiEndpoint = getApiSchema('postAsset')
  const configStoreData = getConfigStoreData()
  const phoneData = configStoreData?.validation?.phone || {}
  const supportedCountryCodes = phoneData?.supportedCountryCodes || []
  const defaultCountry = global?.utils?.getCountryCode(phoneData?.defaultCountryCode, supportedCountryCodes, 'country')
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
    const formValues = { ...values }
    delete formValues?.REGEX
    delete formValues?.validation
    delete formValues?.nickname
    if (assetType === 'date_of_birth' && values?.date_of_birth) {
      formValues.date_of_birth = values?.date_of_birth
    }
    if (assetType === 'phone' && values?.phoneNumber && values?.countryCode) {
      formValues.phone = `${values?.countryCode}-${values?.phoneNumber}`
      delete formValues?.phoneNumber
      delete formValues?.countryCode
    }

    dispatch({
      type: sagaActions?.POST_ASSET,
      payload: {
        data: {
          assetData: { ...formValues },
          type: assetType,
          category: 'personal_data',
          name: values?.nickname,
          apiEndpoint,
        },
      },
    })
  }
  const options = [
    {
      label: dropDownLabel(t('form_field_items.email_asset_type_label'),
        global?.utils?.getInteger(data?.personal_data?.summary?.email?.actualCount),
        global?.utils?.getInteger(data?.personal_data?.summary?.email?.maxCount)),
      value: 'email',
      disabled: global?.utils?.getInteger(data?.personal_data?.summary?.email?.actualCount)
        >= global?.utils?.getInteger(data?.personal_data?.summary?.email?.maxCount),
    },
    {
      label: dropDownLabel(t('form_field_items.address_asset_type_label'),
        global?.utils?.getInteger(data?.personal_data?.summary?.mailing_address.actualCount),
        global?.utils?.getInteger(data?.personal_data?.summary?.mailing_address.maxCount)),
      value: 'mailing_address',
      disabled: global?.utils?.getInteger(
        data?.personal_data?.summary?.mailing_address?.actualCount,
      )
        >= global?.utils?.getInteger(data?.personal_data?.summary?.mailing_address?.maxCount),
    },
    {
      label: dropDownLabel(t('form_field_items.date_of_birth_asset_type_label'),
        global?.utils?.getInteger(data?.personal_data?.summary?.date_of_birth?.actualCount),
        global?.utils?.getInteger(data?.personal_data?.summary?.date_of_birth?.maxCount)),
      value: 'date_of_birth',
      disabled: global?.utils?.getInteger(data?.personal_data?.summary?.date_of_birth?.actualCount)
        >= global?.utils?.getInteger(data?.personal_data?.summary?.date_of_birth?.maxCount),
    },
    {
      label: dropDownLabel(t('form_field_items.phone_asset_type_label'),
        global?.utils?.getInteger(data?.personal_data?.summary?.phone?.actualCount),
        global?.utils?.getInteger(data?.personal_data?.summary?.phone?.maxCount)),
      value: 'phone',
      disabled: global?.utils?.getInteger(data?.personal_data?.summary?.phone?.actualCount)
        >= global?.utils?.getInteger(data?.personal_data?.summary?.phone?.maxCount),
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
          assetType === 'email' && (
            <Grid container item justifyContent="space-between" alignItems="center" data-testid="asset-form-container">
              <EmailActionForm
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
          assetType === 'mailing_address' && (
            <Grid container item justifyContent="space-between" alignItems="center" data-testid="asset-form-container">
              <AddressActionForm
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
          assetType === 'date_of_birth' && (
            <Grid container item justifyContent="space-between" alignItems="center" data-testid="asset-form-container">
              <DOBActionForm
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
          assetType === 'phone' && (
            <Grid container item justifyContent="space-between" alignItems="center" data-testid="asset-form-container">
              <PhoneNumberForm
                initialValues={{
                  REGEX: configStoreData?.REGEX,
                  countryCode: defaultCountry?.code,
                  validation: configStoreData?.validation,
                }}
                phoneData={phoneData}
                onSubmit={handleSubmit}
                resetForm={resetForm}
              />
            </Grid>
          )
        }
            </Grid>
            <Divider />
            <IdentityDataGrid data={data?.personal_data} />
          </>
        )}
    </PaperWrapper>
  )
}

export default PersonalData
