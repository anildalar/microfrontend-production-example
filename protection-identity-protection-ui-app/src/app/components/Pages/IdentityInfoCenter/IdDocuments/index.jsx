/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Grid, useTheme } from '@mui/material'
import { global, hooks, styles } from 'tenerity-ui-toolkit'

import { Loader } from 'COMMON_UI/common/Components'
import AssetSelectDropDown, { dropDownLabel } from '../AssetSelect'
import SSNActionForm from './SSNForm'
import ChildSSNForm from './ChildSSNForm'
import PassportActionForm from './Passport'
import DrivingLicenseActionForm from './DrivingLicense'
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
    const formValues = { ...values }

    delete formValues?.REGEX
    delete formValues?.validation
    delete formValues?.nickname
    delete formValues?.confirmSsn

    dispatch({
      type: sagaActions.POST_ASSET,
      payload: {
        data: {
          assetData: { ...formValues },
          type: assetType,
          category: 'id_documents',
          name: values?.nickname,
          apiEndpoint,
        },
      },
    })
  }

  const options = [
    {
      label: dropDownLabel(t('form_field_items.ssn_asset_type_label'),
        global?.utils?.getInteger(data?.id_documents?.summary?.ssn?.actualCount),
        global?.utils?.getInteger(data?.id_documents?.summary?.ssn?.maxCount)),
      value: 'ssn',
      disabled: (global?.utils?.getInteger(data?.id_documents?.summary?.ssn?.actualCount))
        >= (global?.utils?.getInteger(data?.id_documents?.summary?.ssn?.maxCount)),
    },
    {
      label: dropDownLabel(t('form_field_items.drivers_license_asset_type_label'),
        global?.utils?.getInteger(data?.id_documents?.summary?.drivers_license?.actualCount),
        global?.utils?.getInteger(data?.id_documents?.summary?.drivers_license?.maxCount)),
      value: 'drivers_license',
      disabled: (
        global?.utils?.getInteger(data?.id_documents?.summary?.drivers_license?.actualCount)
          >= global?.utils?.getInteger(data?.id_documents?.summary?.drivers_license?.maxCount)
      ),
    },
    {
      label: dropDownLabel(t('form_field_items.passport_asset_type_label'),
        global?.utils?.getInteger(data?.id_documents?.summary?.passport?.actualCount),
        global?.utils?.getInteger(data?.id_documents?.summary?.passport?.maxCount)),
      value: 'passport',
      disabled: (global?.utils?.getInteger(data?.id_documents?.summary?.passport?.actualCount)
          >= global?.utils?.getInteger(data?.id_documents?.summary?.passport?.maxCount)),
    },
    {
      label: dropDownLabel(t('form_field_items.child_ssn_asset_type_label'),
        global?.utils?.getInteger(data?.id_documents?.summary?.child_ssn?.actualCount),
        global?.utils?.getInteger(data?.id_documents?.summary?.child_ssn?.maxCount)),
      value: 'child_ssn',
      disabled: (global?.utils?.getInteger(data?.id_documents?.summary?.child_ssn?.actualCount))
        >= (global?.utils?.getInteger(data?.id_documents?.summary?.child_ssn?.maxCount)),
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
          assetType === 'passport' && (
            <Grid container item justifyContent="space-between" alignItems="center" data-testid="asset-form-container">
              <PassportActionForm
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
          assetType === 'drivers_license' && (
            <Grid container item justifyContent="space-between" alignItems="center" data-testid="asset-form-container">
              <DrivingLicenseActionForm
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
          assetType === 'ssn' && (
            <Grid container item justifyContent="space-between" alignItems="center" data-testid="asset-form-container">
              <SSNActionForm
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
          assetType === 'child_ssn' && (
            <Grid container item justifyContent="space-between" alignItems="center" data-testid="asset-form-container">
              <ChildSSNForm
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
            <IdentityDataGrid data={data?.id_documents} />
          </>
        )}
    </PaperWrapper>
  )
}

export default PersonalData
