import AlertCard from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

require('../../../mocks/react-i18next-init').default()

describe('- AlertCard Component', () => {
  let component
  let props = {
    icon: '',
    heading: 'alertCenter.resolved_moveToResolved_description',
    subHeading: 'abc',
  }

  const updateState = {}

  props = { ...props }

  test('Component to be defined', async () => {
    component = testingUtilsObj?.setUpRTRWithProviderAndRouter(AlertCard, { ...props }, updateState)
    expect(component).toMatchSnapshot()
  })
})
