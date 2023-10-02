import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../reducers/alerts'
import { businessLogic } from '../../../constants/js/globalConstants'

export const getAlertsAPI = (data) => businessLogic().getAlertsAPI(data)

export default function* getAlerts(action) {
  try {
    const { data } = action?.payload
    const response = yield call(getAlertsAPI, data)
    yield put(setData(response?.data))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_ALERT_ERR_')))
  }
}
