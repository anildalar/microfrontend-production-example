import { reduxForm } from 'redux-form'
import { testingUtilsObj } from '../../../../../../../../devtool-config/jest/utils/test'
import Passport, { normalizePassport } from '.'

const { setUpRTRWithProvider } = testingUtilsObj

const PassportField = reduxForm({ form: 'drivingLicenseField' })(Passport)
describe('- DrivingLicenseField', () => {
  let component
  const props = {
    name: 'Test', label: 'Test', dataTestId: 'test',
  }
  const NON_ALPHANUMERIC = '[^a-zA-Z0-9]'
  describe('- RTR Component Snapshot', () => {
    test('- Default Loading NickNameField', async () => {
      component = setUpRTRWithProvider(PassportField, props)
      expect(component).toMatchSnapshot()
    })
    test('- validation of normalizer', async () => {
      expect(normalizePassport('abc', 'pq', {
        REGEX: { NON_ALPHANUMERIC },
      })).toBe('abc')
      expect(normalizePassport('!abc', 'pq', {
        REGEX: { NON_ALPHANUMERIC },
      })).toBe('pq')
    })
  })
})