import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../reducers/memberProfile'
import { businessLogic } from '../../../constants/js/globalConstants'

export const getMemberProfileAPI = ({ clientId }) => businessLogic(clientId)
  .getMemberProfileAPI(clientId)

export default function* getMemberProfile(action) {
  const { data } = action?.payload
  try {
    const response = yield call(getMemberProfileAPI, data)
    yield put(setData(response?.data))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'SME_MEMBER_PROFILE_ERR_', data?.clientId)))
  }
}
