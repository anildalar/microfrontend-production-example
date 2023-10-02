import React from 'react'
import { fireEvent } from '@testing-library/react'
import { act } from 'react-test-renderer'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

import CollapsibleGrid from '.'
import '@testing-library/jest-dom'

const { setUpRTLWithProvider } = testingUtilsObj

const mockSort = jest.fn()
const columns = [
  {
    field: 'severity',
    label: 'Severity',
  },
  {
    field: 'assetFound',
    label: 'Asset Found',
  },
  {
    field: 'company',
    label: 'Company',
    type: 'string',
    renderCell: () => 'hello',
  },
  {
    field: 'details',
    label: 'Details',
    sortable: true,
  },
  {
    field: 'createdDate',
    label: 'Date',
  },
]
const rows = [
  {
    id: 1,
    severity: 1,
    assetFound: 'EMAIL',
    company: 'INDIVIDUAL',
    details: 'test@gmail.com',
    createdDate: '04.08.2022',
    source: '',
    description: '',
  },
  {
    id: 5,
    severity: 2,
    assetFound: 'EMAIL',
    company: 'INDIVIDUAL',
    details: 'test@gmail.com',
    createdDate: '05.08.2022',
    source: '',
    description: '',
  },
  {
    id: 2,
    severity: 'LOW',
    assetFound: 'EMAIL',
    company: 'INDIVIDUAL',
    details: 'test@gmail.com',
    createdDate: '06.08.2022',
    source: '',
    description: '',
  },
  {
    id: 3,
    severity: 3,
    assetFound: 'EMAIL',
    company: 'INDIVIDUAL',
    details: 'test@gmail.com',
    createdDate: '04.08.2022',
    source: '',
    description: '',
  },
  {
    id: 7,
    severity: 'LOW',
    assetFound: 'EMAIL',
    company: 'INDIVIDUAL',
    details: 'test@gmail.com',
    createdDate: '06.09.2022',
    source: '',
    description: '',
  },
  {
    id: 9,
    severity: 3,
    assetFound: 'EMAIL',
    company: 'INDIVIDUAL',
    details: 'test@gmail.com',
    createdDate: '04.10.2022',
    source: '',
    description: '',
  },
  {
    id: 10,
    severity: 3,
    assetFound: 'MOBILE',
    company: 'INDIVIDUAL',
    details: 'test@gmail.com',
    createdDate: '04.10.2022',
    source: '',
    description: '',
  },
]

describe('- CollapsibleGrid Component', () => {
  let component
  describe('- Mounting', () => {
    test('- snapshot test with empty rows', () => {
      component = setUpRTLWithProvider(CollapsibleGrid, {
        columns,
        onSort: () => { },
        onRowPerPageChange: () => { },
        onPageChange: () => { },
        loading: false,
        rowsPerPage: 5,
        currentPage: 1,
        enablePagination: true,
      })
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test with rows', () => {
      component = setUpRTLWithProvider(CollapsibleGrid, {
        columns,
        rows,
        onSort: () => { },
        onRowPerPageChange: () => { },
        onPageChange: () => { },
        loading: false,
        rowsPerPage: 5,
        currentPage: 1,
        enablePagination: true,
      })
      expect(component).toMatchSnapshot()
    })
    test('- snapshot test with loading', () => {
      component = setUpRTLWithProvider(CollapsibleGrid, {
        columns,
        rows: [],
        onSort: () => { },
        onRowPerPageChange: () => { },
        onPageChange: () => { },
        loading: true,
        rowsPerPage: 5,
        currentPage: 1,
        enablePagination: true,
      })
      expect(component).toMatchSnapshot()
    })
    test('- snapshot test with details component', () => {
      component = setUpRTLWithProvider(CollapsibleGrid, {
        columns,
        rows,
        onSort: () => { },
        onRowPerPageChange: () => { },
        onPageChange: () => { },
        loading: false,
        rowsPerPage: 5,
        currentPage: 1,
        enablePagination: true,
        RowDetails: () => <h1>Hello</h1>,
      })
      expect(component).toMatchSnapshot()
    })

    test('- Collapse details component', async () => {
      const { getByTestId, getByText } = setUpRTLWithProvider(CollapsibleGrid, {
        columns,
        rows,
        onSort: () => { },
        onRowPerPageChange: () => { },
        onPageChange: () => { },
        loading: false,
        rowsPerPage: 5,
        currentPage: 1,
        enablePagination: true,
        RowDetails: () => <h1>Hello Test</h1>,
      })
      const collapseRow = getByTestId('collapseRow_1')
      fireEvent.click(collapseRow)
      act(() => expect(getByText('Hello Test')).toBeDefined())
    })
    test('- should sort columns', async () => {
      const { getByTestId } = setUpRTLWithProvider(CollapsibleGrid, {
        columns,
        rows,
        onSort: mockSort,
        onRowPerPageChange: () => { },
        onPageChange: () => { },
        loading: false,
        rowsPerPage: 5,
        currentPage: 1,
        enablePagination: true,
        RowDetails: () => <h1>Hello Test</h1>,
      })
      const tableHeadCell = getByTestId('tableHeadCell_details')
      fireEvent.click(tableHeadCell)
      expect(mockSort).toHaveBeenCalled()
    })
  })
})
