import React, { useState } from 'react'
import { TableCell, TableSortLabel, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const EnhancedTableHead = ({ handleSort, columns }) => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('')

  const createSortHandler = (property) => () => {
    const odr = order === 'asc' ? 'desc' : 'asc'
    setOrder(odr)
    setOrderBy(property)
    handleSort(odr, property)
  }

  return (
    <>
      {columns?.map(({
        variant = '', label, field, sortable = false,
      }) => {
        const cellData = variant ? <Typography variant={variant}>{label}</Typography> : label
        return (
          <TableCell
            key={field}
            className="columnHeaderTitle"
          >
            {
            sortable ? (
              <TableSortLabel
                active={orderBy === field}
                direction={orderBy === field ? order : 'asc'}
                data-testid={`tableHeadCell_${field}`}
                onClick={createSortHandler(field)}

              >
                {cellData}
              </TableSortLabel>
            ) : cellData
          }
          </TableCell>
        )
      })}
    </>
  )
}
export default EnhancedTableHead
EnhancedTableHead.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    renderCell: PropTypes.func,
  })).isRequired,
  handleSort: PropTypes.func,
}
EnhancedTableHead.defaultProps = {
  handleSort: () => {},
}
