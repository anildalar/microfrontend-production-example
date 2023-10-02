import React from 'react'
import { act } from 'react-dom/test-utils'
import StepperProgress from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTR, setUpRTL } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

const stepLabels = [{
  key: 'a',
  Component: <div>Hello World</div>,
}, {
  key: 'b',
  Component: <div>Hello World</div>,
}]
const createTestProps = () => ({
  stepLabels,
})

describe('- StepperProgress Component', () => {
  describe('- Renders Component', () => {
    let component
    let props = {}
    beforeEach(() => {
      props = createTestProps()
      component = setUpRTR(StepperProgress, props)
    })

    test('- snapshot test', () => {
      expect(component).toMatchSnapshot()
    })

    test('- test StepperProgress gets props', () => {
      props = {
        ...createTestProps(),
        activeStep: 1,
      }
      component = setUpRTR(StepperProgress, props)
      expect(component).toMatchSnapshot()
    })

    test('- test ProgressBar render proper steps', async () => {
      props = {
        ...createTestProps(),
        activeStep: 1,
      }
      await act(async () => {
        component = setUpRTL(StepperProgress, props)
      })
      stepLabels.forEach((item) => {
        const progressBarSteps = component.getByTestId(`'stepper-progress-step-${item}'`)
        expect(progressBarSteps).toBeDefined()
      })
    })
  })
})
