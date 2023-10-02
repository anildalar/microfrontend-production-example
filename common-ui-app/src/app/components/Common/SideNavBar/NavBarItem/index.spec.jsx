import { fireEvent } from '@testing-library/react'
import NavBarItem from '.'
import { Images } from '../../Images'
import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'

require('../../../../mocks/react-i18next-init').default()

const { setUpRTLWithProviderAndRouter, setUpRTRWithProviderAndRouter } = testingUtilsObj

describe('- NavBarItem Component', () => {
  describe('- Renders Component', () => {
    let component
    const item = {
      text: 'Home',
      id: 'home',
      Icon: Images.BusinessAlertIcon,
    }
    const defaultState = {}
    let props = {}

    test('- snapshot test', () => {
      props = { noThemeProvider: true, item }
      component = setUpRTRWithProviderAndRouter(NavBarItem, props, defaultState)
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test for Collapsable items', () => {
      const collapsableItem = {
        ...item,
        children: [{
          text: 'test',
          id: 'test',
          Icon: Images.BusinessAlertIcon,
          route: '/test',
        }],
      }
      props = { noThemeProvider: true, item: collapsableItem }
      component = setUpRTLWithProviderAndRouter(NavBarItem, props, defaultState)
      const nav = component.getByTestId(`nav-item-${collapsableItem.id}`)
      fireEvent.click(nav)

      if (collapsableItem?.children?.length > 0) {
        collapsableItem.children.forEach((child) => {
          const navSub = component.getByTestId(`nav-sub-item-${child.id}`)
          fireEvent.click(navSub)
        })
      }
      expect(component).toBeDefined()
    })

    test('- snapshot test for Collapsable items with callbacks', () => {
      const collapsableItem = {
        ...item,
        onClick: () => null,
        route: '/',
        children: [
          {
            text: 'test',
            id: 'test',
            Icon: Images.BusinessAlertIcon,
            route: '/test',
            onClick: () => null,
          },
          {
            text: 'test1',
            id: 'test1',
            Icon: Images.BusinessAlertIcon,
            onClick: () => null,
          },
        ],
      }

      props = {
        noThemeProvider: true,
        item: collapsableItem,
        onClickCB: null,
      }
      component = setUpRTLWithProviderAndRouter(NavBarItem, props, defaultState)
      const items = component.getByTestId(`nav-item-${collapsableItem.id}`)
      fireEvent.click(items)

      if (collapsableItem?.children?.length > 0) {
        collapsableItem.children.forEach((child) => {
          const subItem = component.getByTestId(`"nav-sub-item-${child.id}`)
          fireEvent.click(subItem)
        })
      }
      expect(component).toBeDefined()
    })

    test('- snapshot test mount', () => {
      props = { noThemeProvider: true, item }
      component = setUpRTLWithProviderAndRouter(NavBarItem, props, defaultState)
      const navItem = component.getByTestId(`nav-item-${item.id}`)
      fireEvent.click(navItem)
      expect(component).toBeDefined()
    })

    test('- snapshot test mount with callbacks', () => {
      props = {
        noThemeProvider: true,
        item: {
          ...item,
          route: '/',
          onClick: () => null,
        },
        onClickCB: null,
      }
      component = setUpRTLWithProviderAndRouter(NavBarItem, props, defaultState)
      component.find(`[data-testid="nav-item-${item.id}"]`).last().simulate('click')
      expect(component).toBeDefined()
    })
  })
})
