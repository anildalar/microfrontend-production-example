/* istanbul ignore file */
import { all, takeLatest } from 'redux-saga/effects'
import sagaActions from '../actions'

import * as appConfig from './appConfig'

// eslint-disable-next-line no-unused-vars
export default function* rootSaga(sagas) {
  yield all([
    takeLatest(sagaActions.APP_CONFIG_FETCH, appConfig.fetchDataSaga),
    ...sagas?.map((o) => o && typeof o === 'function' && o()),
  ])
}
