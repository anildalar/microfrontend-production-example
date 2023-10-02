import React, { useState } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import {
  Box, Stack, Typography, useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import SkeletonLoadingOverlay from './DataGridSkeleton'
import DynamicSVG from '../DynamicSVG'
import {
  defaultProps, defaultPropsNoRow, propTypes, propTypesNoRow,
} from './types'
import constants from '../../../../../devtool-config/constants/const.config'

export const dataGridColumn = (columnProps) => ({
  field: 'column_name',
  headerName: 'Column Name',
  minWidth: 230,
  sortable: false,
  filterable: false,
  ...columnProps,
})

const dataGridProps = {
  autoHeight: true,
  pagination: true,
  disableColumnFilter: true,
  disableColumnMenu: true,
  disableSelectionOnClick: true,
  headerHeight: 48,
  rowHeight: 48,
  rowsPerPageOptions: [5, 10, 20],
}

const DataGridView = React.memo(({
  rows, columns, actionClick, actionDisabled, actionIcon, rowActions, ...restProps
}) => {
  const [pageSize, setPageSize] = useState(5)
  const theme = useTheme()
  const { t } = useTranslation()
  const combineProps = { ...dataGridProps, ...restProps }

  /* istanbul ignore next */
  const Icon = constants.nodeEnv === 'test' ? <span /> : actionIcon

  const getActions = (params) => {
    if (rowActions && typeof rowActions === 'function') {
      return rowActions(params)
    }
    return [
      <GridActionsCellItem
        disabled={actionDisabled}
        key={1}
        icon={Icon}
        label="test"
      // showInMenu
        onClick={actionClick ? () => {
          actionClick(params)
        } : null}
        data-testid={`action-button-grid-${params?.id}`}
      />,
    ]
  }

  const NoRowsOverlay = ({ icon, text }) => (
    <Stack sx={theme?.customStyle?.emptyDataGridView}>
      {icon && (
        <DynamicSVG
          path={icon}
          data-testid="grid-fallback-icon"
        />
      )}
      <Box sx={{ mt: 1 }}>
        <Typography variant="body1" component="span" data-testid="grid-fallback-text">
          {t(text || 'common_items.no_data_available')}
        </Typography>
      </Box>
    </Stack>
  )

  NoRowsOverlay.propTypes = propTypesNoRow
  NoRowsOverlay.defaultProps = defaultPropsNoRow

  const grid = (
    <DataGrid
      rows={rows || []}
      columns={[
        ...columns,
        {
          field: 'actions',
          type: 'actions',
          width: 120,
          getActions,
          align: 'right',
        },
      ]}
      hideFooter={!rows?.length}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      {...combineProps}
      sx={theme?.customStyle?.common?.dataGridView?.sx}
      disableVirtualization
      components={{
        LoadingOverlay: () => <SkeletonLoadingOverlay />,
        NoRowsOverlay: () => (
          <NoRowsOverlay
            icon={restProps?.fallbackIcon}
            text={restProps?.fallbackText}
          />
        ),
      }}
      autoHeight={!restProps?.loading && !!rows?.length}
      rowHeight={restProps?.loading
        && !rows ? dataGridProps?.rowHeight
        : restProps?.rowHeight || dataGridProps?.rowHeight}
    />
  )

  const render = () => (restProps?.loading || !rows?.length ? (
    <div data-testid="grid-wrapper-sme" style={{ height: '50vh' }}>
      {grid}
    </div>
  ) : grid)

  return render()
})

DataGridView.propTypes = propTypes
DataGridView.defaultProps = defaultProps
DataGridView.displayName = 'DataGridView'

export default DataGridView
