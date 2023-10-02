/* eslint-disable no-unused-vars */
import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../reducers/commPref'
import { businessLogic } from '../../../constants/js/globalConstants'

export const commPrefAPI = (data_ = {}) => businessLogic().getcommPrefAPI(data_)

export default function* commPref(action) {
  const { payload } = action
  try {
    const responseCommPref = yield call(commPrefAPI, payload?.data)
    yield put(setData(responseCommPref?.data))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_COMM_PREF_ERR_')))
  }
}
