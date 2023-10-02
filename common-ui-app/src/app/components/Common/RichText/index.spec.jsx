import RichText from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

describe('- RichText Component', () => {
  let component
  const func = jest.fn()
  let props = {
    icon: '',
    description: 'alertCenter.resolved_moveToResolved_description',
    submitButtonLabel: 'abc',
    onSubmit: func,
    onCancel: func,
  }

  const updateState = {}

  props = { ...props }

  test('Component to be defined', async () => {
    component = testingUtilsObj?.setUpRTRWithProviderAndRouter(RichText, { ...props }, updateState)
    expect(component).toMatchSnapshot()
  })
})
