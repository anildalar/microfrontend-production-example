import ResolvedCard from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

describe('- ResolvedCard Component', () => {
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
    // eslint-disable-next-line max-len
    component = testingUtilsObj?.setUpRTRWithProviderAndRouter(ResolvedCard, { ...props }, updateState)
    expect(component).toMatchSnapshot()
  })
})
