import { act } from 'react-dom/test-utils'
import SideNavBar from '.'
import NavBarItem from './NavBarItem'
import { Images } from '../Images'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpMountWithProviderAndRouter, setUpShallowWithProviderAndRouter } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

const items = [{
  text: 'Home',
  id: 'home',
  onClick: () => null,
  Icon: Images.BusinessAlertIcon,
},
{
  text: 'Business Alerts (0)',
  id: 'business-alerts',
  onClick: () => null,
  Icon: Images.BusinessAlertIcon,
},
{
  text: 'Business Data',
  id: 'business-data',
  onClick: () => null,
  Icon: Images.BusinessAlertIcon,
},
{
  text: 'Employees',
  id: 'employees',
  onClick: () => null,
  Icon: Images.BusinessAlertIcon,
},
{
  text: 'Learning Center',
  id: 'education-center',
  onClick: () => null,
  Icon: Images.BusinessAlertIcon,
  children: [
    {
      text: 'My Action Plan',
      id: 'my-action-plan',
      onClick: () => null,
      Icon: Images.BusinessAlertIcon,
    },
    {
      text: 'Article & Guides',
      id: 'article-guides',
      onClick: () => null,
      Icon: Images.BusinessAlertIcon,
    },
    {
      text: 'Faq',
      id: 'faq',
      onClick: () => null,
      Icon: Images.BusinessAlertIcon,
    },
  ],
},
{
  text: 'Logout',
  id: 'logout',
  onClick: () => null,
  Icon: Images.BusinessAlertIcon,
},
]

describe('- SideNavBar Component', () => {
  describe('- Renders Component', () => {
    let component
    let props = {}
    const defaultState = {}

    test('- snapshot test Shallow', () => {
      props = { isSideNavBarActivated: true }
      component = setUpShallowWithProviderAndRouter(SideNavBar, props, defaultState)
      expect(component).toBeDefined()
    })

    test('- snapshot test mount', () => {
      props = { isOpen: true }
      component = setUpMountWithProviderAndRouter(SideNavBar, props, defaultState)
      expect(component).toBeDefined()
    })

    test('- snapshot test Desktop', async () => {
      await act(async () => {
        props = { isOpen: true, isSideNavBarActivated: true }
        component = await setUpMountWithProviderAndRouter(SideNavBar, props, defaultState)
      })
      component.update()

      let pageElement = component.find('[data-testid="navbar-drawer"]').last()
      pageElement.simulate('close', { type: 'keydown', key: 'Shift' })
      pageElement = component.find('[data-testid="navbar-drawer"]').last()
      pageElement.simulate('close', { type: 'keydown' })
      pageElement = component.find('[data-testid="navbar-close-button"]').last()
      pageElement.simulate('click')
      expect(component).toMatchSnapshot()

      items.forEach((item) => {
        component.find(`[data-testid="nav-item-${item.id}"]`).last().simulate('click')
        if (item.id === 'logout') {
          component.find('[data-testid="sme-modal-close-action"]').last().simulate('click')
        }
        component.update()
        if (item?.children?.length > 0) {
          item.children.forEach((child) => {
            component.find(`[data-testid="nav-sub-item-${child.id}"]`).last().simulate('click')
          })
        }
      })
    })

    test('- snapshot test mobile', async () => {
      await act(async () => {
        props = {
          isOpen: true, isSideNavBarActivated: true, isMobile: true, isTablet: true,
        }
        component = await setUpMountWithProviderAndRouter(SideNavBar, props, defaultState)
      })
      component.update()
      expect(component).toBeDefined()
    })

    test('- NavBarItem test', () => {
      items.forEach((item) => {
        props = { isSubMenu: true, item }
        component = setUpMountWithProviderAndRouter(NavBarItem, props, defaultState)
        component.find(`[data-testid="nav-item-${item.id}"]`).last().simulate('click')
        if (item?.children?.length > 0) {
          item.children.forEach((child) => {
            component.find(`[data-testid="nav-sub-item-${child.id}"]`).last().simulate('click')
          })
        }
      })
      expect(component).toBeDefined()
    })
  })
})
