import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../reducers/forgotPassword'
import { businessLogic } from '../../../constants/js/globalConstants'

export const forgotPasswordAPI = (data = {}) => businessLogic()
  .forgotPasswordAPI(data)

export default function* postForgotPassword(action) {
  const { data } = action?.payload
  try {
    const response = yield call(forgotPasswordAPI, data)
    yield put(setData(response.data))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_FORGOT_PWD_ERR_')))
  }
}
