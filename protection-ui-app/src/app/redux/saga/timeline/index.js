import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../reducers/timeline'
import { businessLogic } from '../../../constants/js/globalConstants'

export const getTimelineAPI = (data = {}) => {
  const { clientId, ...rest } = data
  return businessLogic(clientId).getTimelineAPI(rest, clientId)
}

export default function* getTimeline(action) {
  const { data } = action?.payload
  try {
    const response = yield call(getTimelineAPI, data)
    yield put(setData(response?.data))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'SME_TIMELINE_ERR_', data?.clientId)))
  }
}
