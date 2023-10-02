import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../reducers/enrollment'
import requestBodyObjects from '../../../constants/js/requestBodyObjects'
import { businessLogic } from '../../../constants/js/globalConstants'

export const enrollmentApi = (data = {}) => {
  const { requestBodyEnrollment } = requestBodyObjects()
  return businessLogic()
    .enrollmentAPI(requestBodyEnrollment, data)
}

export default function* postEnrollment(action) {
  const { data } = action?.payload
  try {
    const response = yield call(enrollmentApi, data)
    global?.appUtils?.setAuthData(response?.data?.authTokenResponse)
    yield put(setData(response?.data))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_ENROLL_ERR_')))
  }
}
