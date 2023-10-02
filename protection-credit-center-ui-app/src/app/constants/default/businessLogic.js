import { global } from 'tenerity-ui-toolkit'

export const getAlertsAPI = (data) => {
  const memberId = global?.appUtils?.getMemberId()
  const {
    apiEndpoint,
  } = data
  return global?.api?.axiosInstance().get(`${apiEndpoint}`.replace('#member_id#', memberId))
}

export const getKbaAPI = (data) => global?.api?.axiosInstance().get(`${data?.apiEndpoint}`.replace('#member_id#', data?.memberId))

export const postKbaAPI = (data) => {
  const {
    memberId, formValues, apiEndpoint,
  } = data
  const body = {}
  body.questionResponses = formValues
  return global?.api?.axiosInstance().post(`${apiEndpoint}`.replace('#member_id#', memberId), body)
}

export const getRemainingTrialAPI = (payload) => {
  const memberId = global?.appUtils?.getMemberId()
  const { apiEndpoint } = payload.data
  return global?.api?.axiosInstance()
    .get(`${apiEndpoint}`.replace('#member_id#', memberId))
}

export const postCreditScoreAPI = (payload) => {
  const { apiEndpoint } = payload.data
  const memberId = global?.appUtils?.getMemberId()
  const body = {
    memberId,
  }
  return global?.api?.axiosInstance()
    .post(`${apiEndpoint}`, body)
}
