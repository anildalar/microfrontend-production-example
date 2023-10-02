import { all, takeLatest } from 'redux-saga/effects'
import sagaActions from '../actions'
import getKba from './kba/getKba'
import postKba from './kba/postKba'
import remainingTrial from './remainingTrial'
import creditScore from './creditScore'

export default function* rootSaga() {
  yield all([
    takeLatest(sagaActions.GET_KBA, getKba),
    takeLatest(sagaActions.POST_KBA, postKba),
    takeLatest(sagaActions.GET_REMAINING_TRIAL, remainingTrial),
    takeLatest(sagaActions.GET_CREDIT_SCORE, creditScore),
  ])
}
