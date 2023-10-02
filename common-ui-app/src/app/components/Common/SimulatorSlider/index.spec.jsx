import { SimulatorSlider } from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTLWithProvider } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- SimulatorSlider Component', () => {
  let component
  let props = {
    defaultValue: '',
    range: '',
  }
  const updateState = {}
  props = { ...props }
  const range = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 20,
      label: '20%',
    },
    {
      value: 37,
      label: '40%',
    },
    {
      value: 60,
      label: '60%',
    },
    {
      value: 80,
      label: '80%',
    },
    {
      value: 100,
      label: '100%',
    },
  ]

  test('Component to be defined with message', () => {
    props = { defaultValue: '30', range: [{ range }] }
    component = setUpRTLWithProvider(SimulatorSlider, { ...props }, updateState)
    expect(component).toMatchSnapshot()
  })
})
