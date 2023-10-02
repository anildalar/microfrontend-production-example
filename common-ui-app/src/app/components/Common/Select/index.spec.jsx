import Select from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR } = testingUtilsObj
// require('../../../../mocks/react-i18next-init').default()

describe('- Select Component', () => {
  describe('- Renders Component', () => {
    const createTestProps = () => ({
      name: 'name',
      label: 'label',
      input: {
        name: 'company',
        value: 'Individual',
      },
      options: [
        {
          value: 'Individual',
          label: 'Individual',
        },
        {
          value: 'test',
          label: 'Test',
        },
      ],
    })

    let props = createTestProps()
    let component

    test('- snapshot test', () => {
      props = {
        ...createTestProps(),
      }
      component = setUpRTR(Select, props)
      expect(component).toMatchSnapshot()
    })
  })
})
