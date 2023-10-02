import { fireEvent } from '@testing-library/react'
import AccordionItem from '.'

import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'

const { setUpRTLWithProviderAndRouter, setUpRTRWithTheme } = testingUtilsObj

describe('AccordionItem COmponent', () => {
  let component
  const updateState = {}

  const createTestProps = (props) => ({
    onSubmit: jest.fn(),
    ...props,
  })

  const props = createTestProps({ data: { id: 'abc' } })

  test('- simulate onSubmit', async () => {
    component = setUpRTLWithProviderAndRouter(
      AccordionItem,
      props,
      updateState,
    )
    const element = component.getByTestId('accordion-abc')
    fireEvent.submit(element)
    expect(component).toBeDefined()
  })

  test('Component with Theme', () => {
    component = setUpRTRWithTheme(AccordionItem, props)
    expect(component).toMatchSnapshot()
  })
})
