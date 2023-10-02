import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'

import { dataGridColumn, dataGridProps } from '../../../constants/dataGridObjects'
import DataGridView from '.'
import { Images } from '../Images'

// require('../../../../mocks/react-i18next-init').default()

const columns = [
  dataGridColumn({
    field: 'id', headerName: 'ID',
  }),
  dataGridColumn({
    field: 'firstName', headerName: 'First name', flex: 1,
  }),
  dataGridColumn({
    field: 'lastName', headerName: 'Last name',
  }),
  dataGridColumn({
    field: 'age', headerName: 'Age',
  }),
  dataGridColumn({
    field: 'fullName', headerName: 'Full name', description: '', valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`, width: 160,
  }),
]

const rows = Array(20)
  .fill(null).map((item, index) => ({
    id: index, lastName: 'Snow', firstName: 'Jon', age: 35,
  }))

describe('- DataGridView Component', () => {
  describe('- Renders Component', () => {
    let component

    test('- Component Availability test', async () => {
      await act(async () => {
        component = await mount(<DataGridView
          rows={rows}
          columns={columns}
          hideFooter={false}
          hideFooterPagination={false}
          initialState={{
            pagination: {
              pageSize: 100,
            },
          }}
        />)
      })
      component.setProps({ pageSize: 10 })
      component.update()
      expect(component).toBeDefined()
    })

    test('- Component Availability test dataGridProps', async () => {
      delete (dataGridProps.rowsPerPageOptions)
      await act(async () => {
        component = await mount(<DataGridView
          rows={rows}
          columns={columns}
          hideFooter={false}
          hideFooterPagination={false}
          actionIcon={<Images.PencilIcon />}
          initialState={{
            pagination: {
              pageSize: 100,
            },
          }}
        />)
      })
      component.setProps({ pageSize: 10 })
      component.update()
      expect(component).toBeDefined()
    })

    test('- Component Availability test No Rows', async () => {
      delete (dataGridProps.rowsPerPageOptions)
      await act(async () => {
        component = await mount(<DataGridView
          rows={[]}
          columns={columns}
          hideFooter={false}
          hideFooterPagination={false}
          initialState={{
            pagination: {
              pageSize: 100,
            },
          }}
        />)
      })
      component.setProps({ pageSize: 10 })
      component.update()
      expect(component).toBeDefined()
    })

    test('- Component Availability test No Rows Fallback', async () => {
      delete (dataGridProps.rowsPerPageOptions)
      await act(async () => {
        component = await mount(<DataGridView
          rows={[]}
          columns={columns}
          hideFooter={false}
          hideFooterPagination={false}
          initialState={{
            pagination: {
              pageSize: 100,
            },
          }}
          fallbackIcon={Images.GridNoAlerts}
          fallbackText="No Rows Available"
        />)
      })
      component.setProps({ pageSize: 10 })
      component.update()
      expect(component).toBeDefined()
    })

    test('- Component Availability test No Rows Loading', async () => {
      delete (dataGridProps.rowsPerPageOptions)
      await act(async () => {
        component = await mount(<DataGridView
          rows={[]}
          columns={columns}
          hideFooter={false}
          hideFooterPagination={false}
          initialState={{
            pagination: {
              pageSize: 100,
            },
          }}
          loading
        />)
      })
      component.setProps({ pageSize: 10 })
      component.update()
      expect(component).toBeDefined()
    })
  })
})
