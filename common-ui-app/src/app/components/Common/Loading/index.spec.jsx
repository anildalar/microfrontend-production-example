import Loading from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

const createTestProps = () => ({})

describe('- Loading Component', () => {
  describe('- Renders Component', () => {
    let component
    beforeEach(() => {
      const props = createTestProps()
      component = setUpRTR(Loading, props)
    })

    test('- snapshot test', () => {
      expect(component).toMatchSnapshot()
    })
  })
})
