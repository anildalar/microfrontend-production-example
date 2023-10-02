import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../../reducers/notifications/updateNotifications'
import { businessLogic } from '../../../../constants/js/globalConstants'

export const updateNotificationsAPI = (data = {}) => {
  const { clientId, ...rest } = data
  return businessLogic(clientId).updateNotificationsAPI(rest, clientId)
}

export default function* updateNotifications(action) {
  const data = action?.payload
  try {
    const response = yield call(updateNotificationsAPI, data)
    yield put(setData(response?.data))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'SME_NOTIFICATIONS_ERR_', data?.clientId)))
  }
}
