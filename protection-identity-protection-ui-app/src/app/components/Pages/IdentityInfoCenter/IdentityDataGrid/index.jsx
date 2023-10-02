/* eslint-disable import/no-unresolved */
import React, { useState, useMemo } from 'react'
import {
  Box, Chip, Typography, useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { global, hooks } from 'tenerity-ui-toolkit'
import {
  dataGridColumn, DataGridView, DynamicSVG, NoDataAvailable,
} from 'COMMON_UI/common/Components'
import { useDispatch, useSelector } from 'react-redux'
import { GridActionsCellItem } from '@mui/x-data-grid'
import { defaultProps, propTypes } from './types'
import sagaActions from '../../../../redux/actions'

const IdentityDataGrid = React.memo(({ data }) => {
  const MODES = { DELETE: 'delete', VIEW: 'view' }
  const theme = useTheme()
  const { t } = useTranslation()
  const { getConfigStoreData, getApiSchema } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const apiEndpoint = getApiSchema('deleteAsset')
  const dispatch = useDispatch()
  const [rowModes, setRowModes] = useState({})
  const { isLoading } = useSelector((state) => state?.deleteAsset)

  const rows = useMemo(() => data?.assets?.map((asset) => {
    const phoneData = configStoreData?.validation?.phone || {}
    const supportedCountryCodes = phoneData?.supportedCountryCodes || []
    return ({
      id: asset?.id,
      AssetType: asset?.type,
      Nickname: asset?.name,
      Details: asset?.type === 'phone' ? global?.utils?.maskPhoneNumber(asset?.assetData?.details, supportedCountryCodes) : asset?.assetData?.details,
      Date: asset?.createdOn,
    })
  }), [data, configStoreData])

  const handleCancelClick = (id) => () => {
    setRowModes({ ...rowModes, [id]: { mode: MODES.VIEW } })
  }

  const handleDeleteClick = (id) => () => {
    dispatch({ type: sagaActions.POST_ASSET_RESET })
    dispatch({ type: sagaActions.DELETE_ASSET_RESET })
    setRowModes({ ...rowModes, [id]: { mode: MODES.DELETE } })
  }

  const handleConfirmClick = (params) => () => {
    const { row } = params
    dispatch({
      type: sagaActions.DELETE_ASSET,
      payload: { data: { id: row?.id, apiEndpoint, AssetType: row?.AssetType } },
    })
    setRowModes({ ...rowModes, [params?.id]: { mode: MODES.VIEW } })
  }

  const columns = [
    dataGridColumn({
      field: 'AssetType',
      headerAlign: 'left',
      headerName: t('identityInfo.col_assetType'),
      variant: 'body2',
      renderCell: (params) => (
        <Chip
          variant="filled"
          label={<Typography variant="caption">{t(`form_field_items.${params.value}_asset_type_label`)}</Typography>}
        />
      ),
    }),
    dataGridColumn({
      field: 'Nickname',
      headerName: t('identityInfo.col_nickName'),
      variant: 'body2',
    }),
    dataGridColumn({
      field: 'Details',
      headerName: t('identityInfo.col_details'),
      variant: 'body2',
      flex: 1,
    }),
    dataGridColumn({
      field: 'Date',
      headerName: t('identityInfo.col_date'),
      variant: 'body2',
      sortable: true,
      valueFormatter: ({ value }) => global?.utils?.dateFormatter(value,
        configStoreData?.validation?.date?.format),
    }),
  ]
  // identityInfo.no_asset_found
  const render = () => (
    <Box sx={{ width: '100%' }}>
      {
       rows?.length > 0
         ? (
           <DataGridView
             rows={rows}
             columns={columns}
             hideFooterPagination={rows?.length <= 5}
             rowActions={(params) => {
               const isInDeleteMode = rowModes[params?.id]?.mode === MODES.DELETE
               if (isInDeleteMode) {
                 return [
                   <GridActionsCellItem
                     key={params?.id}
                     icon={<DynamicSVG path={theme?.artifacts?.appIcons?.tick_icon?.url} />}
                     disabled={isLoading}
                     onClick={handleConfirmClick(params)}
                   />,
                   <GridActionsCellItem
                     key={params?.id}
                     icon={<DynamicSVG path={theme?.artifacts?.appIcons?.cross_icon?.url} />}
                     disabled={isLoading}
                     onClick={handleCancelClick(params?.id)}
                   />,
                 ]
               }
               return [
                 <GridActionsCellItem
                   key={params?.id}
                   icon={<DynamicSVG path={theme?.artifacts?.appIcons?.delete_icon?.url} />}
                   onClick={handleDeleteClick(params?.id)}
                   disabled={isLoading}
                 />,
               ]
             }}
           />
         )
         : <NoDataAvailable content={t('identityInfo.no_asset_found')} />
     }
    </Box>
  )

  return render()
})

IdentityDataGrid.propTypes = propTypes
IdentityDataGrid.defaultProps = defaultProps
IdentityDataGrid.displayName = 'IdentityDataGrid'

export default IdentityDataGrid
