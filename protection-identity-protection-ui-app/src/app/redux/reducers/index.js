import { combineReducers } from 'redux'
import { global } from 'tenerity-ui-toolkit'
import * as manageAssets from './manageAssets'
import * as postAsset from './manageAssets/postAsset'
import * as deleteAsset from './manageAssets/deleteAsset'
import * as updateAsset from './manageAssets/updateAsset'

export const allReducers = {
  manageAssets,
  postAsset,
  deleteAsset,
  updateAsset,
}

const reducers = (_reducers) => {
  const { getObjFromObj } = global?.utils
  const mixedReducers = getObjFromObj({ ...allReducers }) || {}
  return combineReducers(getObjFromObj(_reducers, mixedReducers))
}

export default reducers
