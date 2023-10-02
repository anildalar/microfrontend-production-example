/* eslint-disable no-unused-vars */
import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../reducers/login'
import requestBodyObjects from '../../../constants/js/requestBodyObjects'
import { businessLogic } from '../../../constants/js/globalConstants'

export const loginAPI = (data_ = {}) => {
  const { requestBodyLogin } = requestBodyObjects()
  return businessLogic()?.loginAPI(requestBodyLogin, data_)
}

export default function* doLogin(action) {
  const { payload } = action
  const { payload: { data: { configStoreData } } } = action
  try {
    const response = yield call(loginAPI, payload?.data)
    yield put(setData({ ...response?.data, mfaEnabled: configStoreData?.isMfaEnabled }))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_LOGIN_ERR_')))
  }
}
