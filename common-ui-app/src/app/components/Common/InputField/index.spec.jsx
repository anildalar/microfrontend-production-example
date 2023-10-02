import InputField from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- InputField Component', () => {
  describe('- Renders Component', () => {
    const createTestProps = () => ({
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
      }
      component = setUpRTR(InputField, props)
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
      component = setUpRTR(InputField, props)
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
      component = setUpRTR(InputField, props)
      expect(component).toMatchSnapshot()
    })
  })
})
