import CountryCodeDrop from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- CountryCodeDrop Component', () => {
  describe('- Renders Component', () => {
    const createTestProps = () => ({
    })

    let props = createTestProps()
    let component

    test('- snapshot test', () => {
      props = {
        ...createTestProps(),
        option: { country: 'uk', code: '+44' },
      }
      component = setUpRTR(CountryCodeDrop, props)
      expect(component).toMatchSnapshot()
    })
  })
})
