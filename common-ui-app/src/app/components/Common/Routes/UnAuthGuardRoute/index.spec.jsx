import UnAuthGuardRoute from '.'
import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'

const { setUpRTR } = testingUtilsObj
describe('- UnAuthGuardRoute', () => {
  let component

  test('- UnAuthGuardRoute with Snapshot', () => {
    component = setUpRTR(UnAuthGuardRoute, { })
    expect(component).toMatchSnapshot()
  })
})
