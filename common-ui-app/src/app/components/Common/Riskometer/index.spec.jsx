import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'
import Riskometer from '.'

const { setUpRTLWithTheme } = testingUtilsObj

require('../../../mocks/react-i18next-init').default()

describe('- Riskometer Component', () => {
  describe('- Renders Component', () => {
    let component
    const initialProps = {
      svgPath: 'https://images.contentstack.io/v3/assets/blt8911793295b7dfeb/blta444da4b168da2d8/64ff16bd0433c0788f253328/riskometer2.svg',
    }
    let props = {
      ...initialProps,
    }

    test('- snapshot test', () => {
      component = setUpRTLWithTheme(Riskometer, props)
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test to hide Score', () => {
      props = { ...initialProps, hideScore: true }
      component = setUpRTLWithTheme(Riskometer, props)
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test to hide RangeText', () => {
      props = { ...initialProps, hideRangeText: true }
      component = setUpRTLWithTheme(Riskometer, props)
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test to handle risk lower than lower limit', () => {
      props = { ...initialProps, riskLevel: 100 }
      component = setUpRTLWithTheme(Riskometer, props)
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test to handle risk lower than higher limit', () => {
      props = { ...initialProps, riskLevel: 900 }
      component = setUpRTLWithTheme(Riskometer, props)
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test for bands', () => {
      props = {
        ...initialProps,
        riskLevel: 350,
        riskConfig: {
          lowerRiskLimit: 300,
          upperRiskLimit: 850,
          maxAngle: 180,
          bands: [
            {
              label: 'veryPoor',
              color: '#ff1100',
              rangeLL: 300,
              rangeUL: 499,
              offset: 0,
            },
          ],
        },
      }
      component = setUpRTLWithTheme(Riskometer, props)
      expect(component).toMatchSnapshot()
    })
  })
})
