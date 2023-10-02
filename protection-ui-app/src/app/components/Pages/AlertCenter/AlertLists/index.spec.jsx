import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'
import AlertList, { sortData } from '.'

describe('- AlertList', () => {
  let component
  const updateState = {}
  let props = {
    status: 'NEW', emptyText: 'no_data',
  }
  const sortArr = [
    {
      name: 'p',
    },
    {
      name: 'q',
    },
  ]
  describe('- Shallow Component Snapshot', () => {
    test('- Default Loading AlertList', () => {
      props = { ...props, noThemeProvider: true }
      component = testingUtilsObj.setUpMountWithProviderAndRouter(AlertList, props, updateState)
      expect(component).toMatchSnapshot()
    })
    test('- Sorting Test with Data', async () => {
      expect(sortData([], {})).toStrictEqual([])
      expect(sortData(sortArr, { key: 'name', direction: 'asc' })).toStrictEqual(sortArr)
      expect(sortData(sortArr, { key: 'name', direction: 'desc' })).not.toStrictEqual(sortArr)
      expect(sortData(sortArr, { direction: 'desc' })).toStrictEqual(sortArr)
    })
  })
})
