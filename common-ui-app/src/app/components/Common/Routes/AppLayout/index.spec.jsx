import AppLayout from '.'
import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'

const { setUpRTLWithProvider, setUpRTR } = testingUtilsObj

describe('- AppLayout Component', () => {
  let component
  let props = {
    isSideNavBarActivated: '',
  }
  const updateState = {}

  props = { ...props }

  test('Component to be defined with message', () => {
    props = { isSideNavBarActivated: true }
    component = setUpRTLWithProvider(AppLayout, { ...props }, updateState)
    const layout = component.getByTestId('app-layout-container')
    expect(layout).toBeDefined()
  })
  test('Component with Snapshot', () => {
    component = setUpRTR(AppLayout, { ...props })
    expect(component).toMatchSnapshot()
  })
})
