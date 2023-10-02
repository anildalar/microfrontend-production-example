import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

configure({ adapter: new Adapter() })

const enzymeAdapter = () => configure({ adapter: new Adapter() })

export default enzymeAdapter
