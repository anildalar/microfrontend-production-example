/* eslint-disable no-unused-vars */
import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { businessLogic } from '../../../constants/js/globalConstants'
import { setData, setError } from '../../reducers/solicitation'

export const solicitationAPI = (data_ = {}) => businessLogic().getSolicitationAPI(data_)

export default function* solicitation(action) {
  const { payload } = action
  try {
    const solicitationResponse = yield call(solicitationAPI, payload?.data)
    yield put(setData(solicitationResponse?.data))
    // const solicitationResponse = { // this response will come from Actual API
    //   solName: 'abc',
    //   benefits: [
    //     { type: 'identity' },
    //     { type: 'credit' },
    //   ],
    //   // benefits: [],
    //   trialTerm: {
    //     currency: '$',
    //     newMemberFee: '1',
    //     maxFreeDays: '14',
    //     billAmount: '24.99',
    //   },
    // }
    // yield put(setData(solicitationResponse))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_COMM_PREF_ERR_')))
  }
}
