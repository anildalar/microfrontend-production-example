import { fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import PasswordField from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR, setUpRTL } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- PasswordField Component', () => {
  describe('- Renders Component', () => {
    const createTestProps = (showToggleSwitch = false) => ({
      showToggleSwitch,
      meta: {
        touched: false,
        invaild: false,
        error: false,
      },
    })

    let props = createTestProps()
    let component

    test('- snapshot test', () => {
      component = setUpRTR(PasswordField, props)
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test for invalid data', () => {
      props = {
        ...createTestProps(),
        meta: {
          touched: true,
          invaild: true,
          error: false,
        },
      }
      component = setUpRTR(PasswordField, props)
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test for successfull validation', () => {
      props = {
        ...createTestProps(),
        meta: {
          touched: true,
          invaild: false,
          error: false,
        },
      }
      component = setUpRTR(PasswordField, props)
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test showToggleSwitch true', async () => {
      props = createTestProps(true)
      await act(async () => {
        component = setUpRTL(PasswordField, props)
      })
      let toggleSwitch = component.getByTestId('password-toggle-switch')
      fireEvent.click(toggleSwitch)
      expect(component).toBeDefined()

      toggleSwitch = component.getByTestId('password-toggle-switch')
      fireEvent.click(toggleSwitch)
      expect(component).toBeDefined()
    })
  })
})
