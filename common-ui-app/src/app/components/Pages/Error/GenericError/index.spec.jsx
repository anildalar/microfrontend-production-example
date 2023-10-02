import { fireEvent } from '@testing-library/react'
import GenericError from '.'
import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'

const { setUpRTLWithProviderAndRouter } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- GenericError Component', () => {
  let component
  let props = {
    isInDev: '',
    isInMaintenance: '',
    isPageNotFound: '',
  }
  const updateState = {}

  props = { ...props }

  test('Component to be defined with message', () => {
    props = { isInDev: true, isInMaintenance: true, isPageNotFound: true }
    component = setUpRTLWithProviderAndRouter(GenericError, { ...props }, updateState)
    const genricError = component.getByTestId('')
    fireEvent.click(genricError)
    expect(genricError).toBeDefined()
  })
  test('Component with Snapshot', () => {
    expect(component).toMatchSnapshot()
  })
})
