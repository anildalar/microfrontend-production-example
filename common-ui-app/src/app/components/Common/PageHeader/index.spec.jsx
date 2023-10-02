import PageHeader from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- PageHeader Component', () => {
  describe('- Renders Component', () => {
    const createTestProps = () => ({
      pageName: 'test',
      iconSource: 'test',
      headerTitle: 'Test',
      headerSubtitle: 'Test Subtitle',
      headerSubtitleInfo: 'Test Info',
    })

    let props = createTestProps()
    let component

    test('- snapshot test', () => {
      props = {
        ...createTestProps(),
      }
      component = setUpRTR(PageHeader, props)
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test loading prop true', () => {
      props = {
        loading: true,
        ...createTestProps(),
      }
      component = setUpRTR(PageHeader, props)
      expect(component).toMatchSnapshot()
    })
  })
})
