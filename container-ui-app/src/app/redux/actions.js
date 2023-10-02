import * as appConfigReducer from './reducers/appConfig'
import * as appReducer from './reducers/app'

const sagaActions = {
  APP_CONFIG_FETCH: `${appConfigReducer.fetchData.type}`,
  SET_LOCALE: `${appReducer.setLocale.type}`,
}

export default sagaActions
