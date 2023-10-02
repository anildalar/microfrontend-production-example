/* eslint-disable import/no-unresolved */
import React, {
  useEffect, useState, useMemo, memo, useCallback,
} from 'react'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { CollapsibleGrid, NoDataAvailable, Loader } from 'COMMON_UI/common/Components'

import { hooks, styles } from 'tenerity-ui-toolkit'
import PropTypes from 'prop-types'
import { useTheme } from '@emotion/react'
import sagaActions from '../../../../redux/actions'
import getCols from './columns'
import AlertDetails from '../AlertDetails'

const { PaperWrapper } = styles
const alertsMap = { RESOLVED: 'resolvedAlerts', NEW: 'activeAlerts' }

export const sortData = (arr, config) => arr?.slice().sort((a, b) => {
  const { key, direction, type } = config
  if (!key) {
    return 0
  }
  const valueA = type === 'date' ? new Date(a[key]) : a[key]
  const valueB = type === 'date' ? new Date(b[key]) : b[key]
  if (valueA < valueB) {
    return direction === 'asc' ? -1 : 1
  }
  if (valueA > valueB) {
    return direction === 'asc' ? 1 : -1
  }
  return 0
})

const AlertList = memo(({ emptyText, status }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { t } = useTranslation()
  const [throwError] = hooks?.useErrorBoundary()
  const { getApiSchema, getConfigStoreData } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const { validation } = configStoreData
  const apiEndpoint = getApiSchema('getAlerts')
  const alerts = useSelector((state) => state?.alerts)
  const { data, error, isLoading } = alerts
  const identifier = alertsMap[status]
  const rows = useMemo(() => data?.[identifier]?.map((alert) => ({
    id: alert?.id,
    severity: alert?.severity,
    assetfound: alert?.linkedEntityDetails?.assetType,
    source: alert?.source,
    details: alert?.linkedEntityDetails?.details,
    description: alert.description,
    date: alert?.createdDate,
    identifier,
  })), [data, identifier])
  const columns = useCallback(getCols, [])(t, validation)
  const [sortConfig, setSortConfig] = useState({
    key: '',
    direction: '',
    type: '',
  })
  const [pgConf, setPgConf] = useState({
    rpg: 5,
    page: 0,
  })

  const getCall = useCallback(() => {
    dispatch({
      type: sagaActions.GET_ALERTS,
      payload: { data: { apiEndpoint, status } },
    })
  }, [dispatch, apiEndpoint, status])

  useEffect(() => {
    getCall()
  }, [dispatch, getCall])

  useEffect(() => {
    if (error) {
      throwError(error)
    }
  }, [throwError, error])

  const sortedList = sortData(rows, sortConfig)
  const slicedData = sortedList?.slice(
    pgConf?.page * pgConf?.rpg,
    pgConf?.page * pgConf?.rpg + pgConf?.rpg,
  )
  // eslint-disable-next-line react/prop-types, max-len
  const RowData = ({ row, close }) => <AlertDetails close={close} rowdata={row} identifier={identifier} color={global?.utils?.getColorByAlertSeverity(row.severity?.toLowerCase())} />

  const render = () => (
    <PaperWrapper>
      <Box sx={{
        ...theme?.customStyle?.alertListContainer,
      }}
      >
        {isLoading

          ? <Loader />
          : (
            <>
              {
          slicedData?.length > 0
            ? (
              <CollapsibleGrid
                columns={columns}
                rows={slicedData}
                rowsPerPage={pgConf?.rpg}
                currentPage={pgConf?.page}
                onPageChange={(_, newPage) => {
                  setPgConf((prev) => ({ ...prev, page: Number(newPage) }))
                }}
                onRowsPerPageChange={({ target }) => {
                  setPgConf({ page: 0, rpg: Number(target?.value) })
                }}
                RowDetails={RowData}
                onSort={(direction, key) => setSortConfig({ direction, key, type: key })}
                loading={false}
                totalRows={rows?.length}
                enablePagination={rows?.length > 5}
              />
            )
            : <NoDataAvailable content={t(`alertCenter.${emptyText}`)} />
        }
            </>
          )}
      </Box>
    </PaperWrapper>
  )

  return render()
})
AlertList.propTypes = {
  emptyText: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
}
AlertList.displayName = 'AlertList'

export default AlertList
