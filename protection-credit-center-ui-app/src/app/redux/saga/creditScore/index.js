import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../reducers/creditScore'
import { businessLogic } from '../../../constants/js/globalConstants'

export const creditScoreAPI = (data_ = {}) => businessLogic()?.postCreditScoreAPI(data_)

export default function* creditScore(action) {
  const { payload } = action
  try {
    const response = yield call(creditScoreAPI, payload)
    yield put(setData(response?.data))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_CREDIT_SCORE_ERR_')))
  }
}
