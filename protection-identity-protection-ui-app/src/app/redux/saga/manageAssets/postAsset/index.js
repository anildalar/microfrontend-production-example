import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../../reducers/manageAssets/postAsset'
import { businessLogic } from '../../../../constants/js/globalConstants'

export const postAssetAPI = (data = {}) => businessLogic().postAssetAPI(data)

export default function* postAsset(action) {
  const { data } = action?.payload
  try {
    const response = yield call(postAssetAPI, data)
    yield put(setData(response?.data))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_ASSET_ERR_')))
  }
}
