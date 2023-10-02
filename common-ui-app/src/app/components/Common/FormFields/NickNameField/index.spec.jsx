import '../../../../mocks/react-i18next-init'
import '../../../../mocks/react-mfe-app'
import { reduxForm } from 'redux-form'
import { setupRTRWithProvider } from '../../../../../../devtool-config/jest/utils/test'
import { nickNameNormalizer, NickNameField as NickName } from '.'

const NickNameField = reduxForm({ form: 'nickNameField' })(NickName)
describe('- NickNameField', () => {
  let component
  const props = {
    name: 'Test', label: 'Test', dataTestId: 'test',
  }
  const NICKNAME = '^[A-z][A-z ]{0,15}$'
  describe('- RTL Component Snapshot', () => {
    test('- Default Loading NickNameField', async () => {
      component = setupRTRWithProvider(NickNameField, props)
      expect(component).toMatchSnapshot()
    })
    test('- validation of normalizer', async () => {
      expect(nickNameNormalizer('abc', 'pq', {
        REGEX: { NICKNAME },
      })).toBe('abc')
      expect(nickNameNormalizer('!abc', 'pq', {
        REGEX: { NICKNAME },
      })).toBe('pq')
    })
  })
})
