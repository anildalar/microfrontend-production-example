import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../../reducers/manageAssets/deleteAsset'
import { businessLogic } from '../../../../constants/js/globalConstants'

export const deleteAssetAPI = (data = {}) => businessLogic().deleteAssetAPI(data)

export default function* deleteAsset(action) {
  const { data } = action?.payload
  try {
    const response = yield call(deleteAssetAPI, data)
    if (response?.data?.status?.toLowerCase() === 'success') {
      yield put(setData({ ...response?.data, type: data?.AssetType }))
    } else {
      yield put(setError('PROTECTION_ERR_DELETE_ASSET_GENERIC_ALERT'))
    }
  } catch (error) {
    console.log(error)
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_ASSET_ERR_', 'PROTECTION_ERR_DELETE_ASSET_GENERIC_ALERT')))
  }
}
