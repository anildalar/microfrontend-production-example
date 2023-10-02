export const dataGridColumn = (columnProps) => ({
  field: 'column_name',
  headerName: 'Column Name',
  width: 230,
  sortable: false,
  filterable: false,
  ...columnProps,
})

export const dataGridProps = {
  autoHeight: true,
  pagination: true,
  disableColumnFilter: true,
  disableColumnMenu: true,
  disableColumnSelector: true,
  disableSelectionOnClick: true,
  hideFooter: true,
  hideFooterPagination: true,
  hideFooterSelectedRowCount: true,
  headerHeight: 52,
  rowHeight: 52,
  rowsPerPageOptions: [5, 10, 25, 50, 100, 200],
}
