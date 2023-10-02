import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../../reducers/kba/postKba'
import { businessLogic } from '../../../../constants/js/globalConstants'

export const postKbaAPI = (data = {}) => businessLogic()
  .postKbaAPI(data)

export default function* postKba(action) {
  try {
    const { data } = yield call(postKbaAPI, action?.payload)
    if (data?.status.toLowerCase() === 'success') {
      yield put(setData(data))
    } else {
      yield put(setError('PROTECTION_ERR_AUTH_FAILURE'))
    }
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_KBA_ERR_')))
  }
}
