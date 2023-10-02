/* eslint-disable no-unused-vars */
import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import AutoCompleteField from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR, setUpRTL } = testingUtilsObj

require('../../../mocks/react-i18next-init')

describe('- InputField Component', () => {
  describe('- Renders Component', () => {
    const createTestProps = () => ({
      onChange: jest.fn(),
    })

    let props = createTestProps()
    let component

    test('- snapshot test', () => {
      props = {
        ...createTestProps(),
        meta: {
          touched: false,
          invaild: false,
          error: false,
        },
        options: [
          { country: 'it', code: '+39' },
        ],
        renderInput: (params) => (
          <div>
            {params}
          </div>
        ),
      }
      component = setUpRTR(AutoCompleteField, props)
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
      component = setUpRTR(AutoCompleteField, props)
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
      component = setUpRTR(AutoCompleteField, props)
      expect(component).toMatchSnapshot()
    })
    test('- Test for onChange', async () => {
      const options = ['1', 'abc', 'asd']
      props = {
        ...createTestProps(),
        options,
        getOptionLabel: (option) => option,
        label: 'Label',
        'data-testid': 'field',
        input: { onChange: jest.fn() },
        meta: {
          touched: true,
          invaild: false,
          error: false,
        },
      }
      component = setUpRTL(AutoCompleteField, props)
      const inputElement = component.getByTestId('field-mui-input')
      await userEvent.focus(inputElement)

      await userEvent.click(component.getByText(options[0]))
      // component.debug(inputElement)
      await waitFor(() => expect(component.getByText('field-mui-input')).toBeInTheDocument())
      // expect(component).toBeDefined()
    })
  })
})
