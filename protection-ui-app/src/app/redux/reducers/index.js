import { combineReducers } from 'redux'
import { global } from 'tenerity-ui-toolkit'

import * as alerts from './alerts'
import * as resolveAlert from './alerts/resolveAlert'
import * as memberProfile from './memberProfile'
import * as notifications from './notifications'
import * as updateNotifications from './notifications/updateNotifications'
import * as timeline from './timeline'

export const allReducers = {
  alerts,
  resolveAlert,
  memberProfile,
  notifications,
  updateNotifications,
  timeline,
}

const reducers = (_reducers) => {
  const { getObjFromObj } = global?.utils

  const mixedReducers = getObjFromObj({ ...allReducers }) || {}
  return combineReducers(getObjFromObj(_reducers, mixedReducers))
}

export default reducers
