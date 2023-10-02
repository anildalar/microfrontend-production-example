import CardsGrid from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTL, setUpRTR } = testingUtilsObj

describe('CardsGrid Component', () => {
  let component
  let props = {
    cardsArray: '',
  }
  test('Component to be defined with  message', () => {
    props = {
      cardsArray: [{ key: 'abc' }, { key: 'def' }],
    }
    component = setUpRTL(CardsGrid, { ...props })
    expect(component).toBeDefined()
  })

  test('- Component to be defined test', () => {
    props = {
      cardsArray: [{ key: 'abc' }, { key: 'def' }],
    }
    component = setUpRTR(CardsGrid, { ...props })
    expect(component).toMatchSnapshot()
  })
})
