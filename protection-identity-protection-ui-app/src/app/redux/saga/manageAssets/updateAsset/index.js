import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../../reducers/manageAssets/updateAsset'
import requestBodyObjects from '../../../../constants/js/requestBodyObjects'
import { businessLogic } from '../../../../constants/js/globalConstants'

export const updateAssetAPI = (data = {}) => {
  const { clientId, ...rest } = data
  const { updateAssetPayload } = requestBodyObjects(clientId)
  return businessLogic(clientId).updateAssetAPI(updateAssetPayload, rest, clientId)
}

export default function* updateAsset(action) {
  const data = action?.payload
  const { category } = action
  try {
    const response = yield call(updateAssetAPI, data)
    yield put(setData({ ...response?.data, category }))
  } catch (error) {
    const errorObj = {
      response: {
        data: {
          code: 'UPDATE_ASSET_ERR',
        },
      },
    }
    yield put(setError(global?.utils?.getError(errorObj, 'SME_', data?.clientId)))
  }
}
