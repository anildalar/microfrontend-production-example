import * as alertsReducer from './reducers/alerts'
import * as memberProfileReducer from './reducers/memberProfile'
import * as notificationsReducer from './reducers/notifications'
import * as resolveAlertReducer from './reducers/alerts/resolveAlert'
import * as timelineReducer from './reducers/timeline'
import * as updateNotificationsReducer from './reducers/notifications/updateNotifications'

const sagaActions = {
  GET_ALERTS: `${alertsReducer.getAlerts.type}`,
  GET_MEMBER_PROFILE: `${memberProfileReducer.getMemberProfile.type}`,
  GET_NOTIFICATIONS: `${notificationsReducer.getNotifications.type}`,
  GET_TIMELINE: `${timelineReducer.getTimeline.type}`,
  RESOLVE_ALERT: `${resolveAlertReducer.resolveAlertCall.type}`,
  UPDATE_NOTIFICATIONS: `${updateNotificationsReducer.updateNotificationsCall.type}`,
}

export default sagaActions
