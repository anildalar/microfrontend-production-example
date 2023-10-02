import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'
import NextArrow from '.'

const { setUpRTR } = testingUtilsObj

describe('- NextArrow Component', () => {
  let component
  const props = {}

  describe('- Renders Component', () => {
    test('- Component to be defined test', () => {
      component = setUpRTR(NextArrow, { ...props })
      expect(component).toMatchSnapshot()
    })
  })
})
