import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../reducers/resetPasswordApproval'
import { businessLogic } from '../../../constants/js/globalConstants'

export const getResetPasswordApprovalAPI = (data = {}) => (
  businessLogic().getResetPasswordApprovalAPI(data)
)

export default function* getResetPasswordApproval(action) {
  const { data } = action?.payload
  try {
    const response = yield call(getResetPasswordApprovalAPI, data)
    yield put(setData(response?.data))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_RESET_PWD_ERR_')))
  }
}
