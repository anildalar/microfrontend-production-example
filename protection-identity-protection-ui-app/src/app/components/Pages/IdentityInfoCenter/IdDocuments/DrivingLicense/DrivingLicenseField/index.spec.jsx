import { reduxForm } from 'redux-form'
import { testingUtilsObj } from '../../../../../../../../devtool-config/jest/utils/test'

import DrivingLicense, { normalizeDriversLicense } from '.'

const { setUpRTRWithProvider } = testingUtilsObj

const DrivingLicenseField = reduxForm({ form: 'drivingLicenseField' })(DrivingLicense)
describe('- DrivingLicenseField', () => {
  let component
  const props = {
    name: 'Test', label: 'Test', dataTestId: 'test',
  }
  const NON_ALPHANUMERIC = '[^a-zA-Z0-9]'
  describe('- RTL Component Snapshot', () => {
    test('- Default Loading NickNameField', async () => {
      component = setUpRTRWithProvider(DrivingLicenseField, props)
      expect(component).toMatchSnapshot()
    })
    test('- validation of normalizer', async () => {
      expect(normalizeDriversLicense('abc', 'pq', {
        REGEX: { NON_ALPHANUMERIC },
      })).toBe('abc')
      expect(normalizeDriversLicense('!abc', 'pq', {
        REGEX: { NON_ALPHANUMERIC },
      })).toBe('pq')
    })
  })
})
