import React from 'react'
import { Chip, Typography } from '@mui/material'
import { global } from 'tenerity-ui-toolkit'

const getCols = (t, validation) => [
  {
    field: 'severity',
    label: t('alertCenter.col_severity'),
    sortable: true,
    renderCell: (value, row) => (
      <Chip
        variant="filled"
        color={row?.identifier === 'resolvedAlerts' ? global?.utils?.getColorByAlertSeverity('default') : global?.utils?.getColorByAlertSeverity(value?.toLowerCase())}
        label={<Typography variant="caption">{t(`${value}`)}</Typography>}
      />
    ),
  },
  {
    field: 'assetfound',
    label: t('alertCenter.col_assetFound'),
    renderCell: (value) => (
      <Chip
        variant="filled"
        color={global?.utils?.getColorByAlertSeverity(value?.toLowerCase())}
        label={<Typography variant="caption">{t(`common_items.${value?.toLowerCase()}`)}</Typography>}
      />
    ),
  },
  {
    field: 'source',
    label: t('alertCenter.col_source'),
    renderCell: (value) => t(`common_items.${value}`),
  },
  {
    field: 'details',
    label: t('alertCenter.col_details'),
  },
  {
    field: 'date',
    label: t('alertCenter.col_date'),
    renderCell: (value) => global?.utils?.dateFormatter(value,
      validation?.date?.format),
    sortable: true,
  },
]
export default getCols
