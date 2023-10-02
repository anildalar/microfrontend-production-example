/* eslint-disable no-unused-vars */
import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../reducers/otp/generate'
import requestBodyObjects from '../../../constants/js/requestBodyObjects'
import { businessLogic } from '../../../constants/js/globalConstants'

export const postGenerateOtpAPI = (data_ = {}) => {
  const { requestBodyOTPGeneration } = requestBodyObjects()
  return businessLogic().generateOTPAPI(requestBodyOTPGeneration, data_)
}

export default function* generateOtpCall(action) {
  const { payload } = action
  try {
    const response = yield call(postGenerateOtpAPI, payload?.data)
    yield put(setData(response?.data))
    if (typeof payload?.data?.callback === 'function') {
      payload?.data?.callback()
    }
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_OTP_ERR_')))
  }
}
