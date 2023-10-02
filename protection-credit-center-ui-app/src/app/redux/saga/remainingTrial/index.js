/* eslint-disable no-unused-vars */
import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../reducers/remainingTrial'
import { businessLogic } from '../../../constants/js/globalConstants'

export const getRemainingTrialAPI = (data_ = {}) => businessLogic()?.getRemainingTrialAPI(data_)

export default function* getRemainingTrial(action) {
  const { payload } = action
  try {
    const response = yield call(getRemainingTrialAPI, payload)
    yield put(setData(response?.data))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error)))
  }
}
