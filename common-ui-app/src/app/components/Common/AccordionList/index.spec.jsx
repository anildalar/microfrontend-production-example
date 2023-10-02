import { fireEvent } from '@testing-library/react'
import AccordionList from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR, setUpRTL } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- AccordionList Component', () => {
  let component

  describe('- Renders Component', () => {
    test('- Component to be defined test', () => {
      component = setUpRTR(AccordionList, {})
      expect(component).toMatchSnapshot()
    })
  })

  describe('- Mounting', () => {
    test('- snapshot test Desktop View', () => {
      component = setUpRTR(AccordionList, {})
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test with data', () => {
      const props = {
        listData: [
          {
            id: '1',
            title: 'test1',
            summary: 'test1',
          },
          {
            id: '2',
            title: 'test2',
            summary: 'test2',
          },
        ],
      }
      component = setUpRTL(AccordionList, { ...props })

      const accordion = component.getByTestId('accordion-1-content')
      fireEvent.click(accordion)
      expect(component).toBeDefined()

      const accordion1 = component.getByTestId('accordion-1-content')
      fireEvent.click(accordion1)
      expect(component).toMatchSnapshot()
    })
  })
})
