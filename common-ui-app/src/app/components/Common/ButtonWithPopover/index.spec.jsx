import { act } from 'react-dom/test-utils'
import { fireEvent } from '@testing-library/react'
import ButtonWithPopover, { GroupingPopover } from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTL } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

const options = [
  {
    label: 'Create a merge commit', onClick: jest.fn(), 'data-testid': 'popover-1-submit-action', disabled: true,
  },
  { label: 'Squash and merge', onClick: jest.fn(), 'data-testid': 'popover-2-submit-action' },
  { label: 'Rebase and merge', onClick: jest.fn(), 'data-testid': 'popover-3-submit-action' },
]

describe('- ButtonWithPopover Component', () => {
  const createTestProps = (props = {}) => ({
    onSubmit: jest.fn(),
    ...props,
  })
  let component
  let props = {}
  describe('- Shallow Renders Component', () => {
    test('- snapshot test Shallow', () => {
      props = createTestProps({ options, label: 'action_items.plus_add', 'data-testid': 'business-data-submit-action' })
      component = setUpRTL(ButtonWithPopover, props)
      expect(component).toBeDefined()
    })

    test('- Mount Render Component', async () => {
      await act(async () => {
        props = createTestProps({ options, label: 'action_items.plus_add', 'data-testid': 'business-data-submit-action' })
        component = setUpRTL(ButtonWithPopover, props)
      })
      options.forEach((item) => {
        const business = component.getByTestId('business-data-submit-action')
        fireEvent.click(business)
        const business1 = component.getByTestId(`${item?.['data-testid']}`)
        fireEvent.click(business1)
      })
      expect(component).toBeDefined()
    })

    test('- GroupingPopover placement top Component', () => {
      props = createTestProps({
        options, placement: 'top', handleClose: jest.fn(), handleMenuItemClick: jest.fn(),
      })

      component = setUpRTL(GroupingPopover, props)
      const action = component.getByTestId('popover-1-submit-action')
      fireEvent.click(action)
      expect(component).toBeDefined()
    })

    test('- GroupingPopover placement bottom Component', () => {
      props = createTestProps({
        options, placement: 'bottom', handleClose: jest.fn(), handleMenuItemClick: jest.fn(),
      })
      component = setUpRTL(GroupingPopover, props)
      const action1 = component.getByTestId('popover-1-submit-action')
      fireEvent.click(action1)
      expect(component).toBeDefined()
    })
  })
})
