import EnhancedTableHead from '.'
import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'

const { setUpRTLWithProvider, setUpRTR } = testingUtilsObj

describe('Tooltip Component', () => {
  let component
  let props = {
    handleSort: jest.fn(),
    columns: '',
  }
  test('Component to be defined with  message', () => {
    props = {
      columns: [{
        variant: 'abc', label: 'title', field: 'data', sortable: false,
      }],
    }
    component = setUpRTLWithProvider(EnhancedTableHead, { ...props })
    expect(component).toBeDefined()
  })

  test('- Component with Snapshot', () => {
    props = {
      handleSort: jest.fn(),
      columns: [{
        variant: 'abc', label: 'title', field: 'data', sortable: false,
      }],
    }
    component = setUpRTR(EnhancedTableHead, { ...props })
    expect(component).toMatchSnapshot()
  })
})
