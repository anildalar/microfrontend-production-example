import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import PropTypes from 'prop-types'
import { hooks } from 'tenerity-ui-toolkit'
import DynamicSVG from '../../DynamicSVG'

const DataRow = ({
  row, columns, RowDetails,
}) => {
  const { getThemeConfigData } = hooks?.useConfigStoreHook()
  const { artifacts } = getThemeConfigData()
  const [open, setOpen] = useState(false)

  const renderCol = (el) => {
    if (typeof el?.renderCell === 'function') {
      return el.renderCell(row[el.field], row)
    }
    return row[el.field]
  }

  return (
    <>
      <TableRow>
        {columns.map((el) => <TableCell key={el.field}>{renderCol(el)}</TableCell>)}
        {
          RowDetails
          && (
            <TableCell>
              <IconButton
                aria-label={open ? 'collapse' : 'expand'}
                size="small"
                onClick={() => setOpen(!open)}
                data-testid={`collapseRow_${row?.id}`}
              >
                <DynamicSVG
                  data-testid={open ? 'up_arrow' : 'down_arrow'}
                  path={open
                    ? artifacts?.appIcons?.up_arrow?.url
                    : artifacts?.appIcons?.down_arrow?.url}
                />
              </IconButton>
            </TableCell>
          )
        }
      </TableRow>
      {
        RowDetails && (
          <TableRow className="detailsRow">
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 1}>
              <Collapse in={open} timeout="auto" mountOnEnter>
                <RowDetails row={row} close={() => setOpen(false)} />
              </Collapse>
            </TableCell>
          </TableRow>
        )
      }
    </>
  )
}

export default DataRow

DataRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    renderCell: PropTypes.func,
  })).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  row: PropTypes.object.isRequired,
  RowDetails: PropTypes.func,
}
DataRow.defaultProps = {
  RowDetails: null,
}
DataRow.displayName = 'DataRow'
