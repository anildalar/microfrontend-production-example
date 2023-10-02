import React from 'react'
import { shallow } from 'enzyme'
import SmeModal from '.'

// require('../../../../mocks/react-i18next-init').default()

describe('- Sme Modal Component', () => {
  describe('- Renders Component', () => {
    let component
    test('- snapshot test', () => {
      component = shallow(<SmeModal />)
      component.find('[data-testid="sme-modal-close-action"]').first().simulate('click')
      expect(component).toMatchSnapshot()
    })
  })
  describe('- Renders Mobile Component', () => {
    let component

    test('render Mobile view test', () => {
      component = shallow(<SmeModal isMobile />)
      expect(component).toMatchSnapshot()
    })
  })
})
