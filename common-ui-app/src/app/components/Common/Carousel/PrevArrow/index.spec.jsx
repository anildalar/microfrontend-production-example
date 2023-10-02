import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'
import PrevArrow from '.'

const { setUpRTR } = testingUtilsObj

describe('- PrevArrow Component', () => {
  let component
  const props = {}

  describe('- Renders Component', () => {
    test('- Component to be defined test', () => {
      component = setUpRTR(PrevArrow, { ...props })
      expect(component).toMatchSnapshot()
    })
  })
})
