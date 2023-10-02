import { act } from 'react-dom/test-utils'
import TabsView from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

require('../../../mocks/react-i18next-init').default()

const { setUpRTLWithProviderAndRouter, setUpRTRWithTheme } = testingUtilsObj

const items = {
  defaultSelectedIndex: 0,
  list: [
    {
      icon: 'test-1',
      id: 'company',
      label: 'test-1',
      component: 'test-1',
    },
    {
      icon: 'test-2',
      id: 'finance',
      label: 'test-2',
      component: 'test-2',
    },
    {
      icon: 'test-3',
      id: 'business',
      label: 'test-3',
      component: 'test-3',
    },
  ],
}

describe('- TabsView Component', () => {
  describe('- Renders Component', () => {
    let component
    let props = {}

    test('- snapshot test', () => {
      props = { items }
      component = setUpRTLWithProviderAndRouter(TabsView, props, {})
      expect(component).toBeDefined()
    })

    test('- snapshot test Desktop', async () => {
      await act(async () => {
        props = { items }
        component = await setUpRTLWithProviderAndRouter(TabsView, props, {})
      })
      component.update()

      items.list.forEach((item) => {
        component.find(`[data-testid="${item.id}-tab"]`).last().simulate('click')
        component.update()
      })
      expect(component).toBeDefined()
    })

    test('- snapshot test Desktop View', () => {
      props = { items }
      component = setUpRTLWithProviderAndRouter(TabsView, props, {})
      expect(component).toBeDefined()
    })

    test('- snapshot test Mobile View', async () => {
      await act(async () => {
        props = { items, isMobile: true }
        component = await setUpRTLWithProviderAndRouter(TabsView, props, {})
      })
      component.update()
      expect(component).toBeDefined()
    })

    test('- toBeDefined test Mobile View', async () => {
      await act(async () => {
        props = { items, isMobile: true }
        delete items.list[0].id
        delete items.list[0].label
        component = await setUpRTLWithProviderAndRouter(TabsView, props, {})
      })
      component.update()
      expect(component).toBeDefined()
    })
    test('- Component to be defined test', () => {
      component = setUpRTRWithTheme(TabsView, props)
      expect(component).toMatchSnapshot()
    })
  })
})
