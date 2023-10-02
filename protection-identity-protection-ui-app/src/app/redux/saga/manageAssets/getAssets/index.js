import { call, put } from 'redux-saga/effects'
import { global } from 'tenerity-ui-toolkit'

import { setData, setError } from '../../../reducers/manageAssets'
import { businessLogic } from '../../../../constants/js/globalConstants'

export const getAssetAPI = (data) => businessLogic().getAssetAPI(data)

export default function* getAssets(action) {
  const { data } = action?.payload
  try {
    const response = yield call(getAssetAPI, data)
    yield put(setData(response?.data))
  } catch (error) {
    yield put(setError(global?.utils?.getError(error, 'PROTECTION_ASSET_ERR_')))
  }
}
