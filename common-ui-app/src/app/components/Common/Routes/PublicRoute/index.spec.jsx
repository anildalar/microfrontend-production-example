import PublicRoute from '.'
import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'

const { setUpRTR } = testingUtilsObj
describe('- PublicRoute', () => {
  let component

  test('- PublicRoute with Snapshot', () => {
    component = setUpRTR(PublicRoute, { })
    expect(component).toMatchSnapshot()
  })
})
