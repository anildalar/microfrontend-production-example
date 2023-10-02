import { global } from 'tenerity-ui-toolkit'

export const postAssetAPI = (data) => {
  const {
    apiEndpoint, assetData, type, category, name,
  } = data

  const body = {}
  body.memberId = global?.appUtils?.getMemberId()
  body.type = type
  body.category = category
  body.name = name
  body.assetData = assetData
  return global?.api?.axiosInstance().post(apiEndpoint, body)
}
export const getAssetAPI = (data) => {
  const {
    apiEndpoint,
  } = data

  const memberId = global?.appUtils?.getMemberId()
  return global?.api?.axiosInstance().get(`${apiEndpoint}`.replace('#member_id#', memberId))
}
export const deleteAssetAPI = (data) => {
  const { apiEndpoint, id } = data
  return global?.api?.axiosInstance().delete(`${apiEndpoint}`.replace('#assetId#', id))
}
