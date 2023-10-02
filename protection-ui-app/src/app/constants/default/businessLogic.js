import { global } from 'tenerity-ui-toolkit'

export const getAlertsAPI = (data) => {
  const memberId = global?.appUtils?.getMemberId()
  const {
    apiEndpoint,
    status,
  } = data
  return global?.api?.axiosInstance()
    .get(`${apiEndpoint}?status=${status}`.replace('#member_id#', memberId))
}

export const resolveAlertAPI = (payload) => {
  const { apiEndpoint, status, alertId } = payload.data
  const body = {
    alertId,
    status,
  }
  return global?.api?.axiosInstance()
    .post(`${apiEndpoint}`, body)
}
