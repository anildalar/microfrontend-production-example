import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'
import AlertDetails from '.'

describe('- ResolvedCard Component', () => {
  let component
  let props = {
    rowdata: {
      id: '5e7b1245-30f2-4cd2-9aa5-56545b32cf4e',
      linkedEntityId: '5bca578f-9a0e-4b40-9545-efae41bde9e0',
      linkedEntityDetails: {
        domain: 'yopmail.com',
        assetType: 'domain',
        assetCategory: 'business',
        details: 'yopmail.com',
      },
      description: 'In May 2020, a possible compromised data from an Entertainment site exposing 9 records were found. The data contains emails and passwords.',
      type: 'direct',
      severity: 'LOW',
      source: 'darkweb',
      statusUpdatedDate: null,
      createdDate: '2023-06-20T11:40:57.000+00:00',
    },
    identifier: 'activeAlerts',
    close: jest.fn(),
  }

  const updateState = {}

  props = { ...props }

  test('Component to be defined', async () => {
    // eslint-disable-next-line max-len
    component = testingUtilsObj?.setUpRTRWithProviderAndRouter(AlertDetails, { ...props }, updateState)
    expect(component).toMatchSnapshot()
  })
})
