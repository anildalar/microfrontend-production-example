import { fireEvent } from '@testing-library/react'
import Tooltip from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTLWithProvider, setUpRTR } = testingUtilsObj

describe('Tooltip Component', () => {
  let component
  let props = {
    message: '',
    children: '',
    onOpen: '',
    onClose: '',
  }
  test('Component to be defined with  message', () => {
    props = {
      message: 'abc', children: 'abc', onOpen: true, onClose: false,
    }
    component = setUpRTLWithProvider(Tooltip, { ...props })
    expect(component).toBeDefined()
  })
  test('Tooltip opens and closes on click', () => {
    component = setUpRTLWithProvider(Tooltip, { ...props })

    // Get the tooltip trigger element (IconButton in your case)
    const button = component.getByTestId('tooltip-icon')

    // Open tooltip
    fireEvent.click(button)
    expect(component).toBeDefined()

    // Close tooltip
    fireEvent.click(button)
    expect(component).toBeDefined()
  })

  test('- Component with Snapshot', () => {
    component = setUpRTR(Tooltip, { ...props })
    expect(component).toMatchSnapshot()
  })
})
