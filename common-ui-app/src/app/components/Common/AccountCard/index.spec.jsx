import '../../../../../../mocks/react-i18next'
import '../../../../../../mocks/react-i18next-init'
import '../../../../../../mocks/react-mfe-app'
import AccountCard from '.'
import { testingUtilsObj } from '../../../../../../../devtool-config/jest/utils/test'

const { setUpRTR } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- AccountCard Component', () => {
  let component
  const props = {
    cardData: {
      type: 'test',
      icon: 'test',
      heading: 'heading',
      body: 'body',
    },
  }

  describe('- Renders Component', () => {
    test('- Component to be defined test', () => {
      component = setUpRTR(AccountCard, { ...props })
      expect(component).toMatchSnapshot()
    })
  })
})