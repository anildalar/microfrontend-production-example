import { fireEvent } from '@testing-library/react'
import Maintenance from '.'
import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'

const { setUpRTLWithProviderAndRouter, setUpRTRWithTheme } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- Maintenance Component', () => {
  let component
  let props = {
    state: '',
    onClick: '',
    isInDev: '',
    isPageNotFound: '',
    isInMaintenance: '',
  }
  const updateState = {}

  props = { ...props }

  test('Component to be defined with message', () => {
    props = {
      state: 'abc', onClick: 'click', isInDev: true, isPageNotFound: true, isInMaintenance: true,
    }
    component = setUpRTLWithProviderAndRouter(Maintenance, { ...props }, updateState)
    const genricError = component.getByTestId('')
    fireEvent.click(genricError)
    expect(genricError).toBeDefined()
  })
  test('Component with Theme', () => {
    component = setUpRTRWithTheme(Maintenance, { ...props })
    expect(component).toMatchSnapshot()
  })
})
