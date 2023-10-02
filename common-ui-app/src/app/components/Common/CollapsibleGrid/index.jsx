/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
import React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Skeleton,
} from '@mui/material'
import PropTypes from 'prop-types'
import CollapsibleRow from './CollapsibleRow'
import EnhancedTableHead from './EnhancedHeader'

const CollapsibleGrid = React.memo(({
  rows,
  columns = [],
  rowsPerPage,
  loading,
  RowDetails,
  enablePagination,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  currentPage,
  NoRowsOverlay,
  perPageOptions,
  totalRows,
}) => {
  const generateUid = () => Math.random().toString(36).replace(/[^a-z]+/g, '')?.substr(2, 10)
  const generateRandomInteger = (min, max) => Math.floor(min + Math.random() * (max - min + 1))
  const renderSkeleton = (rpgn, cols, collapse) => [...Array(rpgn)]
    .map(() => (
      <TableRow key={generateUid()}>
        {[...Array(cols?.length + Number(collapse))].map((el) => (
          <TableCell key={el}>
            <Skeleton
              style={{ width: generateRandomInteger(80, 130) }}
              animation="wave"
            />
          </TableCell>
        ))}
      </TableRow>
    ))

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <EnhancedTableHead
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
              columns={columns}
              handleSort={onSort}
            />
            {RowDetails && <TableCell />}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? renderSkeleton(rowsPerPage, columns, !!RowDetails)
            : rows?.map((row) => (
              <CollapsibleRow
                key={row.id}
                row={row}
                columns={columns}
                RowDetails={RowDetails}
              />
            ))}
        </TableBody>
      </Table>
      {!rows?.length && !loading && (
        <Box
          minHeight="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          data-testid="grid-fallback-text"
        >
          <NoRowsOverlay />
        </Box>
      )}
      {enablePagination && (
        <TablePagination
          rowsPerPageOptions={perPageOptions}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}
    </TableContainer>
  )
})

CollapsibleGrid.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    renderCell: PropTypes.func,
  })).isRequired,
  rows: PropTypes.array,
  rowsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  totalRows: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  RowDetails: PropTypes.func,
  onSort: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  enablePagination: PropTypes.bool,
  NoRowsOverlay: PropTypes.func,
  perPageOptions: PropTypes.array,
}
CollapsibleGrid.defaultProps = {
  rows: [],
  RowDetails: null,
  onRowsPerPageChange: () => { },
  onSort: () => { },
  rowsPerPage: 10,
  currentPage: 0,
  enablePagination: false,
  NoRowsOverlay: () => 'NO DATA AVAILABLE',
  perPageOptions: [5, 10, 25],
  totalRows: 0,
}
CollapsibleGrid.displayName = 'CollapsibleGrid'

export default CollapsibleGrid
