/* eslint-disable no-unused-vars */
import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../reducers/otp'
import requestBodyObjects from '../../../constants/js/requestBodyObjects'
import { businessLogic } from '../../../constants/js/globalConstants'

export const postOtpAPI = (data_ = {}) => {
  const { requestBodyOTPVerification } = requestBodyObjects()
  return businessLogic().verifyOTPAPI(requestBodyOTPVerification, data_)
}

export default function* otpCall(action) {
  const { payload } = action
  try {
    const response = yield call(postOtpAPI, payload?.data)
    if (response?.data?.status) {
      yield put(setData(response?.data))
    } else {
      yield put(setData('PROTECTION_OTP_ERR_INVALID'))
    }
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_OTP_ERR_')))
  }
}
