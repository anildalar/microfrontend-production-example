import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../reducers/notifications'
import { businessLogic } from '../../../constants/js/globalConstants'

export const getNotificationsAPI = ({ clientId }) => businessLogic(clientId)
  .getNotificationsAPI(clientId)

export default function* getNotifications(action) {
  const { data } = action?.payload
  try {
    const response = yield call(getNotificationsAPI, data)
    yield put(setData(response?.data))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'SME_NOTIFICATIONS_ERR_', data?.clientId)))
  }
}
