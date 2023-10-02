import { act } from 'react-dom/test-utils'
import { fireEvent } from '@testing-library/react'
import EncryptedField from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR, setUpRTL, setUpRTRWithTheme } = testingUtilsObj

require('../../../mocks/react-i18next-init').default()

describe('- EncryptedField Component', () => {
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
      component = setUpRTR(EncryptedField, props)
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
      component = setUpRTR(EncryptedField, props)
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
      component = setUpRTR(EncryptedField, props)
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test showToggleSwitch true', async () => {
      props = createTestProps(true)
      await act(async () => {
        component = setUpRTL(EncryptedField, props)
      })
      let toggleSwitch = component.getByTestId('encrypted-toggle-switch')
      fireEvent.click(toggleSwitch)
      expect(toggleSwitch).toBeDefined()

      toggleSwitch = component.getByTestId('encrypted-toggle-switch')
      fireEvent.click(toggleSwitch)
      expect(toggleSwitch).toBeDefined()
    })
    test('Component with Theme', () => {
      component = setUpRTRWithTheme(EncryptedField, props)
      expect(component).toMatchSnapshot()
    })
  })
})
