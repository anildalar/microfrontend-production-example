import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../reducers/logout'
import requestBodyObjects from '../../../constants/js/requestBodyObjects'
import { businessLogic } from '../../../constants/js/globalConstants'

export const logoutAPI = (data = {}) => {
  const { clientId, ...rest } = data
  const { requestBodyLogout } = requestBodyObjects(clientId)
  return businessLogic(clientId)
    .logoutAPI(requestBodyLogout, rest, clientId)
}

export default function* doLogout(action) {
  const data = action?.payload
  yield put(setData({ status: 'true' }))
  try {
    yield call(logoutAPI, data)
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'SME_ERR_', data?.clientId)))
  }
}
