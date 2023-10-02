import { fireEvent } from '@testing-library/react'
import Header from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTLWithProviderAndRouter, setUpRTRWithProviderAndRouter } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- Header Component', () => {
  describe('- Renders Component', () => {
    let component
    let props = {}
    const defaultState = {}

    test('- snapshot test', () => {
      component = setUpRTRWithProviderAndRouter(Header, props, defaultState)
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test isSideNavBarActivated', () => {
      props = { isSideNavBarActivated: true }
      component = setUpRTRWithProviderAndRouter(Header, props, defaultState)
      expect(component).toMatchSnapshot()
    })

    test('- mount test click header icon', () => {
      props = { isSideNavBarActivated: true }
      component = setUpRTLWithProviderAndRouter(Header, props, defaultState)
      const home = component.getByTestId('go-to-home')
      fireEvent.click(home)
      expect(component).toBeDefined()
    })
  })
})
