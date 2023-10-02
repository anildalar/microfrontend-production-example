import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../../reducers/kba'
import { businessLogic } from '../../../../constants/js/globalConstants'

export const getKbaAPI = (data = {}) => businessLogic()
  .getKbaAPI(data)

export default function* getKba() {
  try {
    const response = yield call(getKbaAPI)
    yield put(setData(response?.data))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_KBA_ERR_')))
  }
}
