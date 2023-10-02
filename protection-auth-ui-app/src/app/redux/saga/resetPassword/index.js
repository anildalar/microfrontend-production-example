import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../reducers/resetPassword'
import requestBodyObjects from '../../../constants/js/requestBodyObjects'
import { businessLogic } from '../../../constants/js/globalConstants'

export const postResetPasswordAPI = (data = {}) => {
  const { requestBodyResetPassword } = requestBodyObjects()
  return businessLogic()
    .postResetPasswordAPI(requestBodyResetPassword, data)
}

export default function* getResetPassword(action) {
  const { data } = action?.payload
  try {
    const response = yield call(postResetPasswordAPI, data)
    yield put(setData(response?.data))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_RESET_PWD_ERR_')))
  }
}
