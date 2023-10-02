import DataRow from '.'
import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'

const { setUpRTLWithProvider, setUpRTR } = testingUtilsObj

describe('Tooltip Component', () => {
  let component
  let props = {
    row: '',
    columns: '',
    RowDetails: '',
  }
  test('Component to be defined with  message', () => {
    props = {
      row: ['id', 'name'], columns: [{ id: '1', name: 'abc' }], RowDetails: [{ details: 'xyz' }],
    }
    component = setUpRTLWithProvider(DataRow, { ...props })
    expect(component).toBeDefined()
  })

  test('- Component with Snapshot', () => {
    props = {
      row: ['id', 'name'], columns: [{ id: '1', name: 'abc' }], RowDetails: [{ details: 'xyz' }],
    }
    component = setUpRTR(DataRow, { ...props })
    expect(component).toMatchSnapshot()
  })
})
