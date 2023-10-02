// import '../../../../mocks/react-i18next-init'
import '../../../../mocks/react-mfe-app'
import { reduxForm } from 'redux-form'
import { setupRTRWithProvider } from '../../../../../../devtool-config/jest/utils/test'
import { PhoneNumberField } from '.'

const PhoneNumberFieldForm = reduxForm({ form: 'nickNameField' })(PhoneNumberField)
describe('- NickNameField', () => {
  let component
  const props = {
    name: 'Test', label: 'Test', dataTestId: 'test',
  }
  describe('- RTL Component Snapshot', () => {
    test('- Default Loading PhoneNumberForm', async () => {
      component = setupRTRWithProvider(PhoneNumberFieldForm, props)
      expect(component).toMatchSnapshot()
    })
  })
})
