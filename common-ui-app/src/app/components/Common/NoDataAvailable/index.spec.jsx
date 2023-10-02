import NoDataAvailable from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTL } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- NoDataAvailable Component', () => {
  let component
  let props = {
    content: '',
  }

  props = { ...props }

  test('Component to be defined with snackbar message', () => {
    props = { content: 'abc' }
    component = setUpRTL(NoDataAvailable, { ...props })
    expect(component).toMatchSnapshot()
  })
})
