import Card from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- Card Component', () => {
  let component
  const props = {
    cardData: {
      id: 'test',
      icon: 'test',
      heading: 'heading',
      body: 'body',
    },
  }

  describe('- Renders Component', () => {
    test('- Component to be defined test', () => {
      component = setUpRTR(Card, { ...props })
      expect(component).toMatchSnapshot()
    })
  })

  describe('- Mounting', () => {
    test('- snapshot Desktop View', () => {
      component = setUpRTR(Card, { ...props })
      expect(component).toMatchSnapshot()
    })
  })
})
