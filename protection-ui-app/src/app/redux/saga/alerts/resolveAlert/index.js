import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../../reducers/alerts/resolveAlert'
import { businessLogic } from '../../../../constants/js/globalConstants'

export const resolveAlertAPI = (data = {}) => businessLogic().resolveAlertAPI(data)

export default function* resolveAlert(action) {
  const data = action?.payload
  const callbackFn = action?.callback
  delete data?.callback
  try {
    const response = yield call(resolveAlertAPI, data)
    yield put(setData(response?.data))
    callbackFn()
  } catch (error) {
    const errorObj = {
      response: {
        data: {
          code: 'RESOLVE_ALERT_ERR',
        },
      },
    }
    yield put(setError(global?.utils?.getError(errorObj, 'PROTECTION_ALERT_ERR_')))
  }
}
