import React from 'react'
import '../../../mocks/react-i18next-init'
import { fireEvent } from '@testing-library/react'
import NumberInputField from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTRWithTheme, setUpRTLWithTheme } = testingUtilsObj

jest.mock('../DynamicSVG', () => ({
  __esModule: true,
  default: (props) => <button {...props} />
}))

describe('- NumberInputField Component', () => {
  describe('- Renders Component', () => {
    const createTestProps = () => ({
      label: 'New Input #'
    })

    let props = createTestProps()
    let component

    test('- snapshot test', () => {
      props = {
        ...createTestProps()
      }
      component = setUpRTRWithTheme(NumberInputField, props)
      expect(component).toMatchSnapshot()
    })

    test('- handle input changes correctly', () => {
      props = {
        ...createTestProps()
      }
      component = setUpRTLWithTheme(NumberInputField, props)
      const inputElement = component.getByLabelText('New Input #')

      fireEvent.change(inputElement, { target: { value: 3.5 } })

      expect(inputElement.value).toBe('3.5')
    })

    test('- handle increment and decrement', () => {
      props = {
        ...createTestProps()
      }
      component = setUpRTLWithTheme(NumberInputField, props)
      const inputElement = component.getByLabelText('New Input #')
      const incrementIcon = component.getByTestId('number-increment-icon')
      const decrementIcon = component.getByTestId('number-decrement-icon')
      
      fireEvent.change(inputElement, { target: { value: 3.5 } })

      fireEvent.click(incrementIcon)
      expect(inputElement.value).toBe('4.5')

      fireEvent.click(decrementIcon)
      expect(inputElement.value).toBe('3.5')

      inputElement.focus()

      fireEvent.keyDown(inputElement, { keyCode: 38 })
      expect(inputElement.value).toBe('4.5')

      fireEvent.keyDown(inputElement, { keyCode: 40 })
      expect(inputElement.value).toBe('3.5')
    })
  })
})
