/* eslint-disable import/no-cycle */
// eslint-disable-next-line no-unused-vars
import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from '@redux-devtools/extension'
import reducers from './reducers'
import sagas from './saga'
import { nodeEnv } from '../../../devtool-config/constants/const.config'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = composeWithDevTools({
  trace: true,
})

// eslint-disable-next-line no-unused-vars
const store = (_reducers = [], _sagas = [], initialState = {}) => {
  const allReducers = reducers(_reducers)
  const storeOutput = createStore(
    allReducers,
    initialState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
      ),
    ),
  )

  /* istanbul ignore if */
  if (sagas && typeof sagas === 'function' && nodeEnv !== 'test') {
    sagaMiddleware.run(sagas, _sagas)
  }
  return storeOutput
}

export default store
