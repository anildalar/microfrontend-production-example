import { all, takeLatest } from 'redux-saga/effects'
import sagaActions from '../actions'

import getAlerts from './alerts'
import getMemberProfile from './memberProfile'
import getNotifications from './notifications'
import getTimeline from './timeline'
import resolveAlert from './alerts/resolveAlert'
import updateNotifications from './notifications/updateNotifications'

export default function* rootSaga() {
  yield all([
    takeLatest(sagaActions.GET_ALERTS, getAlerts),
    takeLatest(sagaActions.GET_MEMBER_PROFILE, getMemberProfile),
    takeLatest(sagaActions.GET_NOTIFICATIONS, getNotifications),
    takeLatest(sagaActions.GET_TIMELINE, getTimeline),
    takeLatest(sagaActions.RESOLVE_ALERT, resolveAlert),
    takeLatest(sagaActions.UPDATE_NOTIFICATIONS, updateNotifications),
  ])
}
