import ItemsGridView from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- ItemsGridView Component', () => {
  describe('- Renders Component', () => {
    const createTestProps = (props = {}) => ({
      onSubmit: jest.fn(),
      ...props,
    })
    let component
    let props = {}

    test('- Desktop View test', () => {
      props = createTestProps()
      component = setUpRTR(ItemsGridView, props)
      expect(component).toMatchSnapshot()
    })

    test('- Mobile View test', () => {
      props = createTestProps({ isMobile: true })
      component = setUpRTR(ItemsGridView, props)
      expect(component).toMatchSnapshot()
    })
  })
})
